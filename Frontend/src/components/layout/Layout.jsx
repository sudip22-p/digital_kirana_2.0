/* eslint-disable react/prop-types */

import Cart from '../cart/Cart'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import '../../components/css/cart.css'
import '../../components/css/footer.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Layout = ({children}) => {
  const [categories, setCategory] = useState([])
  useEffect(() => {
    const handleAPI = async () => {
      const response = await axios.get('http://localhost:3000/api/categoryNames')
      setCategory(response.data.categories)
    }
    handleAPI()
}, [])
  return (
    <>
      <Cart />
      <Navbar data={categories}/>
      {children}
      <Footer />
    </>
  )
}

export default Layout
