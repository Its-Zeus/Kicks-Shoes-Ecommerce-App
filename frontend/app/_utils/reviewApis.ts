import axiosClient from "./axiosClient"

const getReviews = (itemsPerPage : number) => axiosClient.get(`/reviews?&pagination[pageSize]=${itemsPerPage}&pagination[page]=1&populate=*`)

export default {
    getReviews
}