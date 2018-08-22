<template>
  <div>
    <v-chip close>Example Chip</v-chip>
    <v-chip>Example Chip</v-chip>
    <v-chip close>
      <v-avatar>
        <img :src="avatar" alt="trevor">
      </v-avatar>
      Trevor
    </v-chip>

    <v-chip>
      <v-avatar class="teal">A</v-avatar>
      ANZ Bank
    </v-chip>

  </div>
</template>

<script>
  import avatar from '../../../assets/img/user1.jpg';

  export default {
    data: () => ({
      avatar,
    }),

  };
</script>

<style scoped>

</style>
