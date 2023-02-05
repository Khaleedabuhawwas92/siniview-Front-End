<template lang="pug">
.dashboord-card
  .sub-card
    v-icon(x-large).icon {{icons}}
  p.pa-5.title-card {{ massege }}   {{ conutNumber }} طلب
  v-divider
  v-subheader.mb-3.subheader في اخر 24 ساعة

</template>
<script>
export default {
  props: ["massege", "icons", "conutNumber"],

  data() {
    return {
      mini: true,
      tab: null,
      v1: 0
    }
  },

};

</script>

<style scoped lang="scss" >
* {
  font-family: "GE-Hili" !important;
}

.dashboord-card {
  text-align: right;
  margin: 30px;
  background-color: #fff;
  width: 450px;
  height: 150px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: relative;
  border-radius: 6px;
  border-bottom: 3px solid black;
    border-right: 3px solid black;

  .sub-card {
    position: absolute;
    width: 100px;
    height: 100px;
    bottom: 81px;
    left: 22px;
    background-color: #2d3436;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 6px;

    .icon {
      padding: 31px;
      color: #fff;
    }

  }

  .title-card {
    font-weight: bold;
    font-size: 20px;
    font-family: "GE-Hili" !important;
  }

  .subheader {
    font-weight: bold;
    color: #000;
    font-size: 30px;

  }


}
</style>
