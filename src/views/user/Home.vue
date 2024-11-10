<template>
	<main class="main-container">
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
		</div>
	</main>
</template>

<script setup lang="ts">
import MMCItem from "@/components/MMCItem.vue";
</script>
<style lang="scss" scoped>
.main-container {
	padding: 32px 16px 16px;
}
</style>
