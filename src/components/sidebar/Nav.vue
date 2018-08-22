<template lang="html">
  <v-list>
    <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
      <v-list-tile slot="item" @click="" :to="item.linkTo">

        <!-- Nav Icon -->
        <v-list-tile-action>
          <v-icon :color="item.color">{{ item.action }}</v-icon>
        </v-list-tile-action>

        <!-- Nav Title if router data on parent -->
        <v-list-tile-content v-if="item.linkTo">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>

        <!-- Nav Title if router data on children not parent -->
        <v-list-tile-content v-if="!item.linkTo">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>

        <!-- Right toggle arrow icon -->
        <v-list-tile-action v-if="item.items">
          <v-icon>keyboard_arrow_down</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <!-- Rendering child list item -->
      <v-list-tile v-if="item.items" v-for="subItem in item.items" v-bind:key="subItem.title" :to="subItem.linkTo">
        <v-list-tile-action>
          <v-icon color="grey lighten-1">trending_flat</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script>
import items from './navData';

export default {
  data() {
    return {
      items,
    };
  },
};
</script>

<style lang="css">
.list__tile {
  height: 50px;
}
.primary--text.list__tile--active.list__tile.list__tile--link {
  color: rgba(0,0,0,.87) !important;
}

.list--group .list__tile {
  height: 40px;
  padding-left: 20px !important;
}
.list--group .list__tile:hover {

  background: #f3f3f3;
}
.list--group .list__tile .list__tile__title:hover,
.list--group .router-link-exact-active .list__tile__title {
}


.application .theme--light.list--group .list__tile--active .list__tile__title, .theme--light .list--group .list__tile--active .list__tile__title {
  color: rgba(0,0,0,.87) !important;
}

.list__tile--highlighted, .list__tile--link:hover {
  background: linear-gradient(to right, rgba(30,190,165, .3) , rgba(30,190,165, .2), rgba(30,190,165, 0)) !important;
}
.list--group__header--active {

  background: linear-gradient(to right, rgba(30,190,165, .3) , rgba(30,190,165, .2), rgba(30,190,165, 0)) !important;
}
.list--group__header--active .list__tile,
.list--group__header>li:first-child:hover {
  background: transparent !important;
}
</style>
