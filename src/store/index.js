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
    movies: [],
    favouriteMovies: [],
    favouriteMoviesIds: [],
    actualMovie: {},
  },
  mutations: {
    resetMovies: (state) => {
      state.movies = []
      state.loading = true
    },
    resetActualMovie: (state) => {
      state.actualMovie = {}
    },
    setMovies: (state, payload) => {
      state.movies = payload
      state.loading = false
    },
    setActualMovie: (state, payload) => {
      state.actualMovie = payload
    },
    setFavouriteMovies: (state, payload) => {
      state.favouriteMovies = payload
    },
    setFavouriteMoviesIds: (state, payload) => {
      if (payload) {
        let ids = []
        payload.forEach(movie => {
          ids.push(movie.id)
        })
        state.favouriteMoviesIds = ids
      }
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
    addFavouriteMovies: ({ commit }, payload) => {
      // Function called after clicking "favourite button" in ActualMovie component if movie isn't favourite
      // Takes movie object as payload and adds it to localStorage 
      let movies = JSON.parse(localStorage.getItem("favouriteMovies"));
      // Checks if there's any favourite movies existing in localStorage
      // if not, payload will be placed in array
      if (movies) {
        movies.push(payload);
        localStorage.setItem("favouriteMovies", JSON.stringify(movies));
      } else {
        localStorage.setItem("favouriteMovies", JSON.stringify([payload]));
      }
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
      commit("setFavouriteMoviesIds", movies)
    }
  },
})
