import axios from "axios";

const apiBack = 'http://da03-191-156-54-76.ngrok.io/api/'

let header = {
    'Content-Type': 'application/json',
};

export let api = axios.create({
    baseURL: apiBack,
    headers: header,

})

export const getResponseData = (resp) => resp.data

export const escalateError = (err) => {
    console.log(err);
}