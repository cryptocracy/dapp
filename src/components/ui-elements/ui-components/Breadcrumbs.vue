<template>
  <div>
    <v-layout>
      <v-flex md6>
        <v-breadcrumbs divider="/">
          <v-breadcrumbs-item
            v-for="item in items" :key="item.text"
            :disabled="item.disabled"
            >
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>

        <v-breadcrumbs divider="-">
          <v-breadcrumbs-item
            v-for="item in items" :key="item.text"
            :disabled="item.disabled"
            >
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
      <v-flex md6>
        <v-breadcrumbs>
          <v-icon slot="divider">forward</v-icon>
          <v-breadcrumbs-item
            v-for="item in items" :key="item.text"
            :disabled="item.disabled"
            >
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>

        <v-breadcrumbs>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item
            v-for="item in items" :key="item.text"
            :disabled="item.disabled"
            >
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Dashboard',
          disabled: false,
        },
        {
          text: 'Link 1',
          disabled: false,
        },
        {
          text: 'Link 2',
          disabled: true,
        },
      ],
    }),

  };
</script>

<style scoped>

</style>
