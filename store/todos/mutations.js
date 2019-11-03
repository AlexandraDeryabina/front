export const add = (state, text) => {
  state.list.push({
    text,
    done: false
  })
}
export const remove = (state, { todo }) => {
  state.list.splice(state.list.indexOf(todo), 1)
}
export const toggle = (state, todo) => {
  todo.done = !todo.done
}
