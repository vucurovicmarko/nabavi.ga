import axios from "axios";

import { defineStore } from "pinia";

import AuthService from "@/services/auth.service";

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "accessToken";
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = "refreshToken";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
    user: {},
  }),
  getters: {
    isAuth() {
      return Boolean(this.accessToken);
    },
  },
  actions: {
    initializeAuth() {
      const accessToken = this.getLocalStorageAccessToken();
      const refreshToken = this.getLocalStorageRefreshToken();

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

        setInterval(
          this.refreshAccessToken,
          process.env.VUE_APP_ACCESS_TOKEN_LIFETIME
        );
      }
    },
    purgeAuth() {
      this.$reset();

      this.removeLocalStorageAccessToken();
      this.removeLocalStorageRefreshToken();

      this.removeAuthHeader();
    },
    refreshAccessToken() {
      AuthService.refresh({ refresh: this.refreshToken }).then(
        ({ data }) => this.setAccessToken(data.access),
        (error) => console.log(error)
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
