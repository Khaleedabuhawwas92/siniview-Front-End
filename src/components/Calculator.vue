<template>
  <div id="page">

    <div id="calc">
      <h1 id="hi"></h1>

      <div id="usersList" class="text-center p-7">{{ current }}</div>
      <h1>الرجاء ادخال القيمة</h1>
      <div class="buttons" id="">
        <button @click="buttonClick(1)">1</button>
        <button @click="buttonClick(2)">2</button>
        <button @click="buttonClick(3)">3</button>

        <button @click="buttonClick(4)">4</button>
        <button @click="buttonClick(5)">5</button>
        <button @click="buttonClick(6)">6</button>

        <button @click="buttonClick(7)">7</button>
        <button @click="buttonClick(8)">8</button>
        <button @click="buttonClick(9)">9</button>

        <!-- <button id="comma" @click="comma">.</button> -->
        <button id="0" @click="buttonClick(0)">0</button>
        <button @click="clear">C</button>
        <button id="equals" @click="equals()">Enter</button>
        <!-- <button @click="getPrinters()">get Printers</button> -->

      </div>
      <!-- <printinng :dialogPrinter="dialogPrinter" @toggle="dialogPrinter = !dialogPrinter" v-if="dialogPrinter" /> -->

    </div>
    <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog5" class="text-center">
      <template v-slot:default="dialog2" rounded>
        <v-card class="text-center ">
          <v-toolbar color="#dfe6e9" class="text-h2 title" v-GE-Hili-font>الباقي</v-toolbar>
          <v-card-text>
            <div class="text-h2 pa-12">{{ current }}</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="confarim">تاكيد</v-btn>
            <v-btn @click="dialog2.value = false">الغاء</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </div>


</template>


<script>
import { mapGetters } from "vuex";
const path = require("path");




