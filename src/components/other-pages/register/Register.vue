<template>
  <div>
    <div>
      <div class="login-wrapper">
        <div class="login-fields">
          <h3>Register</h3>
          <v-text-field
            label="First name"
            required
            ></v-text-field>
          <v-text-field
            label="Last name"
            required
            ></v-text-field>
          <v-text-field
            label="Email"
            required
            ></v-text-field>
          <v-text-field
            label="Password"
            required
            type="password"
            ></v-text-field>
          <div class="pt20">
            <v-checkbox
              label="I agree all the terms."
              required
              ></v-checkbox>
          </div>
          <div class="pt20">
            <v-btn color="primary" block>Register</v-btn>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style scoped>

</style>
