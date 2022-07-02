import app from "@/app";
import axios from "axios";
import router from "@/router";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 404) {
            router.push({name: 'not_found'});
        }

        return Promise.reject(error);
    }
)

app.config.globalProperties.axios = axios;
