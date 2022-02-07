<template>
  <div>
    <v-container class="grey lighten-5">
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
    <v-container class="grey lighten-5 no-wrap">
      <v-row align="center" no-gutters>
        <v-col class="col-9">
          <v-autocomplete
            v-model="model"
            :items="entries"
            @blur="get_translated_word()"
            :loading="isLoading"
            :search-input.sync="search"
            color="blue"
            hide-no-data
            hide-selected
            clearable
            item-text="name"
            item-value="id"
            label="Traduction"
            placeholder="Commencez à taper pour rechercher"
            prepend-icon="mdi-database-search"
            return-object
          ></v-autocomplete
        ></v-col>
        <v-col align="center" class="col-3">
          <v-btn
            align="center"
            :loading="isWordLoading"
            color="green"
            class="ma-2 white--text"
          >
            Go
            <v-icon right dark> mdi-auto-fix </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <!-- Display translation -->
    <v-container grey lighten-5>
      <v-textarea
        name="input-7-1"
        filled
        label="Mot traduit"
        auto-grow
        row-height="10"
        :value="result_entries"
        :loading="isWordLoading"
        readonly
      ></v-textarea>
    </v-container>

    <!-- Display description -->
    <!-- TODO : implement description -->
    <!-- <v-container mb-6>
      <v-textarea
        name="input-7-1"
        filled
        label="Définition"
        auto-grow
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      ></v-textarea>
    </v-container> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Translation",
  computed: {
    ...mapState({
      list_language: (state) => state.store_language.listLanguages,
    }),
    ...mapGetters({
      is_connected: "store_account/is_connected",
    }),
    items() {
      return this.entries;
    },
    result_entries() {
      if (this.translation_result) {
        return this.translation_result
          .map(
            (currentValue, index) =>
              (index + 1).toString() +
              ". " +
              currentValue.word_destination_name +
              "\n"
          )
          .join("");
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      isLoading: false,
      isWordLoading: false,
      model: null,
      translation_result: "",
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
      } else if (
        (this.list_language[this.language_src - 1].name == "mahorais" &&
          this.list_language[this.language_dst - 1].name == "kibushi") ||
        (this.list_language[this.language_src - 1].name == "kibushi" &&
          this.list_language[this.language_dst - 1].name == "mahorais")
      ) {
        this.language_src = null;
      }
    },
    selectDstLanguage() {
      if (this.language_src == this.language_dst) {
        this.language_src = null;
      } else if (
        (this.list_language[this.language_src - 1].name == "mahorais" &&
          this.list_language[this.language_dst - 1].name == "kibushi") ||
        (this.list_language[this.language_src - 1].name == "kibushi" &&
          this.list_language[this.language_dst - 1].name == "mahorais")
      ) {
        this.language_dst = null;
      }
    },
    swapLanguage() {
      const tmp = this.language_src;
      this.language_src = this.language_dst;
      this.language_dst = tmp;
    },
    get_translated_word() {
      if (this.model == "" || this.model == null) {
        // not words typed inside traduction field
        this.translation_result = "";
        this.entries = [];
        return;
      } else {
        this.isWordLoading = true;
        fetch(
          process.env.VUE_APP_API_URL +
            "/get-translation/" +
            this.model.id +
            "/" +
            this.language_src +
            "/" +
            this.language_dst +
            "/"
        )
          .then((res) => res.json())
          .then((res) => {
            this.translation_result = res;
            if (res.length == 0) {
              // TODO translation do not exist
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => (this.isWordLoading = false));
      }
    },
  },
  watch: {
    search(val) {
      // Items have already been loaded
      // if (this.items.length > 0) return
      this.translation_result = "";
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
          this.entries = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
