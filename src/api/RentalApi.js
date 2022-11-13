import { api, getResponseData, escalateError } from "./index";

export default class RentalApi {

    static addItem(data) {
        return api.post("item/createItem", {
            name: data.name,
            time: data.time,
            price: data.price,
            type: data.type,
            stock: data.stock,
            url: data.url,
        })
            .then(getResponseData)
            .catch(escalateError)
    }

    static getItems() {
        return api.get("item/listItem")
            .then(getResponseData)
            .catch(escalateError)
    }

    static getRentItem(data) {
        return api.get("renting/listRenting", {
            name: data.name,
        })
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

    static updateItem(data) {
        return api.put("item/updateItem", {
            name: data.name,
            time: data.time,
            price: data.price,
            type: data.type,
            stock: data.stock,
            url: data.url,
        })
            .then(getResponseData)
            .catch(escalateError)
    }

    static deleteItem(data) {
        console.log('api ', data);
        return api.delete("item/deleteItem", {
            name: data.name,
        })
            .then(getResponseData)
            .catch(escalateError)
    }
}