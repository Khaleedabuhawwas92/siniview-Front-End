<template lang="pug">
v-alert.massegeSuccess(
  dense,
  prominent,
  type="success",
  :value="showSuccessAlert",
  transition="slide-y-transition",
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
.massegeSuccess {
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 999;
  font-size: 30px;
  font-weight: bold;
}
</style>
