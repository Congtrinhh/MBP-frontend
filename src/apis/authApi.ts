import BaseApi from "./baseApi";

class AuthApi extends BaseApi<any> {
	private static instance: AuthApi;

	constructor() {
		super("auth");
	}

	public static getInstance(): AuthApi {
		if (AuthApi.instance == null) {
			AuthApi.instance = new AuthApi();
		}
		return AuthApi.instance;
	}

	//write login with google function accepting access token and a boolean parameter called isSignUp
	public loginWithGoogle = async (accessToken: string, isCreateUser: boolean, isMc: boolean): Promise<any> => {
		return await this.axiosInstance.post(`/${this.baseEndpoint}/google-login`, { accessToken, isCreateUser, isMc });
	};
}

export const authApi = AuthApi.getInstance();
