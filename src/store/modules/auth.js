import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router/index.js'

const authAxios = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/'
})

Vue.use(Vuex, VueAxios, authAxios)

export default {
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
        logout: state => {
            state.token = ""
            state.userId = ""
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
        async login({ state, commit }, { loginPayload, stayLogged }) {
            state.loginIsLoading = true
            try {
                let { data } = await authAxios.post(`accounts:signInWithPassword?key=${process.env.VUE_APP_AUTH_API_KEY}`, loginPayload)
                const expire = new Date()
                // IF "STAY LOGGED" CHECKBOX WAS CHECKED USER WILL STAY LOGGED FOR 48 HOURS
                if (stayLogged) {
                    expire.setHours(expire.getHours() + 48);
                } else {
                    expire.setHours(expire.getHours() + 1);
                }
                data = { ...data, expire }
                commit('setUser', data)
                commit('closeModal')
            } catch (error) {
                console.log("LOGIN ERROR", error)
                state.loginError = true
            }
            state.loginIsLoading = false
        },
        async register({ state, commit }, payload) {
            state.registerIsLoading = true
            try {
                let { data } = await authAxios.post(`accounts:signUp?key=${process.env.VUE_APP_AUTH_API_KEY}`, payload)
                // AFTER BEING REGISTER USER WILL STAY LOGGED ONLY FOR 1 HOUR
                const expire = new Date()
                expire.setHours(expire.getHours() + 1);
                data = { ...data, expire }
                commit('setUser', data)
                router.push('/favourite')
            } catch (error) {
                console.log("REGISTER ERROR", error)
                state.registerError = true
            }
            state.registerIsLoading = false
        }
    }
}