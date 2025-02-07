<template>
	<main class="main-container">
		<header class="center-header">Đánh giá</header>
		<div class="review-form">
			<Form :resolver="reviewFormResolver" @submit="onSubmit">
				<div class="form-body flex flex-column gap-4">
					<FormField v-slot="$field" name="overallPoint" class="flex flex-col gap-1">
						<label for="overallPoint" class="form-label">Đánh giá</label>
						<Rating name="overallPoint" v-model="review.overallPoint" />
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
					<FormField v-slot="$field" name="shortDescription" class="flex flex-col gap-1">
						<label for="shortDescription" class="form-label">Mô tả ngắn</label>
						<InputText name="shortDescription" v-model="review.shortDescription" />
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
					<FormField v-slot="$field" name="proPoint" class="flex flex-col gap-1 mt-3">
						<label for="proPoint" class="form-label">Điểm chuyên nghiệp</label>
						<Rating name="proPoint" v-model="review.proPoint" />
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
					<FormField v-slot="$field" name="attitudePoint" class="flex flex-col gap-1">
						<label for="attitudePoint" class="form-label">Điểm thái độ</label>
						<Rating name="attitudePoint" v-model="review.attitudePoint" />
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
					<FormField v-slot="$field" name="reliablePoint" class="flex flex-col gap-1">
						<label for="reliablePoint" class="form-label">Điểm tin cậy</label>
						<Rating name="reliablePoint" v-model="review.reliablePoint" />
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
					<FormField v-slot="$field" name="detailDescription" class="flex flex-col gap-1">
						<label for="detailDescription" class="form-label">Mô tả chi tiết</label>
						<TextArea name="detailDescription" v-model="review.detailDescription" />
						<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
							$field.error?.message
						}}</Message>
					</FormField>
					<Button label="Gửi" class="save-button" type="submit" />
				</div>
			</Form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { contractApi } from "@/apis/contractApi";
import { clientReviewMcApi } from "@/apis/clientReviewMcApi";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import type { ClientReviewMc } from "@/entities/clientReviewMc";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const toast = useToast();

//#region State
const route = useRoute();
const contractId = route.params.contractId;
const review = reactive({
	overallPoint: 5,
	proPoint: 5,
	attitudePoint: 5,
	reliablePoint: 5,
	shortDescription: "",
	detailDescription: "",
});
//#endregion

//#region Form Resolver
const reviewFormResolver = zodResolver(
	z.object({
		overallPoint: z.nullable(z.number().gte(1).lte(5)),
		proPoint: z.nullable(z.number().gte(1).lte(5)),
		attitudePoint: z.nullable(z.number().gte(1).lte(5)),
		reliablePoint: z.nullable(z.number().gte(1).lte(5)),
		shortDescription: z.string().max(255).optional(),
		detailDescription: z.string().optional(),
	})
);
//#endregion

//#region Fetch Contract
const fetchContract = async () => {
	try {
		const contract = await contractApi.getById(contractId);
		// Use contract data if needed
	} catch (error) {
		console.error("Không thể tải hợp đồng", error);
	}
};
//#endregion

//#region On Submit
const onSubmit = async (formInfo: any) => {
	const { valid, values } = formInfo;
	if (valid) {
		try {
			const review: ClientReviewMc = {
				...values,
				contractId: contractId,
				mcId: 58,
			};
			await clientReviewMcApi.create(review);
			router.push({ name: "user-notification-list" });
			toast.add({
				severity: "success",
				summary: "Review Submitted",
				detail: "Your review has been submitted successfully",
				life: 3000,
			});
		} catch (error) {
			console.error("Không thể gửi đánh giá", error);
		}
	}
};
//#endregion

//#region On Mounted
onMounted(() => {
	fetchContract();
});
//#endregion
</script>

<style lang="scss" scoped>
.main-container {
	background-color: #fff;
	display: flex;
	flex-direction: column;
}

.review-form {
	padding: 16px;
}

.form-label {
	font-weight: bold;
}
</style>
