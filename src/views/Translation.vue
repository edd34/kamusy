<template>
  <div>
    <v-container class="grey lighten-5 mb-6">
      <v-row align="center" no-gutters style="height: 150px;">
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
        <v-autocomplete
          v-model="model"
          :items="entries"
          @blur="update_translated_word()"
          :loading="isLoading"
          :search-input.sync="search"
          color="blue"
          hide-no-data
          hide-selected
          clearable
          item-text="word_source_name"
          item-value="id"
          label="Traduction"
          placeholder="Commencez à taper pour rechercher"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
    </v-container>
    <!-- Display translation -->
    <v-container grey lighten-5 mb-6>
      <v-textarea
        name="input-7-1"
        filled
        label="Mot traduit"
        auto-grow
        row-height="10"
        :value="translation_result"
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
import { mapState } from 'vuex'

export default {
  name: 'Translation',
  computed: {
    ...mapState({
      // list_translations: (state) => state.store_translation.listTranslations,
      // list_word: (state) => state.store_word.listWords,
      list_language: (state) => state.store_language.listLanguages,
    }),
    items() {
      return this.entries
        .filter((entry) => entry.language_destination == this.language_dst)
        .filter((entry) => entry.language_source == this.language_src)
    },
  },
  data() {
    return {
      isLoading: false,
      model: null,
      translation_result: '',
      language_src: 2,
      language_dst: 1,
      descriptionLimit: 60,
      entries: [],
      search: null,
    }
  },
  methods: {
    selectSrcLanguage() {
      if (this.language_src == this.language_dst) {
        this.language_dst = null
      }
    },
    selectDstLanguage() {
      if (this.language_src == this.language_dst) {
        this.language_src = null
      }
    },
    swapLanguage() {
      const tmp = this.language_src
      this.language_src = this.language_dst
      this.language_dst = tmp
    },
    update_translated_word() {
      if (this.model == '' || this.model == null) {
        this.translation_result == ''
        this.entries = []
        return
      } else this.translation_result = this.entries[0].word_destination_name
    },
  },
  watch: {
    search(val) {
      // Items have already been loaded
      // if (this.items.length > 0) return
      this.translation_result = ''
      if (val === null) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      // fetch('https://api.publicapis.org/entries')
      console.log(process.env.VUE_APP_API_URL)
      fetch(
        process.env.VUE_APP_API_URL +
          '/translations/' +
          val +
          '/' +
          this.language_src +
          '/' +
          this.language_dst +
          '/'
      )
        .then((res) => res.json())
        .then((res) => {
          this.entries = res
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>
