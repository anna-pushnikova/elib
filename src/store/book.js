import firebase from 'firebase/app'
import Book from './book_help'

export default {
  state: {
    books: []
  },
  mutations: {
    loadBooks(state, payload) {
      state.books = payload
    },
    newBook(state, payload) {
      state.books.push(payload)
    },
    editBook(state, {id, title, author, description}) {
      const book = state.books.find(b => b.id === id)
      book.title = title
      book.author = author
      book.description = description
    },
    clearBookInfo(state) {
      state.books = null
    }
  },
  actions: {
    async loadBooks ({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        // Get books
        const books = (await firebase.database().ref(`/users/${uid}/books`).once('value')).val() || {}
        // New array
        const booksArray = []
        // Get book key (id)
        Object.keys(books).forEach(key => {
          const book = books[key]
          booksArray.push(
            new Book(
              book.title,
              book.author,
              book.description,
              book.tags,
              book.completed,
              book.editing,
              key
            )
          )
        })
        // Send mutation
        commit('loadBooks', booksArray)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async newBook({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        const newBook = new Book(
          payload.title,
          payload.author,
          payload.description,
          payload.tags,
          payload.completed,
          payload.editing
        )
 
        const book = await firebase.database().ref(`/users/${uid}/books`).push(newBook)
        commit('newBook', {
          ...newBook,
          id: book.key
        })
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async editBook({commit, getters}, {id, title, author, description}) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        await firebase.database().ref(`/users/${uid}/books`).child(id).update({title, author, description})
        commit('editBook', {id, title, author, description})
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async deleteBook({commit, getters}, id) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        await firebase.database().ref(`/users/${uid}/books`).child(id).remove()
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async completedBook({commit, getters}, {id, completed}) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        await firebase.database().ref(`/users/${uid}/books`).child(id).update({completed})
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    books: (state) => state.books,
    booksCompleted: (state, getters) => getters.books.filter(book => book.completed),
    booksNotCompleted: (state, getters) => getters.books.filter(book => book.completed === false)
  }
}