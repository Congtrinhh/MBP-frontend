import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import GoogleLogin from "vue3-google-login";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import { definePreset } from "@primevue/themes";

const app = createApp(App);

const MyPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: "{yellow.50}",
			100: "{yellow.100}",
			200: "{yellow.200}",
			300: "{yellow.300}",
			400: "{yellow.400}",
			500: "{yellow.500}",
			600: "{yellow.600}",
			700: "{yellow.700}",
			800: "{yellow.800}",
			900: "{yellow.900}",
			950: "{yellow.950}",
		},
	},
});

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
	theme: {
		preset: MyPreset,
	},
});
app.use(ToastService);

app.use(GoogleLogin, {
	clientId: "354764772754-488i6o9djr7hala82gnremncgdrsstvn.apps.googleusercontent.com",
});

app.mount("#app");
