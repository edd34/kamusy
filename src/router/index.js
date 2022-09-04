import Vue from 'vue'
import VueRouter from 'vue-router'
import Translation from '../views/Translation.vue'
import AddTranslation from '../views/AddTranslation.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import Logout from '../views/Logout.vue'
import About from '../views/About.vue'
import MixedWord from '../../src/addons/word_search/App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Translation',
    component: Translation,
  },
  {
    path: '/add-translation',
    name: 'AddTranslation',
    component: AddTranslation,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/word-search-yt',
    name: 'WordSearch',
    component: MixedWord,
  },
  {
    path: '/word-search-mg',
    name: 'WordSearch',
    component: MixedWord,
  },
]

const router = new VueRouter({
  routes,
})

export default router
