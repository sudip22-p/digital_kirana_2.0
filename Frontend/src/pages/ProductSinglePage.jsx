// import React from 'react'
// import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom'
import '../components/css/productDetail.css'
import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './components/product/Product'
import { toggleCart } from '../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'


const ProductSinglePage = () => {
    const { id } = useParams()
    const cart = useSelector(state=>state.cart)
    const [product, setProduct] = useState({})
    const { frontView, backView, sideView, topView, productName, salesPrice, stocks, description,category,Brand } = product;
    let isOpen = cart.isOpen
    const [similarProducts, setSimilarProducts] = useState([])
    useEffect(() => {
        const handleAPI = async () => {
            const singleProduct = await axios.get(`https://digitalkirana-server.vercel.app/api/singlePage/${id}`)
            setProduct(singleProduct.data.productData)
            setSimilarProducts(singleProduct.data.similarProducts)  
        }
        handleAPI()
    }, [])
    const dispatch = useDispatch()
    const handleEvent = (data) =>{
        setProduct(data)
    }  
    const changeCart = () =>{
        isOpen = !isOpen
        dispatch(toggleCart(isOpen))
    }
    return (
        <>
            <Layout>
                <main id="productDetail">
                    <section className="full-product-page">
                        <ul className="category-page-bread-crumb">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to={`/productCategory/${category}`}>{category} </Link></li>
                            <li>{productName}</li>
                        </ul>
                        <section className="product-content-container">
                            <figure className="detail-product-img-container">
                                <div className="small-img-container">
                                    <div className="img1 mini-img focus">
                                        <img src={`../../Assets/Images/Products/${frontView}`} alt="" />
                                    </div>
                                    <div className="img2 mini-img">
                                        <img src={`../../Assets/Images/Products/${backView}`} alt="" />
                                    </div>
                                    <div className="img3 mini-img">
                                        <img src={`../../Assets/Images/Products/${sideView}`} alt="" />
                                    </div>
                                    <div className="img3 mini-img">
                                        <img src={`../../Assets/Images/Products/${topView}`} alt="" />
                                    </div>
                                </div>
                                <div className="main-img-container">
                                    <img src={`../../Assets/Images/Products/${frontView}`}
                                        alt="" />
                                </div>

                            </figure>
                            <section className="product-content">
                                <div className="product-main-detail">
                                    <h1 id="productName">{productName}</h1>
                                    <p className="rating"></p>
                                    <p className="product-brand">Brand : <span>{Brand}</span></p>
                                    <p className="main-product-price">{salesPrice}</p>
                                    <p className="product-mrp">Rs 456</p>
                                    <div className="main-product-qty-btn-container">
                                        <span>Quantity :</span>
                                        <div className="main-product-qty-btn">
                                            <i className='bx bxs-minus-circle qty-decrease'></i>
                                            <span className="qty-value">{stocks}</span>
                                            <i className='bx bxs-plus-circle qty-increase'></i>
                                        </div>
                                    </div>
                                    <button className="product-add-to-cart-btn" onClick={changeCart()}><i className='bx bx-cart'></i> Add to Cart</button>
                                </div>
                                <hr className="divider-product-detail" />
                                <div className="product-details" />
                                <h4>Product Details</h4>
                                <div className="product-detail-content">
                                    {description}
                                </div>
                            </section>
                        </section>
                        <section className="similar-products">
                            <h2>Similar Products</h2>
                            <div className="product-card-container">
                                {
                                    similarProducts.map((product,index) => {
                                        return (
                                            <Product data={product} change={handleEvent} key={index} />
                                        )
                                    })
                                }
                            </div>
                        </section>
                    </section>

                </main>

            </Layout>
        </>
    )
}

export default ProductSinglePage

