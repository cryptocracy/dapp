<template lang="html">
  <div>
    <div class="readmin-panel">
      <div class="panel-heading">
        <h5>Basic Table</h5>
      </div>
      <div class="panel-body">
        <bootstrap-table></bootstrap-table>
      </div>
    </div>

    <div class="readmin-panel">
      <div class="panel-heading">
        <h5>Table Striped</h5>
      </div>
      <div class="panel-body">
        <bootstrap-table striped="true"></bootstrap-table>
      </div>
    </div>
    <div class="readmin-panel">
      <div class="panel-heading">
        <h5>Table Bordered</h5>
      </div>
      <div class="panel-body">
        <bootstrap-table bordered="true"></bootstrap-table>
      </div>
    </div>

    <div class="readmin-panel">
      <div class="panel-heading">
        <h5>Table Hover</h5>
      </div>
      <div class="panel-body">
        <bootstrap-table hover="true"></bootstrap-table>
      </div>
    </div>
    <div class="readmin-panel">
      <div class="panel-heading">
        <h5>Table Condensed</h5>
      </div>
      <div class="panel-body">
        <bootstrap-table condensed="true"></bootstrap-table>
      </div>
    </div>
  </div>
</template>

<script>
import Bootstraptable from '@/components/tables/bootstrap/Tables'

export default {
  components: {
    'bootstrap-table': Bootstraptable
  }
}
</script>

<style lang="css">
</style>
