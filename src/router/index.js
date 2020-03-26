import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import Books from '@/views/Books.vue'
import Quotes from '@/views/Quotes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    },
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    },
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/quotes/:id',
    name: 'quotes',
    component: Quotes,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    },
    props: true,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      layout: 'auth'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
