<template>
  <div>
    <div class="container">
      <section class="">
        <div class="midFlex">
          <div>
            <img
              src="https://c.tenor.com/fAIreJMvr1wAAAAC/black-cat-cartoon-cat-black.gif"
              alt="blackCat"
              id="img1"
            />
          </div>
          <div class="d-flex mb-3">
            <label style="font-size: x-large"><b>LOGIN</b></label>
          </div>
          <ReusableLoginRegisterForm
            v-on:submit="doLogin"
          ></ReusableLoginRegisterForm>
          <div class="text-center mt-3 text-white">
            Not Registered?
            <router-link to="/register">
              <button class="btn btn-link text-white fw-bold">
                Create an Account
              </button></router-link
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ReusableLoginRegisterForm from "@/components/ReusableLoginRegisterForm.vue";
export default {
  name: "loginPage",
  components: {
    ReusableLoginRegisterForm,
  },
  methods: {
    async doLogin(userData) {
      const { email, password } = userData;
      const data = { email, password };
      const error = await this.$store.dispatch("doLogin", data);
      if (!error) {
        this.$router.push("/");
      } else {
        swal({
          title: "Error",
          text: error,
          icon: "error",
        });
      }
    },
  },
};
</script>
