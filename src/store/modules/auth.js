import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import movies from './movies'

const authUrl = 'https://identitytoolkit.googleapis.com/v1/'
const databaseUrl = 'https://movie-search-8b974.firebaseio.com/'
Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        token: null,
        userId: null,
        showModal: false,
        registerIsLoading: false,
        loginIsLoading: false,
        registerError: false,
        loginError: false
    },
    mutations: {
        showModal: state => state.showModal = true,
        closeModal: state => state.showModal = false,
        showLoginError: state => state.loginError = true,
        showRegisterError: state => state.registerError = true,
        loginLoading: state => state.loginIsLoading = true,
        loginNotLoading: state => state.loginIsLoading = false,
        registerLoading: state => state.registerIsLoading = true,
        registerNotLoading: state => state.registerIsLoading = false,
        logout: state => {
            state.token = ""
            state.userId = ""
            movies.state.favouriteMovies = []
            movies.state.favouriteMoviesIds = []
            localStorage.removeItem('token')
            if (router.currentRoute.path != '/') { router.replace('/') }
        },
        setUser: (state, { idToken, localId, expire }) => {
            state.token = idToken
            state.userId = localId
            localStorage.setItem('token', JSON.stringify({ idToken, localId, expire }))
        },
        checkIfLogged: (state, payload) => {
            const now = new Date()
            // CHECK IF TOKEN EXIST
            if (payload) {
                // CHECK IF TOKEN EXPIRED
                if (new Date(payload.expire) > now) {
                    state.token = payload.idToken
                    state.userId = payload.localId
                } else {
                    localStorage.removeItem('token')
                }
            }
        },
    },
    actions: {
        // Function called after submiting the login form
        // Takes input values as payload and returns results to data object
        async login({ commit, dispatch }, { loginPayload, stayLogged }) {
            commit('loginLoading')
            try {
                let response = await fetch(`${authUrl}accounts:signInWithPassword?key=${process.env.VUE_APP_AUTH_API_KEY}`, {
                    method: "POST",
                    'Content-type': 'application/json',
                    body: JSON.stringify(loginPayload)
                })
                if (!response.ok) throw new Error(response.statusText);
                let data = await response.json()
                // IF "STAY LOGGED" CHECKBOX WAS CHECKED USER WILL STAY LOGGED FOR 48 HOURS
                const expire = new Date()
                if (stayLogged) {
                    expire.setHours(expire.getHours() + 48);
                } else {
                    expire.setHours(expire.getHours() + 1);
                }
                data = { ...data, expire }
                commit('setUser', data)
                dispatch('movies/getFavouriteMovies', null, { root: true })
                commit('closeModal')
            } catch (error) {
                console.log("LOGIN ERROR", error)
                commit('showLoginError')
            }
            commit('loginNotLoading')
        },
        // Function called after submiting the register form
        // Takes input values as payload and returns results to data object
        async register({ commit }, payload) {
            commit('registerLoading')
            try {
                // ADDING USER TO AUTH DATABASE
                let response = await fetch(`${authUrl}accounts:signUp?key=${process.env.VUE_APP_AUTH_API_KEY}`, {
                    method: "POST",
                    'Content-type': 'application/json',
                    body: JSON.stringify(payload)
                })
                if (!response.ok) throw new Error(response.statusText);
                let data = await response.json()
                // ADDING USER TO A DATABASE
                await fetch(`${databaseUrl}${data.localId}.json`, {
                    method: "PUT",
                    'Content-type': 'application/json',
                    body: JSON.stringify({ email: payload.email })
                })
                // AFTER BEING REGISTER USER WILL STAY LOGGED ONLY FOR 1 HOUR
                const expire = new Date()
                expire.setHours(expire.getHours() + 1);
                data = { ...data, expire }
                commit('setUser', data)
                router.push('/favourite')
            } catch (error) {
                console.log("REGISTER ERROR", error)
                commit('showRegisterError')
            }
            commit('registerNotLoading')
        }
    }
}