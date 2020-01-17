import Vue from 'vue'
import Vuex from 'vuex'
import movies from './modules/movies'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movies,
    auth
  }
})
