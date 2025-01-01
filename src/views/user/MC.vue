<template>
	<main class="main-container">
		<section class="top">
			<div class="overview-info">
				<div class="avatar-wrapper">
					<div class="avatar img-parent rounded"><img :src="user.avatarUrl" alt="user avatar" /></div>
					<div class="choose-avatar-icon pi pi-camera"></div>
				</div>
				<div class="info">
					<div class="name-wrapper">
						<div class="name">{{ user.nickname }}</div>
						<span v-if="user.isVerified" class="verified">checked</span>
						<div v-else class="verify-identity">Xác thực danh tính</div>
					</div>
					<div class="credit-point"><Badge value="2"></Badge></div>
				</div>
			</div>
			<div class="buttons">
				<Button type="button" label="Gửi offer" severity="primary"></Button>
				<Button type="button" label="Nhắn tin" severity="contrast" variant="outlined"></Button>
			</div>
		</section>
		<section class="tabs">
			<Tabs value="0">
				<TabList>
					<Tab
						value="0"
						:pt="{
							root: {
								style: 'flex-grow: 1',
							},
						}"
						>Thông tin</Tab
					>
					<Tab
						value="1"
						:pt="{
							root: {
								style: 'flex-grow: 1',
							},
						}"
						>Ảnh & video</Tab
					>
					<Tab
						value="2"
						:pt="{
							root: {
								style: 'flex-grow: 1',
							},
						}"
						>Đánh giá</Tab
					>
				</TabList>
				<TabPanels>
					<TabPanel value="0">
						<div class="tab-content-wrapper">
							<div class="top">
								<Button
									type="button"
									label="Gửi offer"
									severity="secondary"
									v-if="editingMode == EditingMode.Update"
									@click="saveGeneralInfo"
									class=""
									width="80px"
								>
									Hủy
								</Button>
								<Button v-if="editingMode == EditingMode.Update" @click="saveGeneralInfo" class="">
									Lưu
								</Button>

								<Button
									v-if="editingMode == EditingMode.None"
									@click="editingMode = EditingMode.Update"
									icon="pi pi-pencil"
									aria-label="Filter"
									label="Sửa"
								/>
							</div>

							<Form
								class="flex flex-col gap-4 w-full sm:w-56"
								:resolver="formInitialValues"
								:initialValues="formInitialValues"
								v-if="editingMode == EditingMode.Update"
							>
								<FormField name="nickname" class="flex flex-col gap-1">
									<label for="nickname" class="form-label">Nghệ danh</label>
									<InputText type="text" placeholder="Nhập nghệ danh" />
								</FormField>
								<FormField name="hostingStyles" class="flex flex-col gap-1">
									<label for="hostingStyles" class="form-label">Phong cách dẫn</label>
									<MultiSelect
										:options="hostingStyles"
										optionLabel="name"
										placeholder="Chọn phong cách dẫn"
										class="w-full md:w-80"
									/>
								</FormField>

								<FormField name="description" class="flex flex-col gap-1">
									<label for="description" class="form-label">Mô tả về bản thân</label>
									<Textarea rows="5" cols="30" placeholder="Nhập mô tả về bản thân" />
								</FormField>

								<FormField name="gender" class="flex flex-col gap-1">
									<label for="gender" class="form-label">Giới tính</label>
									<Select
										:options="genders"
										optionLabel="name"
										placeholder="Chọn giới tính"
										class="w-full md:w-56"
									/>
								</FormField>

								<FormField name="age" class="flex flex-col gap-1">
									<label for="age" class="form-label">Tuổi</label>
									<InputNumber inputId="minmax" :min="0" :max="200" />
								</FormField>

								<FormField name="area" class="flex flex-col gap-1">
									<label for="area" class="form-label">Địa bàn hoạt động</label>
									<MultiSelect
										:options="areas"
										optionLabel="name"
										placeholder="Chọn địa bàn hoạt động"
										class="w-full md:w-80"
									/>
								</FormField>

								<FormField name="education" class="flex flex-col gap-1">
									<label for="education" class="form-label">Học vấn</label>
									<InputText type="text" placeholder="Nhập học vấn" />
								</FormField>

								<FormField name="height" class="flex flex-col gap-1">
									<label for="height" class="form-label">Chiều cao</label>
									<InputNumber placeholder="Nhập chiều cao" />
								</FormField>

								<FormField name="weight" class="flex flex-col gap-1">
									<label for="weight" class="form-label">Cân nặng</label>
									<InputNumber placeholder="Nhập cân nặng" />
								</FormField>
							</Form>

							<div v-else class="general-info-wrapper">
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Nghệ danh</div>
									<div class="value line-clamp-3">{{ user.nickname }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Phong cách dẫn</div>
									<div class="value line-clamp-3">
										{{ user.hostingStyles.map((style) => style.name).join(", ") }}
									</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-pen-to-square"></i>
									<div class="label">Mô tả về bản thân</div>
									<div class="value line-clamp-3">{{ user.description }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Giới tính</div>
									<div class="value line-clamp-3">{{ user.gender }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Tuổi</div>
									<div class="value line-clamp-3">{{ user.age }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Khu vực hoạt động</div>
									<div class="value line-clamp-3">
										{{ user.areas.map((style) => style.name).join(", ") }}
									</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-graduation-cap"></i>
									<div class="label">Học vấn</div>
									<div class="value line-clamp-3">{{ user.education }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Chiều cao</div>
									<div class="value line-clamp-3">{{ user.height }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Cân nặng</div>
									<div class="value line-clamp-3">{{ user.weight }}</div>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel value="1">
						<div class="gallery row gx-2 gy-2">
							<div
								class="gallery-item img-parent col-6"
								v-for="galleryItem in galleryItems"
								:key="galleryItem.id"
							>
								<img :src="galleryItem.url" alt="" />
							</div>
						</div>
					</TabPanel>
					<TabPanel value="2">
						<p class="m-0">
							At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
							voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
							cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
							est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
							libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
						</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</section>
	</main>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { z } from "zod";
import { User } from "@/entities/user/user";
import { Gender } from "@/enums/gender";
import { EditingMode } from "@/enums/editingMode";

const formResolver = ref(
	zodResolver(
		z.object({
			nickname: z.string().min(1, { message: "required" }),
			gender: z.string(),
			hostingStyles: z.array(
				z.object({
					name: z.string(),
					code: z.string(),
				})
			),
			areas: z.array(
				z.object({
					name: z.string(),
					code: z.string(),
				})
			),
			age: z.number(),
			education: z.string(),
			height: z.number(),
			weight: z.number(),
		})
	)
);

const hostingStyles = ref([
	{ name: "Nhẹ nhàng", code: "nhenhang" },
	{ name: "Nhiệt huyết", code: "nhiethuyet" },
	{ name: "Nhanh", code: "nhanh" },
	{ name: "Tốc độ vừa phải", code: "tocdovuaphai" },
]);

const areas = ref([
	{ name: "Hà Nội", code: "han" },
	{ name: "TP HCM", code: "hcm" },
	{ name: "Khác", code: "other" },
]);

const genders = ref([
	{ name: "Nam", code: "male" },
	{ name: "Nữ", code: "female" },
	{ name: "Khác", code: "other" },
]);

const user = ref<User>({
	nickname: "MC Quý Công",
	hostingStyles: [hostingStyles.value[0], hostingStyles.value[1]],
	areas: [areas.value[0], areas.value[1]],
	age: 20,
	gender: Gender.Male,
	education: "Đại học",
	height: 168,
	weight: 58,
	description: "Yêu đời, yêu cái đẹp",
	avatarUrl: "https://picsum.photos/200",
});

const editingMode = ref<EditingMode>(EditingMode.None);

const formInitialValues = user;

const saveGeneralInfo = () => {
	editingMode.value = EditingMode.None;
};

const galleryItems = ref([
	{
		id: 1,
		url: getRandomImageLink(),
	},
	{
		id: 2,
		url: getRandomImageLink(),
	},
	{
		id: 3,
		url: getRandomImageLink(),
	},
	{
		id: 4,
		url: getRandomImageLink(),
	},
	{
		id: 5,
		url: getRandomImageLink(),
	},
	{
		id: 6,
		url: getRandomImageLink(),
	},
]);

function getRandomImageLink(): string {
	// Define common image sizes
	const commonWidths = [200, 300, 400, 500, 600, 700, 800];
	const commonHeights = [200, 300, 400, 500, 600, 700, 800];

	// Get random width and height from the common sizes
	const randomWidth = commonWidths[Math.floor(Math.random() * commonWidths.length)];
	const randomHeight = commonHeights[Math.floor(Math.random() * commonHeights.length)];

	// Generate the link with random sizes
	const link = `https://picsum.photos/${randomWidth}/${randomHeight}`;
	return link;
}
</script>
<style lang="scss" scoped>
.main-container {
}

section.top {
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 16px 16px 24px;
	border-bottom: 1px solid #ccc;

	.overview-info {
		display: flex;
		align-items: center;
		gap: 16px;

		.avatar {
			width: 80px;
			height: 80px;
			background-color: #dfdfdf;
		}

		.avatar-wrapper {
			position: relative;
			display: flex;
			align-items: center;
			gap: 16px;
		}
		.choose-avatar-icon {
			position: absolute;
			bottom: 7px;
			right: 0;
			font-size: 1.4rem;
		}
	}
	.buttons {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.info {
		display: flex;
		flex-direction: column;

		.name-wrapper {
			display: flex;
			align-items: center;
			gap: 12px;

			.name {
				font-size: 1.25rem;
				font-weight: 700;
				flex-shrink: 0;
			}

			.verify-identity {
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
}

.tab-content-wrapper {
	margin-top: 12px;

	.top {
		display: flex;
		justify-content: flex-end;
		gap: 16px;
		margin-bottom: 12px;
		align-items: center;
	}
}

.general-info-wrapper {
	display: flex;
	flex-direction: column;
	gap: 16px;

	.info-item {
		display: flex;
		align-items: baseline;

		.label {
			width: 10rem;
			flex-shrink: 0;
			margin-left: 10px;
		}
		.value {
			font-size: 1.1rem;
			font-weight: 600;
		}
	}
}

//anh & video
.gallery-item {
	img {
		border-radius: 4px;
	}
}
</style>
