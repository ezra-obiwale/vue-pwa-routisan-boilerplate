import Route from 'vue-routisan';
import {guest, auth, track_page} from './middlewares';

Route.setViewResolver(component => require('../views/' + component).default);

Route.view('/', 'home');

// public routes
Route.group({beforeEnter: [guest, track_page]}, () => {
  Route.view('/login', 'login');
});

// protected routess
Route.group({beforeEnter: [auth, track_page]}, () => {
  Route.view('/protected', 'admin');
});

export default Route.all();
