<style type="text/css">

    /* Surcharge */
    .theme--light.v-chip:not(.v-chip--active),
    .theme--dark.v-chip:not(.v-chip--active) {
        /*background-color: var(--backgroundColor);*/
    }
    .v-chip-dico .v-chip__content{
        color: black !important;
    }
    hr[role="separator"] {
        background-color: black;
    }

    textarea[name="input-7-1"] {
        color: white !important;
    }

    /**/

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
    @media (min-width: 640px) {
        .content-head-blocs {
            display: flex;
            height: 100vh;
        }
    }
    @media (max-width: 640px) {
        .content-head-blocs {
            height: 0px;
        }
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

    @media (min-width: 500px) {
        .bloc {
            min-width: 500px;
        }
    }
    @media (max-width: 500px) {
        .bloc {
            min-width: 300px;
        }
    }

    .bloc {
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
    .checked-word {
        min-width: 220px;
    }
    .checked-word > div {
        padding: 10px 5px 10px 5px;
        /*background-image: linear-gradient(195deg,#66bb6a,#43a047);*/
        /*background-image: linear-gradient(195deg,#42424a,#191919);*/
    }

    .add-word {
        min-width: 220px;
    }
    .add-word > div {
        padding: 10px 5px 10px 5px;
        /*background-image: linear-gradient(195deg,#42424a,#191919);*/
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
                                    <v-select class="white--text"
                                    v-model="language_src"
                                    :items="this.list_language"
                                    @change="selectSrcLanguage"
                                    item-text="name"
                                    item-value="id"
                                    label="Choisissez"
                                    dense
                                    rounded
                                    filled
                                    solo
                                    ></v-select>
                                </v-col>

                                <v-col style="height: 64px;" align="center"
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
                                    dense
                                    rounded
                                    filled
                                    solo
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-container>

                        <!-- Input source language -->
                        <v-container class=" no-wrap">
                            <v-row align="center" no-gutters>
                                <!-- <v-col class="col-9" align="center"> -->
                                    <v-autocomplete
                                    id="auto-trad"
                                    v-model="model"
                                    :items="entries"
                                    @change="get_translated_word()"
                                    :loading="isLoading"
                                    :search-input.sync="search"
                                    color="blue"
                                    item-color="blue"
                                    background-color="blue"
                                    hide-no-data
                                    item-text="name"
                                    item-value="id"
                                    label="Traduction"
                                    placeholder="Commencez à taper pour rechercher"
                                    return-object
                                    
                                    chips
                                    clearable
                                    deletable-chips
                                    filled
                                    rounded
                                    multiple
                                    ></v-autocomplete>
                                <!-- </v-col> -->

                                <!-- <v-col align="center" class="col-3" style="height: 80px;">
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
                                </v-col> -->
                            </v-row>
                        </v-container>
                        <!-- Display translation -->
                        <v-container >
                            <v-textarea style="color: white !important;"
                            id="input-7-1"
                            name="input-7-1"
                            filled
                            label="Mots traduit"
                            auto-grow
                            row-height="10"
                            :value="result_entries"
                            :loading="isWordLoading"
                            readonly
                            rounded
                            ></v-textarea>
                        </v-container>

                        <div class="words-unknown" style="width:100%;">
                            <v-card-text>
                                <span class="subheading white--text subtitle-1">Mots inconnue</span>
                                <v-divider class="mx-1"></v-divider>
                                <div class="pa-2">
                                    <v-chip-group
                                      active-class="accent--text"
                                      column
                                    >
                                        <v-chip
                                        v-for="word in words_unknown"
                                        :key="word"
                                        color="blue"
                                        @mouseover="addword()"
                                        class="v-chip-unknown"
                                        >
                                            {{ word }}
                                        </v-chip>
                                    </v-chip-group>
                                
                                </div>
                            </v-card-text>
                        </div>

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
                            <div class="dico" style="width:100%;">
                                <v-card-text>
                                    <span class="subheading white--text text-h6">Synonymes</span>
                                    <!-- <v-card-title>Synonymes</v-card-title> -->
                                    <v-divider class="mx-1"></v-divider>
                                    <div class="pa-2">
                                        <v-chip-group
                                          active-class="accent--text"
                                          column
                                        >
                                            <v-chip
                                            v-for="synonyme in dico_synonyme"
                                            :key="synonyme"
                                            color="blue"
                                            class="v-chip-dico"
                                            >
                                                {{ synonyme }}
                                            </v-chip>
                                        </v-chip-group>
                                    
                                    </div>
                                </v-card-text>
                            </div>
                        </v-col>
                    </v-row>

                    <!-- blocs words graph -->
                    <v-row class="content-bloc-words custom-row">

                        <div class="checked-word bloc " style="">
                            <!-- Mots valider -->
                            <div class="" style="width:100%; overflow: hidden;">
                                <LineChart :chart-id="chartID2" :chart-data="chartData2" />
                            </div>
                        </div>

                        <div class="add-word bloc " style="" >
                            <!-- Mots ajouter -->
                            <div style="width:100%; overflow: hidden;">
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

<script type="text/javascript">
    
</script>

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
            var view = this;
            this.words_unknown = [];
            return this.translation_result
                .map(
                    function(currentValue, index) { 

                        if( currentValue.word_destination_name == "unknown" ){
                            view.words_unknown.push(currentValue.word_source_name);
                            return currentValue.word_source_name + " : inconnue\n";
                        }
                        else{
                            return (index + 1).toString() + ". " + currentValue.word_destination_name + "\n";
                        }

                     }
                ).join("");
        } else {
            return
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
      words_pretraduction: [],
      words_unknown: [],
      chartID2: "line-chart2",
      dico_synonyme : [ //Exemple
          'plaisir',
          'joie',
          'epanouissement',
          'bonheur',
          'amour',
          'Shopping',
          'Art',
          'Tech',
          'Creative Writing',
        ],
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

            return "";
        } else {
            this.isWordLoading = true;
            var id_words = "";
            for (var i = 0; i < this.model.length; i++) {
                id_words += this.model[i].id + "_";
            }
            id_words = id_words.replace(new RegExp("_$"), "");

            // fetch(
            //     process.env.VUE_APP_API_URL +
            //     "/get-translation/" +
            //     this.model.id +
            //     "/" +
            //     this.language_src +
            //     "/" +
            //     this.language_dst +
            //     "/"
            // )
            
            fetch(
                process.env.VUE_APP_API_URL +
                "/api/get-translation-multi/" +
                id_words +
                "/" +
                this.language_src +
                "/" +
                this.language_dst +
                "/"
            )
            .then((res) => res.json())
            .then((res) => {
                this.translation_result = res;
            })
            .catch((err) => {
                console.log("Error get_translated_word() :", err);
            })
            .finally(() => {
                // demo
                var array = [];
                var nb = Math.floor(Math.random() * 10) + 1;
                for (var i = 0; i < nb; i++) {
                    array.push("Synonymes " + i)
                }
                this.dico_synonyme = array;
                this.isWordLoading = false;
            });
        }
    },
    searchPredictedWords(val) {

        if (val === null || val == "") return;

        fetch(
            process.env.VUE_APP_API_URL +
                "/api/words_multi/" +
                val.toLowerCase().replaceAll(" ", "_") +
                "/" +
                this.language_src +
                "/" +
                this.language_dst +
                "/"
        )
        .then((res) => res.json())
        .then((res) => {
            this.translation_result = res;
        })
        .catch((err) => {
            console.log(err);
        })
    },
    do_perfect_square () {
        // To make perfect square
        if( $(".col-b > .container").length && parseInt($(".col-b > .container").css("width").replace("px", "")) > 1000 ) {
            // Traduction
            var width = parseInt($(".bloc-1").css("width").replace("px", ""));
            $(".bloc-1").css("height", width + "px");
            $(".content-bloc-other").css("width", width + "px !important");

            // dico
            var cont_heigth = parseInt($(".bloc-1").css("height").replace("px", ""));
            var cont_words_height = parseInt($(".content-bloc-words").css("height").replace("px", ""));
            // TODO : make padding (10) get by css js
            $(".dico").css("height", (cont_heigth - cont_words_height - 10) + "px");
        }
    },
    addword() {
        var view = this;
        $(".v-chip-unknown, .v-chip-unknown span").on("click", function () {
            view.$store.dispatch("store_translation/setWordSource", $(this).text().replaceAll(" ", ""));
            view.$router.push("/add-translation");
        });
    },
  },
  mounted() {
    var view = this;
    this.do_perfect_square();
    $(window).resize(function() {
        view.do_perfect_square();
    });

    $(".btn-word").on("click", function(e) {
        // console.log($(this).attr("data-word"), $(this).attr("data-id"))
    })

    // TODO : in mode v2 get word with editing textarea
    $("#input-7-1").on("click", function(e) {
        // console.log(e.currentTarget.selectionStart)
    });

    //Pretraduction
    $("#auto-trad").on("keyup", function () {
        if ( this.model == "" || this.model == null ) {
            // Pretraduction
            // console.log("prediction", $("#auto-trad")[0]._value, ( $("#auto-trad")[0]._value !=  "" && $("#auto-trad")[0]._value != null ))
            if ( $("#auto-trad")[0]._value !=  "" && $("#auto-trad")[0]._value != null )
                view.searchPredictedWords($("#auto-trad")[0]._value);
            else
                view.translation_result = "";
        }
    });
  },
  watch: {
    search(val) {
      // Items have already been loaded
      // if (this.items.length > 0) return
      // this.translation_result = "";
      if (val === null || val == "") return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      // fetch('https://api.publicapis.org/entries')
      fetch(
        process.env.VUE_APP_API_URL +
          "/api/find-words-2/" +
          val.toLowerCase() +
          "/" +
          this.language_src +
          "/" +
          this.language_dst +
          "/"
      )
        .then((res) => res.json())
        .then((res) => {
            this.entries = res.concat(this.model);
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
 