
const app = {
  state: {
    title: '模板网站标题',
    defaultPageSize: 10
  },
  mutations: {
    SET_PAGESIZE: (state, size) => {
      state.defaultPageSize = size
    }
  }

}

export default app
