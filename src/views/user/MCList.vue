<template>
	<main class="main-container">
		<header class="header">
			<div class="logo">MBP</div>
			<div class="filter-button" @click="showFilterDialog">Lọc</div>
		</header>

		<div class="row gy-3">
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
		</div>

		<Dialog v-model:visible="isVisibleFilterDialog" modal header="Edit Profile" :style="{ width: '25rem' }">
			<span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
			<div class="flex items-center gap-4 mb-4">
				<label for="username" class="font-semibold w-24">Username</label>
				<InputText id="username" class="flex-auto" autocomplete="off" />
			</div>
			<div class="flex items-center gap-4 mb-8">
				<label for="email" class="font-semibold w-24">Email</label>
				<InputText id="email" class="flex-auto" autocomplete="off" />
			</div>
			<div class="flex justify-end gap-2">
				<Button
					type="button"
					label="Cancel"
					severity="secondary"
					@click="isVisibleFilterDialog = false"
				></Button>
				<Button type="button" label="Save" @click="isVisibleFilterDialog = false"></Button>
			</div>
		</Dialog>
	</main>
</template>

<script setup lang="ts">
import MMCItem from "@/components/MMCItem.vue";
import { ref } from "vue";

const isVisibleFilterDialog = ref(false);
const showFilterDialog = () => {
	isVisibleFilterDialog.value = true;
};
</script>
<style lang="scss" scoped>
.main-container {
	padding: 0 12px 12px;
	margin-bottom: 60px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 72px;
	padding: 0 4px;

	.logo {
		font-size: 1.1rem;
		font-weight: bold;
	}

	.filter-button {
		text-decoration: underline;
		cursor: pointer;
	}
}
</style>
