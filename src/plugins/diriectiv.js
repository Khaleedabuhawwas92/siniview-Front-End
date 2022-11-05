import Vue from "vue";

Vue.directive("fontSize", {
  update: function (el, binding) {
    el.style.fontSize = binding.value + "px";

    if (binding.modifiers.bold) {
      el.style.fontWeight = "bold";
    }
    if (binding.modifiers.color) {
      el.style.color = "#000" + "!important";
    }
    if (binding.modifiers.fontFamily) {
      el.style.fontFamily = "#95a5a6" + "!important";
    }
  },
});
Vue.directive("GE-Hili-font", {
  update: function (el, binding) {
    el.style.fontFamily = "GE-Hili";
  },
});
