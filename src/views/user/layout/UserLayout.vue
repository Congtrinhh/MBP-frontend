<template>
	<div>
		<Header />
		<main>
			<router-view />
		</main>
		<Footer />
	</div>
</template>

<script setup lang="ts">
import Header from "@/views/user/layout/Header.vue";
import Footer from "@/views/user/layout/Footer.vue";
</script>
