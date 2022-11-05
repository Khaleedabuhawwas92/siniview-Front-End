<template lang="pug" ref="template">
v-dialog(v-model="clickHandler", max-width="400", persistent)
  v-card.text-center
    v-card-title.text-h5
      | هل انتا متاكد من تسجيل الخروج
    v-card-text.text-h3
      #main.ticket(ref="modelDiv")
        // <img src="./logo.png" alt="Logo">
        p.centered
          | RECEIPT EXAMPLE
          br
          | Address line 1
          br
          | Address line 2
        table
          thead
            tr
              th.quantity Q.
              th.description Description
              th.price $$
          tbody
            tr
              td.quantity 1.00
              td.description ARDUINO UNO R3
              td.price $25.00
            tr
              td.quantity 2.00
              td.description JAVASCRIPT BOOK
              td.price $10.00
            tr
              td.quantity 2.00
              td.description JAVASCRIPT BOOK
              td.price $10.00
            tr
              td.quantity 2.00
              td.description JAVASCRIPT BOOK
              td.price $10.00
            tr
              td.quantity 2.00
              td.description JAVASCRIPT BOOK
              td.price $10.00
            tr
              td.quantity 1.00
              td.description STICKER PACK
              td.price $10.00
            tr
              td.quantity
              td.description TOTAL
              td.price $55.00
        p.centered
          | Thanks for your purchase!
          br
          | parzibyte.me/blog
        button(@click="onInit()") print
</template>
<script>
import * as JSPM from 'jsprintmanager'
// import { ipRenderer } from 'electron'
// import fs from 'fs'
export default {
  template: "<p>Hello {{name}}</p>",
  props: ["dialogPrinter", "test"],
  data() {
    return {
      html: {},
      print2default: false,
      printers: [],
      windowRef: null,
      selected_printer: ''

    };
  },

  methods: {
    doPrintPDF: function () {
      if (this.selected_printer === '' && !this.print2default) {
        alert("You must select a printer");
        return;
      }
      let cpj = new JSPM.ClientPrintJob();
      if (this.print2default) {
        cpj.clientPrinter = new JSPM.DefaultPrinter();
      } else {
        cpj.clientPrinter = new JSPM.InstalledPrinter(this.selected_printer);
      }
      var my_file = new JSPM.PrintFilePDF(
        'https://neodynamic.com/temp/LoremIpsum.pdf',
        JSPM.FileSourceType.URL,
        'MyFile.pdf',
        1);
      cpj.files.push(my_file);
      cpj.sendToClient();
    },
    onPrinterChange: function (value) {
      this.selected_printer = value;
      console.info("Selected printer:", value);
    },
    onInit: function () {
      JSPM.JSPrintManager.auto_reconnect = true;
      JSPM.JSPrintManager.start();
      JSPM.JSPrintManager.WS.onStatusChanged = function () {
        if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
          var cpj = new JSPM.ClientPrintJob();
          cpj.clientPrinter = new JSPM.DefaultPrinter();
          cpj.printerCommands = 'RAW PRINTER COMMANDS HERE';
          cpj.sendToClient();
        }
      };

    },
    getPrinters: function () {
      return new Promise((ok, err) => {
        let printers = [];
        if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
          JSPM.JSPrintManager.getPrinters().then(function (myPrinters) {
            printers = myPrinters;
            console.log(printers);
            ok(printers);
          }).catch((e) => err(e));
        } else { console.warn("JSPM WS not open"); ok(printers); }
      });
    },
    exportHTM: function () {
      return this.$el.outerHTML;

    },
    getHTML: function () {
      this.html = this.$refs.modelDiv;

      window.print()
    },
    clickHandler(e) {
      this.$emit("toggle");
    },

    close: function () {

    },
    print() {
      const prtHtml = document.getElementById('main').innerHTML;
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>

  </head>
  <body>
    ${prtHtml}
  </body>
</html>`);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();

      // window.print();
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

td,
th,
tr,
table {


  margin: auto;
  border-top: 1px solid black;
  border-collapse: collapse;
}

td.description,
th.description {
  width: 75px;
  max-width: 75px;
}

td.quantity,
th.quantity {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

td.price,
th.price {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

.centered {
  text-align: center;
  align-content: center;
}

.ticket {
  width: 268px;
  max-width: 155px;
}

img {
  max-width: inherit;
  width: inherit;
}

@media print {

  .hidden-print,
  .hidden-print * {
    display: none !important;
  }
}
</style>
