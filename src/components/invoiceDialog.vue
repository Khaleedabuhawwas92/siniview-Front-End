<template lang="pug">
.haloo
  p sssssss
</template>
<script>
export default {
  props: ["dialogInvoice"],
  data() {
    return {
      rowData: [],
    };
  },
  methods: {
    // how to connect mngodb in node js?

    clickHandler(e) {
      this.$emit("toggle");
    },
    cl() {
      console.log(this.my);
    },
  },
};
</script>
