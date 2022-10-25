import { Document, User } from "../types";


export class DocumentClass {
	id: string;
	title: string;
	description: string;
	url: string;
	create_date: Date;
	upgrade_date: Date;
	type: 'WORD' | 'EXEL' | 'POWERPOINT' | 'OTHER';
	usersUser_id: string;
	users: User;

	constructor (dataDocument: Document) {
		this.id = dataDocument.id,
		this.title = dataDocument.title,
		this.description = dataDocument.description,
		this.url = dataDocument.url,
		this.create_date = dataDocument.create_date,
		this.upgrade_date = dataDocument.upgrade_date,
		this.type = dataDocument.type,
		this.usersUser_id = dataDocument.usersUser_id,
		this.users = dataDocument.users

	}

	get iconType() {
		switch (this.type) {
			case 'WORD':
				return 'W';
			case 'EXEL':
				return 'E';
			case 'POWERPOINT':
				return 'P'
			default:
				return 'O'
		}
	}

	get shortDecsription() {
		let wordArray = this.description.split(' ', 20)
		let proposal = '';
		wordArray.forEach( word => {
			proposal += ` ${word}`
		} )
		return proposal += '...'
	}

	get formatDate() {
		const create_date = new Date(this.create_date)
		const day = create_date.getDay() < 10 ? `0${create_date.getDay()}` : `${create_date.getDay()}`
		const month = create_date.getMonth() < 10 ? `0${create_date.getMonth()}` : `${create_date.getMonth()}`

		return `${day}/${month}/${create_date.getFullYear()}`
	}

}
