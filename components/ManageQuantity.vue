<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <b-button
          size="is-small"
          type="is-danger"
          @click="decreseOrder(id)"
        >
          <b-icon icon="minus" size="is-small"> </b-icon>
        </b-button>
      </div>
      <div class="column is-4">
        {{ quantity }}
      </div>
      <div class="column is-4">
        <b-button
          size="is-small"
          type="is-success"
          @click="increaseOrder(id)"
        >
          <b-icon icon="plus" size="is-small"> </b-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  props: ['id', 'quantity'],
  methods: {
    ...mapActions(['increaseOrder', 'decreseOrder']),
  },
}
</script>

<style lang="scss" scoped>
</style>