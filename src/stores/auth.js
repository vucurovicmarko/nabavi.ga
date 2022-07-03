import router from "@/router";

import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

import AuthService from "@/services/auth.service";

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "accessToken";
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = "refreshToken";
const LOCAL_STORAGE_USER_KEY = "user";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    refreshAccessTokenIntervalId: null,
  }),
  getters: {
    isLoggedIn() {
      return !!this.accessToken;
    },
  },
  actions: {
    initializeAuth() {
      this.accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      this.refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
      this.user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));

      this.setRefreshAccessTokenInterval();
    },
    async setAuth(accessToken, refreshToken) {
      this.setAccessToken(accessToken);
      this.setRefreshToken(refreshToken);

      await AuthService.getUser().then(({ data }) => this.setUser(data));

      this.setRefreshAccessTokenInterval();
    },
    login(data) {
      this.purgeAuth();

      return AuthService.login(data).then(
        ({ data }) => this.setAuth(data.access, data.refresh),
        (error) => Promise.reject(error)
      );
    },
    logout() {
      this.purgeAuth();

      router.push({ name: "storefront" });
    },
    purgeAuth() {
      clearInterval(this.refreshAccessTokenIntervalId);
      this.$reset();

      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    },
    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
      localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    },
    refreshAccessToken(refresh) {
      // ToDo prettify
      return AuthService.refresh({ refresh }).then(
        ({ data }) => data.access,
        () => ""
      );
    },
    setRefreshAccessTokenInterval() {
      if (!this.refreshToken) return;

      // ToDo use  promise chain
      this.refreshAccessTokenIntervalId = setInterval(async () => {
        const accessToken = await this.refreshAccessToken(this.refreshToken);
        this.setAccessToken(accessToken);
      }, process.env.VUE_APP_ACCESS_TOKEN_LIFETIME);
    },
  },
});
