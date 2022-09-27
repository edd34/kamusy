<style type="text/css">
  #triangle-code{
    display : inline-block;
    height : 0;
    width : 0;
    border-top : 100vh solid #1e1e2f;
    border-right : 150px solid transparent;

    position: relative;
    left: 100%;
  }

  #submit-connexion {
    width: 100%;
  }

  #bloc-form-connexion {
    z-index: 2;
    /*padding: 0 150px 0 100px;*/
    margin-top: 50vh;
    transform: translateY(-25vh);
    /*height: calc(100vh - 80px);*/
  }

  @media (min-width: 640px) {
      #bloc-form-connexion {
        padding: 0 150px 0 100px;
      }
  }
  @media (max-width: 640px) {
      #bloc-form-connexion {
        padding: 50px; 
      }
  }

  
  @media (min-width: 640px) {
      #cont-form-connexion {
        padding: 80px;
      }
  }
  @media (max-width: 640px) {
      #cont-form-connexion {
        padding: 5px;
      }
  }

  .col-router {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 10vh;
  }

  .col-n {
    padding: 0;
  }

  fieldset {
    border-color: white !important;
  }

  #submit-connexion {
    height: 50px;
  }

  /* BACKGROUND FIGURE */
  #back {
    position: absolute; 
    /*width:50%; */
    height: 100%; 
    left: 0; 
    top: 0; 
    background-color: #1e1e2f; 
    z-index: 0;
  }

  @media (min-width: 640px) {
      #back {
        width:50%; 
      }
  }
  @media (max-width: 640px) {
      #back {
        width:100%; 
      }
  }

  

  @media (min-width: 640px) {
      .empty-col{
        display: initial;
      }
  }
  @media (max-width: 640px) {
      .empty-col{
        display: none;
      }
  }

  #inspire.login-page-active {
    overflow: hidden !important;
    background-image: url("https://images8.alphacoders.com/648/648922.jpg");
    border-radius: 30px;
    border: solid 15px black;
    margin: 15px;
    overflow: auto;
    height: calc(100vh - 30px);
  }

</style>


<template>
  <div style="width: 100%; height:100%">
    <v-row style="">
      <v-col id="bloc-form-connexion">
    
        <v-banner two-line transition="slide-y-transition" v-if="is_connected">
          Vous êtes connecté.
          <template v-slot:actions="{ dismiss }">
            <v-btn text color="primary" @click="dismiss"> Effacer </v-btn>
          </template>
        </v-banner>

        <v-container id="cont-form-connexion">

          <h1 class="white--text text-center" v-if="!is_connected && type_login=='login'">Connectez-vous</h1>
          <h1 class="white--text text-center" v-if="!is_connected && type_login!='login'">Inscrivez-vous</h1>

          <p class="text-center"> 
            <a v-if="!is_connected && type_login=='login'" href="/#/registration">Créer un nouveau compte ?</a> 
            <a v-if="!is_connected && type_login!='login'" href="/#/login">Connectez vous ?</a> 
          </p>

          <form>

            <v-text-field
              v-model="email"
              counter
              label="Email"
              :rules="emailRules"
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

            <v-text-field v-if="!is_connected && type_login!='login'"
              v-model="password_comfirme"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              required
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirmez le mot de passe"
              counter
              :disabled="is_connected"
              @click:append="show1 = !show1"
              outlined
            ></v-text-field>

            
            <v-btn v-if="!is_connected && type_login=='login'" id="submit-connexion" class="mr-4" color="primary" @click="submit" :disabled="is_connected">
              Se connecter
            </v-btn>

            <v-btn v-if="!is_connected && type_login!='login'" id="submit-connexion" class="mr-4" color="primary" @click="submit" :disabled="is_connected">
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

      <v-col class="empty-col" style="">
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
    email: "",
    show1: false,
    password: "",
    password_comfirme: "",
    snackbar: false,
    text: "",
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  computed: {
    ...mapGetters({
      is_connected: "store_account/is_connected",
      type_login: "store_account/type_login",
    }),
  },
  methods: {
    async submit() {
      if ( this.type_login == "login" ) {
        const res = await this.$store.dispatch(
          "store_account/login_query_token",
          {
            email: this.email,
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
      }
      else {
        if (this.password != "" && this.password_comfirme == this.password && this.email != "") {
          const res = await this.$store.dispatch("store_account/create_token", {
            email: this.email,
            password: this.password,
          });

          this.snackbar = true;

          if ( res ) {
            this.text = "Inscription validé ! Vous allez être redirigez";
            this.clear();
            var this_vue = this;
            setTimeout(function () {
              this_vue.snackbar = false;
              this_vue.$router.push("/login");
            }, 2000);
          }
          else {
            this.text = "Une erreur s'est produite lors de l'inscription";
            setTimeout(function () {
              this.snackbar = false;
            }, 5000);
          }

          
        }
        else{
          this.text = "Remplissez correctement tous les champs";
          this.snackbar = true;
          setTimeout(function () {
            this.snackbar = false;
          }, 5000);
        }
      }
    },
    clear() {
      this.email = "";
      this.password = "";
      this.password_comfirme = "";
    },
  },
};
</script>