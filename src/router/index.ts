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
					redirect: "/mcs",
				},
				{
					path: "mcs",
					name: "user-mc-list",
					component: () => import("@/views/user/MCList.vue"),
				},
				{
					path: "mcs/:id",
					name: "uc-mc",
					component: () => import("@/views/user/MC.vue"),
				},
				{
					path: "posts",
					name: "user-post-list",
					component: () => import("@/views/user/PostList.vue"),
				},
				{
					path: "messages",
					name: "user-message-list",
					component: () => import("@/views/user/MessageList.vue"),
				},
				{
					path: "notifications",
					name: "user-notification-list",
					component: () => import("@/views/user/NotificationList.vue"),
				},
				{
					path: "setting",
					name: "user-setting",
					component: () => import("@/views/user/Setting.vue"),
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
