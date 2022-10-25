// /* @refresh reload */
import 'windi.css';
import './style.css'
import { render } from "solid-js/web";
import { Router, Routes, Route } from '@solidjs/router'

import { Layout } from './components/layout'
import { Home } from "./pages/home";
import { Gallery } from "./pages/gallery";
import { Image } from "./pages/image";
import { Documents } from "./pages/documents";
import { LogIn } from "./pages/logIn";
import { Events } from './pages/events';

render(
  () => (
		<Router>
			<Routes>
				<Route path={'/'} component={ Layout } >

					<Route path="/" component={ Home } />

					<Route path="/gallery" component={ Gallery } />
					<Route path="/gallery/:id" component={ Image } />

					<Route path="/documents" component={ Documents } />
					<Route path="/events" component={ Events } />

					<Route path="/login" component={ LogIn } />
				</Route>
			</Routes>
		</Router>
  ),
  document.getElementById("root") as HTMLElement
);
