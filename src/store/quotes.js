import firebase from 'firebase/app'
import Quote from './quotes_help'

export default {
  state: {
    quotes: []
  },
  mutations: {
    loadQuotes(state, payload) {
      state.quotes = payload
    },
    clearQuotes(state) {
      state.quotes = null
    }
  },
  actions: {
    async loadBookQuotes({commit, getters}, idBook) {
      commit('clearError')
      commit('setLoading', true)
      const uid = getters.user.id
      try {
        const quotes = (await firebase.database().ref(`users/${uid}/books/${idBook}/quotes`).once('value')).val() || {}
        const quotesArr = []
        Object.keys(quotes).forEach(key => {
          const quote = quotes[key]
          return quotesArr.push(
            new Quote(
              quote.quoteContent,
              key
            )
          )
        })
        commit('loadQuotes', quotesArr)
        commit('setLoading', false)
        return quotesArr
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async addBookQuote({commit, getters}, data) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      debugger
      try {
        const id = data.idBook
        const quoteContent = data.quoteBody
        const quote = { quoteContent }
        debugger
        const newQuote = new Quote(
          quote.quoteContent
        )
        debugger
        await firebase.database().ref(`users/${uid}/books/${id}/quotes`).push(newQuote)
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async deleteQuote({commit, getters}, data) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        const bookId = data.bookId
        const quoteId = data.quoteId
        await firebase.database().ref(`users/${uid}/books/${bookId}/quotes`).child(quoteId).remove()
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async editQuote({commit, getters}, data) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        const bookId = data.bookId
        const quoteId = data.quoteId
        const quoteContent = data.quoteContent
        const quote = { quoteContent }
        await firebase.database().ref(`users/${uid}/books/${bookId}/quotes`).child(quoteId).update(quote)
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    }
  },
  getters: { 
    getQuotes: state => state.quotes
  }
}