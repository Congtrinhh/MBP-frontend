import { type User } from "@/entities/user/user";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import BaseApi from "@/apis/baseApi";
import * as signalR from "@microsoft/signalr";
import { useAppStore } from "./appStore";

const tokenKey = "mbp_token";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: null as string | null,
		user: null as User | null,
		connection: null as signalR.HubConnection | null,
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

			this.startSignalRConnection();
		},
		logout() {
			this.token = null;
			this.user = null;
			localStorage.removeItem(tokenKey);
			this.stopSignalRConnection();
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

				this.startSignalRConnection();
			}
		},
		/**
		 * khởi tạo connection tới notificationHub
		 * @returns
		 */
		async startSignalRConnection() {
			if (this.connection) {
				return;
			}
			this.connection = new signalR.HubConnectionBuilder()
				.withUrl(`${import.meta.env.VITE_API_ROOT_HOST_URL}/notificationHub?userId=${this.user?.id}`, {
					skipNegotiation: true,
					transport: signalR.HttpTransportType.WebSockets,
					accessTokenFactory: () => this.token,
				})
				.build();

			this.connection.on("ReceiveNotification", (message: string) => {
				console.log("noti from authstore", message);
				useAppStore().unreadNotificationCount++;
			});

			try {
				await this.connection.start();
				console.log("SignalR connection established.");
			} catch (err) {
				console.error("Error establishing SignalR connection:", err);
			}
		},
		/**
		 * đóng connection tới notificationHub
		 * todo: close connection on closing app to prevent memory leak
		 * @returns
		 */
		async stopSignalRConnection() {
			if (!this.connection) {
				return;
			}
			try {
				await this.connection.stop();
				this.connection = null;
				console.log("SignalR connection stopped.");
			} catch (err) {
				console.error("Error stopping SignalR connection:", err);
			}
		},
	},
});
