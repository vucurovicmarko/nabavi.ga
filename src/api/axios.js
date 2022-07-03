import axios from "axios";
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.request.use((request) => {
  const { isLoggedIn, accessToken } = useAuthStore();

  request.headers.common["Authorization"] = isLoggedIn
    ? `JWT ${accessToken}`
    : "";

  return Promise.resolve(request);
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { isLoggedIn, purgeAuth } = useAuthStore();

    if ([401, 403].includes(error.response.status) && isLoggedIn) {
      purgeAuth();
      router.push({ name: "login" });
    }

    if (error.response.status === 404) {
      router.push({ name: "not_found" });
    }

    return Promise.reject(error);
  }
);
