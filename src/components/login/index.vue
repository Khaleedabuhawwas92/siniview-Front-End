<template lang="pug">
.login-content
  p(id="info13")  {{masse22}}
  v-container.login-form-container
    v-row
      v-col.login-content
        v-card.rounded-xl.login-card
          v-card-title.login-title تسجيل الدخول
          v-form(ref="form", v-model="valid", lazy-validation="")
            v-text-field(
              label="اسم المستخدم",
              required="",
              v-model="userInfo.email"
            )
            v-text-field(
              label="الرقم السري",
              required="",
              v-model="userInfo.password"
            )
            v-btn.button.mb-15.mt-5.text-center(
              outlined="",
              color="#012e48",
              x-large="",
              @click="login1(userInfo)"
            )
              | دخول
            br
            v-icon.close(
              color="#012e48",
              onclick="window.top.close()",
              large=""
            )
              | mdi-close-circle
      v-col.login-content
        v-card.rounded-xl.brand-card
          .barand-contint
            img(src="../../assets/images/logo.png", alt="", width="350")
            v-card-text.mx-0(align="center")
              | All rights reserved Mniview technologies co.
              br
              span.num +9679514871 / +962798302592
              |
              | www.mniview.com
  v-alert.alert-notfations(
    :value="alert2",
    color="red",
    dark,
    border="top",
    transition="scale-transition"
  )
    | الرجاء التاكد من الرقم السري او اسم المستخدم
</template>

<script>
export default {
  data() {
    return {
      success: true,
      error: "",
      valid: false,
      showPassword: false,
      hasName: false,
      hasAge: false,
      alert2: false,
      masse22: `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`,
      userInfo: {
        email: "",
        password: "",
      },
    };

  },
  methods: {
    async login1(userInfo) {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.userInfo,
        });
      } catch (err) {
        this.alert2 = true;
        setTimeout(() => {
          this.alert2 = false;
        }, 4000);
      }
    },
  },


};
</script>
<style scoped lang="scss">
#info13 {
  color: white;
}
.login-content {
  box-sizing: border-box;
  background-color: #012e48;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-position: -400px -400px;


  .login-form-container {
    z-index: 999;
    width: 50%;
    margin-top: 300px;

    .login-content {
      padding: 0;
      text-align: center;
      width: 220px;
      height: 500px;

      .login-card {
        padding: 100px;
        height: 500px;
        width: 500px;
        z-index: 999;
        filter: drop-shadow(0.5rem 0.5rem 1rem rgb(68, 66, 66));

        .login-title {
          text-align: center;
          display: block;
        }

        .close:hover {
          font-size: 40px;
          cursor: pointer;
        }

        .button {
          text-decoration: none;
          color: black;
        }
      }

      .brand-card {
        box-sizing: border-box;
        height: 450px;
        min-width: 100%;
        z-index: 2;
        background-color: #012e48;
        text-align: center;
        filter: drop-shadow(0.5rem 0.5rem 1rem rgb(68, 66, 66));

        .barand-contint {
          margin: 25px auto;
          padding: 70px 0;
          color: #fff;
          font-family: "GE-Hili", sans-serif;

          .num {
            font-family: "Courier New", Courier, monospace;
            font-size: 20px;
          }
        }
      }
    }
  }
}

.alert-notfations {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
</style>
