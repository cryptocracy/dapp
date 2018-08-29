<template>
    <div class="container">
        <v-form ref="form" v-model="valid" lazy-validation>
            <image-uploader
                accept="image/*"
                ref="imageInput"
                :disabled="isLoading"
                limit=2000000
                @input="getUploadedImage"
            />

            <v-text-field
                v-model="title"
                :rules="titleRules"
                :counter="10"
                :disabled="isLoading"
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
                :disabled="isLoading"
            ></v-select>
            <v-text-field
                v-model="address"
                :rules="addressRules"
                :counter="42"
                label="Address"
                :disabled="isLoading"
            ></v-text-field>

            <v-btn
                :disabled="!valid || isLoading || !image"
                @click="submit"
            >
                submit
            </v-btn>
            <v-btn
                @click="clear"
                :disabled="isLoading"
            >
                clear
            </v-btn>
        </v-form>
    </div>
</template>

<script>
  import ImageUploader from '../../../components/image-uploader/ImageUploader';
  import blockstackStorage from '../../../services/blockstackStorage.js';

  export default {
    data: () => ({
      blockstack: window.blockstack,
      isLoading: false,
      coordinates: {
        lat: null,
        lng: null,
      },
      valid: false,
      title: '',
      titleRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        v => /^\w+$/.test(v) || 'Letters, numbers and "_" are only allowed',
      ],
      addressRules: [
        v => v ? /^((?!_)[A-z0-9])+$/.test(v) || 'Letters and numbers are only allowed' : true,
        v => v ? v.length <= 42 || 'Please enter proper address' : true,
      ],
      address: '',
      detail: '',
      symbol: null,
      symbols: ['BTC', 'ETH', 'LTC'],
      image: null,
    }),
    components: {
      ImageUploader,
    },
    methods: {
      submit() {
        const timestamp = +new Date();
        if (this.$refs.form.validate()) {
          this.isLoading = true;
          this.blockstack.putFile(`image_${timestamp}.${this.image.name.split('.').pop()}`, this.image)
            .then((imageUrl) => {
              this.blockstack.putFile(`tag_${timestamp}.json`, JSON.stringify({
                title: this.title,
                detail: this.detail,
                symbol: this.symbol,
                address: this.address,
                coordinates: {
                  latitude: this.coordinates.lat,
                  longitude: this.coordinates.lng,
                },
                image: {
                  url: imageUrl,
                },
                createdtime: timestamp,
                archived: false,
                v: '0.0.1',
                id: '',
              }))
                .then((jsonUrl) => {
                  blockstackStorage.addToIndex('my_tags.json', jsonUrl.split('/').pop().split('.')[0], this.title)
                    .then(() => {
                      this.isLoading = false;
                      this.clear();
                    });
                });
            });
        }
      },
      clear() {
        this.$refs.form.reset();
        this.$refs.imageInput.removeFile();
      },
      getUploadedImage(e) {
        this.image = e;
      },
    },
    mounted() {
      const geoSuccess = (position) => {
        this.coordinates.lat = position.coords.latitude;
        this.coordinates.lng = position.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    },
  };
</script>

<style lang="scss">

</style>