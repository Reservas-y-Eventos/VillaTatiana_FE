import { api, getResponseData, escalateError } from "./index";

export default class LoginApi {
    static getUserById(userId) {
        return api.get(`user/${userId}`)
            .then(getResponseData)
            .catch(escalateError)
    }
}