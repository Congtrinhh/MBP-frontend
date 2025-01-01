<template>
	<div class="navbar" id="navbar">
		<router-link
			class="nav-item"
			v-for="item in items"
			:key="item.name"
			@click="handleTabClick(item)"
			:class="{ active: item.route === currentRoute.path }"
			:to="item.route"
		>
			<i :class="item.icon"></i>
			<div v-if="item.label" class="label">{{ item.label }}</div>
		</router-link>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const items = ref([
	{ name: "posts", route: "/posts", label: "", icon: "pi pi-home" },
	{ name: "messages", route: "/messages", label: "", icon: "pi pi-comment" },
	{ name: "mcs", route: "/mcs", label: "MC" },
	{ name: "notifications", route: "/notifications", label: "", icon: "pi pi-bell" },
	{ name: "setting", route: "/setting", label: "", icon: "pi pi-bars" },
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
