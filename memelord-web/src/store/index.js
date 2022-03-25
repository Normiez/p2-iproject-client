import Vue from "vue";
import Vuex from "vuex";
import axios from "@/api/axios";
import meme from "@/api/imgFlip";
import prev from "@/api/imgFlipPrev";
import swal from 'sweetalert';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    category: "",
    pageNumber: 1,
    postId: 0,
    postDetail: [],
    imgFlipAPI: [],
    postData: [],
    isLogin: false,
    userId: 0,
    username: "",
    imgPreview: "",
    categoryData: [],
  },
  getters: {},
  mutations: {
    LOGIN_STATUS(state, data) {
      state.isLogin = data;
    },
    FETCH_POST(state, data) {
      state.postData = data;
    },
    USERNAME_COMMIT(state, data) {
      state.username = data;
    },
    USERID_COMMIT(state, data) {
      state.userId = data;
    },
    IMGFLIP_DATA(state, data) {
      state.imgFlipAPI = data;
    },
    COMMIT_PREVIEW(state, data) {
      state.imgPreview = data;
    },
    CATEGORY_DATA(state, data) {
      state.categoryData = data;
    },
    POST_DETAIL(state, data) {
      state.postDetail = data;
    },
    POST_ID(state, data) {
      state.postId = data;
    },
    COMMIT_SEARCH(state, data) {
      state.search = data;
    },
    COMMIT_CATEGORY(state, data) {
      state.category = data;
    },
    COMMIT_PAGE_MIN(state) {
      state.pageNumber--;
    },
    COMMIT_PAGE_PLUS(state) {
      state.pageNumber++;
    },
  },
  actions: {
    loginCheck(context) {
      if (localStorage.access_token) {
        context.commit("LOGIN_STATUS", true);
        context.commit("USERNAME_COMMIT", localStorage.username);
        context.commit("USERID_COMMIT", localStorage.id);
      } else {
        context.commit("LOGIN_STATUS", false);
      }
    },
    async fetchAll(context) {
      const { data } = await axios({
        method: "get",
        url: "/meme/post/",
      });
      context.commit("FETCH_POST", data);
    },
    async doLogin(context, userData) {
      try {
        const { data } = await axios({
          method: "post",
          url: "/login",
          data: userData,
        });
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("username", data.username);
        context.commit("LOGIN_STATUS", true);
        context.commit("USERNAME_COMMIT", data.username);
        context.commit("USERID_COMMIT", data.id);
      } catch (error) {
        return error.response.data.message;
      }
    },
    async doLogout(context) {
      try {
        await axios({
          method: "get",
          url: "/logout",
        });
        localStorage.clear();
        context.commit("LOGIN_STATUS", false);
      } catch (error) {
        return error.response.data.message;
      }
    },
    async doRegister(context, userData) {
      try {
        await axios({
          method: "post",
          url: "/register",
          data: userData,
        });
      } catch (error) {
        return error.response.data.message;
      }
    },
    async filter(context, filterData) {
      try {
        const { search, category, page } = filterData;
        let option = {};
        if (search && category) {
          option = {
            category: category,
            search: search,
            page: page,
          };
        } else if (!search && category) {
          option = { category: category, page: page };
        } else if (search && !category) {
          option = { search: search, page: page };
        } else {
          option = { page: page };
        }
        const { data } = await axios({
          method: "get",
          url: "/meme/post/",
          params: option,
        });
        context.commit("COMMIT_CATEGORY", category);
        context.commit("COMMIT_SEARCH", search);
        context.commit("FETCH_POST", data);
      } catch (error) {
        swal({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      }
    },
    async fetchPreview(context, option) {
      try {
        const { data } = await prev({
          method: "post",
          data: option,
        });
        context.commit("COMMIT_PREVIEW", data.url);
      } catch (error) {
        swal({
          title: "Preview Error",
          icon: "error",
        });
      }
    },
    async fetchAPI(context) {
      const { data } = await meme({
        method: "get",
      });
      let data2 = [];
      data.data.memes.forEach((el) => {
        if (el.box_count === 2) {
          data2.push(el);
        }
      });
      context.commit("IMGFLIP_DATA", data2);
    },
    async fetchCategories(context) {
      const { data } = await axios({
        method: "get",
        url: "/meme/category",
      });
      context.commit("CATEGORY_DATA", data);
    },
    async fetchPostDetail(context, postId) {
      if (!postId) {
        postId = localStorage.postId;
      }
      const { data } = await axios({
        method: "get",
        url: `/meme/post/${postId}`,
      });
      context.commit("POST_DETAIL", data);
      context.commit("POST_ID", postId);
    },
    async doComment(context, data) {
      try {
        const { comment, postId } = data;
        await axios({
          method: "post",
          url: `/meme/post/${postId}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            comment: comment,
          },
        });
      } catch (error) {
        return error;
      }
    },
    async doDeleteComment(context, id) {
      try {
        await axios({
          method: "delete",
          url: "/meme/comment",
          data: {
            commentId: id,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        });
      } catch (error) {
        return error;
      }
    },
    async editComment(context, payload) {
      try {
        const { comment, commentId, postId } = payload;
        await axios({
          method: "patch",
          url: `/meme/post/${postId}`,
          data: {
            comment: comment,
            commentId: commentId,
          },
          headers: { access_token: localStorage.access_token },
        });
      } catch (error) {
        return error;
      }
    },
    async updateCaption(context, payload) {
      try {
        const { caption, categoryId, postId } = payload;
        await axios({
          method: "patch",
          url: `/meme/post/${postId}/edit`,
          data: {
            caption: caption,
            categoryId: categoryId,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        });
      } catch (error) {
        return error;
      }
    },
    async deleteMemes(context, postId) {
      try {
        await axios({
          method: "delete",
          url: `/meme/post/${postId}/delete`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
      } catch (error) {
        return error;
      }
    },
    async UploadImage(context, data) {
      try {
        let formData = new FormData();
        formData.append("caption", data.caption);
        formData.append("file", data.file);
        formData.append("categoryId", data.categoryId);
        let config = {
          headers: { access_token: localStorage.access_token },
          header: {
            "Content-Type": "multipart/form-data",
          },
        };

        await axios.post("/meme/upload", formData, config);
      } catch (error) {
        return error;
      }
    },
  },
});
