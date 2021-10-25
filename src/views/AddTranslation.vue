<template>
  <div>
    <v-banner v-model="v0" single-line transition="slide-y-transition">
      Vous devez vous connecter pour ajouter un mot.
      <template v-slot:actions="{ dismiss }">
        <v-btn text color="primary" @click="dismiss"> Effacer </v-btn>
      </template>
    </v-banner>
    <v-container class="grey lighten-5 mb-6">
      <v-row align="center" no-gutters>
        <v-col>
          <v-select
            v-model="language_src"
            :items="this.list_language"
            @change="selectSrcLanguage"
            item-text="name"
            item-value="id"
            label="Choisissez"
            single-line
          ></v-select>
        </v-col>

        <v-col align="center"
          ><v-btn icon @click="swapLanguage">
            <v-icon>mdi-swap-horizontal</v-icon>
          </v-btn>
        </v-col>

        <v-col>
          <v-select
            v-model="language_dst"
            :items="this.list_language"
            @change="selectDstLanguage"
            item-text="name"
            item-value="id"
            label="Choisissez"
            single-line
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- Input source language -->
    <v-container class="grey lighten-5 mb-6">
      <v-card-text>
        <v-text-field
          v-model="word_source"
          label="Mot à traduire"
          hide-details="auto"
        ></v-text-field>
      </v-card-text>
    </v-container>
    <!-- Display translation -->
    <v-container grey lighten-5 mb-6>
      <v-textarea
        v-model="word_destination"
        filled
        label="Traduction"
        auto-grow
        row-height="10"
      ></v-textarea>
      <v-row>
        <v-col>
          <v-btn color="red" class="ma-2 white--text" @click="clear">
            Effacer
            <v-icon right dark> mdi-trash-can-outline </v-icon>
          </v-btn></v-col
        >
        <v-col>
          <v-btn
            :loading="add_translation_loading"
            :disabled="!is_connected"
            color="green"
            class="ma-2 white--text"
            @click="add_translation"
          >
            Ajouter
            <v-icon right dark> mdi-plus-circle-outline </v-icon>
          </v-btn></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { instance as axios } from "../service/axios.js";
import { mapGetters } from "vuex";

export default {
  name: "Translation",
  computed: {
    ...mapGetters({
      is_connected: "store_account/is_connected",
      access_token: "store_account/access_token",
    }),
    ...mapState({
      list_language: (state) => state.store_language.listLanguages,
    }),
    items() {
      return this.entries;
    },
  },
  data() {
    return {
      isLoading: false,
      add_translation_loading: false,
      word_source: null,
      word_destination: null,
      language_src: 2,
      language_dst: 1,
      descriptionLimit: 60,
      entries: [],
      search: null,
    };
  },
  methods: {
    selectSrcLanguage() {
      if (this.language_src == this.language_dst) {
        this.language_dst = null;
      }
    },
    selectDstLanguage() {
      if (this.language_src == this.language_dst) {
        this.language_src = null;
      }
    },
    swapLanguage() {
      const tmp = this.language_src;
      this.language_src = this.language_dst;
      this.language_dst = tmp;
    },
    async add_translation() {
      try {
        const data = {
          language_source: this.language_src,
          language_destination: this.language_dst,
          word_source_name: this.word_source,
          word_destination_name: this.word_destination,
        };

        const config = {
          headers: {
            Authorization: "Bearer " + this.access_token,
          },
        };
        console.log(config);
        const res = await axios.post("/add-translation/", data, config);
      } catch (error) {
        console.log(error);
        this.$store.dispatch("store_account/disconnect");
      }
    },
    clear() {
      this.word_source = null;
      this.word_destination = null;
    },
  },
  watch: {
    search(val) {
      // Items have already been loaded
      // if (this.items.length > 0) return
      if (val === null || val == "") return;
      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      // fetch('https://api.publicapis.org/entries')
      fetch(
        process.env.VUE_APP_API_URL +
          "/find-words/" +
          val.toLowerCase() +
          "/" +
          this.language_src +
          "/"
      )
        .then((res) => res.json())
        .then((res) => {
          if (this.entries) {
            this.entries = res;
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
