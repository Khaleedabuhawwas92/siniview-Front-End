<template>
  <v-app class="admin">
    <nuxt />
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {

    };
  },
  asyncData() {
    this.$store.dispatch("fetchMenu");
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser", "getMenuList", "getPrinterList"]),
  },
  async beforeMount() {
    await this.$store.dispatch("fetchMenu");
    console.log(this.getMenuList);

  },

};


</script>


<style scoped>
.admin {
  /* font-family: "GE-Hili" !important; */
}

* {}
</style>
