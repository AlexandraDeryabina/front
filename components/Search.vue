<template>
  <div>
    <b-card>
      <b-form-group
        id="input-group-1"
        label="Группа"
        label-for="input-1"
      >
        <b-form-select
          v-model="selectedGroup"
          :options="groups"
          value-field="id"
          text-field="name"
        />
      </b-form-group>

      <b-form-group
        v-if="isCriteries"
        id="input-group-1"
        label="Критерий"
        label-for="input-1"
      >
        <multiselect
          v-model="selectedCriteries"
          :options="criteriesOption"
          select-label="Нажмите Enter для выбора"
          deselect-label="Выбрать"
          selected-label="Выбрано"
          placeholder="Выберите значение"
          open-direction="bottom"
          track-by="id"
          label="name"
          :multiple="true"
        />
      </b-form-group>

      <div v-if="isSelectedCriteria">
        <div v-for="(item, key) in selectedListCriteries" :key="key">
          <b-form-group
            v-if="!item.values.length"
            :label="`Значение для критерия: ${item.name}`"
            label-for="input-1"
          >
            <b-form-input
              v-model="customField[item.id]"
              required
              placeholder="Введите значение"
            />
          </b-form-group>

          <b-form-group
            v-if="isCriteries"
            :label="`Вес ${item.name}`"
          >
            <b-form-input v-model="weight[item.id]" type="range" min="0" max="10" />
          </b-form-group>
        </div>
      </div>
      <b-button
        variant="primary"
        :disabled="!isSelectedCriteria"
        @click="search"
      >
        Поиск
      </b-button>
    </b-card>
    <SearchResults :results="results" />
    <b-alert show v-model="isEmpty" dismissible>
      Результатов не найдено
    </b-alert>
    <b-alert v-model="isError" variant="danger" dismissible>
      Ошибка
    </b-alert>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _isEmpty from 'lodash/isEmpty'

import SearchResults from './SearchResults'

export default {
  components: { SearchResults },
  data () {
    return {
      isError: false,
      isEmpty: false,
      selectedGroup: null,
      selectedCriteries: null,
      weight: {},
      customField: {},
      results: []
    }
  },
  computed: {
    ...mapState({
      groups: state => state.search.groups || [],
      criteriesOption: state => state.search.criteriesValues || [],
      criteries: state => state.search.criteries || []
    }),
    isCriteries () {
      return this.criteries.length > 0
    },
    isSelectedCriteria () {
      return !_isEmpty(this.selectedCriteries)
    },
    selectedListCriteries () {
      const criteries = []
      this.criteries.forEach((criteria) => {
        const selected = this.selectedCriteries.find(selected => selected.criteriaId === criteria.id)
        if (!_isEmpty(selected)) {
          criteries.push(criteria)
        }
      })
      return criteries
    }
  },
  watch: {
    'selectedGroup': 'handleChangeGroup'
  },
  created () {
    this.loadGroup()
  },
  methods: {
    ...mapActions({
      loadGroup: 'search/loadGroup',
      loadCriteria: 'search/loadCriteria',
      sendReq: 'search/search'
    }),
    handleChangeGroup (data) {
      if (data) {
        this.loadCriteria(data)
      }
    },
    search () {
      const request = {
        groupid: this.selectedGroup,
        userCriterias: []
      }
      this.criteries.forEach((criteria) => {
        const selected = this.selectedCriteries.filter(selected => selected.criteriaId === criteria.id)
        if (_isEmpty(selected)) {
          return null
        }

        const values = []
        let weight = null
        selected.map((item) => {
          if (item.id === 'custom') {
            values.push(this.customField[item.criteriaId])
          } else {
            values.push(item.id)
          }
          weight = this.weight[item.criteriaId] || 5
        })
        request.userCriterias.push({
          criteriaId: criteria.id,
          values,
          weight
        })
      })
      this.sendReq(request).then((res) => {
        this.results = res.data
        if (!_isEmpty(res.data)) {
          this.isError = false
          this.isEmpty = false
        } else {
          this.isEmpty = true
        }
      }).catch(() => {
        this.results = []
        this.isError = true
      })
    }
  }
}
</script>

<style scoped>

</style>
