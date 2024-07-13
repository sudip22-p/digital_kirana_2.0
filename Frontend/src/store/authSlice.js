import { createSlice } from '@reduxjs/toolkit'
import STATUS from '../global/status'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        token: Cookies.get('userToken') ? Cookies.get('userToken') : null,
        status: null,
    },
    reducers: {
        setStatus(state, action){
            state.status = action.payload
        },
        setToken(state,action){
            state.token = action.payload
        },
        setUser(state,action){
            state.user = action.payload
        }
    }
})

export const {setStatus, setToken, setUser} = authSlice.actions
export default authSlice.reducer

export const login = data => {

    return async function loginChunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response = await axios.post('https://digitalkirana-server.vercel.app/auth/login',data)
            if(response.status === 200 && response.data.userToken){
                dispatch(setStatus(STATUS.SUCCESS))
                dispatch(setToken(response.data.userToken))
                data._id = response.data.customerId;
                dispatch(setUser(data))
            }else{
                toast.error("Something Went Wrong!!")
                dispatch(setStatus(STATUS.ERROR))
            }
        }catch(error){
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

export const register = data =>{
    return async function registerChunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await axios.post('https://digitalkirana-server.vercel.app/auth/register', data);
            console.log("ttt"+data)
            console.log("Received response from backend", response);
        
            if (response.status === 200 && response.data.userToken) {
                console.log("Registration successful");
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(setUser(data));
                dispatch(setToken(response.data.userToken));
                console.log(data)
                const { username, email, _id, phoneNumber } = data;
                localStorage.setItem('user', JSON.stringify({ username, email, _id, phoneNumber }));
                Cookies.set('userToken', response.data.userToken, { expires: 7 });
                location.href = 'https://digital-kirana-gules.vercel.app/';
            } else {
                console.log("Unexpected response status or missing userToken", response);
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (error) {
            toast.error(error.response.data.errorMessage);
            dispatch(setStatus(STATUS.ERROR));
        }
        
    }
}

export const handleSuccessLogin = (data) => {
    return async (dispatch) => {
        const response = await axios.get('https://digitalkirana-server.vercel.app/auth/login/success', {
            params: data,
        });
        try{
            if (response.status === 200) {
                dispatch(setStatus(STATUS.SUCCESS))
                console.log(response.data)
                dispatch(setUser(response.data.user))
                dispatch(setToken(response.data.googleToken))
                // const {userName,email} = response.data.user;
                // localStorage.setItem('user', JSON.stringify({userName,email}));
                const {email,_id} = response.data.user;
                localStorage.setItem('user', JSON.stringify({email,_id}));
                Cookies.set("googleToken", response.data.googleToken)
                location.href = 'https://digital-kirana-gules.vercel.app/'
            } else{
                dispatch(setStatus(STATUS.ERROR))
            }
        }catch(error){
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

export const getLogoutGoogle =  () => {
    return async (dispatch) => {
        dispatch(setStatus(null))
        dispatch(setUser(null))
        dispatch(setToken(null))
        localStorage.removeItem('user')
        Cookies.remove("googleToken", "connect.sid")
        window.open("https://digitalkirana-server.vercel.app/auth/google/logout", "_self")
    }
}