import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        cartTotalQuantity : 0,
        cartTotalAmount : 0,
    },
    reducers : {
        toggleCart: state => {
            state.isOpen = !state.isOpen;
        },
        addToCart(state,action){
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id) //cartItem ko data ko id rw payload data ko id check gareko aani position of that item is returned it no product value = -1
            if(itemIndex >= 0){
                    state.cartItems[itemIndex].cartQuantity +=1
                    // toast.info('Increased product quantity',{
                    //     position : 'bottom-right'
                    // })
            }else{
                console.log(action.payload)
                const tempProduct = {...action.payload, cartQuantity : 1 }
                state.cartItems.push(tempProduct)
                toast.success(`Added to cart`,{
                    position : 'bottom-right'
                })
            
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        removeFromCart(state,action){
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem._id !== action.payload._id
            )
            state.cartItems = nextCartItems
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            toast.error(`Removed from cart`,{
                position : 'bottom-right'
            })
        },
        decreaseCart(state,action){
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1
                toast.info(`Decreased Card Quantity`,{
                    position : 'bottom-right'
                })
            }else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem._id !== action.payload._id
                )
                state.cartItems = nextCartItems
                toast.error(`Removed from cart`,{
                    position : 'bottom-right'
                })
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        increaseCart(state,action){
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id
            )
            if(state.cartItems[itemIndex].cartQuantity >= 1){
                state.cartItems[itemIndex].cartQuantity += 1
                // toast.info(`Increased Card Quantity`,{
                //     position : 'bottom-right'
                // })
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        clearCart(state,action){
            state.cartItems = []
            toast.error(`Cart Cleared`,{
                position : 'bottom-right'
            })
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        getTotals(state,action){
            let {total,quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {salesPrice,cartQuantity} = cartItem
                const itemTotal = salesPrice * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
                return cartTotal
            },{
                total: 0,
                quantity: 0
            })
            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total
        }

    }
})
export const {toggleCart, addToCart,removeFromCart, decreaseCart,increaseCart, clearCart, getTotals} = cartSlice.actions
export default cartSlice.reducer