import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    movies: []
  },
  mutations: {
    setMovies: (state, payload) => {
      state.movies = payload
    }
  },
  actions: {
    searchByTitle: (context, payload) => {
      axios.get("http://www.omdbapi.com/?apikey=37207fe&s=" + payload).then(response => {
        context.commit('setMovies', response.data.Search)
      })
    }
  },
  modules: {
  }
})
