<template>
  <div>
    <v-banner two-line transition="slide-y-transition" vif v-if="is_connected">
      Vous êtes connecté.
      <template v-slot:actions="{ dismiss }">
        <v-btn text color="primary" @click="dismiss"> Effacer </v-btn>
      </template>
    </v-banner>
    <v-container>
      <form>
        <v-text-field
          v-model="name"
          counter
          label="Email"
          :disabled="is_connected"
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
          :disabled="is_connected"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn class="mr-4" @click="submit" :disabled="is_connected">
          Valider
        </v-btn>
        <v-btn @click="clear" :disabled="is_connected"> Effacer </v-btn>
      </form>
    </v-container>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    name: "",
    show1: false,
    password: "",
    snackbar: false,
    text: "",
  }),
  computed: {
    ...mapGetters({
      is_connected: "store_account/is_connected",
    }),
  },
  methods: {
    async submit() {
      const res = await this.$store.dispatch(
        "store_account/login_query_token",
        {
          email: this.name,
          password: this.password,
        }
      );
      this.snackbar = true;
      if (res) {
        this.text = "Connexion réussie.";
        this.clear();
      } else {
        this.text = "Identifiant ou mot de passe incorrect.";
      }
    },
    clear() {
      this.name = "";
      this.password = "";
    },
  },
};
</script>