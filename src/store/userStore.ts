import axios from "axios";
import { createEffect, createEvent, createStore, restore, sample } from "effector";
import { initializeUserAuth, Tokens, UserAuth } from "./types";

// --> <- --> <- --> <- --> <-Event
export const authRequest = createEvent<{email: string, password: string}>()
export const clearUser = createEvent()
export const refreshUser = createEvent<Tokens>()

// --> <- --> <- --> <- --> <-Effect
const loadingUserFx = createEffect
	<{email: string, password: string}, UserAuth>
	( async (props) => {
		const options = {
			method: 'POST',
			url: 'http://localhost:8000/api/users/login',
			data: { email: props.email, password: props.password }
		};
		const req = await axios(options)
		return req.data as UserAuth
	})
const refreshUserFx = createEffect<Tokens, UserAuth>( async (props: Tokens) => {
	// console.log( document.cookie )
	const options = {
		method: 'POST',
		url: 'http://localhost:8000/api/users/refresh',
		headers: {
			Authorization: `Bearer ${props.acsses}`
		},
		data: { refresh: props.refresh }
	};
		const req = await axios(options)
		return req.data as UserAuth

} )

// --> <- --> <- --> <- --> <-Store
export const $userStore = createStore<UserAuth>(initializeUserAuth)
	.on( loadingUserFx.done, ( _, data ) => data.result )
	.on( refreshUserFx.done, ( _, data ) => data.result )
	.reset( clearUser )


export const $userError = createStore<string>('')
	.on( loadingUserFx.fail, ( _, data ) => data.error.response.data.message )

// $userStore.watch( (state) => { console.log('state: ', state) })
// $userError.watch( (state) => { console.log('state: ', state) })

// authRequest.watch( (event) => { console.log( event ) } )

// loadingUserFx.fail.watch( (event) => { console.log( event.error.response.data ) } )


sample({ source: authRequest, target: loadingUserFx})
sample({ source: refreshUser, target: refreshUserFx})
