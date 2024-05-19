import React from 'react'
import ProductItem from '@/app/_components/ProductItem'
import Spacing from '@/app/_constants/Spacing'

const ProductList = ( {products} : any) => {
    //console.log(products)
  return (
    <div className={`m-auto grid 3xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-8`}>
        {products.map((product : any) => (
            <ProductItem product={product} key={product.id}/>
        ))}
    </div>
  )
}

export default ProductList