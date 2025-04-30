<!-- Base Form Component - Created by AI Assistant 30/04/2025 -->
<template>
	<Dialog
		:visible="modelValue"
		@update:visible="(value) => emit('update:modelValue', value)"
		:style="{ width: '600px' }"
		:modal="true"
		:closable="true"
		:closeOnEscape="true"
	>
		<!-- Header -->
		<template #header>
			<div class="flex items-center">
				<span class="font-semibold">{{ formTitle }}</span>
			</div>
		</template>

		<!-- Content -->
		<div class="relative">
			<!-- Loading Overlay -->
			<div v-if="isLoading" class="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
				<ProgressSpinner />
			</div>

			<!-- Form Content -->
			<Form
				v-slot="$form"
				:initialValues="formData"
				:resolver="resolver"
				:validateOnBlur="true"
				:validateOnMount="false"
				@submit="handleSubmit"
				class="p-6"
			>
				<div class="space-y-4">
					<div
						v-for="field in sortedFields"
						:key="field.key"
						v-show="!getEffectiveUIConfig(field).hidden"
						class="flex flex-col gap-1"
					>
						<label :for="field.key" class="block text-sm">
							{{ getEffectiveUIConfig(field).label }}
							<span v-if="isRequired(field)" class="text-red-600">*</span>
						</label>

						<!-- Text Input -->
						<InputText
							v-if="getEffectiveUIConfig(field).type === 'InputText'"
							:name="field.key"
							fluid
							:class="[
								'w-full',
								{ 'p-invalid': $form[field.key]?.invalid },
								{ 'opacity-50': isDisabled || getEffectiveUIConfig(field).disabled },
								{ 'bg-gray-50': mode === EditingMode.View },
							]"
							:disabled="isDisabled || getEffectiveUIConfig(field).disabled || mode === EditingMode.View"
						/>

						<!-- Dropdown -->
						<Dropdown
							v-else-if="getEffectiveUIConfig(field).type === 'Dropdown'"
							:name="field.key"
							fluid
							v-bind="getEffectiveUIConfig(field).props || {}"
							:class="[
								'w-full',
								{ 'p-invalid': $form[field.key]?.invalid },
								{ 'opacity-50': isDisabled || getEffectiveUIConfig(field).disabled },
								{ 'bg-gray-50': mode === EditingMode.View },
							]"
							:disabled="isDisabled || getEffectiveUIConfig(field).disabled || mode === EditingMode.View"
						/>

						<!-- Checkbox -->
						<Checkbox
							v-else-if="getEffectiveUIConfig(field).type === 'Checkbox'"
							:name="field.key"
							:binary="true"
							:class="[
								{ 'p-invalid': $form[field.key]?.invalid },
								{ 'opacity-50': isDisabled || getEffectiveUIConfig(field).disabled },
							]"
							:disabled="isDisabled || getEffectiveUIConfig(field).disabled || mode === EditingMode.View"
						/>

						<!-- Textarea -->
						<Textarea
							v-else-if="getEffectiveUIConfig(field).type === 'Textarea'"
							:name="field.key"
							fluid
							v-bind="getEffectiveUIConfig(field).props || {}"
							:class="[
								'w-full',
								{ 'p-invalid': $form[field.key]?.invalid },
								{ 'opacity-50': isDisabled || getEffectiveUIConfig(field).disabled },
								{ 'bg-gray-50': mode === EditingMode.View },
							]"
							:disabled="isDisabled || getEffectiveUIConfig(field).disabled || mode === EditingMode.View"
						/>

						<Message v-if="$form[field.key]?.invalid" severity="error" size="small" variant="simple">
							{{ $form[field.key]?.error?.message }}
						</Message>
					</div>
				</div>

				<!-- Footer -->
				<div class="flex justify-end gap-2 mt-4">
					<Button
						v-if="mode === EditingMode.View"
						label="Đóng"
						severity="secondary"
						@click="handleClose"
						:disabled="isDisabled"
						type="button"
					/>
					<template v-else>
						<Button
							label="Hủy"
							severity="secondary"
							@click="handleClose"
							:disabled="isDisabled"
							type="button"
						/>
						<Button
							:label="mode === EditingMode.Add ? 'Tạo mới' : 'Cập nhật'"
							severity="primary"
							:disabled="isDisabled || !$form.valid"
							type="submit"
						/>
					</template>
				</div>
			</Form>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useToast } from "primevue/usetoast";
