import React from 'react'
import ProductItem from './ProductItem'
import Spacing from '../_constants/Spacing'

const ProductList = ( {products} : any) => {
    console.log(products)
  return (
    <div className={`m-auto grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-8 ${Spacing}`}>
        {products.map((product : any) => (
            <ProductItem product={product} key={product.id}/>
        ))}
    </div>
  )
}

export default ProductList