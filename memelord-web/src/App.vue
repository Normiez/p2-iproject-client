<template>
  <div id="app" class="container1">
    <NavigationBar></NavigationBar>
    <router-view />
    <HFooter></HFooter>
  </div>
</template>

<script>
import HFooter from "vue-hacktiv8-footer";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  name: "app",
  components: {
    NavigationBar,
    HFooter,
  },
  created() {
    this.$store.dispatch("loginCheck");
  },
};
</script>

<style>
.midFlex {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
}

label {
  color: white;
}

#img1 {
  width: 220px;
  height: 220px;
}
#img2 {
  width: 100px;
  height: 100px;
}
.container1 {
  background-color: black;
  min-height: 100vh;
  max-width: auto;
  max-height: auto;
  margin: 0;
}

p {
  max-width: fit-content;
  text-align: left;
}

#profile {
  display: flex;
  justify-content: flex-end;
}
</style>
