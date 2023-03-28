import Home from '../features/Booking/Home'
import Detail from '../features/Booking/Detail'
import Seats from '../features/Booking/Seats'
import Signin from '../features/Auth/Signin'
import Signup from '../features/Auth/Signup'
import Profile from '../features/Auth/Profile'
import User from '../features/Admin/User'
import Listfilms from '../features/Admin/Listfilms'
export const routes = [
    { path: '/', component: Home, isPrivate: 0, redirectPath: '/signin',},
    { path: '/detail/:id', component: Detail }, 
    { path: '/seats/:id', component: Seats },
    { path: '/signin', component: Signin, isAuth: true, redirectPath: '/' },
    { path: '/signup', component: Signup },
    { path: '/profile', component: Profile,},
    // { path: '/admin', component: User,  isAdmin:true, redirectPath: '/signin'},
    // { path: '/admin/films', component: Listfilms,  isAdmin:true, redirectPath: '/signin'},
    // { path: '/admin/films/addnew', component: Listfilms,  isAdmin:true, redirectPath: '/signin'},
  
]