import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminNavbar = () => {
    const [admin,setAdmin] = useState()
    const handleAPI = async () =>{
        const response = await axios.get('http://localhost:3000/admin/dashboard/index')
    }
    useEffect(()=>{
        handleAPI()
    },[])
    return (
        <>
            <nav id="adminNavBar">
                <ul className="nav-contents">
                    <li><i className='bx bx-bell admin-notification'><span className="notification-count">12</span></i></li>
                    <li className="admin-profile">
                        <i className='bx bxs-user-circle'></i>
                        <p className="admin-info">
                            <span className="admin-name">
                                John Doe
                            </span>
                            <span className="admin-role">
                                Admin
                            </span>
                        </p>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminNavbar
