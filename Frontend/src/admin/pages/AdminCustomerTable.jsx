/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import '../components/css/allcustomer.css'
import axios from 'axios'

const AdminCustomerTable = () => {
    const [localCustomers, setLocalCustomers] = useState([])
    const [googleCustomers, setGoogleCustomers] = useState([])
    const handleAPI = async () => {
        const response = await axios.get('https://digitalkirana-server.vercel.app/admin/dashboard/allCustomers')
        setLocalCustomers(response.data.allLocalCustomers)
        setGoogleCustomers(response.data.allGoogleCustomers)
    }
    useEffect(() => {
        handleAPI()
    }, [])
    return (
        <>
            <Layout>
                <main id="adminCustomerPage">
                    <h1>Customers</h1>
                    <section className="admin-cus-search">
                        <div className="admin-cus-search-container">
                            <div className="searchbar-container">
                                <input type="text" placeholder="Search customer" className="cus-searchbar" />
                                <i className='bx bx-search'></i>
                            </div>
                        </div>
                    </section>
                    <section className="admin-cus-list">
                        <table className="admin-cus-table">
                            <tr className="table-heading">
                                <th className="cus-id">S.N</th>
                                <th className="cus-list-name">cus Name</th>
                                <th className="cus-list-email">Email</th>
                                <th className="cus-list-number">Number</th>

                                <th className="cus-list-view">View</th>
                                <th className="cus-list-actions">Actions</th>
                            </tr>
                            {
                                localCustomers.map((customer, index) => {
                                    return (
                                        <tr className="cus-data">
                                            <td className="cus-data-id">{index + 1}</td>
                                            <td className="cus-data-name">{customer.userName}</td>
                                            <td className="cus-data-email">{customer.email}</td>
                                            <td className="cus-data-number">{customer.phoneNumber}</td>
                                            <td className="cus-data-view"><i className='bx bx-search-alt-2 view-cus-btn'></i></td>
                                            <td className="cus-data-actions"><i className='bx bx-trash-alt delete-cus-btn'></i></td>
                                        </tr>

                                    )

                                })
                            }
                            {
                                googleCustomers.map((customer, index) => {
                                    return (
                                        <tr className="cus-data">
                                            <td className="cus-data-id">{index + 1}</td>
                                            <td className="cus-data-name">{customer.userName}</td>
                                            <td className="cus-data-email">{customer.email}</td>
                                            <td className="cus-data-number">{customer.phoneNumber}</td>
                                            <td className="cus-data-view"><i className='bx bx-search-alt-2 view-cus-btn'></i></td>
                                            <td className="cus-data-actions"><i className='bx bx-trash-alt delete-cus-btn'></i></td>
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

export default AdminCustomerTable
