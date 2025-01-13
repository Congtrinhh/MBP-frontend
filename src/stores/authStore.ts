import { defineStore } from "pinia";
import { useLocalStorage } from "@/composables/useLocalStorage";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		currentUser: null,
	}),
	actions: {
		saveUser(user: any) {
			const { setItem } = useLocalStorage();
			const userKey = "currentUser";
			setItem(userKey, user);
			this.currentUser = user;
		},
		deleteUser() {
			const { removeItem } = useLocalStorage();
			const userKey = "currentUser";
			removeItem(userKey);
			this.currentUser = null;
		},
	},
});
