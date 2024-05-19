import axiosClient from "./axiosClient"

const getColors = () => axiosClient.get('/colors')
const getSizes = () => axiosClient.get('/sizes')
const getCategories = () => axiosClient.get('/categories')

export default {
    getColors, getSizes, getCategories
}