import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router/index.js'

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    loading: false,
    searched: false,
    movies: [],
    favouriteMovies: [],
    upcomingMovies: [],
    popularMovies: [],
    favouriteMoviesIds: [],
    actualMovie: {},
  },
  mutations: {
    resetMovies: (state) => {
      state.movies = []
      state.loading = true
      state.searched = false
    },
    resetActualMovie: (state) => {
      state.loading = true
      state.actualMovie = {}
    },
    setMovies: (state, payload) => {
      state.movies = payload
      state.loading = false
      state.searched = true
    },
    setActualMovie: (state, payload) => {
      state.actualMovie = payload
      state.loading = false
    },
    setFavouriteMovies: (state, payload) => {
      if (payload) {
        let ids = []
        for (let movie of payload) {
          ids.push(movie.id)
        }
        state.favouriteMoviesIds = ids
        state.favouriteMovies = payload
      }
    },
    setUpcomingMovies: (state, payload) => {
      state.upcomingMovies = payload
    },
    setPopularMovies: (state, payload) => {
      state.popularMovies = payload
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
    },
    addFavouriteMovies: ({ commit, state }, payload) => {
      // Function called after clicking "favourite button" in ActualMovie component if movie isn't favourite
      // Takes movie object as payload and adds it to localStorage 
      let movies = JSON.parse(localStorage.getItem("favouriteMovies"));
      // Checks if there's any favourite movies existing in localStorage
      // if not, payload will be placed in array
      if (movies && !state.favouriteMoviesIds.includes(payload.id)) {
        movies.push(payload);
      } else {
        movies = [payload]
      }
      localStorage.setItem("favouriteMovies", JSON.stringify(movies));
      commit("setFavouriteMovies", movies)
      commit("setFavouriteMoviesIds", movies)
    },
    removeFavouriteMovie: ({ commit }, payload) => {
      // Function called after clicking "favourite button" in ActualMovie component if movie is favourite
      // Takes movie id as payload and and deletes the object with same id from localStorage 
      let movies = JSON.parse(localStorage.getItem("favouriteMovies"));
      let index = movies.findIndex(index => index.id === payload)
      movies.splice(index, 1)
      localStorage.setItem("favouriteMovies", JSON.stringify(movies))
      commit("setFavouriteMovies", movies)
    },
    getUpcomingMovies: async ({ commit }) => {
      try {
        let { data } = await axios.get(`movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`)
        commit("setUpcomingMovies", data.results)
      } catch (error) {
        console.log("ERROR 404", error)
      }
    },
    getPopularMovies: async ({ commit }) => {
      try {
        let { data } = await axios.get(`movie/popular?api_key=${process.env.VUE_APP_API_KEY}`)
        commit("setPopularMovies", data.results)
      } catch (error) {
        console.log("ERROR 404", error)
      }
    },
  },
})
