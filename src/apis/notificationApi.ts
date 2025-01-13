import type { Notification } from "@/entities/notification";
import BaseApi from "./baseApi";

class NotificationApi extends BaseApi<Notification> {
	private static instance: NotificationApi;

	constructor() {
		super("notifications");
	}

	public static getInstance(): NotificationApi {
		if (NotificationApi.instance == null) {
			NotificationApi.instance = new NotificationApi();
		}
		return NotificationApi.instance;
	}
}

export const notificationApi = NotificationApi.getInstance();
