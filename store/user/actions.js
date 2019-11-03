import { API_HOST } from '../../config/api'

export async function login (context, data) {
  const response = (await this.$axios.post(`//${API_HOST}/auth`, {
    telegram: data.name,
    password: data.password
  })).data

  context.commit('loginSuccess', response)

  this.app.$cookies.set('auth', JSON.stringify(response))
}

export function logout ({ commit }) {
  commit('logout')
  this.app.$cookies.remove('auth')
  location.reload()
}

export const serverInit = ({ commit, state }, context) => {
  try {
    const auth = context.app.$cookies.get('auth')

    if (auth) {
      commit('loginSuccess', auth)
    } else {
      commit('logout')
    }
  } catch (e) {
    console.error(e)
  }
}
