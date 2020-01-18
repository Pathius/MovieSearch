import axios from 'axios'

const databaseAxios = axios.create({
    baseURL: 'https://movie-search-8b974.firebaseio.com/'
})

export default databaseAxios