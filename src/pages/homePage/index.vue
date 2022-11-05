<template lang="pug">
.homePage
  <navigationBar  :items="items" @toggle="halooo" :price="price" :toggleOne= "toggle_one"  />
  <alertSuccess massege="تمت العملية بنجاح"  @toggle="showSuccessAlert" v-if="success" />
  v-tabs.commint-order(
    background-color="#e74c3c",
    dark,
    v-if="this.tables.length !== 0",
    ,
    v-GE-Hili-font
  )
    v-tab.text-h4.px-2(@click="return1(0)") طلب معلق 1

  v-alert.alert-notfations(
    :value="alert1",
    color="red",
    dark,
    border="top",
    transition="scale-transition"
  )
    | لا يوجد طالبات للتعليق

  v-alert.alert-notfations(
    :value="alert2",
    color="black",
    dark,
    border="top",
    transition="scale-transition"
  )
    | هناك طلب معلق
  .all-contint
    #sidebar.sidbar
      .sidbar-contant
        .image
          img(src="../../assets/images/logo.png", width="300")
        #card3.card3
          v-btn-toggle.toggle(
            mandatory,
            v-model="toggle_one",
            borderless,
            color="lime darken-4"
          )
            v-btn.text-h4.toggle3(x-large, @click="hadelChangeColor") ديلفري
            v-btn.text-h4.toggle3(, x-large, @click="hadelChangeColor2") كاش

        .icon
          v-icon(color="#fff", x-large) mdi-cart-outline
          span السلة
        .table.mx-auto
          v-row.price-hedar
            v-col(cols="3") الصنف
            v-col(cols="1") العدد
            v-col(cols="2") السعر
            v-col(cols="3") الاضافة
            v-col(cols="2") التعديل

          v-container#scroll-target.overflow-y-auto(style="height: 300px")
            v-row.list.d-flex.flex-row-reverse.text-focus-in(
              v-for="(itemRow, index1) in rowData",
              :key="index1"
            )
              //- v-col.more(v-if="value2 != 0") {{ value2 }}
              v-col.list-title(cols="3") {{ itemRow.title }}
              v-col.price(cols="1") {{ 1 }}
              v-col.price(v-model="value2", cols="2") {{ itemRow.price }}
              v-col.text-center(cols="3")
                .row1.mx-0 {{ itemRow.additions }}
              v-col(cols="2")
                v-icon.price(
                  color="#012e48",
                  @click="removeElement(index1, itemRow.price)"
                )
                  | mdi-close
                template
                  v-dialog(v-model="chooese1", width="500")
                    template(v-slot:activator="{ on ,attrs}")
                      v-icon(color="#012e48", dark v-on="on")
                        | mdi-pencil-box
                    v-card
                      v-card-title.text-h5.text-center {{ massege }}
                        v-card-text
                          v-list.text-h5(label="Select Item")
                            v-list-item
                              v-container(fluid="")
                                v-row.px-5
                                  v-checkbox.px-9(

                                    v-for="(itemRow2, index) in chooeseItem",
                                    :key="index",
                                    v-model="rowData[index1].additions",
                                    :value="itemRow2.name",
                                    :label="itemRow2.name"
                                  )
                        v-divider
                        v-card-actions
                          v-spacer
                          v-btn(
                            color="primary",
                            text="",
                            @click.stop="chooese1 = false"
                          )
                            | I accept

        .mr-4
          v-row.sum
            .col الضريبة
            .col.num {{ this.price.toFixed(1) * this.tax.toFixed(1) }}
            .col &#x62F;.&#x627;
          v-row.sum
            .col المجموع
            .col.num {{ this.price }}
            .col &#x62F;.&#x627;
          v-row.sum
            .col الحساب الاجمالي
            .col.num {{ this.price + this.price.toFixed() * this.tax }}
            .col &#x62F;.&#x627;
        .buttons
          button.btu(@click="printInvoice") طباعة الفاتورة
          button.btu(@click="clearOrder") الغاء

  v-dialog(
    v-model="delete1",
    max-width="900",
    persistent,
    transition="dialog-top-transition"
  )
    v-card.text-center(border="left", colored-border)
      v-card-text.text-h5.titl-card
        | هل تريد حذف الطلبات
      v-icon(color="info", x-large)
        | mdi-delete
      v-card-actions
        v-spacer
        v-btn.text-h5(color="red darken-1", text="", @click="close")
          | الغاء
        v-btn.text-h5(color="green darken-1", text="", @click="removeItems")
          | موافق

  v-dialog(
    transition="dialog-bottom-transition",
    max-width="1550",
    v-model="dialogInvoice",
    persistent,
    @click="cl"
  )
    v-row.overflow.d-flex.justify-space-between.justify-end
      v-col.card2(col="12")
        v-card
          v-card-text.py-2
            v-data-table.elevation-1(
              :headers="headers",
              :items="rowData",
              hide-default-footer
            )
            v-row
              v-col.sumation(cols="6", v-model="price") {{ this.price + this.price * this.tax }}
              v-col.sumation(cols="6") المجموع
          v-divider

          v-card-actions.justify-space-between.flex-row-reverse
            .i
              v-btn.text-h5(text="", @click="colseToggle2", color="primary") اغلاق
              v-btn.text-h5(
                text="",
                color="primary",
                elevation="2",
                @click="CommentOrder(0)",
                v-if="this.tables.length == 0"
              ) تعليق الطلب
            .g.text-center.py-4.text-h5 طريقة الدفع
              .d-flex.flex-row
              v-radio-group(v-model="radioGroup2")
                v-radio.px-2(label=" كاش", color="red", value="primary")
                v-radio.px-2(label="زين كاش", color="success", value="success")
                v-radio.px-2(label="فيزا", color="info", value="info")
            .g.text-center.text-h5 خدمة الطلب
              .d-flex.flex-row
                v-radio-group(v-model="radioGroup")
                  v-radio.px-2(label="كاش", color="red", value="primary")
                  //- v-radio.px-2(label="طاولة", color="success", value="success")
      v-col.sumation1(
        col="2",
        v-model="radioGroup",
        v-if="radioGroup === 'primary'"
      )
        <Calculator :price="price"  @toggle="colseToggle" :rowData="rowData" :allIetms="allIetms" :additions="additions" :toggleOne="toggle_one" />
  v-dialog(max-width="600", v-model="errorMassege")
    v-card.text-center(color="#d63031")
      v-toolbar(color="red", background="red") ERORR MASSEGE
      v-card-text.massegeErorr.text-center
        .text-h2.pa-12.ma-auto لايوجد طلبات للطباعة
    v-overlay(color="#e17055")
