<template>
  <div class="columns p-3">
    <div class="column is-8">
      <div class="columns is-multiline">
        <div
          class="column is-3 is-flex"
          v-for="(item, index) in stockList"
          :key="`product_${index}`"
        >
          <card-product :data="item"></card-product>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <list-order></list-order>
    </div>
  </div>
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
import CardProduct from '../components/CardProduct.vue'
import ListOrder from '../components/ListOrder.vue'
import { getListStock } from '../ultils/service'
import { mapActions, mapState } from 'vuex'
export default {
  layout: 'shop',
  name: 'HomePage',
  middleware: 'auth',
  components: {
    CardComponent,
    CardProduct,
    ListOrder,
  },

  computed: {
    ...mapState(['stockList']),
  },

  created() {
    this.getStockList()
  },

  methods: {
    ...mapActions(['getStockList']),
    async getListStockData() {
      try {
        const response = await getListStock()
        this.sotckList = response.data
        console.log(response)
      } catch (error) {
        console.log('Get list stock is error : ', error)
      }
    },
  },
}
</script>


<style scoped>
</style>