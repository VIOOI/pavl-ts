import { Images, TRole, User } from "../types";

type SvgInHtml = HTMLElement & SVGElement;

abstract class ImageClass {
	protected isLiked: boolean = false

	constructor(
		public id: string,
		public title: string,
		public description: string,
		public url: string,
		readonly create_date: Date,
		readonly upgrade_date: Date,
		public role: TRole,
		public like: number,
		readonly usersUser_id: string,
		public users: User,
		readonly eventsEvent_id?: string,
	){}
		
	public get formatDate() {
		const create_date = new Date(this.create_date)
		const day = create_date.getDay() < 10 ? `0${create_date.getDay()}` : `${create_date.getDay()}`
		const month = create_date.getMonth() < 10 ? `0${create_date.getMonth()}` : `${create_date.getMonth()}`

		return `${day}/${month}/${create_date.getFullYear()}`
	}

	protected toggleLike() {
		console.log('---');
		
		this.isLiked 
			? this.setAnimateLike('#fff', false)
			: this.setAnimateLike('#EF4444', true)
	}

	protected setAnimateLike(color: string, bool: boolean) {
	}
	get getIsLiked(): boolean {
		return 1 > Math.floor(Math.random() * 2)
		
	}
	

}

export class ImageOpenClass extends ImageClass {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public url: string,
		readonly create_date: Date,
		readonly upgrade_date: Date,
		public role: TRole,
		public like: number,
		readonly usersUser_id: string,
		public users: User,
		readonly eventsEvent_id?: string,
	){
		super(
			id, title, description,
			url, create_date, upgrade_date,
			role, like, usersUser_id, 
			users, eventsEvent_id
			)

		this.initImage()
	}

	public initImage() {
		const img: HTMLDivElement = document.querySelector('.image-wrap')		
		if (!!img) {
			let svg: SvgInHtml = document.querySelector('.like path')
			svg.style.stroke = this.isLiked ? '#EF4444' : '#fff'
			svg.style.fill = this.isLiked ? '#EF4444' : '#fff'
			img.addEventListener('dblclick', this.toggleLike.bind(this) )
			
		}
	}
	protected setAnimateLike(color: string, bool: boolean) {
		let svg: SvgInHtml = document.querySelector('.like path')
		let like: HTMLDivElement = document.querySelector('.like')
		like.classList.remove('like-unvisible')
		this.isLiked = bool;
		svg.style.stroke = color
		svg.style.fill = color
		setTimeout(() => {
			like.classList.add('like-unvisible')
		}, 500);
	}

}

export class ImageGalleryClass extends ImageClass {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public url: string,
		readonly create_date: Date,
		readonly upgrade_date: Date,
		public role: TRole,
		public like: number,
		readonly usersUser_id: string,
		public users: User,
		readonly eventsEvent_id?: string,
	){
		super(
			id, title, description,
			url, create_date, upgrade_date,
			role, like, usersUser_id, 
			users, eventsEvent_id
			)

		this.initImage()
	}

	private initImage() {
		const grid: HTMLDivElement = document.querySelector('.image-gallery')
		if (!!grid) {

		}
		
	}

}
