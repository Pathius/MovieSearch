import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router/index.js'

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
    // Function called after submiting the searching input
    // Takes input value as payload and returns results to data object
    searchByTitle: async ({ commit }, payload) => {
      commit("resetMovies")
      try {
        let { data } = await axios.get(`search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${payload}`)
        commit("setMovies", data.results)
      } catch (error) {
        console.log("ERROR 404", error)
      }
    },
    // Function called after entering ActualMovie component
    // Takes movie id as a payload and returns results to data object
    findExactMovie: async ({ commit }, payload) => {
      commit("resetActualMovie")
      try {
        let { data } = await axios.get(`movie/${payload}?api_key=${process.env.VUE_APP_API_KEY}`)
        commit("setActualMovie", data)
      } catch (error) {
        router.push('/error')
        console.log("ERROR", error)
      }
    }
  }
})
