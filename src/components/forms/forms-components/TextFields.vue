<template>
  <div>
    <div class="text-fields">
      <v-text-field
        name="input-1"
        label="Label Text"
        >
      </v-text-field>

      <v-text-field
        name="input-3"
        label="Label Text"
        value="Disabled text"
        disabled
        >
      </v-text-field>
      <v-subheader>Error helper text</v-subheader>

      <v-text-field
        name="input-3-5"
        label="Hint Text"
        value="Input text"
        :rules="[() => 'Username or Password is incorrect.']"
        error
        >
      </v-text-field>

      <v-subheader>With Icon</v-subheader>
      <v-text-field
        name="input-1-3"
        label="Hint Text"
        single-line
        prepend-icon="phone"
        >
      </v-text-field>

      <v-subheader>With Multiline/Textarea</v-subheader>
      <v-text-field
        name="input-7-1"
        label="Label Text"
        multi-line
        >
      </v-text-field>

      <v-subheader>Password field</v-subheader>
      <v-text-field
        name="input-10-1"
        label="Enter your password"
        hint="At least 8 characters"
        v-model="password"
        min="8"
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
        counter
        >
      </v-text-field>

      <v-subheader>Textarea</v-subheader>
      <v-text-field
        name="input-1"
        label="Label Text"
        textarea
        >
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    e1: false,
    password: 'Password'
  })

}
</script>

<style scoped>

</style>
