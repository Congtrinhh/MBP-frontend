// enums/ContractStatus.ts
export enum ContractStatus {
	InEffect = 1,
	Canceled = 2,
}

export function getContractStatusText(status: ContractStatus): string {
	switch (status) {
		case ContractStatus.InEffect:
			return "In Effect";
		case ContractStatus.Canceled:
			return "Canceled";
		default:
			return "";
	}
}
