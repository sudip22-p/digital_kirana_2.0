
import { useState } from 'react'
import '../components/css/addproduct.css'
import Layout from '../layout/Layout'

const AdminAddProduct = () => {
    const [data,setData] = useState({
        title : '',
        subtitle : '',
        category : '',
        description : '',
        image: ''
      })
      console.log(data)
      const handleChange = (e) =>{
        const {name,value} = e.target
        setData({
          ...data,
          [name]: name == 'image' ? e.target.files[0] : value
        })
      }
    const handePostApi = async () =>{
        const response = await axios.post('http://localhost:3000/admin/dashboard/add-product')
    }
  return (
    <>
    <Layout>
    <main id="addProduct">
        <h1 className="page-heading">Products</h1>
        <form action="" className="add-product-form">
            <section className="left-container">
                <div className="form-group">
                    <label htmlFor="">Product Images</label>
                    <div className="add-product-img-container">
                        <div className="img1"><img src="" alt="" /> <span className='upload-img'>Click to <br />add Image</span></div>
                        <div className="img2"><img src="" alt="" /><span className='upload-img'>Click to <br />add Image</span></div>
                        <div className="img3"><img src="" alt="" /><span className='upload-img'>Click to <br />add Image</span></div>
                        <div className="img4"><img src="" alt="" /><span className='upload-img'>Click to <br />add Image</span></div>
                    </div>
                    <span className="form-criteria">Only this much image is allowed</span>
                </div>
                <div className="form-group">
                    <label htmlFor="">Product Description</label>
                    <textarea name="" id="" className="product-description"></textarea>
                    <span className="form-criteria">NO more than 500 characters</span>

                </div>

            </section>
            <section className="right-container">
                <div className="form-group">
                    <label htmlFor="">Product Name</label>
                    <input type="text" name='productName' onChange={handleChange}/>
                </div>
                <div className="form-group-container">
                    <div className="form-group">
                        <label htmlFor="">Category</label>
                        <select name="category" id="">
                            <option value="">category1</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Sales Price</label>
                        <input type="text" name='salesPrice' onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Brand</label>
                        <input type="text" name='Brand' onChange={handleChange}/>
                    </div>
                </div>
                <div className="form-group-container">
                    <div className="form-group">
                        <label htmlFor="">Price</label>
                        <input type="text" name='salesPrice'  onChange={handleChange}/>
                    </div>
                  
                </div>
                <div className="form-group-container">
                    <div className="form-group">
                        <label htmlFor="">Stock Quantity</label>
                        <input type="text" name='stocks' onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Unit</label>
                        <select name="" id="">
                            <option value="">Pieces</option>
                            <option value="">Killogram</option>
                            <option value="">Box</option>
                        </select>
                    </div>
                </div>
                <input type="submit" value="Add Product" className="add-product-submit-btn" />
            </section>
        </form>
    </main>

    </Layout>
    </>
  )
}

export default AdminAddProduct
