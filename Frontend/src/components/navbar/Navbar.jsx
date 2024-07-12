/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Cart from '../cart/Cart'
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../store/cartSlice";
import Cookies from "js-cookie";
import { handleSuccessLogin, getLogoutGoogle } from "../../store/authSlice";

const Navbar = ({ data }) => {
  const [isDrop, setIsDrop] = useState(false);

  const auth = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.cart);
  const userToken = Cookies.get("userToken");
  const googleToken = Cookies.get("googleToken");
  const facebookToken = Cookies.get("facebookToken");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDropDown = () => {
    setIsDrop(!isDrop);
  };

  const handleLogout = () => {};

  const facebookUser = false;
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  if (!googleToken && !userToken && !facebookToken) {
    dispatch(handleSuccessLogin());
  }
  const handleGoogleLogout = () => {
    dispatch(getLogoutGoogle());
  };
  // console.log(googleUser)
  const handleSearch = async () => {
    if (search === "") {
      return;
    }
    // location.href=`/searchProduct/${search}`
    navigate(`/searchProduct/${search}`);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const changeColor = (color, e) => {
    e.target.style.color = color;
  };
  return (
    <>
      <div className={isOpen ? "overlayv" : "overlay"}></div>
      <header>
        <nav className="main-nav">
          <div className="logo-container">
            <Link to="/">
              <img
                src="../https://digitalkirana-server.vercel.app/Assets/Images/Icons/logo-single_img.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="menu-slider">
            {" "}
            <box-icon name="menu-alt-left"></box-icon>
          </div>
          <div className="search-bar" style={{ position: "relative" }}>
            <input
              type="text"
              name="search"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter the product name...."
            />
            <button
              onClick={handleSearch}
              style={{
                position: "absolute",
                right: "20px",
                top: "5px",
                backgroundColor: "transparent",
                border: "none",
                height: "100%",
                cursor: "pointer",
              }}
            >
              <box-icon name="search"></box-icon>
            </button>
          </div>
          <ul className="nav-items">
            <li className="dropdown-container" onClick={handleDropDown}>
              <>
                {userToken ? (
                  <>
                    <box-icon name="user" className="bi-clr"></box-icon>
                    <ul
                      className={!isDrop ? "dropdown" : "dropdownvisible"}
                      style={{
                        width: "130px",
                        padding: "5px",
                        position: "absolute",
                        top: "-25px",
                        right: "28px",
                      }}
                    >
                      <li
                        onMouseOver={(e) => changeColor("#008000", e)}
                        onMouseOut={(e) => changeColor("black", e)}
                      >
                        <Link to="/customerProfile">My Profile</Link>
                      </li>
                      <li
                        onClick={handleLogout}
                        onMouseOver={(e) => changeColor("red", e)}
                        onMouseOut={(e) => changeColor("black", e)}
                      >
                        Logout
                      </li>
                    </ul>
                  </>
                ) : googleToken ? (
                  <>
                    <box-icon name="user" className="bi-clr"></box-icon>
                    <ul
                      className={
                        !isDrop
                          ? "dropdown drop-down-container"
                          : "dropdownvisible drop-down-container"
                      }
                      style={{
                        width: "130px",
                        padding: "5px",
                        position: "absolute",
                        top: "-25px",
                        right: "28px",
                      }}
                    >
                      <li
                        onMouseOver={(e) => changeColor("#008000", e)}
                        onMouseOut={(e) => changeColor("black", e)}
                      >
                        <Link to="/customerProfile">My Profile</Link>
                      </li>
                      <li
                        onClick={handleGoogleLogout}
                        onMouseOver={(e) => changeColor("red", e)}
                        onMouseOut={(e) => changeColor("black", e)}
                      >
                        Logout
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link to="/login">
                    <box-icon name="user"></box-icon> Login
                  </Link>
                )}
              </>
            </li>
            <li className="cart-btn">
              <box-icon
                name="cart"
                onClick={() => {
                  // overLay()
                  dispatch(toggleCart());
                }}
              ></box-icon>
              <span id="cart-item-amt">{cartTotalQuantity}</span>
            </li>
          </ul>
        </nav>
        <div className="nav-cat-items-container">
          <ul className="nav-cat-items">
            {data.map((category, index) => {
              return (
                <li key={index}>
                  <Link to={`/productCategory/${category.name}`}>
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      <nav className="bottom-nav">
        <ul>
          <li>
            <Link to="/">
              <box-icon name="home"></box-icon>Home
            </Link>
          </li>
          <li>
            <Link to="/category">
              <box-icon name="category"></box-icon> Category
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <box-icon name="cart"></box-icon> Cart
            </Link>
          </li>
          <li>
            <Link to="/account">
              <box-icon name="user"></box-icon>Account
            </Link>
          </li>
        </ul>
        <ul className="drop-down-container">
          <li>My Profile</li>
          <li>Logout</li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
