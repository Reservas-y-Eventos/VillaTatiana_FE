import { api, getResponseData, escalateError } from "./index";

export default class ServicesApi {

    static getServices(service) {
        return api.post("form/sitios", { name: service })
            .then(getResponseData)
            .catch(escalateError)
    }

    static getSite(data) {
        return api.post("form/sitio", { type: data })
            .then(getResponseData)
            .catch(escalateError)
    }

    static postBooking(data) {
        return api.post("form/create", {
            date: data.date,
            name: data.name,
            phone: data.phone,
            email: data.email,
            service: data.service,
        })
            .then(getResponseData)
            .catch(escalateError)
    }

    static getAllDates() {
        return api.get("form/all")
            .then(getResponseData)
            .catch(escalateError)
    }
}