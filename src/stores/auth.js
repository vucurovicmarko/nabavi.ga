import axios from "axios";
import router from "@/router";

import { defineStore } from "pinia";

import AuthService from "@/services/auth.service";

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "accessToken";
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = "refreshToken";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
    refreshAccessTokenIntervalId: null,
    user: {},
  }),
  getters: {
    isLoggedIn() {
      return Boolean(this.accessToken);
    },
  },
  actions: {
    async initializeAuth() {
      let accessToken = this.getLocalStorageAccessToken();
      const refreshToken = this.getLocalStorageRefreshToken();

      if (!accessToken && refreshToken) {
        accessToken = await this.refreshAccessToken(refreshToken);
      }

      this.setAuth(accessToken, refreshToken);
    },
    setAuth(accessToken, refreshToken) {
      if (!accessToken) return;

      this.setAccessToken(accessToken);
      this.setAuthHeader();

      AuthService.getUser().then(
        ({ data }) => (this.user = data),
        (error) => console.log(error)
      );

      if (refreshToken) {
        this.setRefreshToken(refreshToken);

        this.refreshAccessTokenIntervalId = setInterval(async () => {
          const accessToken = await this.refreshAccessToken(this.refreshToken);
          this.setAccessToken(accessToken);
        }, process.env.VUE_APP_ACCESS_TOKEN_LIFETIME);
      }
    },
    logout() {
      clearInterval(this.refreshAccessTokenIntervalId);
      this.purgeAuth();

      router.push({ name: "storefront" });
    },
    purgeAuth() {
      this.$reset();

      this.removeLocalStorageAccessToken();
      this.removeLocalStorageRefreshToken();

      this.removeAuthHeader();
    },
    refreshAccessToken(refresh) {
      return AuthService.refresh({ refresh }).then(
        ({ data }) => data.access,
        (error) => {
          console.log(error);
          return "";
        }
      );
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
      this.setLocalStorageAccessToken(accessToken);
    },
    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
      this.setLocalStorageRefreshToken(refreshToken);
    },
    setAuthHeader() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `JWT ${this.accessToken}`;
    },
    removeAuthHeader() {
      axios.defaults.headers.common["Authorization"] = "";
    },
    getLocalStorageAccessToken() {
      return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    },
    getLocalStorageRefreshToken() {
      return localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    },
    setLocalStorageAccessToken(accessToken) {
      return localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    },
    setLocalStorageRefreshToken(refreshToken) {
      return localStorage.setItem(
        LOCAL_STORAGE_REFRESH_TOKEN_KEY,
        refreshToken
      );
    },
    removeLocalStorageAccessToken() {
      return localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    },
    removeLocalStorageRefreshToken() {
      return localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    },
  },
});
