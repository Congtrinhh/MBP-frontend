import type { MediaType } from "@/enums/mediaType";
import type { BaseEntity } from "../baseEntity";

export interface Media extends BaseEntity {
	userId: number;
	type: MediaType;
	url: string;
	sortOrder: number;
}