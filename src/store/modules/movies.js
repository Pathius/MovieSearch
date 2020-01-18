import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import router from '@/router/index.js'
import auth from './auth'
import moviesAxios from '@/axios/moviesAxios.js'
import databaseAxios from '@/axios/databaseAxios.js'


Vue.use(Vuex, VueAxios, moviesAxios)

export default {
    state: {
        loading: false,
        searched: false,
        movies: [],
        favouriteMovies: [],
        upcomingMovies: [],
        popularMovies: [],
        favouriteMoviesIds: [],
        actualMovie: {},
        showModal: false
    },
    mutations: {
        resetMovies: (state) => {
            state.movies = []
            state.loading = true
            state.searched = false
            console.log(auth);
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
            try {
                let { data } = await moviesAxios.get(`search/movie?api_key=${process.env.VUE_APP_MOVIE_API_KEY}&query=${payload}`)
                commit("setMovies", data.results)
            } catch (error) {
                console.log("SEARCHING MOVIE ERROR", error)
            }
        },
        // Function called after entering ActualMovie component
        // Takes movie id as a payload and returns results to data object
        findExactMovie: async ({ commit }, payload) => {
            commit("resetActualMovie")
            try {
                let { data } = await moviesAxios.get(`movie/${payload}?api_key=${process.env.VUE_APP_MOVIE_API_KEY}`)
                commit("setActualMovie", data)
            } catch (error) {
                router.push('/error')
                console.log("ACTUAL MOVIE ERROR", error)
            }
        },
        // Function called after clicking "favourite button" in ActualMovie component if movie is not favourite
        // Takes movie object as payload, push it into state and adds on database
        addFavouriteMovies: async ({ state }, payload) => {
            try {
                state.favouriteMovies.push(payload)
                state.favouriteMoviesIds.push(payload.id)
                await databaseAxios.put(`${auth.state.userId}/movies/${payload.id}.json`, payload)
            } catch (error) {
                console.log("ADD TO FAVOURITE ERROR", error);
            }
        },
        // Function called after clicking "favourite button" in ActualMovie component if movie is favourite
        // Takes movie id as payload and deletes the object with same id from database and state
        removeFavouriteMovie: async ({ state }, payload) => {
            try {
                let index = state.favouriteMovies.findIndex(index => index.id === payload)
                let idIndex = state.favouriteMoviesIds.findIndex(index => index === payload)
                state.favouriteMovies.splice(index, 1)
                state.favouriteMoviesIds.splice(idIndex, 1)
                await databaseAxios.delete(`${auth.state.userId}/movies/${payload}.json`)
            } catch (error) {
                console.log("REMOVE FROM FAVOURITE ERROR", error);
            }
        },
        // Function called after login or refreshing/opening app with token in localStorage
        // Gets movies stored in database using userId and then adds them into state
        getFavouriteMovies: async ({ commit }) => {
            try {
                let response = await databaseAxios.get(`${auth.state.userId}.json`)
                // response.data.movies is an object with other objects, it has to be converted into array
                commit('setFavouriteMovies', Object.keys(response.data.movies).map(i => response.data.movies[i]))
            } catch (error) {
                console.log("GET MOVIES FROM DATABASE ERROR", error);
            }
        },
        // Function called after refreshing/opening app
        // Gets upcoming movies from API and adds them into state
        getUpcomingMovies: async ({ commit }) => {
            try {
                let { data } = await moviesAxios.get(`movie/upcoming?api_key=${process.env.VUE_APP_MOVIE_API_KEY}&language=en-US`)
                commit("setUpcomingMovies", data.results)
            } catch (error) {
                console.log("GET UPCOMING MOVIES ERROR", error)
            }
        },
        // Function called after refreshing/opening app
        // Gets popular movies from API and adds them into state
        getPopularMovies: async ({ commit }) => {
            try {
                let { data } = await moviesAxios.get(`movie/popular?api_key=${process.env.VUE_APP_MOVIE_API_KEY}`)
                commit("setPopularMovies", data.results)
            } catch (error) {
                console.log("GET POPULAR MOVIES ERROR", error)
            }
        },
    },
}