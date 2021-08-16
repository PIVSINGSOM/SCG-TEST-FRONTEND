<template>
  <card-component :title="`สร้าง Machine`">
    <div class="columns">
      <div class="column is-3">
        <b-field label="username">
          <b-input v-model="username"></b-input>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="password">
          <b-input v-model="password" type="password"></b-input>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="อีเมล">
          <b-input v-model="email"></b-input>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="ที่อยู่">
          <b-input v-model="address"></b-input>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-10 is-2">
        <b-button type="is-success" expanded @click="createMachine"
          >สร้าง Machine</b-button
        >
      </div>
    </div>
  </card-component>
</template>



<script>
import CardComponent from '../components/CardComponent.vue'
import { createMachine } from '../ultils/service'
export default {
  component: {
    CardComponent,
  },
  data: () => ({
    username: null,
    password: null,
    email: null,
    address: null,
  }),
  created() {},
  methods: {
    async createMachine() {
      try {
        let data = {
          username: this.username,
          password: this.password,
          email: this.email,
          address: this.address,
        }
        let response = await createMachine(data)
        this.username = null
        this.password = null
        this.email = null
        this.address = null
        this.$emit('updated')
      } catch (error) {
        this.$buefy.toast.open({
          message: error.response.data.message,
          type: 'is-danger',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>