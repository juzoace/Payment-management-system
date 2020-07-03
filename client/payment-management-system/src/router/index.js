import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/employeeLogin',
    name: 'employeeLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployeeLogin.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminLogin.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/adminRegister',
    name: 'adminRegister',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminRegister.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/employeeRegister',
    name: 'employeeRegister',
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployeeRegister.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if(store.getters.isLoggedIn) {
      // Redirect to the profile page
      next('/profile')
    } else {
      next();
    }
  } else {
    next()
  }
});

export default router;
