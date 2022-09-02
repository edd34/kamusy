<style type="text/css">

    :root {
        --backgroundColor: #f0f2f5; 
        /*#1e1e2f ; #f0f2f5 */
        --blocColor: #1e1e2f;
    }

    html {
        /*overflow: hidden;*/
        background-color: white;
    }
    body {
        background-color: white !important;
    }

    /*--Surcharge--*/
    
    /* app-bar header */
    .v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
        box-shadow: inherit !important;
        background-color: #f0f2f5 !important;
        background-color: var(--backgroundColor) !important;
        position: inherit !important;
        flex: inherit !important;
    }
    .v-sheet.login-page-active {
        display: none;
    }
    #icon-nav span i:before,
    #icon-nav span i:after {
        color: black;
    }
    .v-menu__content {
        left: inherit !important;
        right: 15px !important;
        background-color: var(--blocColor);
    }
    .v-menu__content > div {
        background-color: var(--blocColor) !important;
    }
    .v-menu__content > div a {
        color: white !important;
    }

    #list-item-menu-profile {

    }

    /* nav-bar */
    nav.v-navigation-drawer {
        height: calc(100% - 80px) !important;
        height: calc(100vh - 80px) !important;
        border-radius: 10px;
        /*box-shadow: gray 1px 1px 4px 1px;*/
        /*box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, .1);*/
        margin-left: 10px;
        background-color: inherit !important;
    }
    nav.v-navigation-drawer.login-page-active {
        display: none;
    }

    .theme--light.v-list-item--active:hover::before, .theme--light.v-list-item--active::before{
        background-color: currentColor;
        opacity: 0.3;
    }

    .theme--light.v-input, .theme--light.v-input:focus, 
    .theme--light.v-select::placeholder,
    .theme--light.v-icon,
    label.theme--light {
        color: white !important;
        caret-color:  blue !important;
    }
    .theme--light.v-text-field > .v-input__control > .v-input__slot::before {
        border-color: white !important;
    }
    button:disabled .v-btn__content .v-icon::before,
    button:disabled .v-btn__content .v-icon::after,
    button:disabled .v-btn__content {
        color: grey;
    }

    .v-select::placeholder, .v-select {
        color: white !important;
    }

    /* when bar closed */
    .v-navigation-drawer__content.closed .theme--light.v-list-item--active:hover::before, .v-navigation-drawer__content.closed .theme--light.v-list-item--active::before {
        width: 200px;
        background-color: #f0f2f5;
        background-color: var(--backgroundColor) ;
        opacity: 1;
    }

    .v-navigation-drawer__content.closed .v-list .v-list-item--active {
        z-index: 2;
        margin-left: 10px;
    }

    .v-navigation-drawer__content.closed .v-list .v-list-item--active .v-icon {
        color: black !important;
        /*color: white !important;*/
    }

    /* Global */
    .v-list-item--link::before {
        opacity: 1;
        background-color: inherit;
        border-radius: 20px 0px 0px 20px !important;
    }
    .v-list-item__content {
        z-index: 1;
    }

    .v-navigation-drawer__content {
        background-image: linear-gradient(195deg,#42424a,#191919) !important;
        background-image: linear-gradient(195deg,#27293d,#191919) !important;
        /*background: linear-gradient(0deg,#389466,#42b883) !important;*/
    }

    /*background*/
    #inspire {
        background-color: var(--backgroundColor) !important;
        background-image: inherit;
        border-radius: 30px;
        border: solid 15px black;
        margin: 15px;
        overflow: hidden;
    }

    

    /*--End Surcharge--*/


    /*-- Other --*/

    .col-n {
        padding: 2px 2px 15px 15px;
        height: 100%;
    }

    .icon-bar, .title-bar {
        color: white !important;
    }

    .text-h6, .text-h6 + .v-list-item__subtitle {
        color: white !important;
    }

    .white-font {
        color: white !important;
    }

    /*-- End Other --*/

</style>

<template>
    <v-app id="inspire" v-bind:class="classObject">

    <!-- header -->
    <v-app-bar app style="left: 0px !important" v-bind:class="classObject">
        <v-app-bar-nav-icon id="icon-nav" class="" @click="closeLeftBar"></v-app-bar-nav-icon>
        <!-- <img  src="/favicon.ico"></img> -->
        <v-toolbar-title class="">Kamusy</v-toolbar-title>
        <v-row>
            <v-col align="right">
                <div>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn id="btn-profile" color="primary" dark v-bind="attrs" v-on="on">
                                <v-icon>mdi-account</v-icon>
                            </v-btn>
                        </template>

                        <v-list v-if="!is_connected">
                            <v-list-item id="list-item-menu-profile"
                            v-for="(item, index) in items_account_menu_disconnected"
                                :key="index"
                                :to="item.to"
                                link
                            >
                                <v-list-item-icon>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title  style="">
                                    {{ item.title }}
                                </v-list-item-title>
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
                            </v-list-item>
                        </v-list>
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
            <v-navigation-drawer id="nav-bar" v-bind:class="classObject" v-model="drawer" app style="transform: translate(0%) !important;">
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
                    <v-icon class="icon-bar">{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title class="title-bar">{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
            <!-- end nav bar -->
        </div>

        <div class="col-router">
            <router-view style=""></router-view>
        </div>
    </div>

  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import $ from 'jquery'; // ** n'oubliez pas d'ajouter jquery au module (car ce n'est pas dèja le cas)
// import Chart from 'chart.js';
import Vue from 'vue'

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
    ],
    items_account_menu_disconnected: [
      { title: "Se connecter", icon: "mdi-login", to: "/login" },
      { title: "S'inscrire", icon: "mdi-account-add", to: "/registration" },
    ],
    items_account_menu_connected: [
      { title: "Se déconnecter", icon: "mdi-logout", to: "/logout" },
    ],
    classObject: {
        active: false,
        'text-danger': false,
        'login-page-active': false,
    }
  }),
  methods: {
    disconnect: () => {
      this.$store.dispatch("store_account/disconnect");
    },
    updateBar() {
        if( ! this.openLeftBar ){

            $(".v-navigation-drawer__content").addClass("closed");

            $("nav.v-navigation-drawer").css("position", "inherit");
            $("nav.v-navigation-drawer").css("width", "57px");
            $("nav.v-navigation-drawer").css("transform", "translateX(0%)");

            $(".v-list-item__subtitle").css("visibility", "hidden");
        }
        else{
            $("nav.v-navigation-drawer").css("position", "inherit");
            $("nav.v-navigation-drawer").css("width", "256px");
            $("nav.v-navigation-drawer").css("visibility", "visible");
            $("nav.v-navigation-drawer").css("transform", "translateX(0%)");

            $(".v-navigation-drawer__content").removeClass("closed");

            $(".v-list-item__subtitle").css("visibility", "visible");
        }
        $("header.v-sheet").css("left", "0px");
    },
    closeLeftBar () {
        // this.drawer = !this.drawer
        this.openLeftBar = !this.openLeftBar;
        this.updateBar(); 
    },
    init () {
        var this_vue = this
        $( document ).ready(function() {
            console.log("ready", $('a[href="#/login"]'))
            $('a[href="#/login"]').on("click", function () {
                console.log("coooo")
                $("nav.v-navigation-drawer").css("display", "none");
                $("header").css("display", "none");
            });

            Vue.nextTick(() => {
                console.log("ready", $('a[href="#/login"]'))
                console.log("url", window.location.hash)
            });

            if (window.location.hash == "#/login" || window.location.hash == "#/registration") {
                this_vue.classObject["login-page-active"] = true
            }
            else {
                this_vue.classObject["login-page-active"] = false;
            }
        });
    }
  },
    mounted() {
        this.$store.dispatch("store_account/load_token");
        this.$store.dispatch("store_language/getListLanguages");

        // js and css change property
        $("nav.v-navigation-drawer").css("left", "0px");
        this.closeLeftBar();
        var this_vue = this;
        $(window).resize(function () {
            this_vue.updateBar();
        });
        document.getElementById("nav-bar").addEventListener('DOMAttrModified', function(e){
            this_vue.updateBar();
        }, true);

        this.$nextTick(function () {
            this_vue.init();
            $("#btn-profile").on("click", function(){
                $('a[href="#/login"], a[href="#/registration"]').on("click", function () {
                    this_vue.classObject["login-page-active"] = true
                });
            })
        });

        const urlChange = () => {
            if (window.location.hash == "#/login" || window.location.hash == "#/registration") {
                this_vue.classObject["login-page-active"] = true
            }
            else {
                this_vue.classObject["login-page-active"] = false;
            }
        };

        window.addEventListener('popstate', urlChange);

        // Useful for cleanup when component is destroyed
        this.cleanup = urlChange;

    },

};



</script>
