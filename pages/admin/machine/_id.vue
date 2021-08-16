<template>
  <section class="section">
    <create-stock @updated="getListStock"></create-stock>

    <card-component :title="`รายการสต๊อกสินค้า ของ Machine ID : ${id} `">
      <b-table :data="dataList" bordered paginated :per-page="5">
        <b-table-column label="id" v-slot="props" centered>
          {{ props.row.id }}
        </b-table-column>
        <b-table-column label="ชื่อสินค้า" v-slot="props">
          {{ props.row.product.name }}
        </b-table-column>
        <b-table-column label="ราคา" v-slot="props">
          {{ props.row.product.price | formatCurrency }}
        </b-table-column>
        <b-table-column label="คำเรียก" v-slot="props">
          {{ props.row.product.classifier }}
        </b-table-column>
        <b-table-column label="คงเหลือ" v-slot="props">
          {{ props.row.quantity }} {{ props.row.product.classifier }}
        </b-table-column>
        <b-table-column label="เมนู" v-slot="props" width="200" centered>
          <b-button
            type="is-success"
            size="is-small"
            icon-left="plus"
            @click="promptNumber(props.row.id)"
          >
            เพิ่มจำนวน
          </b-button>
          <b-button
            type="is-danger"
            size="is-small"
            icon-left="delete"
            @click="deleteStockId(props.row.id)"
          >
            ลบ
          </b-button>
        </b-table-column>
        <template #empty>
          <p class="has-text-centered">No data</p>
        </template>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import CardComponent from '../../../components/CardComponent.vue'
import {
  getListStockByMachine,
  increaseStock,
  deleteStockId,
} from '../../../ultils/service'
import CreateStock from '../../../components/CreateStock.vue'
export default {
  components: { CardComponent, CreateStock },
  middleware: 'admin',
  name: 'machine',
  component: {
    CardComponent,
  },
  data: () => ({
    dataList: [],
    id: null,
  }),
  created() {
    this.getListStock()
  },
  methods: {
    async getListStock() {
      this.id = this.$route.params.id
      let response = await getListStockByMachine(this.id)
      this.dataList = response.data
    },
    promptNumber(id) {
      this.$buefy.dialog.prompt({
        message: `เพิ่มจำนวนสินค้า`,
        inputAttrs: {
          type: 'number',
          placeholder: 'ใส่จำนวนที่ต้องการเพิ่ม',
        },
        trapFocus: true,
        onConfirm: (value) => this.increaseStock(id, value),
      })
    },
    async increaseStock(id, value) {
      let data = {
        id,
        quantity: parseInt(value),
      }
      let response = await increaseStock(data)
      if (response.message == 'updated') {
        this.getListStock()
      }
    },
    async deleteStockId(id) {
      let response = await deleteStockId(id)
      if (response.message == 'deleted') {
        this.getListStock()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>