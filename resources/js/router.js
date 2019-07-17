import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from './vuex/store'
// --------------------------------------------------------------------------
import App from './AppComponent'
// auth
import Login from './components/auth/LoginComponent'
import Register from './components/auth/RegisterComponent'

// user
import UserLayout from './components/user/layout/UserLayoutComponent'
import Home from './components/user/HomeComponent'
import Bus from './components/user/ticket/BusComponent'

// admin
import AdminLayout from './components/admin/layout/AdminLayoutComponent'
import AdminHome from './components/admin/HomeComponent'


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/',
            component: App,
            children: [
                {
                    path: '/',
                    redirect: '/',
                    component: UserLayout,
                    children: [
                        {
                            path: '/',
                            name: 'Home',
                            component: Home,
                        },
                        {
                            path: '/register',
                            name: 'Register',
                            component: Register,                            
                        },
                        {
                            path: '/login',
                            name: 'Login',
                            component: Login,
                        },
                        {
                            path: '/ticket/bus',
                            name: 'Bus',
                            component: Bus,
                            meta: { middlewareAuth: true },
                        }
                    ]
                },
                {
                    path: '/admin',
                    redirect: '/admin',
                    component: AdminLayout,
                    meta: { middlewareAuth: true, middlewareRole: true },
                    children: [
                        {
                            path: '/admin',
                            name: 'AdminHome',
                            component: AdminHome,
                            meta: { middlewareAuth: true, middlewareRole: true },
                        }
                    ]
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.middlewareAuth)) {                
        if (store.getters.token == '') {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            if (to.matched.some(record => record.meta.middlewareRole)) {
                
                if( store.getters.profileUser.id != 1) {
                    next({
                        path: '/',
                    });
                } else {
                    next();
                }
            }
        } 
    }

    next();
})

export default router