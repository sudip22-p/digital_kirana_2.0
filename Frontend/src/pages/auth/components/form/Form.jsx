/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../../components/css/authform.css'

const Form = ({ type, onSubmit }) => {
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    fullName:'',
    _id:'',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }
  const google = () => {
    window.open("https://digitalkirana.vercel.app/auth/login/google", "_self")
  }
  const facebook = () =>{
    
  }
  return (
    <>
      <main id="signupContainer">
        <div className="container">
          {
            type === 'Register' ?
              <h1>Sign Up</h1> :
              <h1>Welcome back, </h1>

          }
          <form onSubmit={handleSubmit} className="signupForm">
            {
              type === 'Register' && (
                <>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" onChange={handleChange}required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input type="text" id="userName" name="username" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="number">Phone Number</label>
                    <input type="text" id="number" name="phoneNumber" onChange={handleChange} required />
                  </div>
                </>
              )
            }

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" onChange={handleChange} required />
            </div>
            {
              type === 'Login' && (
                <p className="forgot-password"><Link to='/forgotpassword'>Forgot Password?</Link></p>
              )
            }
            <div className="relative">
              <button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
            </div>
            {
              type === 'Register' ? (
                <p className="already-acc">Already Have an account? <Link to='/login' style={{ color: 'blue' }} >Login</Link></p>

              ) : (
                <>

                  <p className="already-acc">Don&apost Have an Account? <Link to='/register' style={{ color: 'blue' }} >Create Now</Link></p>
                </>
              )
            }
          </form>
          <div className="extra-option">
            <span className="or-container">
              or continue with
            </span>
            <div className="extra-links">
              <div onClick={facebook}>
              <img src="https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png"
                width="30" />
              </div>
              <div onClick={google}><img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUy9xImRwuUbBnbJ0QgHs5GEcWDeKLqeaOpd2jLQ7SWg&s"
                width="30" alt="" /></div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Form
