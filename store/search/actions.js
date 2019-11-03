import { API_HOST } from '~/config/api'

export async function loadGroup (context) {
  const response = await this.$axios.get(`//${API_HOST}/group/list`)
  context.commit('updateGroup', response.data)
}

export function search ({ rootState }, request) {
  const token = rootState.user.loggedUser ? rootState.user.loggedUser.token : rootState.user.loggedUser
  return this.$axios.post(`//${API_HOST}/search`, { ...request, token })
}

export async function loadCriteria (context, id) {
  const response = await this.$axios.get(`//${API_HOST}/criteria/list-by-group/${id}`)

  const criteries = response.data

  const criteriesValue = criteries.reduce((acc, criteria) => {
    if (criteria.values.length > 0) {
      return [...acc, ...criteria.values.map(item => ({
        ...item,
        name: `Критерий: ${criteria.name}, Значение: ${item.name}`,
        criteriaId: criteria.id
      }))]
    }
    return [...acc, {
      id: 'custom',
      criteriaId: criteria.id,
      name: criteria.name
    }]
  }, [])

  context.commit('updateCriteriesValues', criteriesValue)
  context.commit('updateCriteries', criteries)
}
