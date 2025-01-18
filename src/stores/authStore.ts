import { type User } from "@/entities/user/user2";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import BaseApi from "@/apis/baseApi";

const tokenKey = "mbp_token";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: null as string | null,
		user: null as User | null,
	}),
	actions: {
		login(token: string) {
			this.token = token;
			this.user = jwtDecode<User>(token);
			localStorage.setItem(tokenKey, token);

			BaseApi.axiosInstance.interceptors.request.use(
				(config) => {
					if (token) {
						config.headers.Authorization = `Bearer ${token}`;
					}
					return config;
				},
				(error) => {
					return Promise.reject(error);
				}
			);
		},
		logout() {
			this.token = null;
			this.user = null;
			localStorage.removeItem(tokenKey);
		},
		initialize() {
			const token = localStorage.getItem(tokenKey);
			if (token) {
				this.token = token;
				this.user = jwtDecode<User>(token);

				BaseApi.axiosInstance.interceptors.request.use(
					(config) => {
						config.headers.Authorization = `Bearer ${token}`;
						return config;
					},
					(error) => {
						return Promise.reject(error);
					}
				);
			}
		},
	},
});
