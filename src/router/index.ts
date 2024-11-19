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
					name: "mc-list",
					component: () => import("@/views/user/MCList.vue"),
				},
				{
					path: "mcs",
					name: "mc-list",
					component: () => import("@/views/user/MCList.vue"),
				},
				{
					path: "posts",
					name: "post-list",
					component: () => import("@/views/user/PostList.vue"),
				},
				{
					path: "messages",
					name: "message-list",
					component: () => import("@/views/user/MessageList.vue"),
				},
				{
					path: "notifications",
					name: "notification-list",
					component: () => import("@/views/user/NotificationList.vue"),
				},
				{
					path: "setting",
					name: "setting",
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
