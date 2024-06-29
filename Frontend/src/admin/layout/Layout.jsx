/* eslint-disable react/prop-types */
// import React from 'react'
import AdminSideBar from '../components/AdminSideBar'
import AdminNavbar from '../components/AdminNavbar'
import '../components/css/flex.css'
import '../components/css/navbar.css'
import "../components/css/sidebar.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className='flex'>
        <AdminSideBar />
        <div className='flexd'>
          <AdminNavbar />
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
