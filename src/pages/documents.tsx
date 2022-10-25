import { $documentClassStore, getAllDocument } from '../store/documentsStore'

import { useUnit } from 'effector-solid'
import {  For, onMount } from 'solid-js'

export const Documents = () => {
	const documentClassStore = useUnit( $documentClassStore )

	onMount( () => getAllDocument() )

	return (
		<>
			<div class='flex flex-col justify-center items-center gap-y-5 w-7/12 mx-auto pt-5'>
				<div
					class="grid font-light dark:text-slate-50 text-sm w-full text-center"
					style={{
						"grid-template-columns": "80px 1fr 100px 100px 100px"
					}}
					>
					<h3>Тип</h3>
					<h3 class='text-start pl-5'>Название и описание</h3>
					<h3>Дата</h3>
					<h3>Пользователь</h3>
				</div>

				<For each={documentClassStore()}>{ doc =>
					<div 
						class="w-full min-h-[5rem] py-3 grid justify-items-center items-center bg-slate-50 dark:bg-neutral-900 dark:text-slate-50 rounded-lg"
						style={{
							"grid-template-columns": "80px 1fr 100px 100px 100px"
						}}
						>
						<div class="w-5 h-5 bg-slate-200 flex-center dark:bg-neutral-800">
							{ doc.iconType }
						</div>
						<div class="justify-self-start">
							<h2>{ doc.title }</h2>
							<p class="font-light text-xs">{ doc.shortDecsription }</p>
						</div>
						<p class="text-center font-light text-sm">{ doc.formatDate }</p>
						<p class="text-center font-light text-sm">{ doc.users.name }</p>
						<a href={doc.url} target='blank'>
						<div class='w-12 h-12 bg-slate-200 dark:bg-neutral-900 rounded-lg flex justify-center items-center hover:bg-white dark:hover:bg-neutral-800 transition-colors duration-150'>
							<svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 25 30" class="fill-neutral-800 dark:fill-slate-200">
								<path id="Icon_ionic-md-download" data-name="Icon ionic-md-download" d="M31.75,15.086H24.609V4.5H13.891V15.086H6.75l12.5,12.352Zm-25,15.883V34.5h25V30.969Z" transform="translate(-6.75 -4.5)"/>
							</svg>
						</div>
						</a>
					</div>
				}</For>

			</div>
		</>
	)
}
