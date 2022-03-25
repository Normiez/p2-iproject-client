<template>
  <div>
    <div class="container">
      <section class="">
        <div class="midFlex">
          <div>
            <img
              id="img2"
              src="https://data.whicdn.com/images/164781537/original.gif"
            />
          </div>
          <div class="d-flex mb-3">
            <label style="font-size: x-large"><b>REGISTER</b></label>
          </div>
          <ReusableLoginRegisterForm
            v-on:submit="doRegister"
          ></ReusableLoginRegisterForm>
          <div class="text-center mt-3 text-white">
            Have an account?
            <router-link to="/login"
              ><button class="btn btn-link text-white fw-bold">
                Login here
              </button></router-link
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import ReusableLoginRegisterForm from "@/components/ReusableLoginRegisterForm.vue";
export default {
  name: "RegisterPage",
  methods: {
    async doRegister(userData) {
      if (!userData.profilePict) {
        userData.profilePict =
          "https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg";
      }
      const error = await this.$store.dispatch("doRegister", userData);
      if (error) {
        swal({
          title: "Error",
          text: error,
          icon: "error",
        });
      } else {
        swal({
          title: "Register Success",
          icon: "success",
        });
        this.$router.push("/login");
      }
    },
  },
  components: {
    ReusableLoginRegisterForm,
  },
};
</script>

<style></style>
