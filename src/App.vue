<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Kamusy
          </v-list-item-title>
          <v-list-item-subtitle>
            Le dictionnaire mahorais
          </v-list-item-subtitle>
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

    <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title >Kamusy</v-toolbar-title>
      <v-row>
        
        <v-col align="end">
           <div >
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items_account_menu"
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

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      { title: 'Traductions', icon: 'mdi-translate', to: '/' },
      { title: 'À Propos', icon: 'mdi-information', to: '/about' },
    ],
    items_account_menu: [
      { title: 'Se connecter', icon: 'mdi-login', to: '/login' },
      { title: 'Se déconnecter', icon: 'mdi-logout', to: '/login' },
      { title: 'S\'inscrire', icon: 'mdi-account-add', to: '/login' },
    ],
  }),
  mounted() {
    // this.$store.dispatch("store_translation/getListTranslations");
    // this.$store.dispatch("store_word/getListWords");
    this.$store.dispatch('store_language/getListLanguages')
  },
}
</script>
