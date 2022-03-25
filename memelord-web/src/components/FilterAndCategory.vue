<template>
  <div>
    <h2 class="mb-3">(っ◔◡◔)っ Menu</h2>
    <router-link to="/newpost" v-if="isLogin">
      <button class="btn btn-dark mb-3 form-control" v-if="isLogin">
        📜 New Post
      </button>
    </router-link>
    <br v-if="isLogin" />
    <input
      v-model="search"
      type="text"
      class="form-control bg-dark mb-3 text-white"
      placeholder="Search"
    />
    <button
      class="btn btn-dark mb-3 form-control"
      @click.prevent="filter(categoryId)"
    >
      🔎 Search Title
    </button>
    <br />
    <button class="btn btn-dark mb-3 form-control" @click.prevent="reset">
      ↪️ Reset search
    </button>
    <br />
    <button class="btn btn-dark mb-3 form-control" @click.prevent="filter(1)">
      🤡 Memes
    </button>
    <br />
    <button class="btn btn-dark mb-3 form-control" @click.prevent="filter(2)">
      💀 Random
    </button>
    <br />
    <button class="btn btn-dark mb-3 form-control" @click.prevent="filter(3)">
      🦊 Animals
    </button>
    <br />
    <button class="btn btn-dark mb-3 form-control" @click.prevent="filter(4)">
      👹 Anime
    </button>
    <br />
    <button class="btn btn-dark mb-3 form-control" @click.prevent="filter(5)">
      👾 Comic
    </button>
  </div>
</template>

<script>
export default {
  name: "FilterAndCategory",
  data() {
    return {
      search: "",
      categoryId: null,
    };
  },
  methods: {
    async filter(categoryId) {
      let options;
      if (!categoryId) {
        options = {
          search: this.search,
        };
      } else {
        this.categoryId = categoryId;
        options = {
          search: this.search,
          category: this.categoryId,
        };
      }
      await this.$store.dispatch("filter", options);
    },
    async reset() {
      this.search = "";
      this.categoryId = null;
      await this.$store.dispatch("filter", {
        search: this.search,
        category: this.categoryId,
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style scoped>
input {
  border: none;
}
</style>
