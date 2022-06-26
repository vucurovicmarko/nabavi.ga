import app from "@/app";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

app.config.globalProperties.axios = axios;
