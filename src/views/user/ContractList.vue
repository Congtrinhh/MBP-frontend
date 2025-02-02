<template>
	<main class="main-container">
		<header class="center-header">Danh sách hợp đồng</header>
		<div class="contract-list" @scroll="handleScroll">
			<div v-for="contract in contracts" :key="contract.id" class="contract-item">
				<Fieldset>
					<template #legend>
						<div class="flex items-center pl-2">
							<span>Hợp đồng từ &nbsp;</span>
							<Avatar :image="contract.thumbUrl" shape="circle" />
							<span class="font-bold p-2">{{ contract.clientName }}</span>
						</div>
					</template>
					<div class="info-container">
						<div class="info-item">
							<label>Bắt đầu:</label>
							<div class="value">{{ contract.eventStart }}</div>
						</div>
						<div class="info-item">
							<label>Kết thúc:</label>
							<div class="value">{{ contract.eventEnd }}</div>
						</div>
						<div class="info-item">
							<label>Địa điểm:</label>
							<div class="value">{{ contract.place }}</div>
						</div>
						<div class="info-item">
							<label>Mô tả:</label>
							<div class="value">{{ contract.description }}</div>
						</div>
					</div>
				</Fieldset>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { contractApi } from "@/apis/contractApi";
import { useAuthStore } from "@/stores/authStore";
import type { Contract } from "@/entities/contract";

const contracts = ref<Contract[]>([]);
const page = ref(0);
const pageSize = 10;
const loading = ref(false);
const authStore = useAuthStore();

const fetchContracts = async () => {
	if (loading.value) return;
	loading.value = true;
	try {
		const response = await contractApi.getPaged({
			pageIndex: page.value,
			pageSize,
			sort: "created_at DESC",
			userId: authStore.user?.id ?? undefined,
		});

		if (response && response.items.length > 0) {
			contracts.value.push(...response.items);
			page.value++;
		}
	} catch (error) {
		console.error("Không thể tải hợp đồng", error);
	} finally {
		loading.value = false;
	}
};

const handleScroll = (event: any) => {
	const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
	if (bottom) {
		fetchContracts();
	}
};

onMounted(() => {
	fetchContracts();
});
</script>

<style lang="scss" scoped>
.main-container {
	background-color: #fff;
	display: flex;
	flex-direction: column;
}

.contract-list {
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	height: 100vh; /* Adjust as needed */
}

.contract-item {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 12px;
}

.info-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 20px;
}

.info-item {
	display: flex;

	label {
		flex: 0 0 auto;
		width: max-content;
		margin-right: 4px;
	}
}
</style>
