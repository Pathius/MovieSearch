import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    movies: [],
    actualMovie: {}
  },
  mutations: {
    resetMovies: (state) => {
      state.movies = []
    },
    resetActualMovie: (state) => {
      state.actualMovie = {}
    },
    setMovies: (state, payload) => {
      state.movies = payload
    },
    setActualMovie: (state, payload) => {
      state.actualMovie = payload
    }
  },
  actions: {
    searchByTitle: (context, payload) => {
      context.commit("resetMovies")
      axios.get("https://api.themoviedb.org/3/search/movie?api_key=4a2556ad0cbaf0c9369adc89e3aaf7de&query=" + payload)
        .then(response => {
          context.commit("setMovies", response.data.results)
        })
    },
    findExactMovie: (context, payload) => {
      context.commit("resetActualMovie")
      axios.get(`https://api.themoviedb.org/3/movie/${payload}?api_key=4a2556ad0cbaf0c9369adc89e3aaf7de`)
        .then(response => {
          context.commit("setActualMovie", response.data)
        })
    }
  },
  modules: {
  }
})
