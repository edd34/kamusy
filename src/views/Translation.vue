<template>
  <div>
    <v-container class="grey lighten-5 mb-6">
      <v-row align="center" no-gutters style="height: 150px;">
        <v-col>
          <v-select
            v-model="select"
            :items="items"
            item-text="state"
            item-value="abbr"
            label="Select"
            return-object
            single-line
          ></v-select>
        </v-col>

        <v-col align="center"
          ><v-btn icon>
            <v-icon>mdi-swap-horizontal</v-icon>
          </v-btn>
        </v-col>

        <v-col>
          <v-select
            v-model="select"
            :items="items"
            item-text="state"
            item-value="abbr"
            label="Select"
            return-object
            single-line
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- Input source language -->
    <v-container class="grey lighten-5 mb-6">
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label="Search for a coin..."
        solo
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for your favorite
              <strong>Cryptocurrency</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <v-icon left>
              mdi-bitcoin
            </v-icon>
            <span v-text="item.name"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="indigo"
            class="text-h5 font-weight-light white--text"
          >
            {{ item.name.charAt(0) }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-bitcoin</v-icon>
          </v-list-item-action>
        </template>
      </v-autocomplete>
    </v-container>
    <!-- Display translation -->
    <v-container grey lighten-5 mb-6>
      <v-textarea
        name="input-7-1"
        filled
        label="Label"
        auto-grow
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        readonly
      ></v-textarea>
    </v-container>

    <!-- Display description -->
    <!-- TODO : implement description -->
    <!-- <v-container fluid>
      <v-textarea
        name="input-7-1"
        filled
        label="Label"
        auto-grow
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      ></v-textarea>
    </v-container> -->
  </div>
</template>

<script>
export default {
  name: 'Translation',
  data() {
    return {
      alignments: ['start', 'center', 'end'],
      isLoading: false,
      items: [],
      model: null,
      search: null,
      tab: null,
      select: { state: 'Florida', abbr: 'FL' },
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' },
      ],
    }
  },
  components: {},
  watch: {
    model(val) {
      if (val != null) this.tab = 0
      else this.tab = null
    },
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      this.isLoading = true

      // Lazily load input items
      fetch('https://api.coingecko.com/api/v3/coins/list')
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>
