import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import '../components/css/productpage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminProduct = () => {
    const [products,setProducts] = useState([])
    const [categories,setCategories] = useState([])
    const handleAPI = async () =>{
        const product = await axios.get('http://localhost:3000/admin/dashboard/allProducts')
        const category = await axios.get('http://localhost:3000/admin/dashboard/allCategories')
        setProducts(product.data.products)
        setCategories(category.data.allCategories)
    }
    useEffect(()=>{
        handleAPI()
    },[])

    return (

        <Layout >
            <main id="productListingPage">
                <h1 class="page-heading">Products</h1>
                <section class="admin-product-search">
                    <div class="admin-product-search-container">
                        <div class="searchbar-container">
                            <input type="text" placeholder="Search Product" class="product-searchbar" />
                            <i class='bx bx-search'></i>
                        </div>
                        <select name="" id="" class="product-category-search">ss
                            <option value="Categories">Categories</option>
                                {
                                    categories.map((category,index)=>{
                                        return <option key={index} value={category.name}>{category.name}</option>
                                    })
                                }
                        </select>
                    </div>
                    <button class="add-product-btn"><Link to='addProduct'>Add New Product</Link> <i class='bx bx-plus-circle'></i></button>
                </section>
                <section class="admin-product-list">
                    <table class="admin-product-table">
                        <tr class="table-heading">
                            <th class="product-id">S.N</th>
                            <th class="prod-list-img">Image</th>
                            <th class="prod-list-name">Product Name</th>
                            <th class="prod-list-category">Category</th>
                            <th class="prod-list-stock">Stock</th>
                            <th class="prod-list-view">View</th>
                            <th class="prod-list-actions">Actions</th>
                        </tr>
                        {
                            products.map((product,index)=>{
                                return(
                        <tr class="product-data" key={index}>
                            <td class="prod-data-sn">{index+1}</td>
                            <td class="prod-data-img"><img
                                src={`../../../Assets/Images/Products/${product.frontView}`}
                                alt="" /></td>
                            <td class="prod-data-name">{product.productName}</td>
                            <td class="prod-data-category">{product.category}</td>
                            <td class="prod-data-stock">{product.stocks}</td>
                            <td class="prod-data-view"><Link to='/adminProductDetail'><box-icon name='search-alt-2'></box-icon></Link></td>
                            <td class="prod-data-actions"><i class='bx bx-edit-alt edit-prod-btn'></i><i
                                class='bx bx-trash-alt delete-prod-btn'></i></td>
                        </tr>

                                )
                            })
                        }
                    </table>
                </section>

            </main>

        </Layout>

    )
}

export default AdminProduct