import type { FormConfig, FieldConfig, FieldUIConfig } from "./MBaseForm.types";
import { formUtils } from "./MBaseForm.types";
import { EditingMode } from "../../enums/editingMode";

const toast = useToast();

const props = defineProps<{
	modelValue: boolean;
	mode: EditingMode;
	config: FormConfig;
	formData: Record<string, any>;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
	"update:formData": [data: Record<string, any>];
	submitted: [data: Record<string, any>];
}>();

// State
const isLoading = ref(false);
const isDisabled = ref(false);

// Form resolver
const resolver = (formData: Record<string, any>) => {
	const schema = formUtils.createSchema(props.config.fields);
	try {
		schema.parse(formData);
		return { values: formData, errors: {} };
	} catch (error: any) {
		const errors: Record<string, any> = {};
		error.errors?.forEach((err: any) => {
			if (err.path?.[0]) {
				errors[err.path[0]] = [{ message: err.message }];
			}
		});
		return { values: formData, errors };
	}
};

// Computed
const formTitle = computed(() => {
	switch (props.mode) {
		case EditingMode.Add:
			return "Thêm mới";
		case EditingMode.Edit:
			return "Cập nhật";
		case EditingMode.View:
			return "Chi tiết";
		default:
			return "";
	}
});

const sortedFields = computed(() => {
	return [...props.config.fields].sort((a, b) => {
		const orderA = a.ui.order ?? Infinity;
		const orderB = b.ui.order ?? Infinity;
		return orderA - orderB;
	});
});

// Methods
function getEffectiveUIConfig(field: FieldConfig): FieldUIConfig {
	const modeKey = props.mode === EditingMode.View ? "view" : props.mode === EditingMode.Edit ? "edit" : "add";
	const modeOverrides = props.config.modes?.[modeKey]?.[field.key];
	return { ...field.ui, ...(modeOverrides || {}) };
}

function isRequired(field: FieldConfig): boolean {
	return !field.schema.isOptional();
}

async function handleSubmit({ valid, values }: { valid: boolean; values: Record<string, any> }) {
	if (props.mode === EditingMode.View || !valid) {
		return;
	}

	try {
		isDisabled.value = true;
		isLoading.value = true;

		if (props.mode === EditingMode.Add) {
			await props.config.api.add(values);
		} else if (props.formData?.id) {
			await props.config.api.update(props.formData.id, values);
		}

		toast.add({
			severity: "success",
			summary: "Success",
			detail: props.mode === EditingMode.Add ? "Thêm mới thành công" : "Cập nhật thành công",
			life: 3000,
		});

		emit("submitted", values);
		handleClose();
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Đã có lỗi xảy ra",
			life: 3000,
		});
	} finally {
		isDisabled.value = false;
		isLoading.value = false;
	}
}

function handleClose() {
	emit("update:modelValue", false);
}

// Watches
watch(
	() => props.modelValue,
	async (newVal) => {
		if (newVal && props.mode !== EditingMode.Add && props.formData?.id) {
			try {
				isLoading.value = true;
				const data = await props.config.api.getById(props.formData.id);
				emit("update:formData", data);
			} catch (error) {
				toast.add({
					severity: "error",
					summary: "Error",
					detail: "Lỗi kết nối!",
					life: 3000,
				});
			} finally {
				isLoading.value = false;
			}
		}
	}
);
</script>

<style scoped>
.p-dialog-content {
	max-height: calc(90vh - 120px) !important;
	overflow-y: auto;
}
</style>
