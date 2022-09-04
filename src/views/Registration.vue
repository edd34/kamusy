<style type="text/css">
  /* See Login.vue */
</style>


<template>
  <div style="width: 100%; height:100%">
    <v-row style="">
      <v-col id="bloc-form-connexion">
    
        <v-banner two-line transition="slide-y-transition" vif v-if="is_connected">
          Vous êtes connecté.
          <template v-slot:actions="{ dismiss }">
            <v-btn text color="primary" @click="dismiss"> Effacer </v-btn>
          </template>
        </v-banner>

        <h1 class="white-font" style="text-align: center;" v-if="!is_connected">Inscrivez-vous</h1>

        <v-container id="cont-form-connexion">
          <form>

            <v-text-field
              v-model="name"
              counter
              label="Name"
              :disabled="is_connected"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="name"
              counter
              label="Email"
              :disabled="is_connected"
              outlined
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
              outlined
            ></v-text-field>

            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Etes vous d'accord ?"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>

            <v-btn id="submit-connexion" class="mr-4" @click="submit" :disabled="is_connected">
              S'inscrire'
            </v-btn>
            <!-- <v-btn @click="clear" :disabled="is_connected"> Effacer </v-btn> -->
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
      </v-col>

      <v-col style="">
        <div>
          <!-- <div id="triangle-code" style="position: absolute; top:11px; left: 15px;"></div> -->
          <!-- <img style="max-width: 100%; border-radius: 20px;" src="https://mobimg.b-cdn.net/v3/fetch/87/87c93aa33275b4c8c73637ad3fbee836.jpeg?w=1470&r=0.5625"> -->
        </div>
      </v-col>
  <!-- <img style="max-width: 100%; border-radius: 20px; position: absolute; top:0px; left: 0px;" src="https://mobimg.b-cdn.net/v3/fetch/87/87c93aa33275b4c8c73637ad3fbee836.jpeg?w=1470&r=0.5625"> -->
  </v-row>

  <div id="back">
    <div id="triangle-code"></div>

  </div>

  </div>

</template>
<script>
import { mapGetters } from "vuex";
import Vue from 'vue'

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