</template>
<script >
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["index"],
  data() {
    return {
      massege: "",
      v: false,
      success: false,
      chooeseItem: [
        {
          id: "1",
          name: "Cotton",
          checked: true,
        },
        {
          id: "2",
          name: "Silk",
          checked: false,
        },
      ],

      chooese1: false,
      selected: [],
      allIetms: [],
      v: [],
      items2: [],
      value2: [],
      chooese: false,
      errorMassege: false,
      toggle_one: 1,
      alert1: false,
      alert2: false,
      wolocom: true,
      tax: 0.16,
      queryJson: "{}",
      dialogInvoice: false,
      sum: 0,
      title: "",
      additions: "",
      date: "",
      price: 0,
      adress: "",
      company: "",
      delete1: false,
      fliers: "",
      rowData: [], //the declared array,
      tab: null,
      radioGroup: "primary",
      radioGroup2: "primary",
      date: new Date(),
      items: [],
      tables: [],
      headers: [
        {
          text: "الطلب",
          align: "start",
          value: "title",
        },
        { text: "السعر", value: "price" },
        { text: "الوصف", value: "sum" },
      ],
    };
  },
  async beforeMount() {
    // action stores.orders.getAllOrders
    await this.$store.dispatch("fetchMenu");
  },

  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser", "getMenuList"]),
    rules() {
      return [
        this.chooeseItem.length > 0 || "At least one item should be selected",
      ];
    },
  },

  async fetch() {
    await this.$axios.get("http://localhost:8000/api/items").then((result) => {
      this.items = result.data;
    });
  },
  watch: {
    toggle_one(val) {
      let sidebar = document.getElementById("sidebar");
      let card3 = document.getElementById("card3");
      if (val === 1) {
        sidebar.classList.remove("bg-pan-right");
        sidebar.classList.add("bg-pan-right1");
        card3.classList.remove("bg-pan-right");
        card3.classList.add("bg-pan-right1");
      } else {
        sidebar.classList.remove("bg-pan-right1");
        sidebar.classList.add("bg-pan-right");
        card3.classList.remove("bg-pan-right1");
        card3.classList.add("bg-pan-right");
      }
    },
    // allitem(val) {
    //   return val;
    // },
  },

  methods: {
    close9(v) {
      this.chooese1 = false;
    },
    check: function (e) {
      console.log(e);
    },
    onCheckboxClicked: function (e) {
      console.log(e);
    },
    editElement: function (o) {
      this.massege = o.title;

      this.chooese1 = true;
    },
    allitem(itemRow, tab, index1) {
      // if (index1 == this.rowData.indexOf(property)) {
      // for (let index = 0; index <= this.rowData.length; index++) {
      //   const element = this.rowData[property].title;
      // return console.log(element);
      // }
      // }

      return itemRow;

      // console.log(this.rowData);
    },
    clear() {
      // this.allIetms.pop();
    },
    Senvalue(name, index, glutenfree) {
      if (glutenfree) {
        this.allIetms.push(name);
        index = this.allIetms.findIndex((x) => x.index === "oh");
        console.log(index);
      } else if (!glutenfree) {
        // this.allIetms.splice(index,1);
      }

      // console.log(item);

      // this.items.push(val);
    },
    sumDesserts(key) {
      // sum Desserts  data in give key (property)
    },
    splieItem(index) {
      // sum Desserts  data in give key (property)
      return this.items2[index];
    },
    hadelChangeColor() {
      let sidebar = document.getElementById("sidebar");
      let card3 = document.getElementById("card3");
      console.log(this.items2.join("\r\n"));
      console.log(this.getMenuList);
      sidebar.classList.remove("bg-pan-right1");
      sidebar.classList.add("bg-pan-right");
      card3.classList.remove("bg-pan-right1");
      card3.classList.add("bg-pan-right");
    },
    hadelChangeColor2() {
      let sidebar = document.getElementById("sidebar");
      let card3 = document.getElementById("card3");
      sidebar.classList.remove("bg-pan-right");
      sidebar.classList.add("bg-pan-right1");
      card3.classList.remove("bg-pan-right");
      card3.classList.add("bg-pan-right1");
    },
    colseToggle() {
      this.dialogInvoice = false;
      this.removeItems();
      this.current = 0;
      this.toggle_one = 1;
      this.showSuccessAlert();
    },
    colseToggle2() {
      this.dialogInvoice = false;
      this.current = "";
    },
    // fill the data to item2 array
    fillItems() {
      this.items2.forEach((item) => {
        this.allIetms.push(item);
      });
    },

    restartAllValues() {
      this.rowData.splice(0);
      this.sum = 0;
      this.price = 0;
    },

    printInvoice() {
      if (this.rowData.length === 0) {
        this.errorMassege = true;
        setTimeout(() => {
          this.errorMassege = false;
        }, 2000);
      } else {
        this.dialogInvoice = true;
      }
    },
    showSuccessAlert() {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2500);
    },

    clearOrder() {
      if (this.rowData.length === 0) {
        this.errorMassege = true;
        setTimeout(() => {
          this.errorMassege = false;
        }, 2000);
      } else {
        if (this.tables.length !== 0) {
          this.delete1 = true;
        } else {
          this.delete1 = true;
        }
      }
    },

    return1(index1) {
      // this.rowData.push( this.tables.length)
      if (this.rowData.length === 0) {
        this.tables.forEach((element, key) => {
          if (index1 === key) {
            for (const index in element) {
              if (Object.hasOwnProperty.call(element, key)) {
                this.rowData.push(element[index]);
                this.allIetms.push(element[index].title);
                this.price += element[index].price;
                console.log(element[index]);
              }
            }
          }
        });
        this.tables = [];
      } else {
        this.alert2 = true;
        setTimeout(() => {
          this.alert2 = false;
        }, 3000);
      }
    },

    CommentOrder(indexof) {
      if (!indexof) {
        if (this.rowData.length == 0) {
          this.alert1 = true;
          setTimeout(() => {
            this.alert1 = false;
          }, 4000);
        } else {
          this.tables.push(this.rowData);
          this.allIetms = [];
          this.rowData = [];
          console.log(this.tables.value);
        }
      }

      console.log("table", this.tables);
      (this.rowData = []), (this.dialogInvoice = false);
      this.price = 0;
    },

    async cl() {
      await this.$axios
        .get("http://localhost:3000/items")
        .then((result) => {
          console.log(result);
        })
        .catch((err) => { });
    },

    halooo(Tabindex, index) {
      if (index >= 0) {
        var my_object = new Object({
          allIetms: this.allIetms.push(
            this.items[Tabindex].product[index].title
          ),
          selected: this.additions,
          discraption: this.items[Tabindex].product[index].discraption,
          additions: {},
          title: this.items[Tabindex].product[index].title,

          price: Number(this.items[Tabindex].product[index].price),
          sum:
            this.price +
            Number(this.items[Tabindex].product[index].price).toFixed(2),
          casher: this.loggedInUser.name,
        });

        // this.title5.push(my_object.title);
        window.scrollBy(100, 0);
        this.rowData.push(my_object);
        // console.log(this.rowDataallIetms);
        console.log(this.rowData);

        this.price = my_object.price + this.price;
      }
      new Audio(
        "http://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg"
      ).play();
    },

    close: function () {
      new Audio(
        "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a"
      ).play();
      this.delete1 = false;
    },

    removeElement: function (index, price) {
      this.rowData.splice(index, 1);
      this.price = this.price - price;
    },

    showItems: function () {
      alert(JSON.stringify(this.rowData, null, 4));
    },

    removeItems: function () {
      new Audio(
        "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a"
      ).play();
      this.delete1 = false;
      this.allIetms.splice(0);
      this.rowData.splice(0);
      this.sum = 0;
      this.price = 0;
    },
  },
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: "Gideon Roman";
  src: url("../../assets/fonts/GideonRoman-Regular.ttf");
}
.row1 {
  overflow: auto;
  font-size: 15px;
  display: inline;
  height: 15px;
  width: 20px;
  overflow-wrap: break-word;
  font-weight: bold;
  color: #000;
}
// .row1::after{
//   contain: "-";
// }

