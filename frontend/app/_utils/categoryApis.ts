import axiosClient from "./axiosClient"

const getCategories = (currentPage: number, itemsPerPage : number) => axiosClient.get(`/categories?pagination[pageSize]=${itemsPerPage}&pagination[page]=${currentPage}&populate=*`)

export default {
    getCategories
}