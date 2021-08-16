<template>
  <card-component :title="`สร้างรายการสินค้า`">
    <div class="columns">
      <div class="column is-3">
        <b-field label="ชื่อสินค้า">
          <b-input v-model="name"></b-input>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="รูปภาพ">
          <b-input v-model="image"></b-input>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="ราคา">
          <b-input v-model="price"></b-input>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="คำเรียก">
          <b-input v-model="classifier"></b-input>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-10 is-2">
        <b-button type="is-success" expanded @click="createProduct"
          >สร้างรายการสินค้า</b-button
        >
      </div>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
import { createProduct } from '../ultils/service'
export default {
  component: {
    CardComponent,
  },
  data: () => ({
    name: null,
    image: null,
    price: null,
    classifier: null,
  }),
  created() {},
  methods: {
    async createProduct() {
      try {
        let data = {
          name: this.name,
          image: this.image,
          price: this.price,
          classifier: this.classifier,
        }
        let response = await createProduct(data)
        this.name = null
        this.image = null
        this.price = null
        this.classifier = null
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