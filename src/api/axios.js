import axios from "axios";
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { isLoggedIn, logout } = useAuthStore();

    if ([401, 403].includes(error.response.status) && isLoggedIn) {
      logout();
      router.push({ name: "login" });
    }

    if (error.response.status === 404) {
      router.push({ name: "not_found" });
    }

    return Promise.reject(error);
  }
);
