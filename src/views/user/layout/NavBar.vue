<template>
	<div class="navbar" id="navbar">
		<template v-for="item in items" :key="item.name">
			<router-link
				v-if="item.shouldShow()"
				class="nav-item"
				@click="handleTabClick(item)"
				:class="{ active: item.route === currentRoute.path }"
				:to="item.route"
			>
				<i :class="item.icon"></i>
				<div v-if="item.label" class="label">{{ item.label }}</div>
			</router-link></template
		>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const items = ref([
	{ name: "posts", route: "/posts", label: "", icon: "pi pi-home", shouldShow: () => true },
	{ name: "messages", route: "/messages", label: "", icon: "pi pi-comment", shouldShow: () => authStore.user!! },
	{ name: "mcs", route: "/mcs", label: "MC", shouldShow: () => true },
	{
		name: "notifications",
		route: "/notifications",
		label: "",
		icon: "pi pi-bell",
		shouldShow: () => authStore.user!!,
	},
	{ name: "setting", route: "/setting", label: "", icon: "pi pi-bars", shouldShow: () => true },
]);

const currentRoute = ref(route);

watch(route, (newRoute) => {
	currentRoute.value = newRoute;
});

const handleTabClick = (item) => {
	items.value.forEach((i) => (i.active = false));
	item.active = true;
	router.push(item.route);
};
</script>

<style scoped lang="scss">
.navbar {
	display: flex;
	justify-content: space-between;
	padding: 12px 24px;
	border-top: 1px solid #c1c1c1;
	gap: 8px;
	bottom: 0;
	left: 0;
	right: 0;
	position: fixed;
	height: 60px;
	background: #fff;
	.nav-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		i.pi {
			font-size: 1.5rem;
			color: #000;
		}

		.label {
			font-weight: bold;
			color: #000;
			font-size: 1.2rem;
		}
	}

	.nav-item.active {
		background: #000;

		i.pi {
			color: #fff;
		}

		.label {
			color: #fff;
		}
	}
}
</style>
