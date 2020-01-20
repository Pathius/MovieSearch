import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import router from '@/router/index.js'
import auth from './auth'

const moviesUrl = 'https://api.themoviedb.org/3/'
const databaseUrl = 'https://movie-search-8b974.firebaseio.com/'

Vue.use(Vuex, VueAxios)

export default {
    namespaced: true,
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
            let ids = []
            for (let movie of payload) {
                ids.push(movie.id)
            }

            state.favouriteMovies = payload
            state.favouriteMoviesIds = ids
        },
        pushFavouriteMovies: (state, payload) => {
            state.favouriteMovies.push(payload)
            state.favouriteMoviesIds.push(payload.id)
        },
        removeFavouriteMovie: (state, payload) => {
            let index = state.favouriteMovies.findIndex(index => index.id === payload)
            let idIndex = state.favouriteMoviesIds.findIndex(index => index === payload)
            state.favouriteMovies.splice(index, 1)
            state.favouriteMoviesIds.splice(idIndex, 1)
        },
        setUpcomingMovies: (state, payload) => { state.upcomingMovies = payload },
        setPopularMovies: (state, payload) => { state.popularMovies = payload },
        showModal: (state) => { state.showModal = true },
        closeModal: (state) => { state.showModal = false }
    },
    actions: {
        // Function called after submiting the searching input
        // Takes input value as payload and returns results to data object
        searchByTitle: async ({ commit }, payload) => {
            commit("resetMovies")
            let response = await fetch(`${moviesUrl}search/movie?api_key=${process.env.VUE_APP_MOVIE_API_KEY}&query=${payload}`)
            let data = await response.json()
            commit("setMovies", data.results)
        },
        // Function called after entering ActualMovie component
        // Takes movie id as a payload and returns results to data object
        findExactMovie: async ({ commit }, payload) => {
            commit("resetActualMovie")
            try {
                let response = await fetch(`${moviesUrl}movie/${payload}?api_key=${process.env.VUE_APP_MOVIE_API_KEY}`)
                let data = await response.json()
                commit("setActualMovie", data)
            } catch (error) {
                router.push('/error')
                console.log("ACTUAL MOVIE ERROR", error)
            }
        },
        // Function called after clicking "favourite button" in ActualMovie component if movie is not favourite
        // Takes movie object as payload, push it into state and adds on database
        addFavouriteMovies: async ({ commit }, payload) => {
            try {
                commit('pushFavouriteMovies', payload)
                await fetch(`${databaseUrl}${auth.state.userId}/movies/${payload.id}.json`, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
            } catch (error) {
                console.log("ADD TO FAVOURITE ERROR", error);
            }
        },
        // Function called after clicking "favourite button" in ActualMovie component if movie is favourite
        // Takes movie id as payload and deletes the object with same id from database and state
        removeFavouriteMovie: async ({ commit }, payload) => {
            try {
                commit('removeFavouriteMovie', payload)
                await fetch(`${databaseUrl}${auth.state.userId}/movies/${payload}.json`, {
                    method: "DELETE",
                    'Content-type': 'application/json'
                })
            } catch (error) {
                console.log("REMOVE FROM FAVOURITE ERROR", error);
            }
        },
        // Function called after login or refreshing/opening app with token in localStorage
        // Gets movies stored in database using userId and then adds them into state
        getFavouriteMovies: async ({ commit }) => {
            try {
                let response = await fetch(`${databaseUrl}${auth.state.userId}.json`)
                let data = await response.json()
                // data.movies is an object with other objects, it has to be converted into array
                if (data.movies) {
                    commit('setFavouriteMovies', Object.keys(data.movies).map(i => data.movies[i]))
                }
            } catch (error) {
                console.log("GET MOVIES FROM DATABASE ERROR", error);
            }
        },
        // Function called after refreshing/opening app
        // Gets upcoming movies from API and adds them into state
        getUpcomingMovies: async ({ commit }) => {
            try {
                let response = await fetch(`${moviesUrl}movie/upcoming?api_key=${process.env.VUE_APP_MOVIE_API_KEY}&language=en-US`)
                let data = await response.json()
                commit("setUpcomingMovies", data.results)
            } catch (error) {
                console.log("GET UPCOMING MOVIES ERROR", error)
            }
        },
        // Function called after refreshing/opening app
        // Gets popular movies from API and adds them into state
        getPopularMovies: async ({ commit }) => {
            try {
                let response = await fetch(`${moviesUrl}movie/popular?api_key=${process.env.VUE_APP_MOVIE_API_KEY}`)
                let data = await response.json()
                commit("setPopularMovies", data.results)
            } catch (error) {
                console.log("GET POPULAR MOVIES ERROR", error)
            }
        },
    },
}