import type { ListParams, ListResponse } from "@/components/admin/types";
import type { User } from "@/entities/user/user";
import type { UserPagedRequest } from "@/entities/user/paging/userPagedRequest";
import { userApi } from "./userApi";

export type McUser = User & {
	isMc: true;
};

class McManagementApi {
	async getList(params: ListParams): Promise<ListResponse<McUser>> {
		const pagedRequest: UserPagedRequest = {
			pageIndex: params.page - 1,
			pageSize: params.pageSize,
			sort: params.sortField ? `${params.sortField} ${params.sortOrder}` : undefined,
			isMc: true,
			// Map search fields to specific user fields
			...(params.search && params.searchFields
				? {
						fullName: params.searchFields.includes("fullName") ? params.search : undefined,
						email: params.searchFields.includes("email") ? params.search : undefined,
						phoneNumber: params.searchFields.includes("phoneNumber") ? params.search : undefined,
						nickName: params.searchFields.includes("nickName") ? params.search : undefined,
				  }
				: {}),
			isUseProc: true,
			isGetMcType: true,
			isGetProvince: true,
		};

		const response = await userApi.getPaged(pagedRequest);

		// Filter to ensure we only return MCs
		const mcUsers = response.items.filter((user) => user.isMc) as McUser[];

		return {
			items: mcUsers,
			total: mcUsers.length,
			page: response.pageIndex + 1,
			pageSize: response.pageSize,
			totalPages: Math.ceil(mcUsers.length / response.pageSize),
		};
	}

	async delete(id: number): Promise<void> {
		const user = await userApi.getById(id);
		if (!user.isMc) {
			throw new Error("Cannot delete: User is not an MC");
		}
		await userApi.delete(id);
	}

	async getById(id: number): Promise<McUser> {
		const user = await userApi.getById(id);
		if (!user.isMc) {
			throw new Error("User is not an MC");
		}
		return user as McUser;
	}

	async update(id: number, data: Partial<McUser>): Promise<McUser> {
		const user = await userApi.getById(id);
		if (!user.isMc) {
			throw new Error("Cannot update: User is not an MC");
		}

		// Ensure we don't lose required fields
		const updatedData = {
			...user,
			...data,
			isMc: true, // Always maintain MC status
		};

		const result = await userApi.update(id, updatedData);
		return result as McUser;
	}
}

export const mcManagementApi = new McManagementApi();
