<style type="text/css">

    .cont-all {
        margin-left: auto;
        margin-right: auto;
    }

    .content-bloc {
        margin-top: auto; 
        margin-bottom: auto;
        width: 100% !important;
        max-width: 100% !important;
        font-family: "Roboto",Helvetica,Arial,sans-serif !important;
    }
    .content-head-blocs {
        display: flex;
        height: 100vh;
    }
    .content-bloc-words {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .content-bloc-other {
        /*padding: 20px;*/
        flex: 1.02;
    }

    .col-router {
        width: 100%;
        padding: 20px;
    }

    .bloc{
        min-width: 500px;
        padding: 5px !important;
        flex: 1;
    }

    .bloc > div {
        /*box-shadow: 2px 4px 6px 4px rgba(0, 0, 0, .1);*/
        box-shadow: 0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06);
        border-radius: 10px;
        background-color: white;
        background: #27293d;
    }

    /* Trauction */
    .bloc-1 {
        /*padding: 15px !important;*/
        min-height: 420px !important;
    }
    .bloc-1 > div {
        height: 100% !important;
    }


    /* Graphs */
    .checked-word > div {
        padding: 10px 5px 10px 5px;
        /*background-image: linear-gradient(195deg,#66bb6a,#43a047);*/
        background-image: linear-gradient(195deg,#42424a,#191919);
    }

    .add-word > div {
        padding: 10px 5px 10px 5px;
        background-image: linear-gradient(195deg,#42424a,#191919);
    }

</style>

<template>
    <div class="col-b" style="width: 100%">
        <v-container class="cont-all">
            <v-row class="">

                <!-- Traduction -->
                <div class="bloc-1 bloc" style="">
                    <div class="containe-container">
                        <v-container class="">
                            <v-row align="center" no-gutters>
                                <v-col>
                                    <v-select class="white-font"
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
                                >
                                    <v-btn icon @click="swapLanguage">
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
                        <v-container class=" no-wrap">
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
                                        color="black"
                                        class="ma-2 white--text"
                                        @click="get_translated_word()"
                                        >
                                        Go
                                        <v-icon right dark> mdi-auto-fix </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                        <!-- Display translation -->
                        <v-container >
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
                </div>

                <!-- Bloc graphique et autres -->
                <div class="content-bloc-other " style="">
                    <div class="">
                    <v-row class="custom-row" style="">
                        <v-col class="bloc  ">
                            <!-- Dictionnaire -->
                            <div class="dico" style="width:100%; height: 200px;">

                            </div>
                        </v-col>
                    </v-row>

                    <!-- blocs words graph -->
                    <v-row class="content-bloc-words custom-row">

                        <div class="checked-word bloc " style="min-width: 100px;">
                            <!-- Mots valider -->
                            <div class="" style="width:100%; overflow: hidden;">
                                <LineChart :chart-id="chartID2" :chart-data="chartData2" />
                            </div>
                        </div>

                        <div class="add-word bloc " style="min-width: 100px;" >
                            <!-- Mots ajouter -->
                            <div style="width:100%; overflow: hidden;">
                                <!-- <BarChart />  -->
                                <LineChart  />
                            </div>
                        </div>

                    </v-row>
                    </div>
                </div>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex"; 
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'


export default {
  name: "Translation",
  
  components: { BarChart, LineChart },
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
      chartID2: "line-chart2",
      chartData2: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data two',
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 3,
            pointStyle: 'rectRot',
            pointRadius: 5,
            pointBorderColor: 'white',
            color: 'white',
            data: [20, 39, 80, 40, 39, 80, 40]
          }
        ]
    },
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
    do_perfect_square () {
        // To make perfect square
        if( parseInt($(".col-b > .container").css("width").replace("px", "")) > 1000 ) {
            // Traduction
            var width = parseInt($(".bloc-1").css("width").replace("px", ""));
            $(".bloc-1").css("height", width + "px");
            $(".content-bloc-other").css("width", width + "px !important");

            // dico
            var cont_heigth = parseInt($(".bloc-1").css("height").replace("px", ""));
            var cont_words_width = parseInt($(".content-bloc-words").css("height").replace("px", ""));
            // TODO : make padding (12 - 20 + 5) get by css js
            $(".dico").css("height", (cont_heigth - cont_words_width - 10) + "px");
        }
    },
  },
  mounted() {
    var view = this;
    this.do_perfect_square();
    $(window).resize(function() {
        view.do_perfect_square();
    });
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
          "/find-words-2/" +
          val.toLowerCase() +
          "/" +
          this.language_src +
          "/" +
          this.language_dst +
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

<!-- chart js graph -->
 