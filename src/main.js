import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'
import firebase from 'firebase'


Vue.config.productionTip = false

Vue.use(
  Vuelidate,
  Uimini
)
 
// Firebase Initialize
firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
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

