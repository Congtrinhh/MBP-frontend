<template>
	<div>
		<!-- <Header /> -->
		<main>
			<router-view />
		</main>
		<Footer />
		<NavBar />
	</div>
</template>

<script setup lang="ts">
import Footer from "@/views/user/layout/Footer.vue";
import NavBar from "@/views/user/layout/NavBar.vue";
</script>
