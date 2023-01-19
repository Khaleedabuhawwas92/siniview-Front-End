<template lang="pug">
.conintent.ma-0.pa-0
  v-app-bar(color='#2d3436')
    v-row.toolbar(justify="space-between")
      v-toolbar-title.pa-5 الاعدادات
      img.ma-3(src="../../assets/images/logo.png", alt="", width="100" height="50")
      NuxtLink.toolbar(to="/homePage")
        v-icon.pa-5(  color="primary") mdi-close
  v-tabs.my-6(vertical='' color="#000" height="100%" )
    v-tab.my-6.text-h6.tab-title
      v-icon.px-2(left='')
        | mdi-account
      |         الصفحة الرئيسة
    v-tab.my-6.text-h6.tab-title
      v-icon.px-2(left='')
        | mdi-lock
      |         تعريف الطابعات
    v-tab.my-6.text-h6.tab-title
      v-icon.px-2(left='')
        | mdi-access-point
      |        اضافة مواد
    v-tab.my-6.text-h6.tab-title
      v-icon.px-2(left='')
        | mdi-access-point
      |         تقارير اليوم
    v-tab.my-6.text-h6.tab-title
      v-icon.px-2(left='')
        | mdi-access-point
      |         تقارير الاصناف
    v-tab-item
      <sparkline />
    v-tab-item
      <printinng />
    v-tab-item
      <addTabs />
    v-tab-item
      <reportDialgog />


</template>

<script>
export default {
  layout: "adminPage",


  data() {
    return {

      mini: true,
      tab: null,

    }
  },


  methods: {
    changeRTL() {
      this.$vuetify.rtl = true
    },
  }
}




</script>
<style  scoped>
/* Please ❤ this if you like it! */

html {}

body {
  background: red;
}

.tab-title {
  font-family: "GE-Hili" !important;
  font-size: 15px;
  font-weight: bold;
}

.toolbar {
  color: white;
  text-decoration: none;
}

.conintent {
  box-sizing: border-box;
  direction: rtl;


}

.v-tab {
  max-width: 100% !important;
}

.card-text {
  background-color: #ecf0f1;
  height: 900px;
  text-align: center;
  font-size: 30px;
}

.tabs-sidebar {
  width: 100%;
  height: 100%;
}

.tab-sidebar {
  font-size: 15px;
  font-weight: bold;
  color: red;
}

.title-sidebar {
  position: relative;
  overflow: hidden;
  direction: rtl;

  color: "#000";
}

.items-sidebar {
  background-color: #ecf0f1;
}




:root {
  --speed: 0.85;
  --primary: #fff;
  --size: 30;
  --ease: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

body {
  background: #fafafa;
  font-family: 'Alata', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 0;
}

main {
  height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  -ms-scroll-snap-type: y mandatory;
  scroll-snap-type: y mandatory;
}

section {
  align-items: center;
  display: flex;
  font-size: 3rem;
  height: 100vh;
  justify-content: center;
  scroll-snap-align: center;
  width: 100vw;
}

.menu {
  position: fixed;
}

.menu__toggle {
  opacity: 0;
  position: absolute;
}

.menu__toggle:checked~.menu__content .menu__item {
  --active-x: var(--x);
  --active-y: var(--y);
  --scale: 1;
}

.menu__toggle:checked~.menu__toggle-label:not(.menu__toggle-label--closer) {
  --clip: circle(1000% at 0% 0%);
  height: 100vh;
  width: 100vw;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.menu__toggle:checked~.menu__toggle-label .menu__icon:nth-of-type(1) {
  --scale: 0;
}

.menu__toggle:checked~.menu__toggle-label .menu__icon:nth-of-type(2) {
  --scale: 1;
}

.menu__toggle-label {
  cursor: pointer;
  height: calc(var(--size, 20) * 0.5vmin);
  width: calc(var(--size, 20) * 0.5vmin);
  display: block;
  --clip: circle(100% at 0% 0%);
  -webkit-clip-path: var(--clip);
  clip-path: var(--clip);
  position: absolute;
  top: 0;
  left: 0;
  transition: backdrop-filter calc(var(--speed, 1) * 1s) var(--ease), clip-path 0s, -webkit-clip-path 0s;
}

.menu__toggle-label--closer {
  z-index: 3;
  --scale: 0;
}

.menu__icon {
  --scale: 1;
  height: calc(var(--size, 20) * 0.25vmin);
  width: calc(var(--size, 20) * 0.25vmin);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-70%, -70%) scale(var(--scale, 1));
  fill: var(--primary);
  transition: all calc(var(--speed, 1) * 1s) var(--ease);
}

.menu__icon:nth-of-type(2) {
  --scale: 0;
}

.menu__content {
  background: hsl(var(--hue, 0), 50%, 50%);
  margin: 0;
  display: block;
  list-style-type: none;
  z-index: -1;
  filter: url("#goo");
  position: absolute;
  top: 0;
  height: 0;
  width: 0;
  left: 0;
  z-index: 2;
}

.menu__content:after {
  background: hsl(var(--hue, 0), 50%, 50%);
  content: '';
  border-radius: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  height: calc(var(--size, 20) * 1vmin);
  width: calc(var(--size, 20) * 1vmin);
  top: 0;
  left: 0;
}

.menu__item {
  background: hsl(var(--hue, 0), 50%, 50%);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  list-style-type: none;
  font-size: 1rem;
  height: calc(var(--size, 20) * 1vmin);
  left: calc(var(--active-x, 0) * 1vw);
  overflow: hidden;
  place-items: center;
  position: absolute;
  text-align: center;
  top: calc(var(--active-y, 0) * 1vh);
  transform: translate(-50%, -50%) scale(var(--scale, 0.75));
  transition: all calc(var(--speed, 1) * 1s) calc(var(--delay, 0) * 1s) var(--ease);
  width: calc(var(--size, 20) * 1vmin);
}

@media (min-width: 768px) {
  .menu__item {
    font-size: 3rem;
  }
}

.menu__item:nth-of-type(1) {
  --delay: 0.1;
  --x: 35;
  --y: 35;
}

.menu__item:nth-of-type(2) {
  --delay: 0.2;
  --x: 65;
  --y: 35;
}

.menu__item:nth-of-type(3) {
  --delay: 0.3;
  --x: 35;
  --y: 65;
}

.menu__item:nth-of-type(4) {
  --delay: 0.4;
  --x: 65;
  --y: 65;
}

.menu__link {
  align-items: center;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.menu__link:hover {
  text-decoration: underline;
}
</style>
