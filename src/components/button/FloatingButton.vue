<template>
  <v-speed-dial
    class="floating-button floatShepherd"
    v-model="fab"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
  >
    <v-btn
      slot="activator"
      v-model="fab"
      color="teal accent-4"
      dark
      fab
    >
      <v-icon>add</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="indigo lighten-1"
      to="/"
    >
      <v-icon>work</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="green lighten-1"
      :to="{ name: 'AddTask', params: { taskProp: null } }"
    >
      <v-icon>list</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="orange lighten-1"
      :to="{ name: 'AddEvent', params: { eventProp: null } }"
    >
      <v-icon>today</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="green lighten-1"
      :to="{ name: 'AddImage', params: { imageProp: null } }"
    >
      <v-icon>image</v-icon>
    </v-btn>
    <!-- <v-btn
      fab
      dark
      small
      color="blue lighten-1"
      :to="{ name: 'AddTag', params: { tagProp: null } }"
    >
      <v-icon>label</v-icon>
    </v-btn> -->
    <v-btn
      fab
      dark
      small
      color="red lighten-1"
      :to="{ name: 'AddMarker', params: { markerProp: null } }"
    >
      <v-icon>place</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'FloatingButton',

  data: () => ({
    direction: 'left',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-x-reverse-transition'
  })
}
</script>

<style scoped>
    .floating-button {
      position: fixed;
      color: white;
    }
</style>
