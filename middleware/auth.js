export default function ({ store, redirect, route }) {
  if (store.state.user.loggedUser) {
    if (route.path === '/auth') {
      redirect('/')
    }
  } else {
    redirect('/auth')
  }
}
