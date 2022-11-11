import { api, getResponseData, escalateError } from "./index";

export default class RentalApi {

    static getItems() {
        return api.get("item/listItem")
            .then(getResponseData)
            .catch(escalateError)
    }

    static rentItem(data) {
        return api.post("renting/createRenting", {
            name: data.name,
            dni: data.dni,
            amount: data.amount,
        })
            .then(getResponseData)
            .catch(escalateError)
    }
}