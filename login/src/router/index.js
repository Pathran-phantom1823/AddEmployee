import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next("/employees");
      } else {
        next();
      }

    },
  },
  {
    path: "/employees",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/AccountList.vue"),
      meta:{
        requiresAuth:true
      }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router;