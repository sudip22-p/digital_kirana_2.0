import React from 'react'
import '../components/css/productdetail.css'

const AdminProductDetail = () => {
  return (
    <>
       <main id="adminDetailProduct">
        <h1>Product</h1>
        <section class="admin-product-detaiils">
            <section class="left-image-container">
                <figure class="admin-prod-img-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0tDxKr6OVOME5w1NODBkotoRW4ih_UsRzuJxlfx_Og&s"
                        alt="" />
                </figure>
                <figure class="admin-prod-img-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0tDxKr6OVOME5w1NODBkotoRW4ih_UsRzuJxlfx_Og&s"
                        alt="" />
                </figure>
                <figure class="admin-prod-img-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0tDxKr6OVOME5w1NODBkotoRW4ih_UsRzuJxlfx_Og&s"
                        alt="" />
                </figure>
                <figure class="admin-prod-img-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0tDxKr6OVOME5w1NODBkotoRW4ih_UsRzuJxlfx_Og&s"
                        alt="" />
                </figure>


            </section>
            <section class="right-detail-container">
                <h2 class="admin-prod-name">Bread</h2>
                <span class="admin-prod-price">Price : Rs 475</span>
                <span class="admin-prod-qty">Quantity : <span class="admin-prod-qty-value">20</span></span>
                <span class="admin-prod-cat">Category : <span class="admin-prod-cat-value">20</span></span>
                <p class="admin-prod-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae est aliquam
                    delectus. Soluta magnam vero labore amet sapiente, commodi magni. Hic ipsa dignissimos aut esse
                    voluptatibus illum voluptatum odio dolorum?</p>
                <button class="admin-prod-edit-btn"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            </section>
        </section>

    </main>
    </>
  )
}

export default AdminProductDetail
