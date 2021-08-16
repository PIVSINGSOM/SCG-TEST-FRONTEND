<template>
  <section class="section"></section>
</template>


<script>
import CardComponent from '../../components/CardComponent.vue'
export default {
  components: { CardComponent },
  middleware: 'admin',
  name: 'admin',
  component: {
    CardComponent,
  },
  created() {
    this.$router.push('/admin/machine')
  },
}
</script>