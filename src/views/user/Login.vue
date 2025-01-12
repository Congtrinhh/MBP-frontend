<template>
	<div>
		<GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
	</div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/user/useAuth";
import { GoogleSignInButton, type CredentialResponse } from "vue3-google-signin";
import { jwtDecode } from "jwt-decode";

const { loginWithGoogle } = useAuth();

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
	const { credential } = response;
	// Decode the JWT token
	const decodedToken = jwtDecode(credential);

	// Extract user information from the decoded token
	const { email, name, picture, email_verified } = decodedToken;
	console.log("User Info:", { email, name, picture, email_verified });

	if (!email_verified) {
		console.log("Vui lòng xác thực email trước khi đăng nhập");
		return;
	}

	// 1.điều hướng đến màn tick chọn với 1 checkbox: bạn là... MC?  nếu ko tích thì mặc định
	// là người tìm MC

	// 2.bấm tiếp tục

	// 3.Call your backend API to authenticate the user
	// loginWithGoogle(credential);
	// 4.get user theo email
	// 4.1nếu chưa có thì tạo mới
	// 5.tạo jwt token và trả về cho client
};

// handle an error event
const handleLoginError = () => {
	console.error("Login failed");
};
</script>
