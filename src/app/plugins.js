import app from "@/app";

import router from "@/router";
import pinia from "@/stores";

app
    .use(router)
    .use(pinia)
