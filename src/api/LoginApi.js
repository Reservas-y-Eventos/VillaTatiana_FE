import { api, getResponseData, escalateError } from "./index";
export default class LoginApi {

    static signUp(data) {
        const registerData = {
            name: data.firstName,
            lastName: data.lastName,
            phone: data.phoneNumber,
            email: data.email,
            userName: data.username,
            password: data.password
        }
        return api.post("user/signUp", registerData)
            .then(getResponseData)
            .catch(escalateError)
    }

    static signIn(data) {
        const loginData = {
            email: data.email,
            password: data.password
        }
        return api.post("user/signIn", loginData)
            .then(getResponseData)
            .catch(escalateError)
    }
}