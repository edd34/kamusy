<template>
<div>
    <v-container>
<form>
    <v-text-field
      v-model="name"
      counter
      label="Nom d'utilisateur"
      required
    ></v-text-field>
    <v-text-field
    v-model="password"
    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
    required
    :type="show1 ? 'text' : 'password'"
    name="input-10-1"
    label="Mot de passe"
    counter
    @click:append="show1 = !show1"
    ></v-text-field>
    <v-btn
      class="mr-4"
      @click="submit"
    >
      Valider
    </v-btn>
    <v-btn @click="clear">
      Effacer
    </v-btn>
  </form>
    </v-container>
</div>
  
</template>
<script>
  export default {
    data: () => ({
    name: '',
    show1: false,
    password: '',
    }),
    methods: {
      submit () {
        this.$store.dispatch("store_account/login_query_token", { username: this.name, password:this.password });
      },
      clear () {
        this.name = ''
        this.password = ''
      },
    },
  }
</script>