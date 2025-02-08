<template>
	<div class="image-viewer" v-if="visible">
		<div
			class="swiper-container"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
		>
			<div class="swiper-wrapper" :style="{ transform: `translateY(${translateY}px)` }">
				<div v-for="(image, index) in images" :key="image.id" class="swiper-slide">
					<img :src="image.url" alt="" />
				</div>
			</div>
		</div>
		<button class="close-button" @click="close">
			<i class="pi pi-times"></i>
		</button>
		<div class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Media } from "@/entities/user/media";

const props = defineProps<{
	visible: boolean;
	images: Media[];
	initialIndex: number;
}>();

const emit = defineEmits<{
	(e: "update:visible", value: boolean): void;
}>();

const currentIndex = ref(props.initialIndex);
const translateY = ref(0);
const touchStart = ref(0);
const touchMove = ref(0);

watch(
	() => props.visible,
	(newValue) => {
		if (newValue) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}
);

const close = () => {
	emit("update:visible", false);
};

const handleTouchStart = (e: TouchEvent) => {
	touchStart.value = e.touches[0].clientY;
};

const handleTouchMove = (e: TouchEvent) => {
	touchMove.value = e.touches[0].clientY;
	const diff = touchMove.value - touchStart.value;
	if (Math.abs(diff) < window.innerHeight) {
		translateY.value = diff;
	}
};

const handleTouchEnd = () => {
	const diff = touchMove.value - touchStart.value;
	const threshold = window.innerHeight * 0.2; // 20% of screen height

	if (Math.abs(diff) > threshold) {
		if (diff > 0 && currentIndex.value > 0) {
			// Swipe down, show previous image
			currentIndex.value--;
		} else if (diff < 0 && currentIndex.value < props.images.length - 1) {
			// Swipe up, show next image
			currentIndex.value++;
		}
	}

	// Animate to the current image
	translateY.value = -currentIndex.value * window.innerHeight;
	touchStart.value = 0;
	touchMove.value = 0;
};
</script>

<style lang="scss" scoped>
.image-viewer {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.9);
	z-index: 1000;
}

.swiper-container {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.swiper-wrapper {
	transition: transform 0.3s ease-out;
}

.swiper-slide {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
}

.close-button {
	position: absolute;
	top: 20px;
	right: 20px;
	background: none;
	border: none;
	color: white;
	font-size: 24px;
	cursor: pointer;
	z-index: 1001;

	&:hover {
		opacity: 0.8;
	}
}

.image-counter {
	position: absolute;
	top: 20px;
	left: 20px;
	color: white;
	font-size: 16px;
	z-index: 1001;
}
</style>
