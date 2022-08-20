<template lang="pug">
#con.con
  v-avatar.user.ma-5(@click="dialogUser = true")
    v-img(src="https://cdn.vuetifyjs.com/images/john.jpg", alt="John")
  v-bottom-navigation.navigation1(color="info", max-width="500px", mandatory)
    v-btn
      span(v-GE-Hili-font, v-fontSize.bold.color="20") خروج
      v-icon(@click="dialogClose = true", x-large="") mdi-exit-to-app
    v-btn(@click="dialogReport = true", @dblclick="dialogReport = false")
      span(v-GE-Hili-font, v-fontSize.bold.color="20") التقارير
      v-icon(x-large="") mdi-chart-box
    v-btn(@click="dialogExpenses = true")
      span(v-GE-Hili-font, v-fontSize.bold.color="20") المصاريف
      v-icon(x-large="") mdi-box-cutter
    v-btn(@click="dialogPurchases = true")
      span(v-GE-Hili-font, v-fontSize.bold.color="20") المشتريات
      v-icon(x-large="") mdi-cart-outline

    v-btn
      span(v-GE-Hili-font, v-fontSize.bold.color="20") الرئيسة
      v-icon(x-large="") mdi-home
  v-card.mt-15(v-model="toggleOne",color="#DDD0D0")
    v-tabs#tabs.tabs(v-model="tab", grow, dark)
      v-tabs-slider.px-14(color="#fff")
      v-tab(
        v-for="(item, index) in items",
        :key="index",
        v-GE-Hili-font,
        v-fontSize.bold="22",
        active-class="info",
        @click="choese"
      )
        | {{ item.tab }}

    v-container#scroll-target.overflow-y-auto(style="height: 882px")
      v-tabs-items.pa-9(v-model="tab")
        v-tab-item(v-for="(item, index) in items", :key="index")
          v-card(flat="", color="#DDD0D0")
            v-row.d-flex.justify-end
              v-card.ma-6.rounded-xl.text-center(
                width="200",
                height="200",
                v-for="(items, indexRow) in item.product",
                :key="indexRow",
                @click="clickHandler(index, indexRow)"
              )
                v-img.d-flex.image-content(
                  src="https://media.istockphoto.com/photos/cheese-burger-with-bacon-on-black-dark-background-picture-id1295796231?b=1&k=20&m=1295796231&s=170667a&w=0&h=lipbuWnWZE_-ScipwtVamsug7sd4j6hxiIUN0PkwWD8=",
                  height="200",
                  lazy-src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                )
                  v-card-text.price0 {{ items.title }}
                  .price1
                    v-card-text.text-h6.card-text {{ items.price }} JD

  <reportDialgog :dialogReport="dialogReport"  @toggle="dialogReport = !dialogReport" v-if="dialogReport" />
  <expensesDialog :dialogExpenses="dialogExpenses"  @toggle="dialogExpenses = !dialogExpenses" v-if="dialogExpenses" />
  <purchasesDialog :dialogPurchases="dialogPurchases"  @toggle="dialogPurchases = !dialogPurchases" v-if="dialogPurchases" />
  <userDialog :dialogUser="dialogUser"  @toggle="dialogUser = !dialogUser" v-if="dialogUser" />
  <exitDialog :dialogClose="dialogClose"  @toggle="exit" v-if="dialogClose" :test="loggedInUser.name" />
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["items", "price", "Tabindex", "indexRow", "toggleOne"],
  data() {
    return {
      ooo: "khaleed",
      dialogUser: false,
      dialogReport: false,
      dialogPurchases: false,
      dialogExpenses: false,
      dialogClose: false,
      tab: null,
      active: false,
    };
  },
  async beforeMount() {
    // await this.$store.dispatch("fetchMenu");
    // await this.$store.dispatch("getToggle");
    // eslint-disable-next-line no-console
  },

  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser", "getMenuList"]),
  },
  watch: {
    toggleOne(val) {
      let con = document.getElementById("con");
      let tabs = document.getElementById("tabs");

      if (val === 1) {
        tabs.setAttribute("background-color", "red");
        console.log(this.menuList);

        con.classList.remove("bg-pan-right");
        con.classList.add("bg-pan-right1");
      } else {
        tabs.removeAttribute("background-color");

        con.classList.remove("bg-pan-right1");
        con.classList.add("bg-pan-right");
      }
    },
  },

  methods: {
    clickHandler(index, indexRow) {
      // this.price = +1;
      this.$emit("toggle", index, indexRow);
    },
    onClickOutside() {
      this.active = false;
    },
    choese: function () {
      // new Audio(
      //   "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3"
      // ).play();
    },
    exit: function () {
      this.dialogClose = !this.dialogClose;
      // new Audio(
      //   "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav"
      // ).play();
    },
  },
};
</script>
<style  scoped lang="scss">
@font-face {
  font-family: "GE-Hili";
  src: url("../assets/fonts/GE-Hili-Light_15.otf");
}
@font-face {
  font-family: "Oxygen";
  font-style: normal;
  font-weight: 400;
  src: local("Oxygen"), local("Oxygen-Regular"),
    url(https://fonts.gstatic.com/s/oxygen/v5/LC4u_jU27qpsdszDEgeU_3-_kf6ByYO6CLYdB4HQE-Y.woff2)
      format("woff2");
  unicode-range: U+30-39;
}
.con {
  background-color: #012e48;
  color: azure;
  width: 70%;
  float: right;
}



.user {
  position: absolute;
  right: 0;
  overflow: hidden;
  width: 70px !important;
  height: 70px !important;
  background-color: #27ae60 !important;
  color: white;
  cursor: pointer;
}
.con1 {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 28%,
    rgba(107, 121, 9, 0.08727240896358546) 57%,
    rgb(164, 189, 53) 100%
  );
  position: absolute;
  width: 100%;
  z-index: 0;
  height: 90px;
}



.tabs {
  box-shadow: none;
  border: none;
  border-radius: 0;
  background-color: #012e48 !important;
}

.navigation1 {
  box-sizing: content-box;
  padding: 15px;
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  margin: 0 auto;
}

.theme--light.v-tabs-items {
  background-color: transparent;
}

.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}

.box {
  border: solid 1px grey;
  padding: 16px;
}

.image-content {
  position: relative;
}

.price0 {
  position: absolute;
  font-size: 30px !important;
  color: #dfe6e9;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif !important;
  font-weight: bold;
  z-index: 1;
  line-height: 0.9;
  font-style: italic;
}

.price1 {
  position: absolute;
  color: #f4f4f5;
  width: 100%;
  top: 150px;
  margin: 0 auto;
}

.card-text {
  font-size: 25px !important;
  font-family: Georgia, serif !important;
  overflow: hidden;
  font-weight: bold;
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
    background-position: 0% 50%;
  }
  to {
    background-color: #c5865e;
    background-position: 100% 50%;
  }
}
.bg-pan-right1 {
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
@keyframes bg-pan-right1 {
  from {
    background-color: rgb(255, 0, 111);

    background-position: 0% 50%;
  }
  to {
    background-color: #012e48;

    background-position: 100% 50%;
  }
}
</style>

