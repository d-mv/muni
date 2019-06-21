import axios from 'axios'

export const request = axios => ({
locationsList:async link => axios.get(link)
})

export default request(axios)