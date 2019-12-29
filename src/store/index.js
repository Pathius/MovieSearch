import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

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
      axios.get(`search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${payload}`)
        .then(response => {
          context.commit("setMovies", response.data.results)
        })
    },
    findExactMovie: (context, payload) => {
      context.commit("resetActualMovie")
      axios.get(`movie/${payload}?api_key=${process.env.VUE_APP_API_KEY}`)
        .then(response => {
          context.commit("setActualMovie", response.data)
        })
    }
  },
  modules: {
  }
})
