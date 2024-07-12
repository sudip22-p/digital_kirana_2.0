import { useDispatch } from 'react-redux'
import Layout from '../../components/layout/Layout'
import Form from './components/form/Form'
import { login } from '../../store/authSlice'
import { handleSuccessLogin } from '../../store/authSlice'

const Login = () => {
  
    //   if(response.data){
    //     const userToken = response.data.userToken;
    //     const cookieString = `userToken=${userToken}; Secure;`
    //     document.cookie = cookieString;
    //     check if this cookie is present in homepage or not in frontend if present show logout
    //   }
    // } catch (error) {
    //   console.log(error)
    //}
  
    const dispatch = useDispatch()
    const handleLogin = async(data) => {
        await dispatch(login(data))
        dispatch(handleSuccessLogin(data))
    }
  

  return (
    <>
       
        <Form type='Login' onSubmit={handleLogin} />
      
    </>
  )
}

export default Login
