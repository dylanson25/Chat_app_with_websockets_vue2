import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { ChatRoom } from "../layouts/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/chats",
    name: "chats",
    component: () =>
      import(/* webpackChunkName: "chatView" */ "../views/ChatView.vue"),
    children: [
      {
        path: "global-chat",
        name: "global chat",
        component: () =>
          import(/* webpackChunkName: "chat room" */ "../layouts/ChatRoom.vue"),
      },
      {
        path: ":name",
        name: "user chat",
        component: () =>
          import(/* webpackChunkName: "chat room" */ "../layouts/ChatRoom.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
