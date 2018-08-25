<template>
  <div>
    <div v-if="profileData.hasOwnProperty('profile')" class="container profile-info">
      <div class="row align-items-center">
        <div class="offset-1 col-3">
          <v-avatar :size="imageSize" color="grey lighten-4">
            <img :src="profileData.profile.image[0].contentUrl" :alt="profileData.profile.name">
          </v-avatar>
        </div>
        <div class="offset-2 col-6 ">
          <h1>
            {{profileData.profile.name}}
          </h1>
          <h3>
            Username:<span class="ml-4">{{profileData.username || 'No username found'}}</span>
          </h3>
          <h3>
            Hub Url:<span class="ml-3">{{profileData.hubUrl}}</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters({
      profileData: 'getProfileData',
    }),
    imageSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '80px';
        case 'sm': return '200px';
        default: return '256px';
      }
    },
  },
  data: () => ({
    name: 'Akash',
  }),
};
</script>
<style lang="scss" scoped>
.profile-info {
  h1 {
  color: #5a5d5f
  }
  h3{
    color: grey
  }
}
</style>

