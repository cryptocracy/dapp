<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="14"
      style="width: 100%; height: 300px"
    >
      <GmapMarker
        :position="center"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  data: () => ({
    center: {
      lat: 40.730610,
      lng: -73.9352420
    }
  })
}
</script>

<style scoped>

</style>
