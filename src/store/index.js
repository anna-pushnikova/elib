import Vue from 'vue'
import Vuex from 'vuex'
import book from './book'
import tags from './tags'
import user from './user'
import common from './common'
import message from './message'
import quotes from './quotes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    book,
    tags,
    user,
    common,
    message,
    quotes
  }
})
