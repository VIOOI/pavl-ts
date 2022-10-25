import { Component, createSignal, onMount, Show } from "solid-js";
import { Link, Outlet } from '@solidjs/router'
import { MenuItem } from "./menuItem";
import { Footer } from "../footer";
import { $userStore, authRequest, clearUser, refreshUser } from '../../store/userStore'
import { useUnit } from "effector-solid";

export const Layout: Component = () => {
	const [ isDark, setIsDark ] = createSignal(false)
	const [ winWidth, setWinWidth ] = createSignal(window.innerWidth)
	const userStore = useUnit($userStore)

	onMount(() => {
		setIsDark( document.body.classList.contains('dark') )
		window.addEventListener('resize', () => {
			setWinWidth(window.innerWidth)
		})
		// authRequest({email: 'laitvladimir@yandex.ru', password: '0987654eE321'})
	})

	const toggleTheme = () => {
		document.body.classList.toggle('dark')
		setIsDark(!isDark())
	}

	return (
		<div class="font-['Roboto']">
			<Show when={winWidth() <= 700} fallback={ () => { return (
				<header class="w-screen h-14 dark:bg-neutral-800 bg-slate-50 flex justify-around items-center">
					<div class="font-['Roboto'] dark:text-slate-50 text-xl font-bold uppercase">Летопись</div>
					<menu>
							<ul class="flex h-14 w-[30vw] min-w-[400px]">
								<MenuItem title={'Главная'} url={'/'} />
								<MenuItem title={'Документы'} url={'/documents'} />
								<MenuItem title={'Галлерея'} url={'/gallery'} />
								<MenuItem title={'Мероприятия'} url={'/events'} />
							</ul>
					</menu>
					<div class="flex items-center gap-3">
						<div onClick={toggleTheme} class='cursor-pointer'>
							<Show when={isDark()} fallback={() => {return (
									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="24.617" viewBox="0 0 22 24.617">
										<path id="Icon_awesome-moon" data-name="Icon awesome-moon" d="M14.222,24.617a12.285,12.285,0,0,0,9.561-4.558.577.577,0,0,0-.556-.93A9.642,9.642,0,0,1,16.651,1.275.577.577,0,0,0,16.47.206a12.309,12.309,0,1,0-2.249,24.411Z" transform="translate(-1.913)" fill="#262626"/>
									</svg>
								)}}>
								<svg id="Icon_feather-sun" data-name="Icon feather-sun" xmlns="http://www.w3.org/2000/svg" width="23" height="36" viewBox="0 0 36 36">
									<path id="Контур_1" data-name="Контур 1" d="M25.5,18A7.5,7.5,0,1,1,18,10.5,7.5,7.5,0,0,1,25.5,18Z" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
									<path id="Контур_2" data-name="Контур 2" d="M18,1.5v3" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
									<path id="Контур_3" data-name="Контур 3" d="M18,31.5v3" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
									<path id="Контур_4" data-name="Контур 4" d="M6.33,6.33,8.46,8.46" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
									<path id="Контур_5" data-name="Контур 5" d="M27.54,27.54l2.13,2.13" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
									<path id="Контур_6" data-name="Контур 6" d="M1.5,18h3" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
									<path id="Контур_7" data-name="Контур 7" d="M31.5,18h3" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
									<path id="Контур_8" data-name="Контур 8" d="M6.33,29.67l2.13-2.13" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
									<path id="Контур_9" data-name="Контур 9" d="M27.54,8.46l2.13-2.13" fill="none" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
								</svg>
							</Show>
						</div>
							<Show 
								when={userStore().user.name !== ''}
								fallback={ () => { return (
								<Link href='/login'>
									<div 
										class='py-1 px-3 rounded-md bg-slate-200 dark:bg-neutral-900 dark:text-slate-50 cursor-pointer'
									> Войти </div>
								</Link>
								) } }
								>
								<>
									<p 
										class='px-2 py-1 rounded-md bg-slate-200'
										onClick={ () => { clearUser() }}
										classList={{
											'bg-red-400 text-white font-extrabold': userStore().user.role == 'ADMIN'
										}}
									>{ userStore().user.name }</p>
									<p 
										class='px-2 py-1 rounded-md bg-slate-200'
										onClick={ () => { refreshUser(userStore().tokens) }}
									>refresh</p>
								</>
							</Show>
					</div>
				</header>
			) } }>  
				<header class="w-screen h-14 dark:bg-neutral-800 bg-slate-50 flex justify-around items-center">
						<h2>Mobile menu</h2>
					</header>
				</Show>
				<main class="min-h-screen dark:bg-neutral-900">
					<Outlet />
				</main>
			<Footer />
		</div>
	)
}

