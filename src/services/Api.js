import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: `/client/v1`,
    })
}
