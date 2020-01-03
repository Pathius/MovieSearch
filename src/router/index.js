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
    path: "/movie/:id",
    name: "movie:id",
    props: route => ({ id: route.params.id }),
    component: () => import('@/views/ActualMovie.vue')
  },
  {
    path: "/upcoming",
    name: "upcoming",
    component: () => import('@/views/TheUpcomingMovies.vue')
  },
  {
    path: "/popular",
    name: "popular",
    component: () => import('@/views/ThePopularMovies.vue')
  },
  {
    path: "/error",
    name: "error",
    component: () => import('@/views/Error.vue')
  },
  {
    path: '/*',
    redirect: '/error'
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
