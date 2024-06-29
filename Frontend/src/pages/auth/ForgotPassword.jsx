import React from 'react'
import { Link } from 'react-router-dom'
import '../../components/css/forgotpassword.css'

const ForgotPassword = () => {
  return (
    <>
      <main id='forgotFormContainer'>
        <div id="forgotlogoContainer"><img src="./Assets/Images/Icons/logo.png" alt="logo" id="logo" /></div>
        <section id="formContainer">
            <p class="msg">Enter the Email associated with your account and we will send you a reset link.</p>
            <form action="#" method="post" className='forgot-pass-form'>
                <label for="email">Email</label>
                <input type="email" id="email" name="forgetMail" placeholder="" />
                <button type="submit" name="sendResetCode">Continue</button>
            </form>
        </section>
        <p class="msg">Don't Have an Account yet? <Link to='/register'>Sign up</Link></p>
    </main>
    </>
  )
}

export default ForgotPassword
