export default {
  state: {
    message: {
      show: false,
      context: 'success',
      title: ''
    }
  },
  mutations: {
    setSuccessMessage (state, payload) {
      state.message.show = true
      state.message.context = 'success'
      state.message.title = payload
    },
    setErrorMessage (state, payload) {
      state.message.show = true
      state.message.context = 'error'
      state.message.title = payload
    },
    unsetMessage (state) {
      state.message.show = false
    }
  },
  getters: {
    message (state) {
      return state.message
    }
  }
}