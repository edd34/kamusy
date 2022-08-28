<style type="text/css">

    /*--Surcharge--*/
    
    /* app-bar header */
    .v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
        box-shadow: inherit !important;
        background-color: #f8f9fa !important;
        position: inherit !important;
        flex: inherit !important;
    }

    /* nav-bar */
    nav.v-navigation-drawer {
        height: 100% !important;
        border-radius: 10px;
        /*box-shadow: gray 1px 1px 4px 1px;*/
        box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, .1);
        /*margin-left: 5px;*/
    }

    #inspire {
        background-color: #f8f9fa !important;
    }

    /*--End Surcharge--*/


    /*-- Other --*/

    .col-n {
        padding: 2px 2px 15px 15px;
        height: 100%;
    }

    /*-- End Other --*/

</style>

<template>
    <v-app id="inspire">

    <!-- header -->
    <v-app-bar app>
        <v-app-bar-nav-icon @click="closeLeftBar"></v-app-bar-nav-icon>
        <img  src="/favicon.ico"></img>
        <v-toolbar-title>Kamusy</v-toolbar-title>
        <v-row>
            <v-col align="right">
                <div>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                <v-icon>mdi-account</v-icon>
                            </v-btn>
                        </template>
                        <v-list v-if="!is_connected">
                            <v-list-item
                            v-for="(item, index) in items_account_menu_disconnected"
                            :key="index"
                            :to="item.to"
                            link
                            >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        <v-list v-if="is_connected">
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-check</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Vous êtes connecté</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                            v-for="(item, index) in items_account_menu_connected"
                            :key="index"
                            :to="item.to"
                            link
                            >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item></v-list>
                    </v-menu>
                </div>
            </v-col>
        </v-row>
    </v-app-bar>
    
    <!-- Block -->
    <!-- TODO : en faire une vue a part entiére -->
    <div class="content-head-blocs">
        <div class="col-n cols">
            <!-- nav bar -->
            <v-navigation-drawer v-model="drawer" app>
              <v-list-item>
                <v-list-item-content>
                  <v-row>
                    <!-- <v-col cols="3" center>
                      <v-img contains src="/favicon.ico"></v-img>
                    </v-col> -->
                    <v-col cols="9">
                      <v-list-item-title class="text-h6"> Kamusy </v-list-item-title>
                      <v-list-item-subtitle>
                        Le dictionnaire mahorais
                      </v-list-item-subtitle></v-col
                    >
                  </v-row>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
            <!-- end nav bar -->
        </div>

        <div class="col-b cols">
            <v-container class="" style="" >
                <v-row>
                    <v-col class="" style="">
                        <router-view style=""></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>

  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import $ from 'jquery'; // ** n'oubliez pas d'ajouter jquery au module (car ce n'est pas dèja le cas)
// import Chart from 'chart.js';

export default {
  computed: {
    ...mapGetters({
      is_connected: "store_account/is_connected",
    }),
  },
  data: () => ({
    drawer: false, //devenu inutile (sauf pour l'adaptation mobil à faire)
    openLeftBar: false,
    closeLeftBarClass: "close-left",
    items: [
      { title: "Traductions", icon: "mdi-translate", to: "/" },
      {
        title: "Ajouter traduction",
        icon: "mdi-pen-plus",
        to: "/add-translation",
      },
      {
        title: "Mots mêlés 🇾🇹",
        icon: "mdi-information",
        to: "/word-search-yt?lang=mahorais",
      },
      {
        title: "Mots mêlés 🇲🇬",
        icon: "mdi-information",
        to: "/word-search-mg?lang=kibushi",
      },
      { title: "À Propos", icon: "mdi-information", to: "/about" },
      { title: "Graph", icon: "mdi-information", to: "/chart" },
    ],
    items_account_menu_disconnected: [
      { title: "Se connecter", icon: "mdi-login", to: "/login" },
      { title: "S'inscrire", icon: "mdi-account-add", to: "" },
    ],
    items_account_menu_connected: [
      { title: "Se déconnecter", icon: "mdi-logout", to: "/logout" },
    ],
  }),
  methods: {
    disconnect: () => {
      this.$store.dispatch("store_account/disconnect");
    },
    closeLeftBar () {
        // this.drawer = !this.drawer
        
        this.openLeftBar = !this.openLeftBar;
        if( ! this.openLeftBar ){

            $("nav.v-navigation-drawer").css("position", "inherit");
            $("nav.v-navigation-drawer").css("width", "57px");
            $("nav.v-navigation-drawer").css("transform", "translateX(0%)");

            $(".v-list-item__subtitle").css("color", "white");
        }
        else{
            $("nav.v-navigation-drawer").css("position", "inherit");
            $("nav.v-navigation-drawer").css("width", "256px");
            $("nav.v-navigation-drawer").css("visibility", "visible");
            $("nav.v-navigation-drawer").css("transform", "translateX(0%)");

            $(".v-list-item__subtitle").css("color", "gray");
        }
        
    },
  },
    mounted() {
        this.$store.dispatch("store_account/load_token");
        this.$store.dispatch("store_language/getListLanguages");

        // js and css change property
        $("nav.v-navigation-drawer").css("left", "0px");
        this.closeLeftBar();
    },
};



</script>
