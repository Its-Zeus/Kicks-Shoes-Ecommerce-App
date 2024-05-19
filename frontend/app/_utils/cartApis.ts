import { Axios } from "axios";
import axiosClient from "./axiosClient";
interface ProductType {
    productid: number;
    qty: number;
    size: string;
    // Add any other properties if necessary
}

const getCart = (email : any) => axiosClient.get(`/carts?filters[email][$eq]=${email}&populate[0]=product&populate[1]=pro.productid`)
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}
const addToCart = async (payload: Record<string, any> = new FormData()) => {
    let response : CartItem[] = [];
    try {
        const cartResponse = await axiosClient.get(`/carts?filters[email][$eq]=${payload.data.email}&populate[0]=product&populate[1]=pro.productid`);
        const cartsData = cartResponse.data.data;

        if (cartsData.length > 0) {
            const cart = cartsData[0];
            const cartId = cart.id;
            const cartProducts = cart.attributes.product;

            const isProductInCart = cartProducts.some((product: any) => product.productid === payload.data.product[0].productid && product.size === payload.data.product[0].size);

            if (isProductInCart) {
                const updatedProducts = cartProducts.map((product: ProductType) => {
                    if (product.productid === payload.data.product[0].productid) {
                        return {
                            ...product,
                            qty: product.qty + 1
                        };
                    }
                    return product;
                });

                const newPayload = {
                    data: {
                        email: payload.data.email,
                        product: updatedProducts
                    }
                };
                response = newPayload.data.product

                await axiosClient.put(`/carts/${cartId}`, newPayload);
            } else {
                const newPayload = {
                    data: {
                        email: payload.data.email,
                        product: [...cartProducts, payload.data.product[0]]
                    }
                };
                response = newPayload.data.product
                await axiosClient.put(`/carts/${cartId}`, newPayload);
            }
        } else {
            await axiosClient.post('/carts', payload);
        }

        // After updating the cart, fetch the updated cart
        //const updatedCartResponse = await getCart(payload.data.email);
        //response = updatedCartResponse.data;
    } catch (error) {
        console.error("Error in addToCart:", error);
    }

    return response;
};

const updateQuantity = async (payload: Record<string, any> = new FormData()) => {
    let response = {};
    const cartResponse = await axiosClient.get(`/carts?filters[email][$eq]=${payload.data.email}&populate[0]=product&populate[1]=pro.productid`)
    const cartsData = cartResponse.data.data;
    if (cartsData.length > 0) {
        const cart = cartsData[0];
        const cartId = cart.id;
        const cartProducts = cart.attributes.product;
        const isProductInCart = cartProducts.some((product : any) => product.productid == payload.data.product[0].productid)
        if (isProductInCart) {
            const productindex = cartProducts.findIndex((product : any) => product.productid === payload.data.product[0].productid && product.size === payload.data.product[0].size);
            cartProducts.splice(productindex, 1)
            cartProducts.splice(productindex, 0, payload.data.product[0])
            const newPayload = {
                data: {
                    email: payload.data.email,
                    product: cartProducts
                }
            }
            response = cartProducts
            axiosClient.put(`/carts/${cartId}`, newPayload)
        }
    }
    return response
}
const removeFromCart = async (payload : Record<string, any> = new FormData()) => {
    let response : CartItem[] = [];
    try {
        const cartResponse = await axiosClient.get(`/carts?filters[email][$eq]=${payload.data.email}&populate[0]=product&populate[1]=pro.productid`)
        const cartsData = cartResponse.data.data;
        if (cartsData.length > 0) {
            const cart = cartsData[0];
            const cartId = cart.id;
            const cartProducts = cart.attributes.product;

            const isProductInCart = cartProducts.some((product : any) => product.productid == payload.data.product[0].productid)
            if (isProductInCart) {
                const filteredProducts = cartProducts.filter((product : any) => product.productid !== payload.data.product[0].productid);
                const updatedProducts = cartProducts.filter((product : any) => product.productid === payload.data.product[0].productid && product.size !== payload.data.product[0].size);
                console.log(payload.data.product[0].size)
                const newPayload = {
                    data: {
                        email: payload.data.email,
                        product: [...updatedProducts, ...filteredProducts]
                    }
                };
                response = newPayload.data.product
            
                axiosClient.put(`/carts/${cartId}`, newPayload).then((res) => {
                });
            }
        }
        //const updatedCartResponse = await getCart(payload.data.email);
        //response = updatedCartResponse.data;
    }
    catch (error) {
        console.error("Error in removeFromCart:", error);
    }
    return response;
}


export default {
    addToCart, removeFromCart, getCart, updateQuantity
}