
export const actions = {
  async nuxtServerInit ({ dispatch }, serverContext) {
    await Promise.all([
      dispatch('user/serverInit', serverContext)
    ])
  }
}
