import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import '../components/css/dashboard.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
    const navigate = useNavigate()
    // const checkUser = () =>{
    //     const adminToken = Cookies.get('adminToken')
    //     !adminToken && navigate('/login')
    // }
    // useEffect(()=>{
    //     checkUser()
    // },[])
  return (
    <>
    <Layout>
       <main id="dashboard">
        <h1>Dashboard</h1>
        <section class="business-data-container">
            <div class="total-sales">
                <div class="icon-container">
                    <i class="fa-solid fa-dollar-sign"></i>
                </div>
                <div class="business-data">
                    <b class="data-value">6000</b>
                    <span class="data-title">Total Sales</span>
                </div>
            </div>
            <div class="total-order">
                <div class="icon-container">
                    <i class="fa-solid fa-bag-shopping"></i>
                </div>
                <div class="business-data">
                    <b class="data-value">60</b>
                    <span class="data-title">Total Orders</span>
                </div>

            </div>
            <div class="total-products">
                <div class="icon-container">
                    <i class="fa-brands fa-product-hunt"></i>
                </div>
                <div class="business-data">
                    <b class="data-value">40</b>
                    <span class="data-title">Total Products</span>
                </div>

            </div>
            <div class="total-customers">
                <div class="icon-container">
                    <i class="fa-solid fa-users"></i>
                </div>
                <div class="business-data">
                    <b class="data-value">20</b>
                    <span class="data-title">Total Customers</span>
                </div>
            </div>
        </section>
        <section class="graph-container">
            <section class="sales-graph">
                <h2>Sales Graph</h2>
            </section>
            <section class="top-selling-piechart">
                <h2>Top Selling</h2>
            </section>
        </section>



    </main>

    </Layout>

   
    </>
  )
}

export default AdminHome
