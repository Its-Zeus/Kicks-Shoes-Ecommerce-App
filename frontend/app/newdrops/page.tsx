"use client"
import React, { useEffect, useRef, useState } from 'react'
import Spacing from '../_constants/Spacing'
import ColorPicker from './_components/ColorPicker'
import Sizepicker from './_components/Sizepicker'
import CategoryPicker from './_components/CategoryPicker'
import axiosClient from '../_utils/axiosClient'
import productApis from '../_utils/productApis'
import filterApis from '../_utils/filterApis'
import ProductList from './_components/ProductList'
import Filters from './_components/Filters'
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown,  MdKeyboardArrowUp} from "react-icons/md";
import Image from 'next/image'



export default function NewDrops() {
    const [colorFilters, setColorFilters] = useState([])
    const [sizeFilters, setSizeFilters] = useState([])
    const [categoryFilters, setCategoryFilters] = useState([])
    const [productList , setProductList] = useState([])
    const [Query , setQuery] = useState("")
    const [Colors , setColors] = useState([])
    const [Sizes , setSizes] = useState([])
    const [Categories , setCategories] = useState([])
    const [ProductsCount , setProductsCount] = useState(0)
    const [FilterPopup , setFilterPopup] = useState(false)
    const [FiltersApplied , setFiltersApplied] = useState('NEWEST')
    const [smFilterPopup , setSmFilterPopup] = useState(false)
    const popupRef = useRef(null);
    const filterRef = useRef(null);
    
    const fetchProductList_ = () => {
        console.log(Query)
        productApis.getProductListFiltered(Query).then(res => {
            setProductList(res.data.data)
            console.log(res.data)
            setProductsCount(res.data.meta.pagination.total)
        })
    }
    const getFilters_ = () => {
        filterApis.getColors().then(res => {
            setColors(res.data.data)
        })
        filterApis.getSizes().then(res => {
            setSizes(res.data.data)
        })
        filterApis.getCategories().then(res => {
            setCategories(res.data.data)
        })
    }
    const fetchFilteredProducts = () => {
        let sizeQuery : string[] = []
        let colorQuery : string[] = []
        let categoryQuery : string[] = []
        if (colorFilters.length > 0) {
            colorQuery = colorFilters.map((color, idx) => `[colors][color][$in][${idx}]=${color}`)
        }
        if (categoryFilters.length > 0) {
            categoryQuery = categoryFilters.map((category, idx) => `[category][slug][$in][${idx}]=${category}`)
        }
        if (sizeFilters.length > 0) {
            sizeQuery = sizeFilters.map((size, idx) => `[sizes][size][$in][${idx}]=${size}`)
        }
        const queries = [sizeQuery, colorQuery, categoryQuery].filter(query => query.length > 0);
        let query = "";
        if (queries.length > 1) {
            query = queries.map((item, idx) => item.map((item, idxx) => '[$and][' + idx + ']' + item).join("&filters")).join('&filters')
            query = `filters${query}`
         }
        else if (queries.length === 1) {
            query = queries.map((item, idx) => item.join("&filters")).join('&filters')
            query = `filters${query}`
        }
        else {
            query = "";
        }
        if (FiltersApplied === 'NEWEST') (query = 'sort=createdAt:desc&' + query)
        else if (FiltersApplied === 'PRICE ASC') (query = 'sort=price:asc&' + query)
        else if (FiltersApplied === 'PRICE DESC') (query = 'sort=price:desc&' + query)
        setQuery(query)
    }
    useEffect(() => {
        fetchFilteredProducts()
    }, [colorFilters, sizeFilters, categoryFilters, FiltersApplied])
    useEffect (() => {
        fetchProductList_()
    }, [Query])
    useEffect (() => {
        getFilters_()
    }, [])

    return (
        <div className={`${Spacing} py-10`}>
            <div>
                <Image src="/banner.png" width={1320} height={395} alt="New Drops" className='w-full object-cover rounded-3xl mb-7 lg:mb-0 max-h-[400px]' />
            </div>
            <div className='hidden lg:flex justify-between px-2 py-7'>
                <div className=''>
                    <h2 className='text-2xl font-semibold'>New Drops</h2>
                    <p>{ProductsCount} items</p>
                </div>
                <div className='relative'>
                    <button className='flex justify-between items-center bg-fawhite min-w-[180px] py-3 px-4 rounded-xl' onClick={() => setFilterPopup(!FilterPopup)}>
                        <p className='text-left font-semibold  uppercase'>{FiltersApplied}</p>
                        {FilterPopup ? <MdKeyboardArrowUp  size={20}/> : <MdKeyboardArrowDown size={25}/>}
                    </button>
                    {
                        FilterPopup &&
                        <ul className='py-3 px-4 text-left font-semibold text-lgfont-semibold uppercase bg-fawhite pt-6 -mt-4 rounded-b-xl absolute z-20 left-0 right-0'>
                            {/* <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Trending</button></li> */}
                            <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Newest</button></li>
                            <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Price Asc</button></li>
                            <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Price Desc</button></li>
                        </ul>
                    }
                </div>
            </div>
            <div className='lg:hidden pb-5'>
                <div className='flex gap-5'>  
                    <div className=''>
                        <button className='flex justify-between items-center bg-fawhite min-w-[180px] py-3 px-4 rounded-xl' onClick={() => setSmFilterPopup(!smFilterPopup)}>
                            <p className='text-left font-semibold  uppercase'>Filters</p>
                            {smFilterPopup ? <MdKeyboardArrowUp  size={20}/> : <MdKeyboardArrowDown size={25}/>}
                        </button>
                        {
                            smFilterPopup &&
                            <div className={`absolute z-20 left-0 right-0 bg-fawhite ${Spacing} py-7 px-5 rounded-b-xl`}>
                                <Filters Colors={Colors} colorFilters={colorFilters} setColorFilters={setColorFilters} Sizes={Sizes} sizeFilters={sizeFilters} setSizeFilters={setSizeFilters} Categories={Categories} categoryFilters={categoryFilters} setCategoryFilters={setCategoryFilters}/>
                            </div>
                        }
                    </div>
                    
                    <div className='relative'>
                        <button className='flex justify-between items-center bg-fawhite min-w-[180px] py-3 px-4 rounded-xl' onClick={() => setFilterPopup(!FilterPopup)}>
                            <p className='text-left font-semibold  uppercase'>{FiltersApplied}</p>
                            {FilterPopup ? <MdKeyboardArrowUp  size={20}/> : <MdKeyboardArrowDown size={25}/>}
                        </button>
                        {
                            FilterPopup &&
                            <ul className='py-3 px-4 text-left font-semibold text-lgfont-semibold uppercase bg-white pt-6 -mt-4 rounded-b-xl absolute z-20 left-0 right-0'>
                                {/* <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Trending</button></li> */}
                                <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Newest</button></li>
                                <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Price Asc</button></li>
                                <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Price Desc</button></li>
                            </ul>
                        }
                    </div>
                </div>
                <div className='py-5'>
                    <h2 className='text-xl font-semibold'>New Drops</h2>
                    <p>{ProductsCount} items</p>
                </div>
            </div>
            <div className='lg:grid grid-cols-4 gap-3'>
                <div className='hidden lg:block'>
                    <h2 className='text-xl font-semibold ml-2 mb-4'>Filters</h2>
                    <Filters Colors={Colors} colorFilters={colorFilters} setColorFilters={setColorFilters} Sizes={Sizes} sizeFilters={sizeFilters} setSizeFilters={setSizeFilters} Categories={Categories} categoryFilters={categoryFilters} setCategoryFilters={setCategoryFilters}/>
                </div>
                <div className='col-span-3 lg:mt-4'>
                    <ProductList products={productList}/>
                </div>
            </div>
        </div>
    )
}