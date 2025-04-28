export interface BaseEntity {
	id: number;
	[key: string]: any;
}

export interface ColumnDef {
	field: string;
	header: string;
	sortable?: boolean;
	searchable?: boolean;
	template?: string;
	width?: string;
}

export interface ActionConfig {
	type: "view" | "edit" | "delete" | "custom";
	icon: string;
	tooltip?: string;
	permission?: string;
	handler?: (row: BaseEntity) => void;
	confirmMessage?: string;
}

export interface ListParams {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: "asc" | "desc";
	search?: string;
	searchFields?: string[];
}

export interface ListResponse<T extends BaseEntity> {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}
