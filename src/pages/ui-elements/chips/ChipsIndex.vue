<template>
  <div>
    <v-layout flex-wrap row>
      <v-flex md6>
        <app-layout
          title="Basic Chips"
          :children="BasicChips"
          >
        </app-layout>
      </v-flex>
      <v-flex md6>
        <app-layout
          title="Color Chips"
          :children="ColorChips"
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Icon Chips"
          :children="IconChips"
          >
        </app-layout>
      </v-flex>
      <v-flex md6>
        <app-layout
          title="Outline Chips"
          :children="OutlineChips"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Label"
          :children="Labels"
          >
        </app-layout>
      </v-flex>

      <v-flex md12>
        <app-layout
          title="Closeable Chips"
          :children="CloseableChips"
          >
        </app-layout>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import BasicChips from '@/components/ui-elements/chips/BasicChips'
import ColorChips from '@/components/ui-elements/chips/ColorChips'
import IconChips from '@/components/ui-elements/chips/IconChips'
import OutlineChips from '@/components/ui-elements/chips/OutlineChips'
import Labels from '@/components/ui-elements/chips/Labels'
import CloseableChips from '@/components/ui-elements/chips/CloseableChips'

export default {
  data: () => ({
    BasicChips,
    ColorChips,
    IconChips,
    OutlineChips,
    Labels,
    CloseableChips
  })

}
</script>

<style scoped>

</style>
