import AuthView from '../views/auth/AuthView';
import LandingPage from '../views/auth/LandingPage';
import LogIn from '../views/auth/LogIn';
import SignUp from '../views/auth/SignUp';
import MainView from '../views/MainView';


let routes = [
	{
		path: '/auth',
		component: AuthView,
		layout: 'auth',
	},
	{
		path: '/auth/signup',
		component: SignUp,
		layout: 'auth',
	},
	{
		path: '/auth/login',
		component: LogIn,
		layout: 'auth',
	},
	{
		path: '/main/home',
		component: LandingPage,
		layout: 'main',
	},
	{
		path: '/',
		component: MainView,
		layout: 'main',
	},
];
	
	
export default routes;