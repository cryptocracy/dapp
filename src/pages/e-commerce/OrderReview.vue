<template lang="html">
  <app-layout
    title="Order Review"
    :children="OrderReview"
  ></app-layout>
</template>

<script>
import OrderReview from '@/components/e-commerce/order-review/OrderReview';

export default {
  data: () => ({
    OrderReview,
  }),
};
</script>

<style lang="css">
</style>
