<template>
  <div>
    <v-avatar size="30px">
      <img :src="avatar" alt="avatar">
    </v-avatar>
    <v-avatar size="40px">
      <img :src="avatar" alt="avatar">
    </v-avatar>
    <v-avatar size="50px">
      <img :src="avatar" alt="avatar">
    </v-avatar>
    <v-avatar size="60px">
      <img :src="avatar" alt="avatar">
    </v-avatar>

    <v-avatar size="30px" tile="tile">
      <img :src="avatar" alt="avatar">
    </v-avatar>
    <v-avatar size="40px" tile="tile">
      <img :src="avatar" alt="avatar">
    </v-avatar>
    <v-avatar size="50px" tile="tile">
      <img :src="avatar" alt="avatar">
    </v-avatar>
    <v-avatar size="60px" tile="tile">
      <img :src="avatar" alt="avatar">
    </v-avatar>

  </div>
</template>

<script>
import avatar from '../../../assets/img/user3.jpg'

export default {
  data: () => ({
    avatar
  })

}
</script>

<style scoped>
  .avatar {
    margin-right: 20px;
  }

</style>
