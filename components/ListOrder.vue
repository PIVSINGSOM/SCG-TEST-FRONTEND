<template>
  <card-component>
    <div
      class="is-flex is-flex-direction-column is-justify-content-space-between"
    >
      <div>
        <div class="title is-5 has-text-centered">รายการสินค้า</div>
        <hr />
        <div class="mh">
          <b-table :data="listOrder" bordered>
            <b-table-column label="สินค้า" v-slot="props" centered>
              <p class="has-text-left">{{ props.row.product.name }}</p>
            </b-table-column>
            <b-table-column label="จำนวน" v-slot="props" centered width="200">
              <manage-quantity
                :id="props.row.id"
                :quantity="props.row.product.quantity"
              ></manage-quantity>
            </b-table-column>
            <b-table-column label="ราคา" v-slot="props" centered width="100">
              <p class="font_price">
                {{ props.row.product.real_price | formatCurrency }}
              </p>
            </b-table-column>
            <template #empty>
              <p class="has-text-centered">ยังไม่ได้เลือกสินค้า</p>
            </template>
          </b-table>
        </div>
      </div>

      <div>
        <b-button size="is-large" type="is-primary"  expanded @click="payment">
          จ่ายเงิน {{ amount | formatCurrency }}
        </b-button>
        <b-button size="is-large" type="is-danger" class="mt-2" expanded @click="setEmptyOrder">
          ยกเลิก
        </b-button>
      </div>
    </div>
  </card-component>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ManageQuantity from './ManageQuantity.vue'
import { paymentOrder } from '../ultils/service'
export default {
  components: {
    ManageQuantity,
  },
  computed: {
    ...mapState(['listOrder', 'amount']),
  },
  methods: {
    async payment() {
      let data = {}
      data.amount = this.amount
      data.order = []

      for (const element of this.listOrder) {
        let order = {}
        order.id = element.id
        order.product_id = element.product_id
        order.quantity = element.product.quantity
        order.amount = element.product.real_price
        data.order.push(order)
      }

      const response = await paymentOrder(data)
      if (response.message == 'created') {
        this.setEmptyOrder()
        this.getStockList()
      }
    },
    ...mapActions([
      'increaseOrder',
      'decreseOrder',
      'setEmptyOrder',
      'getStockList',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.mh {
  height: 80vh;
}
.font_price {
  color: green;
  font-weight: bold;
  font-size: 16px;
}
</style>