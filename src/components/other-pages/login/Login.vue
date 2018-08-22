<template>
  <div>
    <div>
      <div class="login-wrapper">
        <div class="login-fields">
          <h3>Login <a href="">Forgot Password?</a></h3>
          <v-text-field
              label="Email or username"
              required
              ></v-text-field>
          <v-text-field
              label="Password"
              required
              type="password"
              ></v-text-field>
          <div class="pt20">
            <v-checkbox
              label="Remember me?"
              required
              ></v-checkbox>
          </div>
          <div class="pt20">
            <v-btn color="primary" block>Login</v-btn>
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
