<template>
  <div class="container">
    <div>
      <h1 class="mt-3 mb-3">
        Поиск событий
      </h1>
      <Search />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Search from '~/components/Search.vue'

export default {
  layout: 'authorized',
  middleware: 'auth',
  components: {
    Search
  },
  computed: {
    ...mapState({
      todos: state => state.todos.list
    })
  },
  methods: {
    ...mapActions({
      addTodo: 'todos/addTodo'
    })
  }
}
</script>
