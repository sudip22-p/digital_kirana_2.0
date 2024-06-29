/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const Categories = ({data}) => {

    return (
        <>
        {
            data.map((category,index) =>{
            return (
            <Link to={`/productCategory/${category._id}`} key={index} >
                <div className="category-card">
                    <figure className="category-img-container">
                        <img src={`../../../../Assets/Images/categories/${category.imageUrl}`} alt="" />
                    </figure>
                    <p className="category-name">
                        {category.name}
                    </p>

                </div>

            </Link>
            )
            })
        }
        </>
    )
}

export default Categories
