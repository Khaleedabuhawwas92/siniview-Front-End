<template lang="pug">
.printing
  v-card
    v-row(align='center')
      v-col(cols='4',v-for="(item, index) in list", :key="index")
          v-card-title.text-h3 {{ item.tab }}
          v-autocomplete(v-model='item.index' :items='items' dense='' :label="item.printerName" filled='' @change="savePrinter(item.id,item.index)")
</template>
<script>
import { mapGetters } from "vuex";
// import fs from 'fs'
export default {
  props: ["dialogPrinter", "test"],
  data() {
    return {
      loading: false,
      items: [],
      values: ['foo', 'bar'],
      value: null,
      html: {},
      print2default: false,
      printers: [],
      windowRef: null,
      selected_printer: '',
      list: [],
    };
  },




  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser", "getPrinterList"]),
  },


  mounted() {
    this.getPrinters()
    this.$nuxt.refresh()
  },

  async fetch() {
    await this.$axios.get(`/items`).then((res) => {
      this.list = res.data

    })

  },
  methods: {
    async savePrinter(id, name) {
      this.$axios.post("/items/updateprinter/" + id, {
        printerName: name
      }).then(function (response) {
        console.log(response.data);
        this.$store.dispatch("fetchMenu");
      }).catch(function (error) {
        console.log(error);
      })

      console.log(id, name);

    },

    async getPrinters() {
      this.getPrinterList.forEach(element => {
        this.items.push(element.name)

      });
    },
    clickHandler(e) {
      this.$emit("toggle");
    },
  },
};
</script>
<style scoped>
* {
  z-index: 100;
  font-size: 9px;
}

.title1 {
  font-family: "GE-Hili" !important;
  font-weight: bold;
}

@media print {

  .hidden-print,
  .hidden-print * {
    display: none !important;
    font-family: "GE-Hili" !important;
  }
}
</style>
