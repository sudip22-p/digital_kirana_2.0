import { useEffect, useState } from "react";
import "../components/css/customerprofile.css";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const CustomerProfile = () => {
  const googleToken = Cookies.get("googleToken");
  const [userInfo, setUserInfo] = useState([]);
  const auth = useSelector((state) => state.auth);
  let _id;
  if (googleToken) {
    _id = auth.user._id;
  } else {
    _id = auth.user._id;
  }
  const getUserData = async (_id) => {
    try {
      const response = await axios.get(
        `https://digitalkirana-server.vercel.app/admin/dashboard/userData/${_id}`
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      let defaultData = {
        userName: "N/A",
        fullName: "N/A",
        email: "N/A",
        phoneNumber: "N/A",
      };
      setUserInfo(defaultData);
    }
  };
  //getting user data:
  getUserData(_id);
  const [allOrders, setOrders] = useState([]);

  const handleAPI = async () => {
    const response = await axios.get(
      `https://digitalkirana-server.vercel.app/admin/dashboard/allOrders/${_id}`
    );
    setOrders([...response.data.allOrders].reverse());
    console.log(response.data.allOrders);
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <>
      <Layout>
        <main id="customerProfile">
          <section className="customer-info-container-main">
            <h1>My Profile</h1>
            <section className="customer-info-container">
              <div className="customer-info">
                <section className="customer-left-container">
                  <div className="customer-detail">
                    <span className="label">Username: </span>
                    <span className="value">{userInfo.userName}</span>
                  </div>
                  <div className="customer-detail">
                    <span className="label">FullName: </span>
                    <span className="value">{userInfo.fullName}</span>
                  </div>
                </section>
                <section className="customer-right-container">
                <div className="customer-detail">
                    <span className="label">Email: </span>
                    <span className="value">{userInfo.email}</span>
                  </div>
                  <div className="customer-detail">
                    <span className="label">Phone: </span>
                    <span className="value">{userInfo.phoneNumber}</span>
                  </div>
                  {/* <div className="customer-detail">
                    <span className="label">Address: </span>
                    <span className="value">
                      123 Pirate King Avenue, East Blue
                    </span>
                  </div> */}
                </section>
              </div>
            </section>
            <hr className="cus-divider" />
            <section className="order-history">
              <h1>Order History</h1>
              <section className="order-list">
                {allOrders.map((order, orderIndex) => (
                  <div className="order-table" key={orderIndex}>
                    <div className="order-info">
                      <div className="info-left">
                        <p>
                          Order <span className="order-id">#{order._id}</span>
                        </p>
                        <p>
                          Placed on{" "}
                          <span className="order-date">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </p>
                        <p>
                            Delivery Address: &nbsp;
                        <span>
                            {order.address}
                          </span>
                        </p>
                      </div>
                      <span
                        className={`orderStatus ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <hr className="divider" />
                    <div className="orderitem">
                      <section className="item-list">
                        {order.products.map((product, productIndex) => (
                          <div className="item" key={productIndex}>
                            <div>
                              <img
                                src={`https://digitalkirana-server.vercel.app/Assets/Images/Products/${product.frontView}`}
                                className="item-image"
                                alt={product.product.name}
                              />
                              <span className="item-name">
                                {product.product.name}
                              </span>
                            </div>
                            <span className="item-qty">
                              Qty: <span>{product.quantity}</span>
                            </span>
                            <span className="item-price">
                              Rs <span>{product.product.salesPrice}</span>
                            </span>
                          </div>
                        ))}
                        <hr className="item-divider" />
                      </section>
                      <section className="total-amt">
                        <div>
                          Total Amount: <span>Rs</span>{" "}
                          <span>{order.amount}</span>
                        </div>
                      </section>
                    </div>
                  </div>
                ))}
              </section>
            </section>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default CustomerProfile;
