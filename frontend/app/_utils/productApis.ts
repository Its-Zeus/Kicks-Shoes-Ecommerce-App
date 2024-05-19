import axiosClient from "./axiosClient"

const getLatestProducts = () => axiosClient.get('/products?sort=createdAt:desc&pagination[pageSize]=4&pagination[page]=1&populate=*')
const getProductBySlug = (slug : string) => axiosClient.get(`/products?filters[slug][$eq]=${slug}&populate=*`)
const getProductbyCategory = (category : string, currentPage: number, itemsPerPage : number) => axiosClient.get(`/products?filters\[category\][slug][$eq]=${category}&pagination[pageSize]=${itemsPerPage}&pagination[page]=${currentPage}&populate=*`)
const getProductListFiltered = (query : string) => axiosClient.get(`/products?${query}&populate=*`)
const getProduct = (id : number) => axiosClient.get(`/products/${id}?populate=*`)

export default {
    getLatestProducts, getProductBySlug, getProductbyCategory,getProductListFiltered, getProduct
}