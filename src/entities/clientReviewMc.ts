import type { BaseEntity } from "./baseEntity";

export interface ClientReviewMc extends BaseEntity {
	clientId?: number;
	mcId?: number;
	contractId?: number;
	proPoint: number;
	attitudePoint: number;
	shortDescription?: string;
	detailDescription: string;
	isActive?: boolean;
	overallPoint: number;
	reliablePoint: number;
}
