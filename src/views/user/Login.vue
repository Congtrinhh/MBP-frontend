<template>
	<div>
		<h1>Login</h1>
		<GoogleLogin @success="handleLoginSuccess" @error="handleLoginError" />
	</div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/user/useAuth";
import { GoogleLogin } from "vue3-google-login";

const { loginWithGoogle } = useAuth();

const handleLoginSuccess = (googleUser: any) => {
	loginWithGoogle(googleUser);
};

const handleLoginError = (error: any) => {
	console.error("Google login error: ", error);
};
</script>
