import  { useEffect, useState } from 'react'
import '../components/css/category.css'
import Layout from '../layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminCategory = () => {
  const [categories, setCategories] = useState([])
  
  const handleAPI = async () => {
    const response = await axios.get('https://digitalkirana-server.vercel.app/admin/dashboard/allCategories')
    console.log(response.data)
    setCategories(response.data.allCategories)
  }

  useEffect(() => {
    handleAPI()
  }, [])
  return (
    <>
      <Layout>
        <main id="categoryListingPage">
          <h1 className="page-heading">Category</h1>
          <section className="admin-category-search">
            <div className="admin-category-search-container">
              <div className="searchbar-container">
                <input type="text" placeholder="Search category" className="category-searchbar" />
                <i className='bx bx-search'></i>
              </div>
              <select name="" id="" className="category-category-search">ss
                <option value="Categories">Categories</option>
                {
                  categories.map(category => {
                    return <option value={category.name}>{category.name}</option>

                  })
                }
              </select>
            </div>
            <button className="add-category-btn"><Link to='/adminCategory/addCategory'>Add New category</Link> <i className='bx bx-plus-circle'></i></button>
          </section>
          <section className="admin-category-list">
            <table className="admin-category-table">
              <tr className="table-heading">
                <th className="category-id">S.N</th>
                <th className="cat-list-img">Image</th>
                <th className="cat-list-name">Category Name</th>
                <th className="cat-list-published">Published</th>
                <th className="cat-list-view">View</th>
                <th className="cat-list-actions">Actions</th>
              </tr>
              {
                categories.map((category, index) => {
                  return (
                  <tr className="category-data">
                    <td className="cat-data-sn">{index + 1}</td>
                    <td className="cat-data-img"><img
                      src={`../../../Assets/Images/categories/${category.imageUrl}`}
                      alt="" /></td>
                    <td className="cat-data-name">{category.name}</td>
                    <td className="cat-data-published">1</td>
                    <td className="cat-data-view"><i className='bx bx-search-alt-2 view-cat-btn'></i></td>
                    <td className="cat-data-actions"><i className='bx bx-edit-alt edit-cat-btn'></i><i
                      className='bx bx-trash-alt delete-cat-btn'></i></td>
                  </tr>)

                })
              }
            </table>
          </section>

        </main>
      </Layout>
    </>
  )
}

export default AdminCategory
