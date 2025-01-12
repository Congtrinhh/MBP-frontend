import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import GoogleSignInPlugin from "vue3-google-signin";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import { definePreset } from "@primevue/themes";
import { useAppStore } from "./stores/appStore";

import ConfirmationService from "primevue/confirmationservice";

const app = createApp(App);
const pinia = createPinia();

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

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
	theme: {
		preset: MyPreset,
	},
});
app.use(ToastService);

app.use(GoogleSignInPlugin, {
	clientId: "354764772754-qm2ogvlskcrlajq429558s62jbaolkpq.apps.googleusercontent.com",
});
app.use(ConfirmationService); //confirm dialog

//	Initialize data
const appStore = useAppStore();
appStore.initializeApp().then(() => {
	app.mount("#app");
});
