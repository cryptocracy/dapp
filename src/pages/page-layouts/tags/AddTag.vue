<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
            v-model="title"
            :rules="titleRules"
            :counter="10"
            label="Title"
            required
        ></v-text-field>
        <v-text-field
            v-model="detail"
            label="Detail"
        ></v-text-field>
        <v-select
            :items="symbols"
            label="Symbol"
            v-model="symbol"
            :rules="[v => !!v || 'Item is required']"
            required
        ></v-select>

        <v-btn
            :disabled="!valid"
            @click="submit"
        >
            submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
</template>

<script>
  export default {
    data: () => ({
      coordinates: {
        lat: null,
        lng: null,
      },
      valid: false,
      title: '',
      titleRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters',
        v => /^\w+$/.test(v) || 'Letters, numbers and "_" are only allowed',
      ],
      detail: '',
      symbol: null,
      symbols: ['BTC', 'ETH', 'LTC'],
    }),
    methods: {
      submit() {
        const timestamp = +new Date();
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          // axios.post('/api/submit', {
          //   "title": this.title,
          //   "detail": this.detail,
          //   "symbol": this.symbol,
          //   "coordinates": {
          //      "latitude": this.coordinates.lat
          //      "longitude": this.coordinates.lng
          //    },
          //   "image":{
          //    "url":"url-to-img-uploaded-to-users-gaia-bucket"
          //    },
          //    "createdtime": timestamp,
          //    "archived": false,
          //    "v":"0.0.1",
          //    "id":""
          // })
          console.log('correct')
        }
      },
      clear() {
        this.$refs.form.reset()
      },
    },
    mounted() {
      const geoSuccess = (position) => {
        this.coordinates.lat = position.coords.latitude;
        this.coordinates.lng = position.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    },
  }
</script>

<style lang="scss">

</style>