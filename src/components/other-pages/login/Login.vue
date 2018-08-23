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
        <img class="img-icon" src="https://raw.githubusercontent.com/cryptocracy/images/master/tasks.png" alt="Souq Project Tasks" height="168" width="168">
        <h1><a href="https://cryptocracy.io" target="_blank">Souq</a></h1>
        <p>A decentralized crowdfunding app</p>
        <v-btn class="btn-login" @click="signIn">Sign In With Blockstack</v-btn>
      </div>
    </div>
    <v-footer class="pa-3" >
      <v-spacer></v-spacer>
      <div>Made with love by Ty {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data: () => ({
      blockstack: window.blockstack,
    }),
    methods: {
      signIn() {
        this.blockstack.redirectToSignIn();
      },
    },
  };
</script>

<style lang="scss" scoped>

  .login {
    display: flex;
    align-items: center;
    background: linear-gradient(to right, #3abfa5, #53e7a6);
    justify-content: center;
    height: 92vh;
  }
  .img-icon {
    // margin-left: 14%;
    margin-bottom: 4%;
  }
  .application .theme--light.footer, .theme--light .footer {
    background: linear-gradient(to right, #3abfa5, #53e7a6);
  }
  .application a {
    color : #19695a
  }
  .btn-login {
    border-radius: 20px;
    color : #33886c;
  }
  .btn__content {
    color : #33886c;
  }
</style>
