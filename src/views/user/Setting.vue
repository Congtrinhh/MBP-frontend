<template>
	<main class="main-container">
		<header class="center-header">Thiết lập</header>
		<div class="account-wrapper">
			<div class="avatar img-parent">
				<img src="https://picsum.photos/200" alt="avatar" />
			</div>
			<div class="info">
				<div class="name">Trịnh Quý Công</div>
				<div class="phone-number">0342219200</div>
			</div>
		</div>

		<div class="option-list">
			<div class="option-item">
				<div class="icon pi pi-sign-out"></div>
				<div class="text">Hợp đồng</div>
			</div>
			<div class="option-item">
				<div class="icon pi pi-sign-out"></div>
				<div class="text">Xác minh danh tính</div>
			</div>
			<div class="option-item">
				<div class="icon pi pi-sign-out"></div>
				<div class="text">Đăng xuất</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>
<style lang="scss" scoped>
.main-container {
	background-color: #e8e8e8;

	display: flex;
	flex-direction: column;
}

.account-wrapper {
	display: flex;
	gap: 16px;
	padding: 16px 24px;
	background: #fff;
	margin-bottom: 12px;
}

.avatar {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
}

.option-list {
	background: #fff;
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding-top: 16px;
}
.option-item {
	display: flex;
	align-items: center;
	gap: 24px;
	padding: 6px 24px;
	cursor: pointer;

	.icon {
		font-size: 1.2rem;
	}
}
.option-item:focus {
	background: #333;
}
</style>
