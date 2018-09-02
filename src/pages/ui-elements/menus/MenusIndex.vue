<template lang="html">
  <v-layout row flex-wrap>
    <v-flex md6>
      <div class="text-xs-center">
        <app-layout
          title="Dropdown Menu"
          :children="MenuDropdown"
          >
        </app-layout>
        <app-layout
          title="Hover Menu"
          :children="MenuHover"
          >
        </app-layout>

        <app-layout
          title="Custom Tranition Menu"
          :children="MenuTransition"
          >
        </app-layout>
      </div>

    </v-flex>
    <v-flex md6>
      <app-layout
        title="Absolute Menu"
        :children="MenuAbsolute"
        >
      </app-layout>
      <app-layout
        title="Popover Menu"
        :children="MenuPopover"
        >
      </app-layout>
    </v-flex>
  </v-layout>

</template>

<script>
import MenuDropdown from '@/components/ui-elements/menus/MenuDropdown'
import MenuAbsolute from '@/components/ui-elements/menus/MenuAbsolute'
import MenuHover from '@/components/ui-elements/menus/MenuHover'
import MenuTransition from '@/components/ui-elements/menus/MenuTransition'
import MenuPopover from '@/components/ui-elements/menus/MenuPopover'

export default {
  data: () => ({
    MenuDropdown,
    MenuAbsolute,
    MenuHover,
    MenuTransition,
    MenuPopover
  })
}
</script>

<style lang="css">
</style>
