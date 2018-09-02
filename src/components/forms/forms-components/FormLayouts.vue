<template>
  <div>
    <div v-if="contact">
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field label="First Name" v-model="first"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field label="Last Name" v-model="last"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Email address"
            v-model="email"
            hint="Enter your email!"
            persistent-hint
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field multi-line label="Message"></v-text-field>
        </v-flex>
        <v-flex sx12>
          <v-btn color="primary">Send Message</v-btn>
        </v-flex>
      </v-layout>
    </div>

    <div v-if="register">
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field label="First Name" v-model="first"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field label="Last Name" v-model="last"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label="Email address"
            v-model="email"
            hint="Enter your email!"
            persistent-hint
            ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field label="password" v-model="first"></v-text-field>
        </v-flex>

        <v-flex xs12>
            <v-checkbox
              color="green"
              v-model="terms"
            >
              <div slot="label" @click.stop="">
                Do you accept the
                <a href="javascript:;" @click.stop="">terms</a>
                and
                <a href="javascript:;" @click.stop="">conditions?</a>
              </div>
            </v-checkbox>
          </v-flex>

        <v-flex sx12>
          <v-btn color="primary">Register</v-btn>
        </v-flex>
      </v-layout>
    </div>

    <div v-if="inline">
      <v-layout row wrap>
        <v-flex xs12 sm5>
          <v-text-field label="First Name" v-model="first"></v-text-field>
        </v-flex>
        <v-flex xs12 sm5>
          <v-text-field label="Last Name" v-model="last"></v-text-field>
        </v-flex>

        <v-flex sx12 sm2>
          <v-btn color="primary" block>Login</v-btn>
        </v-flex>
      </v-layout>

    </div>

  </div>
</template>

<script>
export default {
  props: ['contact', 'register', 'inline'],

  data: () => ({
    terms: false,
    first: '',
    last: '',
    email: ''
  })

}
</script>

<style scoped>

</style>
