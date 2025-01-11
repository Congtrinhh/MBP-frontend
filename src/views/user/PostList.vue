<template>
	<main class="main-container">
		<header class="header">
			<div class="logo">MBP</div>
			<div class="tabs">
				<Chip
					v-for="group in groups"
					:key="group.id"
					:label="group.name"
					:class="{ active: group.id == activeGroup }"
					@click="activeGroup = group.id"
				/>
			</div>
			<div class="create-post-button" @click="openPostDialog">Đăng bài</div>
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
							<img :src="post.user?.avatarUrl" alt="avatar" />
						</div>
						<div class="info">
							<div class="name">{{ post.user?.nickName }}</div>
							<div class="time-ago">{{ post.createdAt }}</div>
						</div>
					</div>
				</template>
				<template #content>
					<div class="post-content">
						<div class="start"></div>
						<div class="show-info-item show-desc">
							<label class="title">Thông tin chương trình</label>
							<div class="content">{{ post.eventName }}</div>
						</div>
						<div class="show-info-item show-time">
							<label class="title">Thời gian</label>
							<div class="content">{{ post.eventStart }} - {{ post.eventEnd }}</div>
						</div>
						<div class="show-info-item show-place">
							<label class="title">Địa điểm</label>
							<div class="content">{{ post.place }}</div>
						</div>
						<div class="show-info-item show-requirement">
							<label class="title">Yêu cầu cho MC</label>
							<div class="content">{{ post.mcRequirement }}</div>
						</div>
						<div class="show-info-item show-cast">
							<label class="title">Mức cát-xê</label>
							<div class="content">{{ post.priceFrom }} - {{ post.priceTo }}</div>
						</div>
					</div>
				</template>
				<template #footer>
					<div class="divider"></div>
					<div class="reaction-wrapper" v-if="post.reactions && post.reactions.length > 0">
						<div class="icon pi pi-thumbs-up-fill"></div>
						<div class="info">{{ getReactionInfo(post.reactions) }}</div>
					</div>
					<div class="reaction-buttons">
						<div
							:class="[
								'reaction-button like-button',
								{
									liked: post.reactions && post.reactions.some((r) => r.userId === 1),
								},
							]"
							@click="toggleLikePost(post)"
						>
							<i
								:class="[
									'icon pi',
									post.reactions && post.reactions.some((r) => r.userId === 1)
										? 'pi-thumbs-up-fill'
										: 'pi-thumbs-up',
								]"
							></i>
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
		<Dialog v-model:visible="isPostDialogVisible" modal :style="{ width: '100vw', height: '100vh' }">
			<Form :resolver="formResolver" :initialValues="post" @submit="onFormSubmit">
				<div class="dialog-header">
					<Button icon="pi pi-times" class="escape-button" @click="closePostDialog" />
					<span class="dialog-title">{{
						editingMode === EditingMode.Create ? "Tạo bài viết" : "Chỉnh sửa bài viết"
					}}</span>
					<Button label="Lưu" class="save-button" type="submit" />
				</div>
				<FormField v-slot="$field" name="caption" class="flex flex-col gap-1">
					<label for="caption" class="form-label">Caption</label>
					<InputText name="caption" placeholder="Nhập caption" />
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>
				<FormField v-slot="$field" name="eventName" class="flex flex-col gap-1">
					<label for="eventName" class="form-label">Tên sự kiện</label>
					<InputText name="eventName" placeholder="Nhập tên sự kiện" />
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>
				<div class="flex gap-4">
					<FormField v-slot="$field" name="eventStart" class="flex flex-col gap-1 flex-1">
						<label for="eventStart" class="form-label">Bắt đầu</label>
						<DatePicker
							showIcon
							showTime
							hourFormat="24"
							name="eventStart"
							placeholder="Chọn ngày bắt đầu"
						/>
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
					<FormField v-slot="$field" name="eventEnd" class="flex flex-col gap-1 flex-1">
						<label for="eventEnd" class="form-label">Kết thúc</label>
						<DatePicker
							showIcon
							showTime
							hourFormat="24"
							name="eventEnd"
							placeholder="Chọn ngày kết thúc"
						/>
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
				</div>
				<FormField v-slot="$field" name="place" class="flex flex-col gap-1">
					<label for="place" class="form-label">Địa điểm</label>
					<InputText name="place" placeholder="Nhập địa điểm" />
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>
				<FormField v-slot="$field" name="mcRequirement" class="flex flex-col gap-1">
					<label for="mcRequirement" class="form-label">Yêu cầu MC</label>
					<TextArea name="mcRequirement" placeholder="Nhập yêu cầu MC" />
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>
				<div class="flex gap-4">
					<FormField v-slot="$field" name="priceFrom" class="flex flex-col gap-1 flex-1">
						<label for="priceFrom" class="form-label">Giá từ</label>
						<InputNumber
							locale="vi-VN"
							mode="currency"
							currency="VND"
							name="priceFrom"
							placeholder="Nhập giá từ"
						/>
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
					<FormField v-slot="$field" name="priceTo" class="flex flex-col gap-1 flex-1">
						<label for="priceTo" class="form-label">Giá đến</label>
						<InputNumber
							locale="vi-VN"
							mode="currency"
							currency="VND"
							name="priceTo"
							placeholder="Nhập giá đến"
						/>
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
				</div>
			</Form>
		</Dialog>
	</main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { EditingMode } from "@/enums/editingMode";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import type { Post } from "@/entities/user/post";
