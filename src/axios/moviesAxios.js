import axios from 'axios'

const moviesAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default moviesAxios