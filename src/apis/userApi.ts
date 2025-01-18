import type { User } from "@/entities/user/user";
import BaseApi from "./baseApi";

class UserApi extends BaseApi<User> {
	private static instance: UserApi;

	constructor() {
		super("users");
	}

	public static getInstance(): UserApi {
		if (UserApi.instance == null) {
			UserApi.instance = new UserApi();
		}
		return UserApi.instance;
	}
}

export const userApi = UserApi.getInstance();
