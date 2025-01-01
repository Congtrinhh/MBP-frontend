import { defineStore } from "pinia";
import { useProvinceStore } from "./provinceStore";
import { useMcTypeStore } from "./mcTypeStore";
import { useHostingStyleStore } from "./hostingStyleStore";

export const useAppStore = defineStore("app", {
	state: () => ({}),
	actions: {
		async initializeApp() {
			const provinceStore = useProvinceStore();
			const mcTypeStore = useMcTypeStore();
			const hostingStyleStore = useHostingStyleStore();

			provinceStore.fetchProvinces();
			mcTypeStore.fetchMcTypes();
			hostingStyleStore.fetchHostingStyles();
		},
	},
});
