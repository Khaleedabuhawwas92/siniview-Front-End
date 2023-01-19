<template lang="pug">
.add-Tab
  v-card
    v-row.px-2(justify="space-between")
      v-icon.pa-5(@click="openInput = true", x-large)
        | mdi-plus-box-multiple
    v-row(justify="center")
      v-card.text.ma-5(
        width="350",
        max-height="800",
        v-for="item in getMenuList",
        :key="item.id"
      )
        v-img(
          height="200px",
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        )
          v-app-bar(color="rgba(0, 0, 0, 0)", flat)
            v-toolbar-title.toolbar-title
              | {{ item.tab }}
          v-menu(bottom="", left="")
            template(v-slot:activator="{ on, attrs }")
              v-btn(icon="", color="#fff", v-bind="attrs", v-on="on")
                v-icon mdi-dots-vertical
            v-list
              v-list-item.hover-title(@click="OpenEditTab(item.id,item.tab)")
                v-list-item-title تعديل اسم القائمة
              v-list-item.hover-title(@click="OpenInputProduct(item.id)")
                v-list-item-title اضافة عنصر
              v-list-item.hover-title(@click="remove(item.id)")
                v-list-item-title حذف القائمة
            v-spacer
        v-card-text
          .font-weight-bold.ml-8.mb-2
            | item
          v-timeline(align-top="", dense="")
            v-timeline-item(
              v-for="message in item.product",
              :key="message.time",
              :color="message.color",
              small=""
            )
              v-row
                v-col
                  div
                    .font-weight-normal
                      strong.co {{ message.title }}
                      |
                      div {{ message.price }}
                v-col
                  v-icon.pa-1(
                    @click="removeItem(message._id, item.tab)",
                  )
                    | mdi-delete
                  v-icon.pa-1(
                    @click="EditProductFuncation()",
                  )
                    | mdi-wrench
    v-dialog(
      v-model="openInputItem",
      max-width="800px",
      transition="dialog-bottom-transition"
        )
      v-card.pa-5
        v-card-title.input-title
          | تعديل اسم القائمة
        v-card-text
          v-container
            v-row
              v-col
                v-text-field(
                  label="اسم القائمة",
                  required,
                    v-model="tab",
                    value="tab"
                      )
        v-row(justify="space-between" )
          v-btn.button-style(@click="openInputItem = false", color="red") اغلاق
          v-btn.button-style(@click="editFuncation(id1)", color="info") حفظ

    v-dialog(
      v-model="openInputProduct",
      max-width="800px",
      transition="dialog-bottom-transition",
      :retain-focus="false"
      )
      v-card.pa-5
        v-card-title.input-title
          | ادخال اسم المنتج
        v-card-text
          v-container
            v-row
              v-col
                v-text-field(
                  label="اسم العنصر",
                  required,
                  v-model="productInfo.title",
                )
              v-col
                v-text-field(
                  prefix="JD"
                  type="number"
                  label=" سعر المنتج",
                  required,
                  v-model="productInfo.price",
                )
              v-col
                v-text-field(
                  label="صورة المنتج ",
                  v-model="productInfo.image",
                )
        v-row(justify="space-between")
          v-btn.button-style(@click="openInputProduct = false", color="red") اغلاق
          v-btn.button-style(@click ="addProduct(id1)", color="info" ) حفظ


    v-dialog(
      v-model="openInput",
      max-width="800px",
      transition="dialog-bottom-transition"
      )
      v-card.pa-5
        v-card-title.input-title
          | الرجاء ادخال اسم القائمة
        v-card-text
          v-container
            v-row
              v-col
                v-text-field(label="اسم القائمة", required, v-model="input")
        v-row(justify="space-between")
          v-btn.button-style(@click="openInput = false", color="red") اغلاق
          v-btn.button-style(@click="clickHandlerPost()", color="info") حفظ
    v-dialog(
      v-model="EditProduct",
      max-width="800px",
      transition="dialog-bottom-transition"
      )
      v-card.pa-5
        v-card-title.input-title
          | تعديل العنصر
        v-card-text
          v-container
            v-row
              v-col
                v-text-field(label="اسم القائمة", required, v-model="input",value="productInfo.title")
              v-col
                v-text-field(label="اسم القائمة", required, v-model="input")
              v-col
                v-text-field(label="اسم القائمة", required, v-model="input")
        v-row(justify="space-between")
          v-btn.button-style(@click="EditProduct = false", color="red") hyghr
          v-btn.button-style(@click="", color="info") حفظ


</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["addtabs"],
  data() {
    return {
      productInfo: {
        title: "",
        price: "",
        image: "",
        discraption: "",
      },
      id1: "",
      tab: "",
      openInput: false,
      EditProduct: false,
      openInputItem: false,
      openInputProduct: false,


      input: "",
      state: [
        { title: " اضافة عنصر", path: false },
        { title: " تعديل", path: false },
        { title: "تعريف طابعة", path: false },
      ],
      value: 0,
    };
  },


  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser", "getMenuList"]),

  },
  asyncData() {
    this.$store.dispatch("fetchMenu");
  },


  methods: {

    OpenInputProduct(id) {
      this.openInputProduct = true
      this.id1 = id
    },
    addProduct(id) {
      console.log(id);
      this.$axios.post("/items/createProdect/" + id, {
        title: this.productInfo.title,
        price: this.productInfo.price,
        image: this.productInfo.image,
      }).then(function (res) {
        console.log(res);

      }).catch(function (error) {
        console.log(error);
      });
      this.openInputProduct = false;


    },
    OpenEditTab(id, tab) {
      this.id1 = id
      this.tab = tab
      this.openInputItem = true;
    },

    editFuncation: function (id) {
      this.$axios.put("/items/" + id, {
        tab: this.tab
      }).then(function (response) {
        console.log(response);
        this.$nuxt.refresh()
      }).catch(function (error) {
        console.log(error);
      })
    },
    removeItem(id, name) {
      this.$axios
        .delete("/items/deleteProdect/" + id, {
          data: { tab: name },
        })
        .then(function (response) {
          console.log(response);
          // window.location.reload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(id, name);
    },
    remove(id) {
      this.$axios.delete("/items/" + id);
      this.$nuxt.refresh()
    },
    clickHandlerPost() {
      this.$axios
        .post("/items/", {
          tab: this.input,
        })
        .then(function (response) {
          console.log(response);
          this.$nuxt.refresh();
          this.openInput = false;
          console.log(this.getMenuList.data);
        })
        .catch(function (error) {
          console.log(error);

        });
      // this.clickHandler();
    },
    clickHandler(e) {
      this.$emit("toggle");
    },
  },
};
</script>
<style>
.co {
  color: black;
}

.toolbar-title {
  color: white !important;
}

.hover-title:hover {
  background-color: bisque;
  font-size: 20px;
}

.input-title {
  text-align: center;
}

.curser {
  cursor: pointer;
  font-size: 40px;
}

.text {
  overflow: scroll;
}

.button-style {
  font-size: 19px !important;
}
</style>
