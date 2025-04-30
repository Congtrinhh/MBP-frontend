<template>
	<div class="h-full flex flex-col">
		<h1 class="text-2xl font-semibold mb-4">MC Management</h1>

		<BaseList
			class="flex-1"
			:columns="columns"
			:actions="actions"
			:permissions="permissions"
			:loading="loading"
			:default-sort="{ field: 'modifiedAt', order: 'desc' }"
			:search-fields="['fullName', 'nickName', 'email']"
			:onLoad="handleLoadData"
			@row-dblclick="handleRowDblClick"
		>
			<!-- Status template -->
			<template #status="{ data }">
				<span
					:class="{
						'px-2 py-1 rounded text-sm font-medium': true,
						'bg-green-100 text-green-800': data.isVerified,
						'bg-yellow-100 text-yellow-800': !data.isVerified && data.isNewbie,
						'bg-red-100 text-red-800': !data.isVerified && !data.isNewbie,
					}"
				>
					{{ data.isVerified ? "Verified" : "Unverified" }}
				</span>
			</template>
		</BaseList>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseList from "@/components/admin/BaseList.vue";
import type { ColumnDef, ActionConfig, ListParams } from "@/components/admin/types";
import { mcManagementApi } from "@/apis/mcManagementApi";
import { useToast } from "primevue/usetoast";
import type { User } from "@/entities/user/user";

const toast = useToast();
const loading = ref(false);

// #region List

// Column definitions
const columns: ColumnDef[] = [
	{ field: "id", header: "ID", width: "80px" },
	{ field: "fullName", header: "Full Name", searchable: true },
	{ field: "nickName", header: "Nick Name", searchable: true },
	{ field: "email", header: "Email", searchable: true },
	{ field: "phoneNumber", header: "Phone Number", searchable: true },
	{ field: "credit", header: "Credit" },
	{ field: "status", header: "Status", template: "status" },
];

// Action configurations
const actions: ActionConfig[] = [
	{
		type: "view",
		icon: "pi pi-eye",
		tooltip: "View Details",
		permission: "mc:view",
		handler: (row: any) => handleView(row as User),
	},
	{
		type: "edit",
		icon: "pi pi-pencil",
		tooltip: "Edit MC",
		permission: "mc:edit",
		handler: (row: any) => handleEdit(row as User),
	},
	{
		type: "delete",
		icon: "pi pi-trash",
		tooltip: "Delete MC",
		permission: "mc:delete",
		confirmMessage: "Are you sure you want to delete this MC?",
		handler: (row: any) => handleDelete(row as User),
	},
];

// Data loading handler
const handleLoadData = async (params: ListParams) => {
	loading.value = true;
	try {
		return await mcManagementApi.getPaged(params);
	} catch (error) {
		throw error;
	} finally {
		loading.value = false;
	}
};

// Action handlers
const handleView = async (row: User) => {
	console.log("View MC:", row);
	// Implement view logic
};

const handleEdit = async (row: User) => {
	console.log("Edit MC:", row);
	// Implement edit logic
};

// Handle double-click event
const handleRowDblClick = (row: User) => {
	if (permissions.canEdit()) {
		handleEdit(row);
	} else if (permissions.canView()) {
		handleView(row);
	}
};

const handleDelete = async (row: User) => {
	try {
		await mcManagementApi.delete(row.id);
		toast.add({
			severity: "success",
			summary: "Success",
			detail: "MC deleted successfully",
			life: 3000,
		});
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to delete MC",
			life: 3000,
		});
	}
};

// Mock permissions (replace with actual permission system)
const permissions = {
	canView: () => true,
	canEdit: () => true,
	canDelete: () => true,
	hasPermission: (permission: string) => true,
};

// #endregion

// #region form
/**
 * build form with js config.
 * validate form with zod
 */
//#endregion
</script>
