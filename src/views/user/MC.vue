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
						<div class="name">{{ user.nickName }}</div>
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
									v-if="editingMode == EditingMode.None"
									@click="editingMode = EditingMode.Update"
									icon="pi pi-pencil"
									aria-label="Filter"
									label="Sửa"
								/>
							</div>

							<Form
								class="flex flex-col gap-4 w-full sm:w-56"
								:resolver="formResolver"
								:initialValues="formInitialValues"
								@submit="onFormSubmit"
								v-if="editingMode == EditingMode.Update"
							>
								<div class="top">
									<Button
										type="button"
										label="Gửi offer"
										severity="secondary"
										v-if="editingMode == EditingMode.Update"
										@click="cancelEditGeneralInfo"
										class=""
										width="80px"
									>
										Hủy
									</Button>
									<Button v-if="editingMode == EditingMode.Update" type="submit"> Lưu </Button>
								</div>
								<FormField name="nickName" class="flex flex-col gap-1">
									<label for="nickName" class="form-label">Nghệ danh</label>
									<InputText type="text" placeholder="Nhập nghệ danh" />
								</FormField>
								<FormField name="mcTypes" class="flex flex-col gap-1" v-slot="$field">
									<label for="mcTypes" class="form-label">Loại MC</label>
									<MultiSelect
										:options="mcTypes"
										optionLabel="label"
										placeholder="Chọn loại MC"
										class="w-full md:w-80"
									/>
									<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
										$field.error?.message
									}}</Message>
								</FormField>
								<FormField name="hostingStyles" class="flex flex-col gap-1">
									<label for="hostingStyles" class="form-label">Phong cách dẫn</label>
									<MultiSelect
										:options="hostingStyles"
										optionLabel="label"
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
										option-label="name"
										option-value="code"
										placeholder="Chọn giới tính"
										class="w-full md:w-56"
									/>
								</FormField>

								<FormField name="age" class="flex flex-col gap-1">
									<label for="age" class="form-label">Tuổi</label>
									<InputNumber inputId="minmax" :min="0" :max="200" />
								</FormField>

								<FormField name="provinces" class="flex flex-col gap-1">
									<label for="provinces" class="form-label">Địa bàn hoạt động</label>
									<MultiSelect
										:options="provinces"
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
									<div class="value line-clamp-3">{{ user.nickName }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Loại MC</div>
									<div class="value line-clamp-3">{{ mcTypesText }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Phong cách dẫn</div>
									<div class="value line-clamp-3">{{ hostingStylesText }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-pen-to-square"></i>
									<div class="label">Mô tả về bản thân</div>
									<div class="value line-clamp-3">{{ user.description }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Giới tính</div>
									<div class="value line-clamp-3">{{ getGenderText(user.gender) }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Tuổi</div>
									<div class="value line-clamp-3">{{ user.age }}</div>
								</div>
								<div class="info-item">
									<i class="icon pi pi-map-marker"></i>
									<div class="label">Khu vực hoạt động</div>
									<div class="value line-clamp-3">{{ areasText }}</div>
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
import { onMounted, ref, computed } from "vue";
import { z } from "zod";
import { User } from "@/entities/user/user";
import { Gender, getGenderDataSource, getGenderText } from "@/enums/gender";
import { EditingMode } from "@/enums/editingMode";
import { userApi } from "@/apis/userApi";
import { useRoute } from "vue-router";
import { useHostingStyleStore } from "@/stores/hostingStyleStore";
import { useProvinceStore } from "@/stores/provinceStore";
import { useMcTypeStore } from "@/stores/mcTypeStore";
import type { BaseEntity } from "@/entities/baseEntity";
import { EntityState } from "@/enums/entityState";
import { useEntity } from "@/composables/useEntity";

const toast = useToast();
const route = useRoute();
const userId = Number(route.params.id);

const user = ref<User>({});

const formResolver = ref(
	zodResolver(
		z.object({
			age: z.number().optional(),
			nickName: z.string().min(1, { message: "required" }),
			gender: z.number(),
			// isNewbie: z.boolean(),
			description: z.string().optional(),
			education: z.string().optional(),
			height: z.number().optional(),
			weight: z.number().optional(),
			// avatarUrl: z.string().url({ message: "Invalid URL" }),
			// facebook: z.string().url({ message: "Invalid URL" }).optional(),
			// zalo: z.string().optional(),
			// medias: z.array(z.any()).optional(),
			mcTypes: z.array(z.any()).min(1, { message: "Cần chọn ít nhất 1 giá trị" }),
			provinces: z.array(z.any()),
			hostingStyles: z.array(z.any()),
		})
	)
);

const hostingStyleStore = useHostingStyleStore();
const hostingStyles = hostingStyleStore.hostingStyles;

const mcTypesStore = useMcTypeStore();
const mcTypes = mcTypesStore.mcTypes;

const provinceStore = useProvinceStore();
const provinces = provinceStore.provinces;

const genders = ref(getGenderDataSource());

const hostingStylesText = computed(() => {
	return user.value.hostingStyles?.map((style) => style.label).join(", ") || "";
});

const mcTypesText = computed(() => {
	return user.value.mcTypes?.map((type) => type.label).join(", ") || "";
});

const areasText = computed(() => {
	return user.value.provinces?.map((province) => province.name).join(", ") || "";
});

const editingMode = ref<EditingMode>(EditingMode.None);

const formInitialValues = ref({
	...user.value,
});

const handleSaveGeneralInfo = async (user: User) => {
	user.id = userId;
	// Handle details' entity state
	user.mcTypes = updateEntityState(user.mcTypes, formInitialValues.value.mcTypes);
	user.hostingStyles = updateEntityState(user.hostingStyles, formInitialValues.value.hostingStyles);
	user.provinces = updateEntityState(user.provinces, formInitialValues.value.provinces);

	// Save user logic here...
	debugger;
	const response = await userApi.update(userId, user);

	if (response) {
		editingMode.value = EditingMode.None;
	}
};

const cancelEditGeneralInfo = () => {
	editingMode.value = EditingMode.None;
};

const { updateEntityState } = useEntity();
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

onMounted(async () => {
	const userFromApi = await userApi.getById(userId);
	user.value = userFromApi;
	formInitialValues.value = {
		...userFromApi,
	};
});

const onFormSubmit = (e) => {
	// e.originalEvent: Represents the native form submit event.
	// e.valid: A boolean that indicates whether the form is valid or not.
	// e.states: Contains the current state of each form field, including validity status.
	// e.errors: An object that holds any validation errors for the invalid fields in the form.
	// e.values: An object containing the current values of all form fields.
	// e.reset: A function that resets the form to its initial state.
	if (e.valid) {
		handleSaveGeneralInfo(e.values);
		toast.add({ severity: "success", summary: "Form is submitted.", life: 3000 });
	}
};
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
