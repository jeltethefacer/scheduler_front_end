import Axios from "axios"
import { config } from "../utils/config"

const tokenRequest = (token) =>{
     return Axios.create({
        baseURL: `${config().url}`,
        headers: {
            "authorization": `bearer ${token}`
        }
    })
}

export default tokenRequest