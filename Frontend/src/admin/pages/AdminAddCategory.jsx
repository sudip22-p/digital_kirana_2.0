
import '../components/css/addcategory.css'
import Layout from '../layout/Layout'

const AdminAddCategory = () => {
  return (
    <>
      <Layout>
      <main id="addcategory">
        <section className="add-category-container">
            <h1 className="page-heading">Add Category</h1>
            <form action="" className="add-category-form">
                <label htmlFor="">Category Name</label>
                <input type="text" />
                <label htmlFor="">Upload Image</label>
                <div className="img-submitter">
                    <input type="image" src="" alt="" />
                    <span className='upload-image'>Click to <br/>add image</span>
                </div>
                <div className="submit-btn"> <input type="submit" value="Add " />
                </div>
            </form>
        </section>
    </main>

    </Layout>
    </>
  )
}

export default AdminAddCategory
