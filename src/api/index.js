import axios from "axios";

const apiBack = "https://appvillatatiana.herokuapp.com/api/"

let header = {
    "Content-Type": "application/json",
};

export let api = axios.create({
    baseURL: apiBack,
    headers: header,

})

export const getResponseData = (resp) => resp.data

export const escalateError = (err) => {
    console.log(err);
}