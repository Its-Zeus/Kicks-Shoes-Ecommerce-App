"use client"
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Spacing from '../_constants/Spacing'
import Link from 'next/link'
import { LuUser2 } from "react-icons/lu";
import { UserButton, useUser } from '@clerk/nextjs';
import cartApis from '../_utils/cartApis'
import { CartContext, useCart } from '../_context/CartContext'
import productApis from '../_utils/productApis'

interface CartItem {
  product: any;
  qty: number;
}
const Navbar = () => {
  const {user, isSignedIn, isLoaded} = useUser();
  
  const {cart, setCart} = useCart()
  const {cartItems, setCartItems} = useCart()
  //const [cartTotal, setCartTotal] = useState(0)
  const [cartCount , setCartCount] = useState(0)
  const { cartTotal, setCartTotal } = useCart()
  //const [cartItems, setCartItems] = useState<CartItem[]>([]);


  const getCartItems = async () => {
    const res = await cartApis.getCart(user?.primaryEmailAddress?.emailAddress);
    const products = res.data?.data[0]?.attributes?.product;

    if (products) {
        // Array to store promises returned by getProduct API calls
        const getProductPromises: Promise<{ product: any; qty: number; }>[] = [];

        products.forEach((element: any) => {
            // Push the promise returned by each getProduct API call into the array
            getProductPromises.push(
                productApis.getProduct(element.productid).then((res) => {
                    const product = res.data.data;
                    return { product: product, qty: element.qty, size: element.size };
                })
            );
        });

        // Wait for all getProduct API calls to complete
        Promise.all(getProductPromises).then((results) => {
            // Update cartItems with the resolved products
            setCartItems(results);
            console.log(results);
        });
    }
};

const getCartTotal = () => {
  let total = 0;
  cartItems?.forEach((element: any) => {
      total += (element.product.attributes.price * element.qty);
  });
  return total;
};

const getItemCount = () => {
  let count = 0;
  cartItems?.forEach((element: any) => {
      count += element.qty;
  });
  return count;
}

useEffect(() => {
  if (user) {
    const total = getCartTotal();
    setCartTotal(total);
    const count = getItemCount();
    setCartCount(count);
  }
}, [cartItems]);

  useEffect(() => {
    user && getCartItems()
  }, [user, cart])
  // const getTotalAmount = () => {
  //   let total = 0
  //   user && cart?.forEach((element: any) => {
  //     const productid = element.productid
  //     const qty = element.qty
  //     productApis.getProduct(productid).then((res) => {
  //         const price = res.data.data.attributes.price
  //         total += (price * qty)
  //     }).then(() => {
  //       setCartTotal(total)
  //     })
  //   });
  //   }

  // useEffect(() => {
  //   getTotalAmount()
  // }, [cart, cartCount])

  // useEffect(() => {
  //   user && cartApis.getCart(user?.primaryEmailAddress?.emailAddress).then((res) => {
  //     const products = res.data?.data[0]?.attributes?.product
  //     if (products) {
  //       let count = 0
  //       products.forEach((element: any)  => {
  //         count += element.qty
  //       });
  //       setCartCount(count)
  //     }
  //   })
  // }, [user, cart])
  return (
<div className={`navbar bg-fawhite rounded-3xl py-4 m-auto ${Spacing}`}>
<div className="navbar-start hidden lg:flex">
<ul className="menu menu-horizontal px-1">
      <li className='text-darkgrey text-base font-bold'><a href="/newdrops">🔥 New Drops 1</a></li>
      <li className='text-darkgrey text-base font-bold'>
        <details>
          <summary>Categories</summary>
          <ul className="p-2 absolute z-10">
            <li><a href="/categories/lifestyle-shoes">Lifestyle Shoes</a></li>
            <li><a href="/categories/running-shoes">Running Shoes</a></li>
            <li><a href="/categories/soccer-shoes">Soccer Shoes</a></li>
            <li><a href="/categories/basketball-shoes">Basketball Shoes</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
<div className="navbar-start lg:hidden">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="/newdrops">🔥 New Drops</a></li>
        <li>
          <a>Categories</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
<div className="navbar-center">
    <Link href="/"> <Image src="/logo.png" alt="logo" width={128} height={32}/></Link>
  </div>

  <div className="navbar-end mr-5">
  <div className="flex items-center gap-3">
    <div className="dropdown dropdown-end">
      <Link href={'/cart'} tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">{cartCount}</span>
        </div>
      </Link>
    </div>
    <div className="dropdown dropdown-end">
        {!isSignedIn ? <Link href={'/sign-in'}>
          <div className='hover:bg-darkgrey/20 rounded-3xl h-full p-2'>
            <LuUser2 size={23} className=""/>
          </div>
        </Link>
        : <UserButton afterSignOutUrl='/'/>}
      
    </div>
  </div>
  </div>
</div>
  )
}

export default Navbar