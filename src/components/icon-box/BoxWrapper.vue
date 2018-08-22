<template lang="html">
  <div class="iconbox-wrapper">
      <div class="row">
        <div class="col-md-4">
          <app-icon-box
            backgroundColor="#1ebea5"
            icon="where_to_vote"
            title="0"
            subtitle="Completed Projects"
          >
          </app-icon-box>
        </div>

        <div class="col-md-4">
          <app-icon-box
            backgroundColor="#29d4a5"
            icon="account_balance_wallet"
            title="9, 693"
            subtitle="mBTC Balance"
          >
          </app-icon-box>
        </div>

        <div class="col-md-4">
          <app-icon-box
            backgroundColor="#31e6a5"
            icon="beenhere"
            title="13"
            subtitle="Completed Tasks"
          >
          </app-icon-box>
        </div>
      </div>
    </div>

</template>

<script>
import BoxSingle from './BoxSingle';

export default {
  components: {
    'app-icon-box': BoxSingle,
  },
};
</script>

<style lang="css">
</style>
