import { defineStore } from "pinia";

import AuthService from "@/services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
  }),
  actions: {
    initializeAuth() {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        this.accessToken = accessToken;
      }
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
    },
  },
});
