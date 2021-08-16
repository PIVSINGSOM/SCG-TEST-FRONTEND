<template>
  <section class="section">
    <create-product @updated="getListProduct"></create-product>
    <card-component title="รายการสินค้า">
      <b-table :data="productList" bordered>
        <b-table-column label="id" v-slot="props" centered>
          {{ props.row.id }}
        </b-table-column>
        <b-table-column label="ชื่อ" v-slot="props">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="ราคา" v-slot="props">
          {{ props.row.price }}
        </b-table-column>
        <b-table-column label="รูปภาพ" v-slot="props" width="50">
          <b-button
            type="is-info"
            size="is-small"
            tag="a"
            :href="props.row.image"
            target="_blank"
            >ดูรูปภาพ</b-button
          >
        </b-table-column>
        <b-table-column label="คำเรียก" v-slot="props">
          {{ props.row.classifier }}
        </b-table-column>
        <b-table-column label="วันที่สร้าง" v-slot="props">
          {{ props.row.created_at | defaultDateTime }}
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
import { getListProduct } from '../../../ultils/service'
import CreateProduct from '../../../components/CreateProduct.vue'
export default {
  components: { CardComponent, CreateProduct },
  middleware: 'admin',
  name: 'machine',
  component: {
    CardComponent,
  },
  data: () => ({
    productList: [],
  }),
  created() {
    this.getListProduct()
  },
  methods: {
    async getListProduct() {
      let response = await getListProduct()
      this.productList = response.data
    },
  },
}
</script>