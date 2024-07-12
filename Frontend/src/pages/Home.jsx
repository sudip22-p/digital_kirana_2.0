
import Layout from '../components/layout/Layout'
import Products from './components/products/Products'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setProducts } from '../store/productSlice'


const Home = () => {
  const dispatch = useDispatch()
  const [product, setProduct] = useState([])
  const handleData = async () => {
    try {
      const response = await axios.get('https://digitalkirana-server.vercel.app/api/homePage')
      dispatch(setProducts(response.data.products))
      setProduct(response.data.products);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleData()
  }, [])
  return (
    <>
    
      <Layout>
        <main>
          <section id="promotionalImageContainer">
            <div className="main-img-banner">
              <img src={`https://digitalkirana-server.vercel.app/Assets/Images/promotion/deliver banner.png`} alt="" />
            </div>
            <div className="secondary-img-banner">
              <img src={`https://digitalkirana-server.vercel.app/Assets/Images/promotion/advertisement-banner.png`} alt="" />
            </div>
          </section>
          <Products data={product}/>
        </main>
      </Layout>
    </>
  )
}

export default Home
