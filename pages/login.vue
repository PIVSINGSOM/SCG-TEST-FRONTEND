<template>
  <div class="columns is-centered" style="margin-top: 10rem">
    <div class="column is-4">
      <card-component title="เข้าสู่ระบบ" icon="lock">
        <b-field
          label="ชื่อผู้ใช้"
          :type="isLoginError ? 'is-danger' : ''"
          :disabled="isLoading"
        >
          <b-input
            type="text"
            required
            autofocus
            v-model="form.username"
            autocomplete="off"
          />
        </b-field>

        <b-field
          label="รหัสผ่าน"
          :type="isLoginError ? 'is-danger' : ''"
          :disabled="isLoading"
        >
          <b-input
            type="password"
            name="password"
            required
            v-model="form.password"
            autocomplete="off"
          />
        </b-field>

        <hr />

        <b-field grouped>
          <div class="control">
            <button
              type="submit"
              class="button is-black"
              :class="{ 'is-loading': isLoading }"
              :disabled="isLoading"
              @click="login"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </b-field>
      </card-component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'session',
  data() {
    return {
      isLoading: false,
      form: {
        username: null,
        password: null,
      },
      isLoginError: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        if (response.status === 200) {
          await this.$router.push('/')
        }
      } catch (error) {
        console.log('Login is error : ', error)
      }
    },
  },
}
</script>
