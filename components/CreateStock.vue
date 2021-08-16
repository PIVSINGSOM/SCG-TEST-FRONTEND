<template>
  <card-component :title="`สร้างรายการสต๊อกสินค้า`">
    <div class="columns">
      <div class="column is-3">
        <b-select placeholder="รายการสินค้า" v-model="productId">
          <option
            v-for="(item, index) in productList"
            :value="item.id"
            :key="`product_${index}`"
          >
            {{ item.name }}
          </option>
        </b-select>
      </div>
      <div class="column is-3">
        <b-numberinput v-model="quantity" placeholder="จำนวน"></b-numberinput>
      </div>
      <div class="column is-3">
        <b-button type="is-success" @click="createStock">สร้างรายการ</b-button>
      </div>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
import { getListProduct, createStock } from '../ultils/service'
export default {
  component: {
    CardComponent,
  },
  data: () => ({
    productList: [],
    productId: null,
    quantity: null,
  }),
  created() {
    this.getListProduct()
  },
  methods: {
    async getListProduct() {
      let response = await getListProduct()
      this.productList = response.data
    },
    async createStock() {
      let data = {
        quantity: this.quantity,
        product_id: this.productId,
        machine_id: parseInt(this.$route.params.id),
      }
      try {
        let response = await createStock(data)
        if (response.message == 'created') {
          this.productId = null
          this.quantity = null
          this.$emit('updated')
        }
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