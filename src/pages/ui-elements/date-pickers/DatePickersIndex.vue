<template lang="html">
  <v-layout row wrap>
    <v-flex md5 xs12>
      <app-layout
        title="Basic Date Picker"
        :children="BasicDatePicker"
        >
      </app-layout>
      <app-layout
        title="Date Picker With Menu"
        :children="DatePickerWithMenu"
        >
      </app-layout>
      <app-layout
        title="Birthday Picker"
        :children="BirthDayPicker"
        >
      </app-layout>
    </v-flex>
    <v-flex md7 xs12>
      <app-layout
        title="Landscape Date Picker"
        :children="LandscapeDatePicker"
        >
      </app-layout>
      <app-layout
        title="Date Picker With Allowed Date"
        :children="AllowedDate"
        >
      </app-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import BasicDatePicker from '@/components/ui-elements/date-pickers/BasicDatePicker';
  import LandscapeDatePicker from '@/components/ui-elements/date-pickers/LandscapeDatePicker';
  import DatePickerWithMenu from '@/components/ui-elements/date-pickers/DatePickerWithMenu';
  import AllowedDate from '@/components/ui-elements/date-pickers/AllowedDate';
  import BirthDayPicker from '@/components/ui-elements/date-pickers/BirthDayPicker';

  export default {
    data: () => ({
      BasicDatePicker,
      LandscapeDatePicker,
      DatePickerWithMenu,
      AllowedDate,
      BirthDayPicker,
    }),
  };
</script>

<style lang="css">
</style>