.color {
  color: #000;
  justify-content: center;
  background-color: rgb(244, 237, 237);
  overflow: hidden;
  flex-direction: column-reverse !important;
  width: 100%;

  border: #000 1px solid;
}

.color1 {
  line-break: normal;
  background-color: #c5865e;
  display: inline-block;
}
.homePage {
  transition: 3s;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .commint-order {
    position: absolute;
    width: 190px;
    top: 130px;
    left: 190px;
  }
}

.all-contint {
  height: 100%;
}

.overflow {
  overflow: hidden;
}

.sidbar {
  background: #012e48;
  transition: 6s;
  max-width: 30%;
  padding: 10px;
  text-align: center;
  height: 100%;
}

.titl-card {
  padding: 19px !important;
  text-align: center !important;
  color: #c0392b !important;
}

.sidbar-contant {
  text-align: center;
}

.toggle {
  font-size: 20px;
  font-family: "GE-Hili" !important;
  border-radius: 15px;
  margin: 30px 60px;
  padding: 5px;
  background-color: #f9f9fa !important;
}

.toggle3 {
  font-family: "GE-Hili" !important ;
}

.card3 {
  border-radius: 15px;
  background-color: #012e48;
  transition: 1s;
}

.card2 {
  width: 80%;
}

.icon {
  font-size: 30px;
  color: #fff;
  font-family: "GE-Hili";
}

