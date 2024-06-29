import { useEffect, useState } from 'react'
import '../components/css/customerprofile.css'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Cookies from "js-cookie"
const CustomerProfile = () => {
    const googleToken = Cookies.get('googleToken')
    const auth = useSelector(state=>state.auth)
    let email,username;
    if(googleToken){
        username = auth.user.userName
    } else {
        username = auth.user.username;
    }
    email = auth.user.email;
    
    // console.log(auth)
    const [allOrders,setOrders] = useState([])
    // const [failedOrder,setFailedOrder] = useState([])
    const handleAPI = async () =>{
        const response = await axios.get('http://localhost:3000/admin/dashboard/allOrders')
        console.log(response.data.allOrders)
        setOrders(response.data.allOrders)
    }
    useEffect(()=>{
        handleAPI()
    },[])
    
  return (
    <>   
    <Layout>
      <main id="customerProfile">
            <section className="customer-info-container-main">
                <h1>My Profile</h1>
                <section className="customer-info-container">
                    <div className="customer-info">
                        <section className="customer-left-container">
                            <div className="customer-detail">
                                <span className="label">Username: </span>
                                <span className="value">{username}</span>
                            </div>
                            <div className="customer-detail">
                                <span className="label">Email: </span>
                                <span className="value">{email}</span>
                            </div>
                        </section>
                        <section className="customer-right-container">
                            <div className="customer-detail">
                                <span className="label">Phone: </span>
                                <span className="value">98141414</span>
                            </div>
                            <div className="customer-detail">
                                <span className="label">Address: </span>
                                <span className="value">123 Pirate King Avenue, East Blue</span>
                            </div>
                        </section>
                    </div>
                </section>
                <hr className="cus-divider" />
                <section className="order-history">
                    <h1>Order History</h1>
                    <section className="order-list">
                        <div className="order-table" id="order1">
                            <div className="order-info">
                                <div className="info-left">
                                    <p>Order <span className="order-id">#12345</span></p>
                                    <p>Placed on <span className="order-date">2024-05-15</span></p>
                                </div>
                                <span className="orderStatus delivered">Delivered</span>
                            </div>
                            <hr className="divider" />
                            <div className="orderitem">
                                <section className="item-list">
                                    {
                                        allOrders.map((order,index)=>(
                                            <>
                                            <div className="item">
                                                <div>
                                                    <img src="./Assets/Images/Products/product1.jpg" className="item-image" alt="Product 1" />
                                                    <span className="item-name">Product Name {index+1}</span>
                                                </div>
                                                <span className="item-qty">Qty: <span>{order.products[0].quantity}</span></span>
                                                <span className="item-price">Rs <span>2000</span></span>
                                            </div>
                                            <hr className="item-divider" />
                                            </>
                                        ))
                                    }

                                    
                                    <div className="item">
                                        <div>
                                            <img src="./Assets/Images/Products/product2.jpg" className="item-image" alt="Product 2" />
                                            <span className="item-name">Product Name 2</span>
                                        </div>
                                        <span className="item-qty">Qty: <span>1</span></span>
                                        <span className="item-price">Rs <span>1500</span></span>
                                    </div>
                                    <hr className="item-divider" />
                                </section>
                                <section className="total-amt">
                                    <div>Total Amount : <span>Rs</span> <span>3500</span></div>
                                </section>
                            </div>
                        </div>
                        <div className="order-table" id="order2">
                            <div className="order-info">
                                <div className="info-left">
                                    <p>Order <span className="order-id">#12346</span></p>
                                    <p>Placed on <span className="order-date">2024-04-20</span></p>
                                </div>
                                <span className="orderStatus cancelled">Cancelled</span>
                            </div>
                            <hr className="divider" />
                            <div className="orderitem">
                                <section className="item-list">
                                    <div className="item">
                                        <div>
                                            <img src="./Assets/Images/Products/product3.jpg" className="item-image" alt="Product 3" />
                                            <span className="item-name">Product Name 3</span>
                                        </div>
                                        <span className="item-qty">Qty: <span>1</span></span>
                                        <span className="item-price">Rs <span>3000</span></span>
                                    </div>
                                    <hr className="item-divider" />
                                </section>
                                <section className="total-amt">
                                    <div>Total Amount : <span>Rs</span> <span>3000</span></div>
                                </section>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </main>
    </Layout>
    </>
  )
}

export default CustomerProfile
