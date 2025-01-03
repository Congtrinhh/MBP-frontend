import type { PagedRequest } from "@/entities/user/paging/pagedRequest";
import type { PagedResponse } from "@/entities/user/paging/pagedResponse";
import axios, { type AxiosInstance, type AxiosResponse } from "axios";

class BaseApi<T> {
	protected axiosInstance: AxiosInstance;
	protected baseUrl: string;
	private defaultBaseUrl = "https://localhost:7252/api";
	protected baseEndpoint = "";

	private static instances: { [key: string]: BaseApi<any> } = {};

	constructor(baseEndpoint: string, baseUrl?: string) {
		this.baseEndpoint = baseEndpoint;

		if (baseUrl) {
			this.baseUrl = baseUrl;
		} else {
			this.baseUrl = this.defaultBaseUrl;
		}

		this.axiosInstance = axios.create({
			baseURL: this.baseUrl,
		});
	}

	/**
	 * Used to make singleton instances of the BaseApi class.
	 * Returns an instance of `BaseApi` for the specified `baseEndpoint`.
	 * If an instance does not already exist, it creates a new one.
	 *
	 * @template T - The type of the data that the API will handle.
	 * @param {string} baseEndpoint - The endpoint for which the `BaseApi` instance is created.
	 * @param {string} [baseUrl] - An optional base URL for the API.
	 * @returns {BaseApi<T>} The `BaseApi` instance for the specified `baseEndpoint`.
	 */
	public static getInstance<T>(baseEndpoint: string, baseUrl?: string): BaseApi<T> {
		if (!BaseApi.instances[baseEndpoint]) {
			BaseApi.instances[baseEndpoint] = new BaseApi<T>(baseEndpoint, baseUrl);
		}
		return BaseApi.instances[baseEndpoint];
	}

	public async getAll(): Promise<T[]> {
		const response: AxiosResponse<T[]> = await this.axiosInstance.get<T[]>(`/${this.baseEndpoint}`);
		return response.data;
	}

	public async getPaged(pagedRequest: PagedRequest): Promise<PagedResponse<T>> {
		const response: AxiosResponse<PagedResponse<T>> = await this.axiosInstance.post<PagedResponse<T>>(
			`/${this.baseEndpoint}/paged`,
			pagedRequest
		);
		return response.data;
	}

	public async getById(id: number): Promise<T> {
		const response: AxiosResponse<T> = await this.axiosInstance.get<T>(`/${this.baseEndpoint}/${id}`);
		return response.data;
	}
	public async create(data: T): Promise<T> {
		const response: AxiosResponse<T> = await this.axiosInstance.post<T>(`/${this.baseEndpoint}`, data);
		return response.data;
	}
	public async update(id: number, data: T): Promise<T> {
		const response: AxiosResponse<T> = await this.axiosInstance.put<T>(`/${this.baseEndpoint}/${id}`, data);
		return response.data;
	}
	public async delete(id: number): Promise<void> {
		await this.axiosInstance.delete<void>(`/${this.baseEndpoint}/${id}`);
	}
}

export default BaseApi;
