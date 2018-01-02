// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import Axios from "axios";
import App from "./App";

//1. components for vue-router
import Goods from "./components/Goods/Goods";
import Ratings from "./components/Ratings/Ratings";
import Seller from "./components/Seller/Seller";

//2. define router
const routes = [
  { path: "/", redirect: "/goods" },
  { path: "/goods", component: Goods },
  { path: "/ratings", component: Ratings },
  { path: "/seller", component: Seller }
];

//3. create VueRouter instance
const router = new VueRouter({
  routes,
  //when link selected(default: router-link-active)
  linkActiveClass: "active"
});

Vue.config.productionTip = false;

Vue.use(VueRouter);
//若要在其他組件中使用axios命令，需要改寫為Vue的原形屬性
Vue.prototype.$axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  template: "<App/>",
  components: { App },
  //4. mount router instance
  router
});
