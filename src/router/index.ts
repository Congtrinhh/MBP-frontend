import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// admin routes
		{
			path: "/admin",
			name: "admin",
			component: () => import("@/views/admin/layout/AdminLayout.vue"),
			children: [],
		},
		{
			path: "/",
			name: "user",
			component: () => import("@/views/user/layout/UserLayout.vue"),
			children: [
				{
					path: "",
					name: "user-home",
					component: () => import("@/views/user/Home.vue"),
				},
				{
					path: "/login",
					name: "user-login",
					component: () => import("@/views/user/Login.vue"),
				},
			],
		},
		{
			path: "/:catchAll(.*)",
			redirect: "/",
		},
	],
});

export default router;
