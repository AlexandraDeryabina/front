export const loginSuccess = (state, payload) => {
  state.loggedUser = payload
}
export const logout = (state, payload) => {
  state.loggedUser = false
}
