<template>
	<main class="main-container">
		<header class="header">
			<div class="logo">MBP</div>
			<div class="tabs"><Chip label="Chung" class="active" /> <Chip label="MC mới" /></div>
			<div class="create-post-button">Đăng bài</div>
		</header>
		<div class="post-list">
			<Card
				class="post-item"
				v-for="post in posts"
				:key="post.id"
				:pt="{
					body: {
						style: 'padding: 0',
					},
				}"
			>
				<template #header>
					<div class="post-header">
						<div class="avatar img-parent rounded">
							<img :src="post.userAvatar" alt="avatar" />
						</div>
						<div class="info">
							<div class="name">{{ post.userName }}</div>
							<div class="time-ago">{{ post.createdAt }}</div>
						</div>
					</div>
				</template>
				<template #content>
					<div class="post-content">
						<div class="start"></div>
						<div class="show-info-item show-desc">
							<label class="title">Thông tin chương trình</label>
							<div class="content">{{ post.showDescription }}</div>
						</div>
						<div class="show-info-item show-time">
							<label class="title">Thời gian</label>
							<div class="content">{{ post.showTime }}</div>
						</div>
						<div class="show-info-item show-place">
							<label class="title">Địa điểm</label>
							<div class="content">{{ post.showPlace }}</div>
						</div>
						<div class="show-info-item show-requirement">
							<label class="title">Yêu cầu cho MC</label>
							<div class="content">{{ post.showRequirement }}</div>
						</div>
						<div class="show-info-item show-cast">
							<label class="title">Mức cát-xê</label>
							<div class="content">{{ post.showCast }}</div>
						</div>
					</div>
				</template>
				<template #footer>
					<div class="divider"></div>
					<div class="reaction-wrapper">
						<div class="icon pi pi-thumbs-up-fill"></div>
						<div class="info">{{ getReactionInfo(post.reactions) }}</div>
					</div>
					<div class="reaction-buttons">
						<div class="reaction-button like-button">
							<i class="icon pi pi-thumbs-up"></i>
							<span class="text">Like</span>
						</div>
						<div class="reaction-button chat-button">
							<i class="icon pi pi-comment"></i>
							<span class="text">Like</span>
						</div>
					</div>
				</template>
			</Card>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const posts = [
	{
		id: 1,
		userId: 1,
		userName: "Hoang Van Khach",
		userAvatar: "https://picsum.photos/200",
		createdAt: "2021-09-01T00:00:00",
		content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		showDescription: "",
		showTime: "",
		showPlace: "",
		showRequirement: "",
		showCast: "",
		reactions: [
			{
				userId: 1,
				userName: "Hoang Van Khach",
			},
			{
				userId: 2,
				userName: "Hoang Van Khach 2",
			},
		],
	},
	{
		id: 2,
		userId: 1,
		userName: "Hoang Van Khach",
		userAvatar: "https://picsum.photos/200",
		createdAt: "2021-09-01T00:00:00",
		content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		showDescription: "",
		showTime: "",
		showPlace: "",
		showRequirement: "",
		showCast: "",
		reactions: [
			{
				userId: 1,
				userName: "Hoang Van Khach",
			},
			{
				userId: 2,
				userName: "Hoang Van Khach 2",
			},
		],
	},
	{
		id: 3,
		userId: 1,
		userName: "Hoang Van Khach",
		userAvatar: "https://picsum.photos/200",
		createdAt: "2021-09-01T00:00:00",
		content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		showDescription: "",
		showTime: "",
		showPlace: "",
		showRequirement: "",
		showCast: "",
		reactions: [
			{
				userId: 1,
				userName: "Hoang Van Khach",
			},
			{
				userId: 2,
				userName: "Hoang Van Khach 2",
			},
		],
	},
];

const getReactionInfo = (reactions: any[]) => {
	return reactions.length > 0 ? reactions[0].userName + " và " + (reactions.length - 1) + " người khác" : "";
};
</script>
<style lang="scss" scoped>
.main-container {
	background: #dfdfdf;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

header.header {
	background: #fff;
	padding: 8px 16px;
	display: flex;
	flex-direction: column;
	position: sticky;
	top: 0;
	z-index: 1;
	border-bottom: 1px solid #ddd;

	.logo {
		font-weight: bold;
		font-size: 1.3rem;
		margin-bottom: 12px;
	}
	.tabs {
		margin-bottom: 8px;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.create-post-button {
		text-decoration: underline;
		cursor: pointer;
	}
}

.post-list {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.p-card.post-item {
	border-radius: 0;
	.post-header {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		padding: 16px 16px 0;

		.avatar {
			width: 40px;
			height: 40px;
		}
		.name {
			font-size: 1.1rem;
			font-weight: 500;
			margin-bottom: 2px;
		}
		.time-ago {
			font-size: 0.9rem;
		}
	}

	.post-content {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 12px 16px 0;
	}

	.reaction-wrapper {
		display: flex;
		gap: 12px;
		align-items: center;
		margin-bottom: 14px;
		padding: 0 16px;
		margin-top: 12px;
	}

	.reaction-buttons {
		display: flex;
		align-items: center;
		gap: 36px;
		padding: 0 16px;
		margin-bottom: 12px;

		.reaction-button {
			display: flex;
			align-items: center;
			gap: 8px;
			cursor: pointer;
		}
	}
}

.divider {
	height: 1px;
	background: #ddd;
	margin: 12px 0;
}
</style>
