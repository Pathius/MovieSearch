import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    movies: [],
  },
  mutations: {
    setMovies: (state, payload) => {
      state.movies = payload
    }
  },
  actions: {
    searchByTitle: (context, payload) => {
      axios.get("https://api.themoviedb.org/3/search/movie?api_key=4a2556ad0cbaf0c9369adc89e3aaf7de&query=" + payload)
        .then(response => {
          context.commit("setMovies", response.data.results)
        })
    }
  },
  modules: {
  }
})
