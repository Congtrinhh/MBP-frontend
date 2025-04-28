<script setup lang="ts">
import { ref } from "vue";
import BaseList from "@/components/admin/BaseList.vue";
import type { ColumnDef, ActionConfig, ListParams } from "@/components/admin/types";
import { mcManagementApi, type McUser } from "@/apis/mcManagementApi";
import { useToast } from "primevue/usetoast";
import type { Gender } from "@/enums/gender";

const toast = useToast();
const loading = ref(false);

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
		handler: (row: McUser) => handleView(row),
	},
	{
		type: "edit",
		icon: "pi pi-pencil",
		tooltip: "Edit MC",
		permission: "mc:edit",
		handler: (row: McUser) => handleEdit(row),
	},
	{
		type: "delete",
		icon: "pi pi-trash",
		tooltip: "Delete MC",
		permission: "mc:delete",
		confirmMessage: "Are you sure you want to delete this MC?",
		handler: (row: McUser) => handleDelete(row),
	},
];

// Data loading handler
const handleLoadData = async (params: ListParams) => {
	loading.value = true;
	try {
		return await mcManagementApi.getList(params);
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load MC data",
			life: 3000,
		});
		throw error;
	} finally {
		loading.value = false;
	}
};

// Action handlers
const handleView = async (row: McUser) => {
	console.log("View MC:", row);
	// Implement view logic
};

const handleEdit = async (row: McUser) => {
	console.log("Edit MC:", row);
	// Implement edit logic
};

const handleDelete = async (row: McUser) => {
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
</script>

<template>
	<div class="p-4">
		<h1 class="text-2xl font-semibold mb-4">MC Management</h1>

		<BaseList
			:columns="columns"
			:actions="actions"
			:permissions="permissions"
			:loading="loading"
			:default-sort="{ field: 'modified_at', order: 'desc' }"
			:search-fields="['fullName', 'nickName', 'email', 'phoneNumber']"
			:onLoad="handleLoadData"
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
