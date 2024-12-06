import { Gender } from "@/enums/Gender";

export interface User {
	// Full name - taken from Google account
	fullName: string;

	// Email - taken from Google account
	email: string;

	// Phone number - taken from Google account
	phoneNumber: string;

	// Indicates if the user is an MC
	isMC: boolean;

	// Age of the user (optional)
	age?: number;

	// Nickname
	nickname: string;

	// Credit score
	credit: number;

	// Gender of the user
	gender: Gender;

	// Indicates if the user is a newbie MC
	isNewbie: boolean;

	// Working area
	workingArea: string;

	// Indicates if the user's identity is verified
	isVerified: boolean;

	// Description of the user
	description: string;

	// Education of the user
	education: string;

	// Height of the user (optional)
	height?: number;

	// Weight of the user (optional)
	weight?: number;

	// URL of the user's avatar
	avatarUrl: string;
}
