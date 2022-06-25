import app from "@/app";
import axios from "axios";

app.config.globalProperties.axios = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