import BaseApi from "@/apis/baseApi";
import type { Reaction } from "@/entities/user/reaction";
import type { PostPagedRequest } from "@/entities/user/paging/postPagedRequest";

const postApi = BaseApi.getInstance<Post>("posts");

//#region Form Data
const post = ref<Post>({
	id: 0,
	userId: 0,
	caption: "",
	eventName: "",
	eventStart: null,
	eventEnd: null,
	place: "",
	mcRequirement: "",
	priceFrom: null,
	priceTo: null,
});

const formResolver = zodResolver(
	z.object({
		caption: z.string().optional(),
		eventName: z.string().min(1, { message: "Event name is required" }),
		eventStart: z.date().optional(),
		eventEnd: z.date().optional(),
		place: z.string().min(1, { message: "Place is required" }),
		mcRequirement: z.string().min(1, { message: "MC requirement is required" }),
		priceFrom: z.number().optional(),
		priceTo: z.number().optional(),
	})
);

const onFormSubmit = async (formInfo: any) => {
	const { valid, values } = formInfo;
	console.log(formInfo);
	if (valid) {
		values.userId = 1;
		values.postGroup = activeGroup.value;
		await savePost(values);
	}
};
//#endregion

//#region Dialog Management
const isPostDialogVisible = ref(false);
const editingMode = ref<EditingMode>(EditingMode.None);

const openPostDialog = (mode: EditingMode) => {
	editingMode.value = mode;
	isPostDialogVisible.value = true;
};

const closePostDialog = () => {
	isPostDialogVisible.value = false;
};
//#endregion

//#region Post Management
const savePost = async (post: Post) => {
	// Save post logic will be added later
	await postApi.create(post);
	// if (editingMode.value === EditingMode.Create) {
	// }
	closePostDialog();
};
//#endregion

//#region Post Data
const posts = ref<Post[]>([]);

const loadPosts = async () => {
	const pagedRequest: PostPagedRequest = {
		pageIndex: 0,
		pageSize: 10,
		isGetReaction: true,
		isUseProc: true,
		postGroup: activeGroup.value,
	};
	const pagedResponse = await postApi.getPaged(pagedRequest);
	posts.value = pagedResponse.items;
};

onMounted(async () => {
	await loadPosts();
});

const getReactionInfo = (reactions: any[]) => {
	if (reactions.length === 0) return "";

	const hasYou = reactions.some((r) => r.userId === 1);
	if (reactions.length === 1) {
		if (hasYou) return "You";
		return reactions[0].userName;
	}

	if (hasYou) {
		return "You và " + (reactions.length - 1) + " người khác";
	}

	return reactions[0].userName + " và " + (reactions.length - 1) + " người khác";
};
//#endregion

const groups = [
	{
		id: 0,
		name: "Chung",
	},
	{
		id: 1,
		name: "MC mới",
	},
];

const reactionApi = BaseApi.getInstance<Reaction>("reactions");

const toggleLikePost = async (post: Post) => {
	// is liked
	const reaction = post.reactions.find((r: Reaction) => r.userId === 1);
	if (reaction) {
		post.reactions.splice(post.reactions.indexOf(reaction), 1);
		await reactionApi.delete(reaction.id);
	} else {
		const newReaction: Reaction = {
			postId: post.id,
			userId: 1,
			userName: "You",
			type: 0,
			id: 0,
		};
		post.reactions.push(newReaction);
		await reactionApi.create(newReaction);
	}
};

const isLoading = ref(false);
const activeGroup = ref(0);

watch(
	() => activeGroup.value,
	async () => {
		if (isLoading.value) return;

		isLoading.value = true;
		await loadPosts();

		isLoading.value = false;
	}
);
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

		.reaction-button.like-button.liked {
			color: var(--p-primary-400);
		}
	}
}

.divider {
	height: 1px;
	background: #ddd;
	margin: 12px 0;
}

.dialog-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	height: 56px;
	border-bottom: 1px solid #ddd;
}

.dialog-title {
	font-size: 1.25rem;
	font-weight: bold;
}

.escape-button,
.save-button {
	background: none;
	border: none;
	cursor: pointer;
	color: #000;
}
</style>
