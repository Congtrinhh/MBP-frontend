<template>
	<main class="main-container">
		<header class="center-header">Thông báo</header>
		<div class="notification-list" @scroll="handleScroll">
			<div
				v-for="notification in notifications"
				:key="notification.id"
				:class="{ 'notification-item': true, unread: !notification.isRead }"
				@click="handleNotificationClick(notification)"
			>
				<div class="img-parent rounded"><img :src="notification.thumbUrl" alt="notification thumbnail" /></div>
				<div class="info">
					<div class="content line-clamp-3">{{ notification.message }}</div>
					<div class="ago">{{ notification.createdAt }}</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { notificationApi } from "@/apis/notificationApi";
import { useRouter } from "vue-router";
import { NotificationType } from "@/enums/notificationType";
import { useAuthStore } from "@/stores/authStore";
import { type Notification } from "@/entities/notification";

const notifications = ref<Notification[]>([]);
const page = ref(0);
const pageSize = 10;
const loading = ref(false);
const router = useRouter();

const authStore = useAuthStore();

const fetchNotifications = async () => {
	if (loading.value) return;
	loading.value = true;
	try {
		const response = await notificationApi.getPaged({
			pageIndex: page.value,
			pageSize,
			sort: "created_at DESC",
			userId: authStore.user?.id,
		});

		if (response && response.items.length > 0) {
			notifications.value.push(...response.items);
			page.value++;
		}
	} catch (error) {
		console.error("Failed to fetch notifications", error);
	} finally {
		loading.value = false;
	}
};

const handleScroll = (event: any) => {
	const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
	if (bottom) {
		fetchNotifications();
	}
};

const handleNotificationClick = async (notification: Notification) => {
	if (!notification.isRead) {
		try {
			await notificationApi.update(notification.id, { id: notification.id, isRead: true });
			notification.isRead = true;
		} catch (error) {
			console.error("Failed to update notification status", error);
		}
	}
	// Perform actions based on notification type
	if (notification.type === NotificationType.SendOffer) {
		router.push({
			name: "user-offer-detail",
			params: {
				id: notification.id,
			},
		});
	}
	// Add more conditions based on other notification types
};

onMounted(() => {
	fetchNotifications();
});
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
	overflow-y: auto;
	height: 100vh; /* Adjust as needed */
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
