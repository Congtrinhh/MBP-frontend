<template>
	<main class="main-container">
		<div class="info-container" v-if="additionalInfo">
			<p><strong>Tên sự kiện:</strong> {{ additionalInfo.eventName }}</p>
			<p><strong>Bắt đầu:</strong> {{ additionalInfo.eventStart }}</p>
			<p><strong>Kết thúc:</strong> {{ additionalInfo.eventEnd }}</p>
			<p><strong>Địa điểm:</strong> {{ additionalInfo.place }}</p>
			<p><strong>Ghi chú:</strong> {{ additionalInfo.note }}</p>
			<p><strong>Tên người gửi:</strong> {{ additionalInfo.senderName }}</p>
		</div>
		<div class="button-container" v-if="notification?.status === NotificationStatus.Editable">
			<Button label="Từ chối" icon="pi pi-times" class="p-button-danger" @click="handleReject" />
			<Button label="Chấp nhận" icon="pi pi-check" class="p-button-success" @click="handleApprove" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { notificationApi } from "@/apis/notificationApi";
import type { Notification } from "@/entities/notification";
import type { SendOfferAdditionalInfo } from "@/entities/notification/additionalInfo/sendOfferAdditionalInfo";
import { NotificationStatus } from "@/enums/notificationStatus";
import { NotificationType } from "@/enums/notificationType";
import type { RejectOfferAdditionalInfo } from "@/entities/notification/additionalInfo/rejectOfferAdditionalInfo";

const route = useRoute();
const router = useRouter();
const notification = ref<Notification | null>(null);
const additionalInfo = ref<SendOfferAdditionalInfo | null>(null);

const fetchNotificationDetails = async (id: string) => {
	try {
		const response = await notificationApi.getById(id);
		if (!response.additionalInfo) return;
		notification.value = response;
		additionalInfo.value = JSON.parse(response.additionalInfo as string);
	} catch (error) {
		console.error("Failed to fetch notification details", error);
		router.push({ name: "user-notification-list" });
	}
};

const handleReject = async () => {
	try {
		if (additionalInfo.value?.senderId) {
			const rejectOfferAdditionalInfo: RejectOfferAdditionalInfo = {
				notificationId: notification.value?.id,
			};

			await notificationApi.create({
				id: 0,
				userId: additionalInfo.value.senderId,
				type: NotificationType.OfferRejected,
				message: `Offer cho sự kiện ${additionalInfo.value.eventName} của bạn đãđã bị từ chối.`,
				isRead: false,
				additionalInfo: JSON.stringify(rejectOfferAdditionalInfo),
				thumbUrl: notification.value?.thumbUrl,
			});

			// Update the status of the original notification to NotEditable
			if (notification.value) {
				await notificationApi.update(notification.value.id, {
					...notification.value,
					status: NotificationStatus.NotEditable,
				});
			}
		}
		// Redirect to notification list
		router.push({ name: "user-notification-list" });
		// Show success toast (replace with your own toast logic)
		// ...toast code...
	} catch (error) {
		console.error("Failed to reject the offer", error);
	}
};

const handleApprove = () => {
	router.push({ name: "user-notification-list" });
	// Show approve toast
};

onMounted(() => {
	const id = route.params.id as string;
	if (id) {
		fetchNotificationDetails(id);
	} else {
		router.push({ name: "user-notification-list" });
	}
});
</script>

<style lang="scss" scoped>
.main-container {
	padding: 0 12px 12px;
	margin-bottom: 60px;
}

.info-container {
	margin-bottom: 20px;
}

.button-container {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
}
</style>
