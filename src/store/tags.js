import firebase from 'firebase/app'
import Tag from './tags_help'

export default {
  state: {
    tags: []
  },
  mutations: {
    clearTagsInfo(state) {
      state.tags = null
    },
    newTag(state, payload) {
      state.tags.push(payload)
    },
    loadTags(state, payload) {
      state.tags = payload
    }
  },
  actions: {
    async newTag({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        const newTag = new Tag(
          payload.title,
          payload.use,
        )
 
        const tag = await firebase.database().ref(`/users/${uid}/tags`).push(newTag)
        commit('newBook', {
          ...newTag,
          id: tag.key
        })
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async loadTags({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        const tags = (await firebase.database().ref(`/users/${uid}/tags`).once('value')).val() || {}
        const tagsArr = []
        Object.keys(tags).forEach(key => {
          const tag = tags[key]
          tagsArr.push(
            new Tag(
              tag.title,
              tag.use,
              key
            )
          )
        })
        commit('loadTags', tagsArr)
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async deleteTag({commit, getters}, id) {
      commit('clearError')
      commit('setLoading', true)
      const user = getters.user
      const uid = user.id
      try {
        await firebase.database().ref(`/users/${uid}/tags`).child(id).remove()
        commit('setLoading', false)
      } catch(e) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    tags: state => state.tags
  }
}


// {
//   "rules": {
//     "books": {
//       ".read": "auth.uid !== null",
//       ".write": "auth.uid !== null"
//     },
//     "tags": {
//       ".read": "auth.uid !== null",
//       ".write": "auth.uid !== null"
//     }
//   }
// }
