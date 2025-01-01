export enum Gender {
	Male = 1,
	Female = 2,
	Other = 3,
}

export function getGenderText(gender: Gender): string {
	switch (gender) {
		case Gender.Male:
			return "Nam";
		case Gender.Female:
			return "Nữ";
		case Gender.Other:
			return "Khác";
		default:
			return "";
	}
}
