import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'product',
    initialState : {
        products: null
    },
    reducers : {
        setProducts(state,action){ 
            state.products = action.payload
        }
    }
})

export const {setProducts} = productSlice.actions
export default productSlice.reducer

export const handleProduct = data =>{
    return async function apiChunk(dispatch){
        try{
            const response = await axios.get('http://localhost:3000/api/homePage')
            console.log('working')
            if(response.status === 200){
                console.log(response.data)
                dispatch(setProducts(response.data))
                // dispatch(setStatus(STATUS.SUCCESS))
                // dispatch(setToken(response.data.userToken))
            }
        }catch(error){
            console.log(error)
        }
    }
}