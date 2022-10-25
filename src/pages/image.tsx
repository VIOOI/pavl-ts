import { useParams } from "@solidjs/router";
import axios from "axios";
import { useUnit } from "effector-solid";
import { Accessor, Component, createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import { ImageOpenClass } from "../store/classes/imageClass";
import { $imgStore, getImage } from "../store/galleryStore";


export const Image: Component = () => {
	const params = useParams()

	// const [ imgClass, setImgClass ] = createSignal<ImageClass>(new ImageOpenClass(initializeImage))
	const imgStore: Accessor<ImageOpenClass> = useUnit( $imgStore )

	const setDarkTheme = () => {
		if ( document.body.classList.contains('dark') ) { return true }
		else {
			document.body.classList.add('dark')
			return false
		}
	}
	const isWasDark = setDarkTheme()

	onMount(() => {
		getImage(params.id)
	})
	
	onCleanup(() => {
		if ( !isWasDark ) {
			document.body.classList.remove('dark')
		}
	})
	return (
		<>
			<div class="flex flex-col w-screen justify-center items-center image-wrap"
					style={{ height: `${window.innerHeight - 56}px` }}
					>
					<div class='sm:w-full md:w-11/12 lg:w-10/12 flex-center md:rounded-2xl object-cover' >
				<img 
					src={imgStore().url} 
					class='md:rounded-2xl'
					style={{ "max-height": `${window.innerHeight - 150}px` }}
					alt={imgStore().title} 
				/>
				<div class="like absolute like-unvisible" 
					style={{ 
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" 
						width="23.002" 
						class="w-20 h-20 z-10 fill-transparent bg-transparent" 
						height="20.503" 
						viewBox="0 0 23.002 20.503"
						>
						<path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M18.058,3.444a5.342,5.342,0,0,0-7.289.531L10,4.768l-.77-.793a5.341,5.341,0,0,0-7.289-.531,5.609,5.609,0,0,0-.387,8.121l7.558,7.8a1.225,1.225,0,0,0,1.769,0l7.558-7.8a5.605,5.605,0,0,0-.383-8.121Z" transform="translate(1.502 -0.745)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
					</svg>
				</div>
					</div>
				
			</div>
			<div class="w-11/12 md:w-9/12 lg:w-7/12 mx-auto flex flex-col gap-y-16">
				<div>
					<h2 class="text-white font-extrabold text-2xl">{ imgStore().title }</h2>
					<p class="text-white font-light">{ imgStore().description }</p>
					<div class="mt-5 flex gap-x-3">
						<p class="text-white font-thin text-xs">{ imgStore().formatDate }</p>
						<p class="text-white font-thin text-xs">{imgStore().users.name}</p>
					</div>
				</div>
				<div class="relative">
					<h3 class="text-white font-extrabold text-2xl">Коментарии</h3>
					<div class="bg-red-500 rounded-lg my-10 h-28 flex flex-col justify-center items-center">
						<h2 class="text-lg text-white font-thin text-center">
						Комантарии пока что не доступны, сайт находится в разработке
						</h2>
						<p class="text-white font-thin">Спасибо за понимание</p>
					</div>
					<form action="#" class="flex gap-x-2">
						<input 
							type="text" 
							class="w-full p-2 px-5 rounded-md bg-neutral-700 
								placeholder:text-neutral-500 placeholder:font-thin placeholder:text-sm
								font-light text-neutral-100 text-md " 
							placeholder="Напишите свой комментарий"
						/>
							<button class="p-2 px-5 bg-blue-500 rounded-md font-bold text-white">Отправить</button>
					</form>
				</div>
			</div>
		</>
	)
}
