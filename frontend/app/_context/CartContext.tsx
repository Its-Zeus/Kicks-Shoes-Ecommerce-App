"use client";
import React, { createContext, useState, useContext } from "react";
import cartApis from "../_utils/cartApis";
import { promises } from "dns";

// Define the type for your cart items
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Payload {
    data: {
        email: string | undefined;
        product: ProductType[];
    };
}
interface ProductType {
    productid: number;
    qty: number;
}
// Define the type for your context
interface CartContextType {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    addToCart: any;
    removeFromCart: (payload: Payload) => void;
    cartItems: CartItems[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
    ChangeQuantity: (payload: Payload) => void;
    cartTotal: number;
    setCartTotal: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with the specified type
export const CartContext = createContext<CartContextType | null>(null);
type CartProviderType = {
    children: React.ReactNode;
}
interface CartItems {
    product: any;
    qty: number;
  }
export function CartProvider ({ children } : CartProviderType)  {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartCount , setCartCount] = useState(0)
    const [cartItems, setCartItems] = useState<CartItems[]>([]);
    const [cartTotal, setCartTotal] = useState(0)

    const addToCart =  (payload : Record<string, any> = new FormData()) => {
        cartApis.addToCart(payload).then((res) => {
            setCart(res)
        })


    };

    const removeFromCart = async (payload : Record<string, any> = new FormData()) => {
        cartApis.removeFromCart(payload).then((res) => {
            setCart(res)
        })      
    };

    const ChangeQuantity = async (payload : Record<string, any> = new FormData()) => {

        cartApis.updateQuantity(payload)
        .then((res) => {
            console.log("zz",res)
            cartApis.getCart(payload.data.email).then((res) => {
                setCart(res.data.data[0].attributes.product)
                console.log("cc",res.data.data[0].attributes.product)
            })
        })
    }

    const value: CartContextType = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        ChangeQuantity,
        cartTotal,
        setCartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Example of how to use the context in a component
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
