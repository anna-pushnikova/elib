import firebase from 'firebase/app'
import User from './user_help'

export default { 
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async login({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async logoutUser({commit}) {
      try {
        await firebase.auth().signOut()
        debugger
        commit('clearTagsInfo')
        commit('clearBookInfo')
        commit('clearQuotes')
        debugger
        commit('setUser', null)
      } catch(e) {
        commit('setError', e.message)
        throw e
      }
    },
    loggedUser ({commit}, payload) {
      // Send mutation new uid used helped Class
      commit('setUser', new User(payload.uid))
    }
  },
  getters: {
    user: state => state.user,
    checkUser: state => state.user !== null,
    userId: state => state.user.id
  }
} 