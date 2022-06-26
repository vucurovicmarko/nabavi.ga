import app from "@/app";

import router from "@/router";
import pinia from "@/stores";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

app
    .use(router)
    .use(pinia)
    .use(Toast)
