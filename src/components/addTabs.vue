<template lang="pug">
.add-Tab
  v-toolbar-title
    | {{ capitalize(value) }}
  v-bottom-navigation(v-model='value' app='' :background-color='color' dark='')
    v-btn(height='100%' :color='color' v-for="(item,index) in getMenuList"  :value=`item`)
      span.curser {{item.tab}}

</template>
<script>
export default {
  layout: "adminPage",
  props: ["addtabs"],
  data() {
    return {
      value: 'music',
      color: 'black',
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
      getMenuList: [],


      input: "",
      state: [
        { title: " اضافة عنصر", path: false },
        { title: " تعديل", path: false },
        { title: "تعريف طابعة", path: false },
      ],
      value: 0,
    };
  },

  async fetch() {
    await this.$axios.get(`/items`).then((result) => {
      this.getMenuList = result.data
    });
    console.log(this.getMenuList);
  },


  methods: {
    capitalize(str) {
      return str.id
    },

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
  font-size: 30px;
    font-family: "GE-Hili" !important;
}

.text {
  overflow: scroll;
}

.button-style {
  font-size: 19px !important;
}
</style>
