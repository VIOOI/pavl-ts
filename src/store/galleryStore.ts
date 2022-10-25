
import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { createStore, createEvent, createEffect, sample } from 'effector'
import { ImageGalleryClass, ImageOpenClass } from './classes/imageClass'
import { Images, initializeImage, initializeYouLiked, YouLiked } from './types'

export const getAllImages = createEvent()
export const getMyLikedImages = createEvent()
export const getImage = createEvent<string>('')


type AxiosReponseGetImages = { images: Images[] }
const getImagesArrayFx = createEffect<void, ImageGalleryClass[], AxiosError>(async () => {
	const req: AxiosResponse<AxiosReponseGetImages, AxiosError> = await axios.get( `http://localhost:8000/api/images` )
		const reqClass = req.data.images.map( img => {
				const { id, title, description, url, create_date, upgrade_date, role,like, eventsEvent_id, usersUser_id, users } = img;
		 return new ImageGalleryClass( id, title, description, url, create_date, upgrade_date, role, like, usersUser_id, users, eventsEvent_id )
	} )
	return reqClass
})

type getImageParams = { id: string };
const getImageFx = createEffect<getImageParams, ImageOpenClass, AxiosError>( async (params) => {	
	const res: AxiosResponse<Images, AxiosError> = await axios.get(`http://localhost:8000/api/images/${ params }`)
	
	const { id, title, description, url, create_date, upgrade_date, role,like, eventsEvent_id, usersUser_id, users } = res.data

	return new ImageOpenClass( id, title, description, url, create_date, upgrade_date, role, like, usersUser_id, users, eventsEvent_id )
} )
// getImageFx.watch((params) => console.log(params))

// const getMyLikedImagesFx = createEffect<void, YouLiked[], AxiosError>( async () => {
// 	const req = await axios.get( `http://localhost:8000/api/images` )
//   return req.data.youLiked
// } )



export const $imagesStore = createStore<ImageGalleryClass[]>([ ])
	.on(getImagesArrayFx.done, ( _, data ) => data.result)

const { id, title, description, url, create_date, upgrade_date, role,like, eventsEvent_id, usersUser_id, users } = initializeImage
export const $imgStore = createStore<ImageOpenClass>(new ImageOpenClass(id, title, description, url, create_date, upgrade_date, role,like, usersUser_id, users, eventsEvent_id))
	.on(getImageFx.done, (_, data) => data.result)


// $imgStore.watch((store) => console.log(store))

// export const $myLikeImageStore = createStore<YouLiked[]>([ initializeYouLiked, ])
	
// sample({ source: await getImageFx(), target: $imagesStore, clock: getAllImages })
sample({ source: getAllImages, target: getImagesArrayFx })
// sample({ clock: getImage, source: getImage, target: getImageFx})
// sample({ source: await getMyLikedImagesFx(), target: $myLikeImageStore, clock: getMyLikedImages }) // Когда сделаю проверку авторизации

