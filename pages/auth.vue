<template>
  <div class="container">
    <b-card class="auth-form mt-4" :class="{'auth-form-loading': !canSubmit}">
      <div class="text-center">
        <h3 class="mb-3 mt-1">Looking for people</h3>
      </div>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Логин телеграма"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            required
            placeholder="@TelegramLogin"
          />
        </b-form-group>

        <b-form-group id="input-group-2" label="Пароль:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Введите пароль"
          />
        </b-form-group>
        <b-button
          type="submit"
          class="mt-3"
          block
          size="lg"
          variant="primary"
          :disabled="!canSubmit"
        >
          Войти
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      canSubmit: true
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()

      this.canSubmit = false

      try {
        await this.$store.dispatch('user/login', { ...this.form })
        this.$router.push('/')
      } finally {
        this.canSubmit = true
      }
    }
  }
}
</script>

<style lang="scss">
.auth-form {
  max-width: 500px;
  margin: auto;

  opacity: 1;
  transition: opacity 1s;

  &-loading{
    opacity: .3
  }
}

html {
  height: 100%;
  background: #f5f5f5;
}

body{
  background: inherit;
}

</style>
