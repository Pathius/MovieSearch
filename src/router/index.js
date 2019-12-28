import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "search",
    component: () => import('@/views/TheMainContent.vue')
  },
  {
    path: "/favourite",
    name: "favourite",
    component: () => import('@/views/TheFavouriteMovies.vue')
  },
  {
    path: "/movie",
    name: "movie:id",
    props: route => ({ id: route.query.id }),
    component: () => import('@/views/ActualMovie.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
