import type { BaseEntity } from "./baseEntity";

export interface Notification extends BaseEntity {
	userId: number;
	message: string;
	isRead?: boolean;
	// type?: NotificationType;
	additionalInfo?: string;
}
