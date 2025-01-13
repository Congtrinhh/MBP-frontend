<template>
	<div>
		<GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
	</div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/user/useAuth";
import { GoogleSignInButton, type CredentialResponse } from "vue3-google-signin";
import { jwtDecode } from "jwt-decode";
import { authApi } from "@/apis/authApi";
import { useAuthStore } from "@/stores/authStore";
import * as signalR from "@microsoft/signalr";

const authStore = useAuthStore();

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
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
	const createUserResponse = await authApi.loginWithGoogle(credential, false, false);

	if (createUserResponse.data.isNewUser === true) {
		setTimeout(async () => {
			const isMc = true;
			const createUserAgainResponse = await authApi.loginWithGoogle(credential, true, isMc);
			console.log("createUserAgainResponse", createUserAgainResponse);
		}, 2000);
	} else {
		console.log("Đăng nhập thành công");
		const userInfo = jwtDecode(createUserResponse.data.accessToken);
		authStore.saveUser(userInfo);
		debugger;

		//signalR
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`https://localhost:7252/notificationHub?userId=${userInfo.sub}`, {
				skipNegotiation: true, // skipNegotiation as we specify WebSockets
				transport: signalR.HttpTransportType.WebSockets, // force WebSocket transport
				accessTokenFactory: () => createUserResponse.data.accessToken, // Pass the JWT token
			}) // Use the full URL of your SignalR hub
			.build();

		connection.on("ReceiveNotification", (message: string) => {
			debugger;
			console.log("ReceiveNotification", message);
			// notifications.value.push({ message });
		});

		connection.start().catch((err) => {
			debugger;
			console.error(err.toString());
		});
	}
};

// handle an error event
const handleLoginError = () => {
	console.error("Login failed");
};
</script>
