export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	birdth_date: Date;
	role: string;
}
const initializeUser: User = {
	id: "",
	name: "",
	email: "",
	password: "",
	first_name: "",
	last_name: "",
	birdth_date: new Date(),
	role: "USER",
}

export type TRole = 'HOME' | 'GALLERY' | 'EVENT'

export interface Images {
	id: string;
	title: string;
	description: string;
	url: string;
	create_date: Date;
	upgrade_date: Date;
	role: TRole;
	like: number;
	eventsEvent_id?: string;
	usersUser_id: string;
	users: User;
}

export interface YouLiked {
	likedUsers_id: string;
	image_id: string;
}

export interface getImagesReq {
	images: Images[];
	youLiked?: YouLiked[];
}

export interface Document {
	id: string;
	title: string;
	description: string;
	url: string;
	create_date: Date;
	upgrade_date: Date;
	type: 'WORD' | 'EXEL' | 'POWERPOINT' | 'OTHER';
	usersUser_id: string;
	users: User;
}

export interface Tokens {
	acsses: string;
	refresh: string;
}

export interface UserAuth {
	tokens: Tokens;
	user: User;
}

export interface events {
	id: string;
	title: string;
	description: string;
	purpose: string;
	participants: string;
	create_date: Date;
	upgrade_date: Date;
	usersUser_id: string;
	images: Images[];
	users: User;
}

export const initializeImage: Images = {
	id: "",
	title: "",
	description: "",
	url: "",
	create_date: new Date(),
	upgrade_date: new Date(),
	role: "HOME",
	like: 0,
	eventsEvent_id: "",
	usersUser_id: "",
	users: initializeUser
}

export const initializeEvents = {
	id: "",
	title: "",
	description: "",
	purpose: "",
	participants: "",
	create_date: new Date(),
	upgrade_date: new Date(),
	usersUser_id: "",
	images: [ initializeImage, ],
	users: initializeUser,
}

export const initializeYouLiked: YouLiked = {
	likedUsers_id: "",
	image_id: "",
}
export const initializeUserAuth: UserAuth = {
		tokens: {
			acsses: "",
			refresh: "",
		},
		user: initializeUser
}
export const initializeDocument: Document =  {
	id: "",
	title: "",
	description: "",
	url: "",
	create_date: new Date(),
	upgrade_date: new Date(),
	type: 'OTHER',
	usersUser_id: "",
	users: initializeUser
}

