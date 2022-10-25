import { useUnit } from "effector-solid";
import { $userStore, authRequest, clearUser, refreshUser } from '../store/userStore'
import { Component, createSignal } from "solid-js";

export const LogIn: Component = () => {
	const userStore = useUnit($userStore)
	const [ email, setEmail ] = createSignal('')
	const [ pass, setPass ] = createSignal('')
	return (
		<div class='w-screen h-screen flex-center gap-y-10'>
			<div class='w-6/12 h-full flex-center'>
				<form action="" class='w-4/12 flex flex-col justify-center items-center gap-y-2'>
					<input 
						type="text" 
						placeholder="Email"
						value={email()}
						class='p-1.5 px-5 border-2 border-neutral-600 rounded-lg w-full'
						onChange={ (event: any) => setEmail(event.target.value) }
					/>
					<input 
						type="text" 
						placeholder="Password"
						value={pass()}
						class='p-1.5 px-5 border-2 border-neutral-600 rounded-lg w-full'
						onChange={ (event: any) => setPass(event.target.value) }
					/>
					<p class='w-full underline font-thin text-right text-sm text-slate-400'><a href="">Забыл пароль</a></p>
					<div 
						class='p-2 rounded-lg bg-black w-full flex justify-center items-center font-extrabold text-lg text-white'
						onClick={() => { authRequest({ email: email(), password: pass() }) }}
						>
						Войти
					</div>
					<p class='w-full underline font-thin text-right text-sm text-slate-400' >
						<a href="">
							Зарегестрироватся
						</a>
					</p>
				</form>
			</div>
			<div class='w-6/12 bg-slate-200 h-full'>

			</div>
		</div>
	)
}
