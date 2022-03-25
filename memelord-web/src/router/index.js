import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import loginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import AddNewPost from "@/views/AddNewPost.vue";
import UploadPost from "@/components/UploadPost.vue";
import MemeMaker from "@/components/MemeMaker.vue";
import PostDetail from "@/views/PostDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: loginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/showdetail",
    name: "showdetail",
    component: PostDetail,
  },
  {
    path: "/newpost",
    name: "NewPost",
    component: AddNewPost,
    children: [
      {
        path: "upload",
        component: UploadPost,
      },
      {
        path: "mememaker",
        component: MemeMaker,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("access_token");
  const publicPage = ["home", "Register", "Login", "showdetail"];
  const afterLogin = ["Login", "Register"];
  const isAfterLogin = afterLogin.includes(to.name);
  const isPublicPage = publicPage.includes(to.name);

  if (!accessToken && !isPublicPage) {
    next(from.path);
  } else if (accessToken && isAfterLogin) {
    next(from.path);
  } else {
    next();
  }
});

export default router;
