import fetch from '@/utils/fetch'

const user = {
  state: {
    user: '',
    uris: []
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
      const { success, data } = await fetch({
        url: '/navigation',
        method: 'get'
      })
      if (success) {
        data.unshift({
          path: '/dashboard',
          name: '主页',
          father: '/',
          icon: ''
        })
        context.commit('SET_URIS', data)
      }
    },
    async LOGIN(context, { no, password }) {
      const { success, data } = await fetch({
        url: '/login',
        method: 'post',
        data: { no, password }
      })
      if (success) {
        context.commit('SET_USER', data)
      }
    },
    async LOGOUT(context) {
      const { success } = await fetch({
        url: '/logout',
        method: 'post'
      })
      if (success) {
        context.commit('SET_USER', '')
      }
    }
  }
}

export default user
