<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col align="center" class="h3"> Vous êtes déconnecté. </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("store_account/disconnect");
  },
};
</script>