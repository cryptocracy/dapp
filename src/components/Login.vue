<template>
  <div class="ab">
    <!-- <div>
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
    </div> -->
    <div class="login">
      <div class="text-center">
        <img class="img-icon" src="https://raw.githubusercontent.com/cryptocracy/images/master/souq_gradient.png" alt="Cryptocracy" height="168" width="168">
        <h1>Cryptocracy</h1>
        <h4>Democratized Crowdfunding</h4>
        <!-- <v-btn class="btn-login pl-4 pr-4" style="color : #33886c;" @click="signIn">Sign In With Blockstack</v-btn> -->
        <p></p>
        <h6>(Warning: This dapp is outdated and login is disabled until updated)</h6>
      </div>
    </div>
    <v-footer class="pa-3" >
      <v-spacer></v-spacer>
      <div>powered by <a href="https://blockstack.org">Blockstack</a> - source code on <a href="https://github.com/cryptocracy/dapp">Github</a></div>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    blockstack: window.blockstack
  }),
  methods: {
    signIn () {
      const origin = window.location.origin
      this.blockstack.redirectToSignIn(origin, `${origin}/manifest.json`, ['store_write', 'publish_data'])
      // this.blockstack.redirectToSignIn()
    }
  }
}
</script>

<style lang="scss" scoped>

  .login {
    display: flex;
    align-items: center;
    background: linear-gradient(to right, #3abfa5, #53e7a6);
    justify-content: center;
    // height: 94.4vh;
    height: 100vh;
  }
  .img-icon {
    // margin-left: 14%;
    margin-bottom: 4%;
  }
  .application .theme--light.footer, .theme--light .v-footer {
    background: linear-gradient(to right, #3abfa5, #53e7a6);
  }
  .application a {
    color : #19695a
  }
  .btn-login {
    border-radius: 20px;
    color : #33886c;
  }
  .theme--light.application {
    background: linear-gradient(to right, #3abfa5, #53e7a6);
  }
</style>
