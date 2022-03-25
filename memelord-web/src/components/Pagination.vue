<template>
  <div class="btn-group">
    <button @click="decrement" class="btn btn-dark">«</button>
    <p class="btn text-white">Page {{ page }}</p>
    <button @click="increment" class="btn btn-dark">»</button>
  </div>
</template>

<script>
export default {
  name: "PaginationTop",
  methods: {
    async decrement() {
      if (this.page > 1) {
        this.$store.commit("COMMIT_PAGE_MIN");
        await this.$store.dispatch("filter", {
          category: this.category,
          search: this.search,
          page: this.page,
        });
      }
    },
    async increment() {
      if (this.$store.state.newsData.length > 11) {
        this.$store.commit("COMMIT_PAGE_PLUS");
        await this.$store.dispatch("filter", {
          category: this.category,
          search: this.search,
          page: this.page,
        });
      }
    },
  },
  computed: {
    page() {
      return this.$store.state.pageNumber;
    },
    category() {
      return this.$store.state.category;
    },
    search() {
      return this.$store.state.search;
    },
  },
};
</script>

<style></style>
