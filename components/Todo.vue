<template>
  <div class="todo">
    <div class="todo__name">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
