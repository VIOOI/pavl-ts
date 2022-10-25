import { $eventsClassStore, getAllEvents } from '../store/eventsStore'
import { useUnit } from 'effector-solid'
import {  For, onMount } from 'solid-js'

export const Events = () => {
	const eventsStore = useUnit( $eventsClassStore )

	onMount( () => getAllEvents() )

	return (
		<>
			<div class='flex flex-col justify-center items-center gap-y-5 w-7/12 mx-auto pt-5'>
				<div
					class="grid font-light dark:text-slate-50 text-sm w-full text-center"
					style={{
						"grid-template-columns": "100px 1fr 100px 100px"
					}}
					>
					<h3>Тип</h3>
					<h3 class='text-start pl-5'>Название и описание</h3>
					<h3>Дата</h3>
					<h3>Пользователь</h3>
				</div>
				<For each={eventsStore()}>{ ( event ) =>
					<div 
						class="w-full min-h-[7rem] py-3 px-5 grid justify-items-center items-center bg-slate-50 dark:bg-neutral-900 dark:text-slate-50 rounded-lg"
						style={{
							"grid-template-columns": "200px 1fr 100px 100px"
						}}
						>
						<a href={`events/${event.id}`}>
						<img 
							src={event.prewiewImage.url} 
							class='h-full object-cover rounded-5px' 
							alt={event.prewiewImage.title} 
						/>
						</a>
						<div class="justify-self-start pl-5">
							<h2><a href={`events/${event.id}`}>{ event.title }</a></h2>
							<p class="font-light text-xs">{ event.shortDecsription }</p>
						</div>
						<p class="text-center font-light text-sm" innerHTML={event.formatDate}></p>
						<p class="text-center font-light text-sm">{ event.users.name }</p>
					</div>
				}</For>


			</div>
		</>
	)
}
						// <p class="text-center font-light text-sm">{ event.formatDate }</p>
