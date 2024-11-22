<template>
	<main class="main-container">
		<header class="center-header">Thông báo</header>
		<div class="notification-list">
			<div
				v-for="notification in notifications"
				:key="notification.id"
				:class="{ 'notification-item': true, unread: notification.isUnread }"
			>
				<div class="img-parent rounded"><img :src="notification.fromUserAvatar" /></div>
				<div class="info">
					<div class="title">{{ notification.title }}</div>
					<div class="content line-clamp-3">{{ notification.content }}</div>
					<div class="ago">{{ notification.createAt }}</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const notifications = [
	{
		id: 1,
		title: "Thông báo 1",
		content:
			"Hoàng Văn Khách đã đánh giá show dẫn của bạnHoàng Văn Khách đã đánh giá show dẫn của bạnHoàng Văn Khách đã đánh giá show dẫn của bạnHoàng Văn Khách đã đánh giá show dẫn của bạn",
		createAt: "2021-10-10T10:10:10.000Z",
		userId: 10, //id nguoi nhan thong bao
		fromUserId: 2, //id nguoi hien len avatar thong bao
		fromUserName: "Trịnh Quý Công",
		fromUserAvatar: "https://picsum.photos/200",
		isUnread: true,
	},
	{
		id: 2,
		title: "Thông báo 2",
		content: "Hoàng Văn Khách đã đánh giá show dẫn của bạn",
		createAt: "2021-10-10T10:10:10.000Z",
		userId: 10, //id nguoi nhan thong bao
		fromUserId: 2, //id nguoi hien len avatar thong bao
		fromUserName: "Trịnh Quý Công",
		fromUserAvatar: "https://picsum.photos/200",
	},
];
</script>
<style lang="scss" scoped>
.main-container {
	background-color: #fff;

	display: flex;
	flex-direction: column;
}

.notification-list {
	display: flex;
	flex-direction: column;
}

.notification-item {
	display: flex;
	align-items: flex-start;
	gap: 12px;
	padding: 12px;

	&.unread {
		background-color: #eeeeee;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		.title {
			font-weight: 600;
			font-size: 1rem;
		}
		.ago {
			font-size: 0.9rem;
		}
	}
}

.img-parent {
	height: 40px;
	width: 40px;
	flex-shrink: 0;
}
</style>
