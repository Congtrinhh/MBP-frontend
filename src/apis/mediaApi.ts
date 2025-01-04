import type { Media } from "@/entities/user/media";
import BaseApi from "./baseApi";

const API_URL = "/api/media";

class MediaApi extends BaseApi<Media> {
	private static instance: MediaApi;

	constructor() {
		super("medias");
	}

	public static getInstance(): MediaApi {
		if (MediaApi.instance == null) {
			MediaApi.instance = new MediaApi();
		}
		return MediaApi.instance;
	}

	public async getMediasByUserId(userId: number): Promise<Medias[]> {
		const response = await this.getPaged({ pageIndex: 0, pageSize: -1, userId });
		return response.items ?? [];
	}
}

export const mediaApi = MediaApi.getInstance();
