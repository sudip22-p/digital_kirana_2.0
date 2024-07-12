
import Layout from '../components/layout/Layout'
import '../components/css/productCategory.css'
import Products from './components/products/Products'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ProductCategory = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const handleAPI = async () => {
      const response = await axios.get(`https://digitalkirana.vercel.app/api/productCategory/${id}`)
      setProducts(response.data.categoryProducts);
    }
    handleAPI()
  }, [id])
  return (
    <>
      <Layout>
        <section className='category-page'>
          <Products data={products} type='category' />
        </section>
      </Layout>
    </>
  )
}

export default ProductCategory
