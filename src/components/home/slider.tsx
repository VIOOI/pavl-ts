
import { Component, createSignal, For } from 'solid-js';
import { Rerun } from '@solid-primitives/keyed'

interface SliderProps {
	images: string[]
}

export const Slider: Component<SliderProps> = ({ images }) => {
	const [ count, setCount ] = createSignal(0)

	const imgNext = () => {
		if ( count() >= images.length - 1 ) { setCount(0) } 
		else { setCount( count() + 1 ) }
	}
	const imgPrev = () => {
		if ( count() == 0 ) { setCount( images.length - 1 ) }
		else{ setCount( count() - 1) }
	}
	return (
		<> 
			<div class='relative select-none'>
				<Rerun on={count()}>
					<img 
						src={images[count()]} 
						alt="" 
						class='
							max-h-[80vh] w-full
							object-cover object-center
						' />
				</Rerun>
				<div 
					class='
					flex gap-x-2 justify-center items-center 
					bottom-2 
					w-full absolute'
					>
					<For each={images}>
						{ (img, index) => { return (
							<div 
								class='w-7 h-1 rounded-lg'
								classList={{
									'bg-white dark:bg-neutral-800': index() !== count(),
									'bg-blue-400': index() == count()
								}}
							></div>
						) } }
					</For>
				</div>
				<div class='flex justify-between items-center w-full h-[50vh] absolute top-1/2 -translate-y-1/2'>
					<div class='w-6/12 h-full flex items-center pl-10' onClick={imgPrev}>
					<svg xmlns="http://www.w3.org/2000/svg" class='fill-slate-50 dark:fill-neutral-800' width="17.151" height="30" viewBox="0 0 17.151 30">
						<path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M16.421,21.19,27.772,9.848A2.144,2.144,0,0,0,24.735,6.82L11.875,19.671a2.14,2.14,0,0,0-.063,2.956L24.727,35.568a2.144,2.144,0,0,0,3.037-3.028Z" transform="translate(-11.251 -6.194)"/>
					</svg>
				</div>
					<div class='w-6/12 h-full flex justify-end items-center pr-10' onClick={imgNext}>
					<svg xmlns="http://www.w3.org/2000/svg" class='fill-slate-50 dark:fill-neutral-800' width="17.151" height="30" viewBox="0 0 17.151 30">
						<path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M16.421,21.19,27.772,9.848A2.144,2.144,0,0,0,24.735,6.82L11.875,19.671a2.14,2.14,0,0,0-.063,2.956L24.727,35.568a2.144,2.144,0,0,0,3.037-3.028Z" transform="translate(28.402 36.194) rotate(180)"/>
					</svg>
				</div>
				</div>
			</div>
		</>
	)
}
					// <For each={imgArr}>
					// 	{ (img, index) => { return (
					// 		<div class='bg-blue-100 w-7 h-1 rounded-lg'></div>
					// 	) } }
					// </For>
