// enums/ContractStatus.ts
export enum ContractStatus {
	InEffect = 1,
	Canceled = 2,
}

export function getContractStatusText(status: ContractStatus): string {
	switch (status) {
		case ContractStatus.InEffect:
			return "Có hiệu lực";
		case ContractStatus.Canceled:
			return "Bị hủy";
		default:
			return "";
	}
}
