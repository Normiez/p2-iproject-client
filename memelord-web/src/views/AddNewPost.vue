<template>
  <div class="container container2">
    <ul class="nav nav-tabs">
      <li class="nav-item me-2">
        <router-link to="/newpost/mememaker">
          <button class="btn btn-dark">Meme Maker</button>
        </router-link>
      </li>
      <li class="nav-item me-2">
        <router-link to="/newpost/upload">
          <button class="btn btn-dark">Upload Meme</button>
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AddNewPost",
  created() {
    this.$store.dispatch("fetchAPI");
  },
};
</script>

<style scoped>
.container2 {
  min-height: 75vh;
}
</style>
