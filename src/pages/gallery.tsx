import { Component, createEffect, createSignal, For, on, onMount, Show } from "solid-js";
import { useUnit } from 'effector-solid'
import { $imagesStore, getAllImages } from '../store/galleryStore'
import { Images } from '../store/types'
import { Link } from "@solidjs/router";

export const Gallery: Component = () => {
	const imageStore = useUnit( $imagesStore )

	onMount( () => {
		getAllImages()
	} )

	return (
		<div class="flex flex-col justify-start items-center w-screen min-h-screen pt-5">
			<div class="image-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-10/12">
				<For each={ imageStore() }>{ image => { 
					return (
						<Link href={`/gallery/${image.id}`} >
					<div class="relative">
						<div class="w-full aspect-h-5 aspect-w-8 rounded-xl">
							<img src={image.url} alt={image.title} class='rounded-xl object-cover' />
						</div>
						<div class="flex items-center bg-hite  px-1.5 rounded-md gap-x-1 absolute bottom-1 right-1" >
									<div class="w-full h-full absolute bg-white rounded-[0.4rem] top-0 left-0"></div>
							<p 
								class="text-neutral-800 font-light z-10"
								style={{ "text-shadow": "0 4px 6px -1px rgba(0 0 0 0.1)" }}
								>{ image.like }</p>
							<Show when={image.getIsLiked}
								fallback={() => { return (
								<svg xmlns="http://www.w3.org/2000/svg" width="23.002" class="w-4 h-4 z-10 stroke-red-500 fill-red-500" height="20.503" viewBox="0 0 23.002 20.503">
									<path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M18.058,3.444a5.342,5.342,0,0,0-7.289.531L10,4.768l-.77-.793a5.341,5.341,0,0,0-7.289-.531,5.609,5.609,0,0,0-.387,8.121l7.558,7.8a1.225,1.225,0,0,0,1.769,0l7.558-7.8a5.605,5.605,0,0,0-.383-8.121Z" transform="translate(1.502 -0.745)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
								</svg>
								)}}
							>
							<svg xmlns="http://www.w3.org/2000/svg" width="23.002" class="w-4 h-4 z-10 stroke-neutral-800 bg-transparent" height="20.503" viewBox="0 0 23.002 20.503">
								<path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M18.058,3.444a5.342,5.342,0,0,0-7.289.531L10,4.768l-.77-.793a5.341,5.341,0,0,0-7.289-.531,5.609,5.609,0,0,0-.387,8.121l7.558,7.8a1.225,1.225,0,0,0,1.769,0l7.558-7.8a5.605,5.605,0,0,0-.383-8.121Z" transform="translate(1.502 -0.745)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
							</svg>
							</Show>

						</div>
					</div>
						</Link>
				)}}</For>
			</div>
		</div>
	)
}
