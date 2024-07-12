import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import '../components/css/orders.css'
import axios from 'axios'

const AdminOrderPage = () => {
    const [allOrders,setOrders] = useState([])
    const handleAPI = async () =>{
        const response = await axios.get('https://digitalkirana.vercel.app/admin/dashboard/allOrders')
        console.log(response.data.allOrders)
        setOrders(response.data.allOrders)
    }
    useEffect(()=>{
        handleAPI()
    },[])
    
  return (
    <>
      <Layout>
      <main id="orderPage">
        <h1>Orders</h1>
        <section class="admin-order-search">
            <div class="admin-order-search-container">
                <div class="searchbar-container">
                    <input type="text" placeholder="Search Customers" class="order-searchbar" />
                    <i class='bx bx-search'></i>
                </div>
            </div>
        </section>
        <section class="order-list">
            <table id="orderListTable">
                <tr class="order-table-heading">
                    <th class="order-id">Order id</th>
                    <th class="order-date">Date</th>
                    <th class="order-cus-name">Customer Name</th>
                    <th class="order-amount">Amount</th>
                    <th class="order-status">Status</th>
                    <th class="order-action">Action</th>
                    <th class="order-invoice">Invoice</th>
                </tr>
                {
                    allOrders.map((order,index)=>{
                        return(
                <tr class="order1" key={index}>
                    <td class="order-id">{order._id}</td>
                    <td class="order-date">{order.updatedAt}</td>
                    <td class="order-cus-name">{order.costumer}</td>
                    <td class="order-amount">Rs{order.amount}</td>
                    <td class="order-status"><span class="order-status-value pending">Pending</span></td>
                    <td class="order-action"><select name="" id="">
                            <option value="pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="canceled">Canceled</option>
                        </select></td>
                    <td class="order-invoice"><i class="fa-solid fa-magnifying-glass-plus"></i></td>
                </tr>

                        )
                    })
                }


            </table>
        </section>

    </main>
      </Layout>
    </>
  )
}

export default AdminOrderPage
