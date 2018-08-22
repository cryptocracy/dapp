<template lang="html">
  <v-data-table
    v-bind:headers="headers"
    v-bind:items="items"
    v-bind:search="search"
    v-model="selected"
    item-key="name"
    select-all
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td class="checkbox">
        <v-checkbox
          hide-details
          color="success"
          v-model="props.selected"
        ></v-checkbox>
      </td>
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.status }}</td>
    </template>
  </v-data-table>

</template>

<script>
export default {
  data: () => ({
    search: '',
    selected: [],
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Status', value: 'status' },
    ],
    items: [
      {
        id: 1,
        name: 'John Smith',
        status: 'Employed',
      },
      {
        id: 2,
        name: 'Randal White',
        status: 'Unemployed',
      },
      {
        id: 3,
        name: 'Stephanie Sanders',
        status: 'Employed',
      },
      {
        id: 4,
        name: 'Steve Brown',
        status: 'Employed',
      },
      {
        id: 5,
        name: 'Christopher Nolano',
        status: 'Unemployed',
      },
    ],
  }),
};
</script>

<style lang="css">

table.table tbody td,
table.table thead th:not(:first-child) {
  vertical-align: middle;
}

.datatable thead th.column.sortable {
  text-align: left !important;
  outline: 0;
}

.datatable {
  margin-bottom: 0 !important;
}

table tfoot td {
  padding-bottom: 0 !important;
}


table.table tbody td:first-child, table.table tbody td:not(:first-child),
table.table tbody th:first-child, table.table tbody th:not(:first-child),
table.table thead td:first-child, table.table thead td:not(:first-child),
table.table thead th:first-child, table.table thead th:not(:first-child) {
  vertical-align: middle;
}

table td.checkbox {
  width: 30px;
}

</style>
