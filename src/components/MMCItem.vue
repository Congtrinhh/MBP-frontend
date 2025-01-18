<script setup lang="ts">
import type { McType } from "@/entities/mcType";
import type { Province } from "@/entities/province";
import type { User } from "@/entities/user/user2";
import { computed, withDefaults } from "vue";

interface Props {
	MC: User;
}
const props = withDefaults(defineProps<Props>(), {
	MC: () => ({
		id: 0,
		fullName: "",
		email: "",
		phoneNumber: "",
		isMc: false,
		age: undefined,
		nickName: "",
		credit: 0,
		gender: 0,
		isNewbie: false,
		workingArea: "",
		isVerified: false,
		description: "",
		education: "",
		height: undefined,
		weight: undefined,
		avatarUrl: "",
		facebook: "",
		zalo: "",
		medias: [],
		mcTypes: [],
		provinces: [],
	}),
});

const mcTypes = computed(() => props.MC.mcTypes.map((type: McType) => type.label).join(", "));
const provinces = computed(() => props.MC.provinces.map((province: Province) => province.name).join(", "));
</script>

<template>
	<div class="m-mc-container">
		<div class="m-img-container">
			<img :src="props.MC.avatarUrl" alt="user avatar" />
		</div>
		<div class="m-desc-container">
			<div class="m-labels-container">
				<Tag v-if="props.MC.isNewbie" value="Mới"></Tag>
				<Tag :value="props.MC.credit"></Tag>
			</div>
			<strong class="m-mc-name">{{ props.MC.nickName }}</strong>
			<div class="m-mc-address line-clamp-1">{{ provinces }}</div>
			<div class="m-mc-types line-clamp-1">{{ mcTypes }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.m-mc-container {
	border-radius: 6px;
	border: 1px solid #e2e2e2;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.m-img-container {
		// width: 180px;
		// height: 180px;
	}

	.m-desc-container {
		padding: 10px 8px;
		display: flex;
		flex-direction: column;
		gap: 4px;

		.m-mc-name {
			font-weight: bold;
		}
	}
}
</style>
