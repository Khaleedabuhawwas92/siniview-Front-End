<template lang="pug">
v-dialog(v-model="clickHandler", max-width="700px", persistent)
  v-card
    v-card-title
      span.text-h5 المشتريات
    v-card-text
      v-container.text-h5
        v-row
          v-col.text-h2(cols="12", sm="6")
            v-text-field.text-h4(
              label="السلعة*",
              required="",
              v-model="description"
            )
          v-col.text-h4(cols="12", sm="6")
            v-text-field.text-h5(
              label="القيمة",
              hint="الرجاء ادخال القيمة",
              prefix="JD",
              v-model="value"
            )
          v-col.text-h4(cols="12", sm="6")
            v-text-field.text-h5(
              label="الوزن او الكمية",
              hint="الرجاء ادخال الوزن او الكمية",
              prefix="Kg",
              v-model="wheigt"
            )

    v-card-actions
      v-spacer
      v-btn.text-h4(color="blue darken-1", text="", @click="clickHandler")
        | الغاء
      v-btn.text-h4(color="blue darken-1", text="", @click="clickHandlerPost")
        | حفظ
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      description: "",
      value: 0,
      wheigt:0
    };
  },
  props: ["dialogExpenses"],
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },

  methods: {
    clickHandlerPost() {
      this.$axios
        .post("http://localhost:8000/api/purchase/", {
          description: this.description,
          value: this.value,
          wheigt: this.wheigt,
          casherName: this.loggedInUser.name,
        })
        .then(function (response) {
          this.dialogPurchases = false;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        this.clickHandler()

    },
    clickHandler(e) {
      this.$emit("toggle");
    },
  },
};
</script>
