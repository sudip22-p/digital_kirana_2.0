import Layout from '../components/layout/Layout'
import '../components/css/productCategory.css'
import Products from './components/products/Products'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SearchProductPage = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleAPI = async () => {
      try {
        const response = await axios.get(`https://digitalkirana-server.vercel.app/api/search/${query}`);
        setProducts(response.data); // Assuming response.data is the list of products
        console.log('Query:', query);
        console.log('Products:', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    handleAPI();
  }, [query]); // Dependency array to re-run effect when query changes

  return (
    <>
      <Layout>
        <section className='category-page'>
          <Products data={products} type='search' />
        </section>
      </Layout>
    </>
  );
}

export default SearchProductPage;
