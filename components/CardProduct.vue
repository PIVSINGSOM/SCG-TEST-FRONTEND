<template>
  <CardComponent @click.native="addOrder" class="cursor-pointer">
    <div class="box-image-product">
      <img
        :src="data.product.image"
        :alt="data.product.name"
        class="image-product"
      />
    </div>
    <p class="product-name">
      {{ data.product.name }}
    </p>
    <div
      class="
        is-flex is-flex-direction-row is-justify-content-space-between
        mt-2
        is-align-items-center
      "
    >
      <div class="product-price">{{ data.product.price | formatCurrency }}</div>
      <b-tag type="is-success is-light" size="is-medium"
        >{{ data.quantity }} {{ data.product.classifier }}</b-tag
      >
    </div>
  </CardComponent>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    addOrder() {
      this.$store.commit('addOrder', this.data)
    },
  },
}
</script>

<style lang="scss" scoped>
.box-image-product {
  height: 180px;
  widows: 100%;
}
.image-product {
  width: 100%;
  height: 100%;
}
.product-name {
  margin-top: 10px;
  font-size: 16px;
  //   color: gray;
}
.product-price {
  font-size: 18px;
  font-weight: bold;
  color: rgb(233, 83, 233);
}
.cursor-pointer {
  cursor: pointer;
}
</style>