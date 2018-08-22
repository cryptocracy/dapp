<template lang="html">
  <div>
    <v-layout row flex-wrap>
      <v-flex md6>
        <app-layout
          title="Basic Dialog"
          :children="BasicDialog"
          >
        </app-layout>
      </v-flex>
      <v-flex md6>
        <app-layout
          title="Modal Dialog"
          :children="ModalDialog"
          >
        </app-layout>
      </v-flex>
      <v-flex md6>
        <app-layout
          title="Fullscreen Dialog"
          :children="FullscreenDialog"
          >
        </app-layout>
      </v-flex>
      <v-flex md6>
        <app-layout
          title="Dialog With Forms"
          :children="DialogWithForm"
          >
        </app-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import BasicDialog from '@/components/ui-elements/dialog/BasicDialog';
  import ModalDialog from '@/components/ui-elements/dialog/ModalDialog';
  import FullscreenDialog from '@/components/ui-elements/dialog/FullscreenDialog';
  import DialogWithForm from '@/components/ui-elements/dialog/DialogWithForm';

  export default {
    data: () => ({
      BasicDialog,
      ModalDialog,
      FullscreenDialog,
      DialogWithForm,
    }),
  };
</script>

<style lang="css">
</style>
