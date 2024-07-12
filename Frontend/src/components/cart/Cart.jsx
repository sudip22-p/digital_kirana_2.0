
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseCart, getTotals, increaseCart, removeFromCart, toggleCart } from '../../store/cartSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Cart = () => {
    const cart = useSelector(state => state.cart)
    let isOpen = cart.isOpen
    const token = Cookies.get('userToken') || Cookies.get("googleToken") || Cookies.get("facebookToken");
    
    const changeCart = () =>{
        isOpen = !isOpen
        dispatch(toggleCart(isOpen))
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRemoveFromCart = cartItem => {
        dispatch(removeFromCart(cartItem))
    }
    const handleDecreaseCart = cartItem => {
        dispatch(decreaseCart(cartItem))
    }
    const handleIncreaseCart = cartItem => {
        dispatch(increaseCart(cartItem))
    }
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    useEffect(() => {
        dispatch(getTotals())
    },[cart,dispatch])


    

    const handleCheckout=()=>{
        changeCart()
        token ? 
            
            navigate('/checkout')     
        
            : 

                navigate('/login')
            
    }
    return (
        <>
        
            <section id={`${isOpen ? 'open' : 'cartSlider'}`} >
                <span id="cartCloseBtn" onClick={changeCart}>x</span>
                <section className="heading-div">
                    <h2>My cart</h2>
                    <span id="cartClearBtn" onClick={() => handleClearCart()}>Clear cart</span>
                </section>
                <section className="cart-item-container">
                    {
                        cart.cartItems.length === 0 ? (
                            <p>Cart is empty</p>
                        ) : (
                            <>
                                {
                                    cart.cartItems.map(cartItem => (
                                        <div className="cart-product-card" key={cartItem._id}>
                                            {/* {console.log(cartItem)} */}
                                            <div className="cart-product-img-container">
                                                <img src={`https://digitalkirana-server.vercel.app/Assets/Images/Products/${cartItem.frontView}`} alt="" />
                                            </div>
                                            <div className="cart-product-specification">
                                                <h4 className="cart-product-name">{cartItem.productName} </h4>
                                                <p className="cart-product-price"><span className="">Price : Rs</span> <span>{cartItem.salesPrice}</span></p>
                                                <div className="cart-product-qty">
                                                    <button className="decrease-qty cart-qty-btn" onClick={() => handleDecreaseCart(cartItem)} >-</button>
                                                    <span className="cart-product-qty-value">{cartItem.cartQuantity}</span>
                                                    <button className="increase-qty cart-qty-btn" onClick={() => handleIncreaseCart(cartItem)}>+</button>
                                                </div>
                                            </div>
                                            <div className="cart-product-total">
                                                <span className="cart-item-del-btn" onClick={() => handleRemoveFromCart(cartItem)} >x</span>
                                                <p><span className="price-denoter"></span> <span>{`Rs ${cartItem.salesPrice * cartItem.cartQuantity}`}</span></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>

                        )
                    }

                </section>
                <section className="checkout-section">
                    <hr className="cart-divider-line" />
                    <div className="subtotal-container"><span>Subtotal : </span> <span className="cart-subtotal-price">{`Rs ${cart.cartTotalAmount}`}</span>
                    </div>
                    <button id="checkoutBtn" onClick={handleCheckout}>Checkout</button>
                </section>
            </section>
        </>
    )
}

export default Cart 

