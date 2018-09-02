<template lang="html">
  <v-layout flex-wrap>
    <v-flex md12>
      <app-layout
        title="Basic Icons"
        :children="BasicIcons"
        >
      </app-layout>
    </v-flex>
    <v-flex md12>
      <app-layout
        title="Color Icons"
        :children="ColorIcons"
        >
      </app-layout>
    </v-flex>
    <v-flex md12>
      <app-layout
        title="Button Icons"
        :children="ButtonIcons"
        >
      </app-layout>
    </v-flex>
  </v-layout>

</template>

<script>
import BasicIcons from '@/components/ui-elements/icons/BasicIcons'
import ColorIcons from '@/components/ui-elements/icons/ColorIcons'
import ButtonIcons from '@/components/ui-elements/icons/ButtonIcons'

export default {
  data: () => ({
    BasicIcons,
    ColorIcons,
    ButtonIcons
  })
}
</script>

<style lang="css">
</style>
