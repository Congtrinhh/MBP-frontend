import type { BaseEntity } from "./baseEntity";

export interface Contract extends BaseEntity {
	mcId: number;
	clientId: number;
	eventStart: string;
	eventEnd: string;
	description: string;
	place: string;
	mcCancelDate?: string | null;
	mcCancelReason?: string | null;
	clientCancelDate?: string | null;
	clientCancelReason?: string | null;
	isActive?: boolean;
}
