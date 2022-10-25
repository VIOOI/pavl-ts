import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { createEffect, createEvent, createStore, restore, sample, Store } from "effector";
import { EventClass } from "./classes/eventClass";
import { events, initializeEvents } from './types'

export const getAllEvents = createEvent()

const getAllEventsFx = createEffect<void, events[], AxiosError>(async () => {
	const options: AxiosRequestConfig = {
		method: 'GET',
		url: 'http://localhost:8000/api/events',
	};
	const req: AxiosPromise<events[]> = axios(options)
	return (await req).data.sort(( a, b ) => {
			return new Date(b.create_date).getTime() - new Date(a.create_date).getTime()
	})
})

export const $eventsStore = createStore<events[]>([ initializeEvents ])
	.on( getAllEventsFx.done, ( _, data ) => data.result )

export const $eventsClassStore: Store<EventClass[]> = $eventsStore.map( state => {
	let evClass: EventClass[] = [];
	state.forEach( event => {
		evClass.push( new EventClass( event ) )
	} )
	return evClass
} )

// $eventsStore.watch( (state) => { console.log('state: ', state) })


sample({ source: getAllEvents, target: getAllEventsFx })
