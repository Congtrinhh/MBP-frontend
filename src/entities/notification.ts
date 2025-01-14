import type { BaseEntity } from "./baseEntity";
import { NotificationType } from "@/enums/notificationType";

export interface Notification extends BaseEntity {
	userId: number;
	message: string;
	isRead?: boolean;
	type?: NotificationType;
	additionalInfo?: string;
}
