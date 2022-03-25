<template>
  <div class="container bg-black text-white">
    <form @submit.prevent="Comment" v-if="isLogin">
      <textarea
        v-model="comment"
        class="bg-dark form-control text-white"
        type="text"
      ></textarea>
      <button type="submit" class="btn btn-dark">Comment</button>
    </form>
    <div class="container-sm mt-3" v-if="commentData.length > 0">
      <h2>Comment Section</h2>
      <div v-for="item in commentData" :key="item.id">
        <div>
          <h6>{{ item.User.username }}</h6>
        </div>
        <div>
          <p>comment: {{ item.comment }}</p>
        </div>
        <div v-if="isLogin && userId == item.UserId" class="row">
          <div class="col">
            <button
              class="btn btn-dark me-3"
              @click.prevent="activeEdit(item.id)"
            >
              edit
            </button>
            <button
              class="btn btn-dark"
              @click.prevent="deleteComment(item.id)"
            >
              delete
            </button>
          </div>
        </div>
      </div>
      <div v-if="this.edit">
        <form @submit.prevent="editComment">
          <textarea v-model="editCommentData" class="form-control"></textarea>
          <button type="submit" class="btn btn-dark">submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
export default {
  name: "CommentSection",
  data() {
    return {
      comment: "",
      editCommentData: "",
      edit: false,
      commentId: 0,
      userId: localStorage.id,
    };
  },
  methods: {
    async Comment() {
      const error = await this.$store.dispatch("doComment", {
        comment: this.comment,
        postId: this.postId,
      });
      if (error) {
        swal({
          title: "Comment Fail",
          icon: "error",
        });
      } else {
        swal({
          title: "Comment success",
          icon: "success",
        });
        this.comment = "";
        this.$store.dispatch("fetchPostDetail", this.postId);
      }
    },
    async deleteComment(id) {
      const error = await this.$store.dispatch("doDeleteComment", id);
      if (error) {
        swal({
          title: "Delete fail",
          icon: "error",
        });
      } else {
        swal({
          title: "Comment has been deleted",
          icon: "success",
        });
        this.$store.dispatch("fetchPostDetail", this.postId);
      }
    },
    activeEdit(id) {
      if (this.edit === true) {
        this.edit = false;
      } else {
        this.edit = true;
      }
      this.commentId = id;
    },
    async editComment() {
      const payload = {
        comment: this.editCommentData,
        commentId: this.commentId,
        postId: this.postId,
      };
      const error = await this.$store.dispatch("editComment", payload);
      if (error) {
        swal({
          title: "Edit comment fail",
          icon: "error",
        });
      } else {
        swal({
          title: "Edit comment success",
          icon: "success",
        });
        this.edit = false;
        this.$store.dispatch("fetchPostDetail", this.postId);
      }
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    commentData() {
      return this.$store.state.postDetail.comments;
    },
    postId() {
      return this.$store.state.postId;
    },
  },
};
</script>
