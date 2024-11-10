<script setup lang="ts">
import { withDefaults } from "vue";

interface Props {
	MC: {
		id: number;
		name: string;
		address: string;
		types: string;
		imageUrl: string;
	};
}
const props = withDefaults(defineProps<Props>(), {
	MC: () => ({
		id: 0,
		name: "Trịnh Quý Công",
		address: "Hà Nội",
		types: "Gala, Team building",
		imageUrl: "https://picsum.photos/200",
	}),
});
</script>

<template>
	<div class="m-mc-container">
		<div class="m-img-container">
			<img :src="props.MC.imageUrl" alt="" />
		</div>
		<div class="m-desc-container">
			<div class="m-labels-container"></div>
			<strong class="m-mc-name">{{ props.MC.name }}</strong>
			<div class="m-mc-address">{{ props.MC.address }}</div>
			<div class="m-mc-types">{{ props.MC.types }}</div>
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
