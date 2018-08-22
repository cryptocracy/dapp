<template lang="html">
  <div>
    <app-layout
      title="User Table"
      :children="UserTable"
      >
    </app-layout>
  </div>
</template>

<script>
  import UserTable from '@/components/tables/data-tables/UserTable';

  export default {
    data: () => ({
      UserTable,
    }),
  };
</script>

<style lang="css">
</style>
