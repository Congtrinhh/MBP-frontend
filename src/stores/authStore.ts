import { type User } from "./../entities/user/user";
import { defineStore } from "pinia";
import { useLocalStorage } from "@/composables/useLocalStorage";

export const useAuthStore = defineStore("auth", {
	state: () => {
		const { getItem } = useLocalStorage();
		const userKey = "currentUser";
		const storedUser = getItem(userKey);
		return {
			currentUser: storedUser ? (storedUser as User) : null,
		};
	},
	actions: {
		saveUser(user: User) {
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
