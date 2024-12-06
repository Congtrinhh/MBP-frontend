<template>
	<main class="main-container">
		<header class="center-header">Tin nhắn</header>
		<div class="main-content">
			<div class="search-container"></div>
			<div class="message-list">
				<div class="message-item">
					<div class="avatar"></div>
					<div class="info-container">
						<div class="name"></div>
						<div class="message-preview"></div>
						<div class="time-ago"></div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.main-container {
	padding: 0 12px 12px;
}
</style>
