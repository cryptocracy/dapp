<template>
  <div>
    <div class="readmin-panel">
      <div class="panel-heading">
        <h5>Contact from</h5>
      </div>
      <div class="panel-body">
        <app-formlayouts contact="true"></app-formlayouts>
      </div>
    </div>

    <div class="readmin-panel">
      <div class="panel-heading">
        <h5>Register</h5>
      </div>
      <div class="panel-body">
        <app-formlayouts register="true"></app-formlayouts>
      </div>
    </div>

    <div class="readmin-panel">
      <div class="panel-heading">
        <h5>Form Inline</h5>
      </div>
      <div class="panel-body">
        <app-formlayouts inline="true"></app-formlayouts>
      </div>
    </div>

  </div>
</template>

<script>
import FormLayouts from '@/components/forms/forms-components/FormLayouts'

export default {
  components: { 'app-formlayouts': FormLayouts }

}
</script>

<style scoped>

</style>
