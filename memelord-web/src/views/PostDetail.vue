<template>
  <div class="card bg-dark text-white container">
    <h3 class="card-title">{{ postData.caption }}</h3>
    <img class="card-img" :src="postData.imgUrl" />
    <div class="card-img">
      <div class="d-flex justify-content-end" v-if="id == postData.User.id">
        <button class="btn btn-warning me-2" @click.prevent="updateMeme">
          EDIT CAPTION
        </button>
        <button class="btn btn-danger" @click.prevent="deleteMeme">
          DELETE POST
        </button>
      </div>
      <form @submit.prevent="editMeme" v-if="updateForm">
        <div>
          <textarea
            v-model="captionData"
            class="form-control bg-black text-white"
          ></textarea>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-dark bg-black p-3" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div>
        <img :src="postData.User.profilePict" class="rounded-circle pp" />
        <p>By: {{ postData.User.username }}</p>
      </div>
      <p>Category: {{ postData.Category.name }}</p>
    </div>
    <CommentSection></CommentSection>
  </div>
</template>

<script>
import swal from 'sweetalert';
import CommentSection from "@/components/CommentSection.vue";
export default {
  name: "PostDetail",
  data() {
    return {
      id: localStorage.id,
      updateForm: false,
      captionData: "",
    };
  },
  components: {
    CommentSection,
  },
  methods: {
    async deleteMeme() {
      const error = await this.$store.dispatch("deleteMemes", this.postData.id);
      if (error) {
        swal({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      } else {
        this.$router.push("/");
        swal({
          title: "Post has been deleted",
          icon: "success",
        });
      }
    },
    async editMeme() {
      const payload = {
        caption: this.captionData,
        categoryId: this.postData.Category.id,
        postId: this.postData.id,
      };
      const error = await this.$store.dispatch("updateCaption", payload);
      if (error) {
        swal({
          title: "Change Caption Fail",
          icon: "error",
        });
      } else {
        this.updateForm = false;
        this.$store.dispatch("fetchPostDetail", this.postId);
        swal({
          text: "Success to change caption",
          icon: "success",
        });
      }
    },
    updateMeme() {
      if (this.updateForm) {
        this.updateForm = false;
      } else {
        this.updateForm = true;
      }
    },
  },
  computed: {
    postData() {
      return this.$store.state.postDetail.postDetail;
    },
    postId() {
      return this.$store.state.postId;
    },
  },
  created() {
    this.$store.dispatch("fetchPostDetail", this.postId);
  },
  // updated() {
  //   // this.$store.dispatch("fetchPostDetail", this.postId);
  // },
};
</script>

<style scoped>
.pp {
  width: 75px;
  height: 75px;
}
</style>
