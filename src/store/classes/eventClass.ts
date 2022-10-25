import { User, Images, events } from "../types";

export class EventClass {
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

	constructor( dataEvent: events ) {
		this.id = dataEvent.id,
		this.title = dataEvent.title,
		this.description = dataEvent.description,
		this.purpose = dataEvent.purpose,
		this.create_date = dataEvent.create_date,
		this.upgrade_date = dataEvent.upgrade_date,
		this.usersUser_id = dataEvent.usersUser_id,
		this.images = dataEvent.images,
		this.users = dataEvent.users
	}

	get shortDecsription(): string {
		let wordArray = this.description.split(' ', 40)
		let proposal = '';
		wordArray.forEach( word => {
			proposal += ` ${word}`
		} )
		return proposal += '...'
	}

	get prewiewImage(): { url: string, title: string } {
		let index = Math.floor(Math.random() * this.images.length)
		return {
			url: this.images[index].url,
			title: this.images[index].title
		}
	}

	get formatDate(): string {
		const create_date = new Date(this.create_date)
		const day = create_date.getDay() < 10 ? `0${create_date.getDay()}` : `${create_date.getDay()}`
		const month = create_date.getMonth() < 10 ? `0${create_date.getMonth()}` : `${create_date.getMonth()}`
		const year = create_date.getFullYear()

		let data = `<time datetime="${year}-${month}-${day} ${create_date.getHours()}:${create_date.getMinutes()}">${day}/${month}/${year}</time>`

		return data
	}

}
