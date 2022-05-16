<template lang="pug">
v-alert.closeSuccess(
  dense,
  dismissible,
  prominent,
  text,
  type="success",
  :value="showSuccessAlert",
  transition="slide-x-transition",
  @click="clickHandler"
)
  | {{ massege }}
</template>
<script>
export default {
  props: ["massege", "showSuccessAlert"],
  methods: {
    clickHandler(e) {
      this.$emit("toggle");
    },
  },
};
</script>
<style scoped>
.closeSuccess {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 999;
  font-size: 30px;
  font-weight: bold;
}
</style>
