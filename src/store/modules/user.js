import { login, logout, navigate } from '@/api/user'

const user = {
  state: {
    user: '',
    uris: []
  },

  getters: {
    role: state => {
      return state.user.roleId || ''
    }
  },

  mutations: {
    SET_URIS: (state, uris) => {
      state.uris = uris
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {
    async NAVIGATE(context) {
      const { success, data } = await navigate()
      if (success) {
        context.commit('SET_URIS', data)
      }
    },
    async LOGIN(context, { no, password }) {
      const { success, data } = await login({ no, password })
      if (success) {
        context.commit('SET_USER', data)
      }
    },
    async LOGOUT(context) {
      const { success } = await logout()
      if (success) {
        context.commit('SET_USER', '')
      }
    }
  }
}

export default user
