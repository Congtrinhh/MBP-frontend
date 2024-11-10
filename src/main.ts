import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import GoogleLogin from "vue3-google-login";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
	theme: {
		preset: Aura,
	},
});

app.use(GoogleLogin, {
	clientId: "354764772754-488i6o9djr7hala82gnremncgdrsstvn.apps.googleusercontent.com",
});

app.mount("#app");
