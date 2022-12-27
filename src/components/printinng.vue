<template lang="pug" ref="template">
v-dialog(v-model="clickHandler", max-width="400", persistent)
  v-card
    v-card-title.text-center تعريف الطابعات
    v-container(fluid='')
      v-row(align='center')
        v-col(cols='12',v-for="(item, index) in getMenuList", :key="index")
          v-card-title.text-h3 {{ item.tab }}
          v-autocomplete(v-model='item.index' :items='items' dense='' filled='' autofocus  )
      v-btn.button-style(:loading="loading",
      color="green"
        class="ma-1"
        @click="savePrinter(item.id,items.name)")  حفظ
      v-btn.button-style(@click="clickHandler", color="red") اغلاق

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
      selected_printer: ''

    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser", "getMenuList", "getPrinterList"]),

  },

  mounted() {
    this.getPrinters()
  },

  methods: {
    async savePrinter(id, name) {
      // this.loading = true
      // this.$axios.put("/printers/" + id, {
      //   printerName: this.printerName
      // }).then(function (response) {
      //   console.log(response);
      //   this.$nuxt.refresh()
      // }).catch(function (error) {
      //   console.log(error);
      // })
      // await new Promise(resolve => setTimeout(resolve, 3000))
      // this.loading = false
      console.log(id, name);
      this.clickHandler();
    },
    onPrinterChange: function (value) {
    },
    async getPrinters() {
      this.getPrinterList.forEach(element => {
        this.items.push(element.name)
      });
    },
    exportHTM: function () {
    },
    getHTML: function () {
    },
    clickHandler(e) {

      this.$emit("toggle");
    },

    close: function () {
    },
    print() {
    }
  },
};
</script>
<style  scoped>
* {
  z-index: 100;
  font-size: 9px;
  font-family: 'Times New Roman';
}

@media print {

  .hidden-print,
  .hidden-print * {
    display: none !important;
  }
}
</style>