export default {

  props: [
    "price",
    "rowData",
    "dialogInvoice",
    "allIetms",
    "additions",
    "toggleOne",
  ],
  data() {
    return {
      dialogPrinter: true,
      in: 0,
      sumation: 0,
      vv: [],
      dialog5: false,
      dialog2: false,
      current: "",
      previous: "",
      operator: "",
      firstValue: "",
      secondValue: "",
      history: [],
      tax: 0.16,
      jspmAppInstances: null,
      clientPrinters: null,
      markDownData: "",
      vocherRecapi: [],
      printerName: ''
    };
  },
  async beforeMount() {
    await this.$store.dispatch("fetchMenu");

  },


  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },


  methods: {
    async printHandler() {


      await this.rowData.forEach(element => {
        this.vocherRecapi.push([element.title, element.price, "1",


        ])
        this.sumation += element.price
        this.printerName = element.printerName
      });


      const options = {
        preview: true,
        margin: '0 2px ',
        copies: 1,
        printerName: "EPSON TM-T88V Receipt",
        timeOutPerLine: 50,
        pageSize: '80mm', // page size
        silent: true,
      }

      const options2 = {
        preview: true,
        margin: '2px 2px 12px 2px',
        copies: 1,
        printerName: 'EPSON TM-T88V Receipt',
        timeOutPerLine: 400,
        pageSize: '80mm', // page size
        silent: true,
      }



      const data2 = [
        {
          type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
          value: this.toggleOne === 1 ? "كاش" : "ديلفري",
          style: { fontWeight: "700", textAlign: 'center', fontSize: "20px", margin: ' 20px' }
        },
        {
          type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
          value: 'طلب رقم',
          style: { fontWeight: "700", textAlign: 'center', fontSize: "24px", margin: ' 20px' }
        },
        {
          type: 'table',
          // style the table
          style: { border: '3px solid #000', color: '#000' },
          // list of the columns to be rendered in the table header
          tableHeader: ['الصنف', 'السعر', "الكمية"],
          // multi dimensional array depicting the rows and columns of the table body
          tableBody: this.vocherRecapi,
          // list of columns to be rendered in the table footer
          tableFooter: [{
            type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            value: this.sumation,
            style: { fontWeight: "700", textAlign: 'center', fontSize: "15px", margin: ' 20px' }
          }, {
            type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            value: 'المجموع',
            style: { fontWeight: "700", textAlign: 'left', fontSize: "15px", margin: '20px' }
          }],
          // custom style for the table header
          tableHeaderStyle: { backgroundColor: '#000', color: '#000' },
          // custom style for the table body
          tableBodyStyle: { 'border': '3px solid #000', 'color': '#000', 'font-weight': "bold", textAlign: 'left' },
          // custom style for the table footer
          tableFooterStyle: { backgroundColor: '#fff', color: '#000', },
        },
        // {
        //   type: 'image', url: "../../assets/images/logo.png", position: 'center',                                  // position of image: 'left' | 'center' | 'right'
        //   width: '160px',                                           // width of image in px; default: auto
        //   height: '60px',
        // }
      ]
      const data = [
        {
          type: 'image',
          url: 'https://randomuser.me/api/portraits/men/43.jpg',     // file path
          position: 'center',                                  // position of image: 'left' | 'center' | 'right'
          width: '160px',                                           // width of image in px; default: auto
          height: '60px',                                          // width of image in px; default: 50 or '50px'
        }, {
          type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
          value: 'SAMPLE HEADING',
          style: { fontWeight: "700", textAlign: 'center', fontSize: "24px" }
        }, {
          type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
          value: 'Secondary text',
          style: { textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red", }
        }, {
          type: 'barCode',
          value: '023456789010',
          height: 40,                     // height of barcode, applicable only to bar and QR codes
          width: 2,                       // width of barcode, applicable only to bar and QR codes
          displayValue: true,             // Display value below barcode
          fontsize: 12,
        }, {
          type: 'qrCode',
          value: 'https://www.freepik.com/',
          height: 55,
          width: 55,
          style: { margin: '10 20px 20 20px' }
        }, {
          type: 'table',
          // style the table
          style: { border: '1px solid #ddd' },
          // list of the columns to be rendered in the table header
          tableHeader: ['Animal', 'Age'],
          // multi dimensional array depicting the rows and columns of the table body
          tableBody: [
            ['Cat', 2],
            ['Dog', 4],
            ['Horse', 12],
            ['Pig', 4],
          ],
          // list of columns to be rendered in the table footer
          tableFooter: ['Animal', 'Age'],
          // custom style for the table header
          tableHeaderStyle: { backgroundColor: '#000', color: 'white' },
          // custom style for the table body
          tableBodyStyle: { 'border': '0.5px solid #ddd' },
          // custom style for the table footer
          tableFooterStyle: { backgroundColor: '#000', color: 'white' },
        }, {
          type: 'table',
          style: { border: '1px solid #ddd' },             // style the table
          // list of the columns to be rendered in the table header
          tableHeader: [{ type: 'text', value: 'People' },],
          // multi-dimensional array depicting the rows and columns of the table body
          tableBody: [
            [{ type: 'text', value: 'Marcus' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/43.jpg' }],
            [{ type: 'text', value: 'Boris' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/41.jpg' }],
            [{ type: 'text', value: 'Andrew' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/23.jpg' }],
            [{ type: 'text', value: 'Tyresse' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/53.jpg' }],
          ],
          // list of columns to be rendered in the table footer
          tableFooter: [{ type: 'text', value: 'People' }, 'Image'],
          // custom style for the table header
          tableHeaderStyle: { backgroundColor: 'red', color: 'white' },
          // custom style for the table body
          tableBodyStyle: { 'border': '0.5px solid #ddd' },
          // custom style for the table footer
          tableFooterStyle: { backgroundColor: '#000', color: 'white' },
        },
      ]

      // await window.versions.printer2(options2, data, "llslslslsls")
      if (this.toggleOne === 1) {
        await window.versions.printer(options, data2, "llslslslsls")
      } else {
        await window.versions.printer(options, data2, "llslslslsls")
        await window.versions.printer(options, data2, "llslslslsls")

      }

      this.vocherRecapi = []


      // or any other ipcRenderer method you want to invoke
    },



    clickHandler(e) {
      this.$emit("toggle");
      console.log(this.rowData);
    },
    print() {
      this.dialogPrinter = true
    },

    async confarim() {
      await this.$axios
        .get("/reportItems/findlastrecored/")
        .then((result) => {
          this.in = result.data.invoiceNumber;
          console.log(result.data.invoiceNumber);
        })
        .catch((err) => {
          console.log(err);
        });

      await this.$axios
        .post("/reportItems/", {
          paymentMethod: this.toggleOne === 1 ? "كاش" : "ديلفري",
          invoiceNumber: this.in + 1,
          allIetms: this.allIetms,
          additions: this.additions,
          sumation: this.price + this.price * this.tax,
          totalAccount: this.price,
          tax: this.price * this.tax,
          casherName: this.loggedInUser.name,
        })
        .then(function (response) {
          this.allIetms = [];

          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.printHandler(this.toggleOne);

      this.current = "";

      this.clickHandler();
    },
    cansele() {
      this.current = "";
    },
    buttonClick(value) {
      this.current = this.current + "" + value;
      new Audio(
        "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a"
      ).play();
    },

    clear() {
      this.current = "";
    },

    equals() {
      this.current =
        Number.parseFloat(this.current).toFixed(2) -
        (parseFloat(this.price) +
          parseFloat(this.price) * Number(this.tax).toFixed(2));
      this.dialog5 = true;
      console.log("......................................");
      console.log(this.allIetms);

    },
    comma() {


      if (!this.current.includes(".")) {
        this.current = this.current + ".";
      }
    },
    clearButton() {
      this.history = [];
    },
  },
};
</script>


<style scoped>
#calc {



  z-index: -1;
  width: 100%;
  max-height: 600px;
  padding-right: 0;
  font-weight: bold;
}

#page {
  position: relative;

  border: 2px;
  max-width: 1200px;
}

.buttons {
  display: grid;
  direction: rtl;

}

button {
  box-shadow: 0 1px 0 0 #1c1b18;
  background: #eae0c2 linear-gradient(to bottom, #ecf0f1 5%, #2980b9 100%);
  border-radius: 15px;
  border: 2px solid #333029;
  display: inline-block;
  cursor: pointer;

  color: #505739;
  font-family: Arial, serif;
  font-size: 40px;
  font-weight: bold;
  padding: 12px 16px;
  text-decoration: none;
  text-shadow: 0 1px 0 #c50c0c;
  margin: 2px;
}

button:hover {
  background: #886914 linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  transform: scale(1.05);
}

button:active {
  box-shadow: 0 4px 8px;
  transform: scale(0.98);
}

h1 {
  font-family: "Helvetica Neue", sans-serif;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
  color: #1186d4;
  padding: 12px 16px;
  text-shadow: 0 1px 0 #313030;
}

#input {
  width: 100%;
  height: 80px;
  background-color: #ecf0f1;
  margin: 3px;
  padding: 15px;
  border-radius: 15px;
  border: 2px solid #333029;
  font-size: 190%;
  color: #000000;
  font-weight: bold;
}

#list {
  list-style-type: none;
  padding: 0;
}

#clearBtn {
  margin: 10px;
  padding: 10px;
}

#equals {
  grid-column: 1 / span 3;
  background: #fcfbf9 linear-gradient(to bottom, #f8f7f2 5%, #800d0f 100%);
  margin: 12px;
}

.title {
  padding-left: 220px;
  font-family: "GE-Hili" !important;
  font-weight: bold;
}
</style>
