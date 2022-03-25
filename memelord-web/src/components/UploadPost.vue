<template>
  <div class="text-white mt-3">
    <div class="row">
      <div class="col">
        <input type="file" v-on:change="upload" />
        <form @submit.prevent="uploadThisMeme">
          <input
            v-model="caption"
            type="text"
            class="form-control mt-3"
            placeholder="Caption"
          />
          <select v-model="category">
            <option
              v-for="item in categoryData"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
          <button>Submit</button>
        </form>
      </div>
      <div class="col d-flex justify-content-center">
        <p v-if="!imgPreview">Image will be preview here</p>
        <br />
        <img :src="imgPreview" v-if="imgPreview" style="width: 100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadPost",
  data() {
    return {
      category: "",
      caption: "",
      imgPreview: "",
      imgData: "",
    };
  },
  methods: {
    async uploadThisMeme() {
      const data = {
        caption: this.caption,
        file: this.imgData,
        categoryId: this.category,
      };
      const error = await this.$store.dispatch("UploadImage", data);
      if (!error) {
        this.$router.push("/");
        swal({
          title: "Upload Success",
          icon: "success",
        });
      } else {
        swal({
          title: "Upload Fail",
          text: "Please relogin and try again",
          icon: "error",
        });
      }
    },
    upload(event) {
      this.imgData = event.target.files[0];
      this.imgPreview = URL.createObjectURL(event.target.files[0]);
    },
  },
  created() {
    this.$store.dispatch("fetchCategories");
  },
  computed: {
    categoryData() {
      return this.$store.state.categoryData;
    },
  },
};
</script>

<style></style>
