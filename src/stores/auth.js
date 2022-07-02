import axios from "axios";

import { defineStore } from "pinia";

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "accessToken";
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = "refreshToken";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    accessToken: "",
    refreshToken: "",
  }),
  getters: {
    hasAccessToken() {
      return Boolean(this.accessToken);
    },
  },
  actions: {
    initializeAuth() {
      this.accessToken = this.getLocalStorageAccessToken() || "";
      this.refreshToken = this.getLocalStorageRefreshToken() || "";

      this.setAuthHeader();
    },
    setAuth(accessToken, refreshToken) {
      this.setAccessToken(accessToken);
      this.setRefreshToken(refreshToken);

      this.setLocalStorageAccessToken(accessToken);
      this.setLocalStorageRefreshToken(refreshToken);

      this.setAuthHeader();
    },
    purgeAuth() {
      this.accessToken = "";
      this.refreshToken = "";
      this.user = {};

      this.removeLocalStorageAccessToken();
      this.removeLocalStorageRefreshToken();

      this.setAuthHeader();
    },
    setUser(user) {
      this.user = user;
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
    },
    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
    },
    setAuthHeader() {
      axios.defaults.headers.common["Authorization"] = this.accessToken
        ? `JWT ${this.accessToken}`
        : "";
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
