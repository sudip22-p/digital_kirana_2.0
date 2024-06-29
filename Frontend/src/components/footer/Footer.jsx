import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
       <footer>

<div className="footer-social-links">
    <a href=""><box-icon type='logo' name='facebook-circle'></box-icon></a>
    <a href=""><box-icon name='instagram-alt' type='logo' ></box-icon></a>
    <a href=""><box-icon name='discord-alt' type='logo' ></box-icon></a>
</div>
<div className="home-links">
    <a href="">Home</a>
    <div className="footer-vr-border"></div>
    <a href="" className="">About us</a>
    <div className="footer-vr-border"></div>
    <a href="" className="">Contact us</a>
</div>
<ul className="footer-contact-info">
    <li>+977 9898989</li>
    <li>Newroad Pokhara</li>
    <li> digitalkirana1@gmail.com</li>
</ul>
<span id="copyright">Copyright © 2023 beasty corp</span>
</footer>

    </>
  )
}

export default Footer
