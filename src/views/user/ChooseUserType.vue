<template>
	<main class="main-container">
		<h1 class="title">Bạn là ai?</h1>
		<div class="radio-group">
			<div class="radio-item">
				<RadioButton inputId="mc" v-model="isMc" :value="true" />
				<label for="mc">MC</label>
			</div>
			<div class="radio-item">
				<RadioButton inputId="guest" v-model="isMc" :value="false" />
				<label for="guest">Khách booking MC</label>
			</div>
		</div>
		<div class="button-group">
			<Button @click="goBack" severity="secondary">Quay lại</Button>
			<Button @click="submitUserType" severity="contrast">Tiếp tục</Button>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { authApi } from "@/apis/authApi";
import { useAuthStore } from "@/stores/authStore";
import { hideLoading, showLoading } from "@/composables/useLoading";
const route = useRoute();
const router = useRouter();
const toast = useToast();
const isMc = ref(true); // default option
const credential = route.query.credential;

const goBack = () => {
	router.push({ name: "user-login" });
};

const submitUserType = async () => {
	if (!credential) {
		toast.add({ severity: "error", summary: "Error", detail: "Missing credential", life: 3000 });
		return;
	}

	try {
		showLoading();

		const response = await authApi.loginWithGoogle(credential, true, isMc.value);
		if (response.data.accessToken) {
			const authStore = useAuthStore();
			authStore.login(response.data.accessToken);
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Tài khoản đã được tạo thành công",
				life: 3000,
			});
			router.push({ name: "user-post-list" });
		} else {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "Tạo tài khoản thất bại",
				life: 3000,
			});
		}
	} catch (error) {
		console.error(error);
	} finally {
		hideLoading();
	}
};
</script>

<style scoped>
.main-container {
	display: flex;
	flex-direction: column;
	padding: 24px;
	padding-top: 37vh;
}
.title {
	text-align: center;
	font-size: 2rem;
	margin-bottom: 54px;
}
.info {
	text-align: center;
	margin-bottom: 24px;
}
.radio-group {
	display: flex;
	flex-direction: column;
	gap: 16px;
	flex-grow: 1;
	justify-content: flex-start;
	margin-left: 70px;
}
.radio-item {
	display: flex;
	align-items: center;
	gap: 8px;
}
.button-group {
	display: flex;
	justify-content: flex-end;
	gap: 16px;
}
</style>
