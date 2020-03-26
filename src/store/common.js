export default { 
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
  },
  actions: {
    async setLoading({commit}, payload) {
      commit('setLoading')
    },
    async setError({commit}, payload) {
      commit('setError')
    },
    async clearError({commit}) {
      commit('clearError')
    },
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error
  }
}  