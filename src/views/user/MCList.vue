<template>
	<main class="main-container">
		<header class="header">
			<div class="logo">MBP</div>
			<div class="filter-button" @click="showFilterDialog">Lọc</div>
		</header>

		<div class="row gy-3">
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
			<div class="col-6">
				<MMCItem></MMCItem>
			</div>
		</div>

		<Dialog v-model:visible="isVisibleFilterDialog" modal header="Tìm kiếm MC" :style="{ width: '96vw' }">
			<Form :resolver @submit="onFormSubmit" :initialValues class="flex flex-col gap-4 w-full sm:w-56">
				<FormField v-slot="$field" name="hostingStyle" class="flex flex-col gap-1">
					<label for="hostingStyle">Lối dẫn</label>
					<MultiSelect
						:options="hostingStyles"
						optionLabel="name"
						placeholder="Chọn lối dẫn"
						class="w-full md:w-80"
					/>
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>

				<FormField v-slot="$field" name="area" class="flex flex-col gap-1">
					<label for="area">Khu vực hoạt động</label>
					<MultiSelect
						:options="areas"
						optionLabel="name"
						placeholder="Chọn khu vực"
						class="w-full md:w-80"
					/>
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>

				<FormField v-slot="$field" name="gender" class="flex flex-col gap-1">
					<label for="gender">Giới tính</label>
					<Select :options="genders" optionLabel="name" placeholder="Chọn giới tính" class="w-full md:w-56" />
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>

				<FormField v-slot="$field" name="ageRange" class="flex flex-col gap-1">
					<label for="ageRange">Độ tuổi</label>
					<Select :options="ageRanges" optionLabel="name" placeholder="Chọn độ tuổi" class="w-full md:w-56" />
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>

				<FormField v-slot="$field" name="ageRange" class="flex gap-1">
					<Checkbox name="isNewbieOnly" binary />
					<label for="isNewbieOnly">Chỉ tìm MC mới vào nghề</label>
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error?.message
					}}</Message>
				</FormField>

				<div class="flex justify-end gap-2">
					<Button
						type="button"
						label="Hủy"
						severity="secondary"
						@click="isVisibleFilterDialog = false"
					></Button>
					<Button type="submit" severity="primary" label="Lọc" />
				</div>
			</Form>
		</Dialog>
	</main>
</template>

<script setup lang="ts">
import MMCItem from "@/components/MMCItem.vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { z } from "zod";

const isVisibleFilterDialog = ref(false);
const showFilterDialog = () => {
	isVisibleFilterDialog.value = true;
};

//#region Form
const toast = useToast();

const resolver = zodResolver(
	z.object({
		hostingStyle: z.any(),
		area: z.any(),
		gender: z.any(),
		ageRange: z.any(),
		isNewbieOnly: z.boolean(),
	})
);

const onFormSubmit = (formInfo) => {
	const { valid } = formInfo;
	if (valid) {
		toast.add({ severity: "success", summary: "Form is submitted.", life: 3000 });
		console.log("Form is submitted.", formInfo);
		isVisibleFilterDialog.value = false;
	}
};

const genders = ref([
	{ name: "Nam", code: "male" },
	{ name: "Nữ", code: "female" },
	{ name: "Khác", code: "other" },
]);

const areas = ref([
	{ name: "Hà Nội", code: "han" },
	{ name: "TP HCM", code: "hcm" },
	{ name: "Khác", code: "other" },
]);

const ageRanges = ref([
	{ name: "18-25", code: "18-25" },
	{ name: "25-30", code: "25-30" },
	{ name: "30-40", code: "30-40" },
	{ name: "> 40", code: "40-80" },
]);
const hostingStyles = ref([
	{ name: "Nhẹ nhàng", code: "nhenhang" },
	{ name: "Nhiệt huyết", code: "nhiethuyet" },
	{ name: "Nhanh", code: "nhanh" },
	{ name: "Tốc độ vừa phải", code: "tocdovuaphai" },
]);

const initialValues = ref({
	gender: genders.value[0],
	isNewbieOnly: false,
});
//#endregion
</script>
<style lang="scss" scoped>
.main-container {
	padding: 0 12px 12px;
	margin-bottom: 60px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 72px;
	padding: 0 4px;

	.logo {
		font-size: 1.1rem;
		font-weight: bold;
	}

	.filter-button {
		text-decoration: underline;
		cursor: pointer;
	}
}
</style>
