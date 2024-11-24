<template>
	<main class="main-container">
		<section class="top">
			<div class="overview-info">
				<div class="avatar-wrapper">
					<div class="avatar img-parent rounded"><img src="https://picsum.photos/200" alt="" /></div>
					<div class="choose-avatar-icon pi pi-camera"></div>
				</div>
				<div class="info">
					<div class="name-wrapper">
						<div class="name">Trinh Cong</div>
						<span class="verified">checked</span>
						<div class="verify-identity">Xác thực danh tính</div>
					</div>
					<div class="credit-point"><Badge value="2"></Badge></div>
				</div>
			</div>
			<div class="buttons">
				<Button type="button" label="Gửi offer" severity="primary"></Button>
				<Button type="button" label="Nhắn tin" severity="contrast" variant="outlined"></Button>
			</div>
		</section>
		<section class="tabs">
			<Tabs value="0">
				<TabList>
					<Tab
						value="0"
						:pt="{
							root: {
								style: 'flex-grow: 1',
							},
						}"
						>Thông tin</Tab
					>
					<Tab
						value="1"
						:pt="{
							root: {
								style: 'flex-grow: 1',
							},
						}"
						>Ảnh & video</Tab
					>
					<Tab
						value="2"
						:pt="{
							root: {
								style: 'flex-grow: 1',
							},
						}"
						>Đánh giá</Tab
					>
				</TabList>
				<TabPanels>
					<TabPanel value="0">
						<div class="tab-content-wrapper">
							<div class="top">
								<div class="text-lg font-bold">Thông tin chung</div>
								<div class="edit-button underline">Sửa</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel value="1">
						<p class="m-0">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
							aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
						</p>
					</TabPanel>
					<TabPanel value="2">
						<p class="m-0">
							At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
							voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
							cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
							est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
							libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
						</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</section>
	</main>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { z } from "zod";
</script>
<style lang="scss" scoped>
.main-container {
}

section.top {
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 16px 16px 24px;
	border-bottom: 1px solid #ccc;

	.overview-info {
		display: flex;
		align-items: center;
		gap: 16px;

		.avatar {
			width: 80px;
			height: 80px;
			background-color: #dfdfdf;
		}

		.avatar-wrapper {
			position: relative;
			display: flex;
			align-items: center;
			gap: 16px;
		}
		.choose-avatar-icon {
			position: absolute;
			bottom: 7px;
			right: 0;
			font-size: 1.4rem;
		}
	}
	.buttons {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.info {
		display: flex;
		flex-direction: column;

		.name-wrapper {
			display: flex;
			align-items: center;
			gap: 12px;

			.name {
				font-size: 1.25rem;
				font-weight: 700;
				flex-shrink: 0;
			}

			.verify-identity {
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
}

.tab-content-wrapper {
	margin-top: 12px;

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