.sumation {
  padding-left: 250px;
  padding-top: 30px;
  font-size: 30px;
  font-weight: bold;
}

.sumation1 {
  width: 40%;
}

.table {
  margin: 30px auto;
  color: #fff;
  font-family: "GE-Hili";
  font-size: 17px;
}

.price-hedar {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  font-size: 23px;
  font-weight: bold;
}

.list {
  position: relative;
  display: flex;
  color: #000;
  justify-content: space-between;
  flex-direction: row-reverse;
  background: rgb(62, 65, 157);
  background: rgb(62, 65, 157);
  background: radial-gradient(
    circle,
    rgb(251, 251, 251) 49%,
    rgba(21, 129, 153, 0.656) 89%,
    rgba(9, 9, 121, 0) 98%
  );
  color: rgb(241, 236, 236);
  width: 100%;
  height: 25%;
  text-align: center;
  overflow: hidden;
  margin: 2px auto;
  border-radius: 30px;
  font-family: "Gideon Roman";
}
.bg-pan-right {
  -webkit-animation: bg-pan-right 2s both;
  animation: bg-pan-right 2s both;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-7-11 17:37:29
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation bg-pan-right
 * ----------------------------------------
 */
@-webkit-keyframes bg-pan-right {
  from {
    background-color: rgb(179, 148, 148);
  }
  to {
    background-color: #c5865e;
  }
}
@keyframes bg-pan-right {
  from {
    background-color: #012e48;
  }
  to {
    background-color: #c5865e;
  }
}
.bg-pan-right1 {
  -webkit-animation: bg-pan-right1 2s;
  animation: bg-pan-right1 2s;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-7-11 17:37:29
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation bg-pan-right
 * ----------------------------------------
 */
@-webkit-keyframes bg-pan-right1 {
  from {
    background-color: rgb(179, 148, 148);
  }
  to {
    background-color: #c5865e;
  }
}
@keyframes bg-pan-right1 {
  from {
    background-color: #c5865e;

    background-position: 0% 50%;
  }
  to {
    background-color: #012e48;

    background-position: 100% 50%;
  }
}

.text-focus-in {
  -webkit-animation: text-focus-in 0s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: text-focus-in 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-4-25 23:13:38
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-focus-in
 * ----------------------------------------
 */
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

.sum {
  display: flex;
  flex-direction: row-reverse;
  color: #fff;
  font-size: 27px;
  font-family: "GE-Hili";
}

.list-title {
  width: 35%;
  overflow-wrap: break-word;
  line-height: 0.8;
  font-weight: bold;
  font-size: 20px;
  height: 30%;
  text-align: center;
  line-height: 1.5;
  color: #000;
}

.price {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  font-size: 25px;
  line-height: 1.5;
  color: #000;
}

.num {
  font-family: "Courier New", Courier, monospace;
}

.buttons {
  padding: 100px 0 0 0;
  width: 100%;
  margin: 0 auto;
  font-family: "GE-Hili";
}

.btu {
  background-color: #fff;
  padding: 10px 10px;
  margin: 3px 3px;
  border-radius: 10px;
  font-size: 27px;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(148, 120, 120);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f0eeee;
}

.alert-notfations {
  position: absolute;
  width: 500px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
.alert-notfations1 {
  position: absolute;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  left: 500px;
  color: #fff;
}

.massegeErorr {
  color: #fff !important;
}
.more {
  position: absolute;
  background-color: #c0392b;
  color: #012e48;
  top: 50px;
  transition-duration: 500ms;
  font-weight: bold;
  font-size: 18px;
}
.more:hover {
  top: 2px;
}
</style>
