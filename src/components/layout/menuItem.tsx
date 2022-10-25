
import { Link } from "@solidjs/router";
import { Component } from "solid-js";

interface MenuItemProps {
	title: String,
	url: String,
}

export const MenuItem: Component<MenuItemProps> = ({ title, url }) => {
	return (
		<li class="font-['Roboto'] px-3 text-neutral-800 dark:text-neutral-50 font-light dark:hover:bg-neutral-900 hover:bg-blue-50 hover:font-normal h-full w-full flex justify-center items-center">
			<Link href={url.toString()} >
				{ title.toString() }
			</Link>
		</li>
	)
}

