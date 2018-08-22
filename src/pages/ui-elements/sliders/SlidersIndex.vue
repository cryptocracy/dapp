<template lang="html">
  <div>
    <app-layout
      title="Basic Slider"
      :children="BasicSlider"
      >
    </app-layout>
    <app-layout
      title="Slider with Icon"
      :children="SliderWithIcon"
      >
    </app-layout>
    <app-layout
      title="Custom Colors"
      :children="CustomColors"
      >
    </app-layout>
    <app-layout
      title="Editable Numeric value"
      :children="EditableValue"
      >
    </app-layout>
  </div>
</template>

<script>
  import BasicSlider from '@/components/ui-elements/sliders/BasicSlider';
  import SliderWithIcon from '@/components/ui-elements/sliders/SliderWithIcon';
  import CustomColors from '@/components/ui-elements/sliders/CustomColors';
  import EditableValue from '@/components/ui-elements/sliders/EditableValue';

  export default {
    data: () => ({
      BasicSlider,
      SliderWithIcon,
      CustomColors,
      EditableValue,
    }),
  };
</script>

<style lang="css">
</style>
