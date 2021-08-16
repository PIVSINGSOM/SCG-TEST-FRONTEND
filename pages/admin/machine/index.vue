<template>
  <section class="section">
    <create-machine @updated="getListMachine"></create-machine>
    <card-component title="Machine">
      <b-table :data="machineList" bordered>
        <b-table-column label="id" v-slot="props" centered>
          {{ props.row.id }}
        </b-table-column>
        <b-table-column label="username" v-slot="props">
          {{ props.row.username }}
        </b-table-column>
        <b-table-column label="อีเมล" v-slot="props">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="ที่อยู่" v-slot="props">
          {{ props.row.address }}
        </b-table-column>
        <b-table-column label="วันที่สร้าง" v-slot="props">
          {{ props.row.created_at | defaultDateTime }}
        </b-table-column>
        <b-table-column label="เมนู" v-slot="props" width="100">
          <b-button
            type="is-info is-light"
            size="is-small"
            @click="$router.push(`/admin/machine/${props.row.id}`)"
            >รายการสต็อก</b-button
          >
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
import { getListMachine } from '../../../ultils/service'
import CreateMachine from '../../../components/CreateMachine.vue'
export default {
  components: { CardComponent, CreateMachine },
  middleware: 'admin',
  name: 'machine',
  component: {
    CardComponent,
  },
  data: () => ({
    machineList: [],
  }),
  created() {
    this.getListMachine()
  },
  methods: {
    async getListMachine() {
      let response = await getListMachine()
      this.machineList = response.data
    },
  },
}
</script>