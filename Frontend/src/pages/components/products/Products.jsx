/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

// import { useEffect, useState } from 'react'
import Product from '../product/Product'

const Products = ({data,type}) => {
  console.log(data);
  return (
    <>
      <section id="productShowcase">
        <section className="featured-products">
          {
            type === 'category' ?(
              <>
              <h2>Non Featured Products</h2>
              {/* <h2>{data[0].category} Products</h2> */}
              </>
            ) : type === 'search' ? (
              <>
                <h2>Search Results</h2>
              </>
            ) :(
              <h2>Featured Products</h2>
            )
          }
          <div className="product-card-container">
            {
              data.map((product,index) => {
                console.log(product);
                return (
                  <Product data={product} key={index}/>
                )
              })
            }

          </div>
        </section>
      </section>
    </>
  )
}

export default Products
