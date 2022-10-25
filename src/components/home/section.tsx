import { Component, JSX, JSXElement } from "solid-js"
import { Motion } from '@motionone/solid'
import { spring } from "motion"

interface SectionProps {
	title: string,
	children: JSX.Element,
	className?: string,
}

export const Section: Component<SectionProps> = 
({ title, children, className }) => {
	return (
		<section class="mt-5" >
			<Motion.h2
				initial={{ opacity: 0, x: -20, }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 1, easing: spring() }}
				class="text-3xl font-bold font-['Roboto'] ml-5">{ title }</Motion.h2>
			<div class={!!className ? `text-base font-thin ${className}` : 'text-base font-thin'}>
				{children}
			</div>
		</section>
	)
}
