import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'
import firebase from 'firebase'
import { throwStatement } from 'babel-types'


Vue.config.productionTip = false

Vue.use(
  Vuelidate,
  Uimini
)
 
// Firebase Initialize
firebase.initializeApp({
  apiKey: "AIzaSyDwqcmUbMRaJNYguGBscdLnJGCE_CsDeHM",
  authDomain: "movie-lib-ecaf7.firebaseapp.com",
  databaseURL: "https://movie-lib-ecaf7.firebaseio.com",
  projectId: "movie-lib-ecaf7",
  storageBucket: "movie-lib-ecaf7.appspot.com",
  messagingSenderId: "78191783756",
  appId: "1:78191783756:web:68ebf9073d8f84999429e9"
})

firebase.auth().onAuthStateChanged( user => {
  if (user) {
   store.dispatch('loggedUser', user)
   store.dispatch('loadBooks')
  }
 
  new Vue({
   router,
   store,
   render: h => h(App)
  }).$mount('#app')
 })

