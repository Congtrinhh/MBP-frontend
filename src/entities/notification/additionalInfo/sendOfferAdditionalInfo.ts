export interface SendOfferAdditionalInfo {
	eventName: string;
	eventStart: Date;
	eventEnd: Date;
	place: string;
	note: string;
	senderId?: number;
	senderAvatar?: string;
	senderName?: string;
}
