<template>
  <b-list-group class="mt-3 mb-3">
    <b-list-group-item
      v-for="res in results"
      :key="res.telegram"
      class="results-item"
      :href="getLink(res.telegram)"
      target="_blank"
    >
      <span class="results-user mb-1 mb-md-0">
        {{ res.telegram }}
      </span>
      <b-progress class="results-progress" :value="res.weight" :max="max" :variant="calcColor(res.weight)" />
    </b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  name: 'SearchResults',
  props: {
    results: Array
  },
  computed: {
    max () {
      return this.results[0] && this.results[0].weight
    }
  },
  methods: {
    calcColor (weight) {
      const part = weight / this.max

      if (part > 0.6) {
        return 'success'
      }

      if (part > 0.3) {
        return 'warning'
      }

      return 'danger'
    },
    getLink (telegramm) {
      return `https://t.me/${(telegramm || '').substr(1)}`
    }
  }
}
</script>

<style lang="sass">
  .results
    &-item
      display: flex
      flex-wrap: wrap
      align-items: center
      min-width: 280px

    &-progress
      width: 200px

    &-user
      flex-grow: 1
</style>
