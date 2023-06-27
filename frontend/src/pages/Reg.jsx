import React , {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { regRoute } from '../utils/Api_routes';

function Reg() {

  const navigate = useNavigate();

  const [inp, setInp] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(handleValidation){
        const {password, username, email} = inp;
        const {data} = await axios.post(regRoute,{
            username,
            email,
            password
        });

        // console.log('data ',data);
        if(data.status === 'error'){
            toast.error(data.msg, toastEffect)
        }
        if(data.status === 'success'){
            localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            navigate('/')
        }
    }
  }

  const toastEffect = {
    position:'bottom-right',
    autoClose:90,
    draggable:true,
    theme:'dark'
  }
  const handleChange = (e) => {
    setInp({...inp , [e.target.name]:[e.target.value] });
  }

  const  handleValidation = () => {
    const {password, cpassword, username, email} = inp;
    if(username.length<3){
        toast.error('Inappropriate Username', toastEffect);
        return false;
    }else if(email.length<3){
        toast.error('Inappropriate EMail', toastEffect);
        return false;
    }else if(password.length<5){
        toast.error('Password must be 5 character long', toastEffect);
        return false;
    }if(password !== cpassword){
        toast.error('Password doesnt match', toastEffect);
        return false;
    }else if(email === ''){
        toast.error('Email is required', toastEffect);
        return false;
    }
    return true;
  }

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  })

  return (
    <>
    <FormField>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='heading'>Register Yourself First!</div>
            
            <input type='text' 
            placeholder='username'
            name='username'
            value={inp.username}
            onChange={(e)=>handleChange(e)}
            />
            <input type='email' 
            placeholder='email'
            name='email'
            value={inp.email}
            onChange={(e)=>handleChange(e)}
            />
            <input type='password' 
            placeholder='password'
            name='password'
            value={inp.password}
            onChange={(e)=>handleChange(e)}
            />
            <input type='password' 
            placeholder='confirm password'
            name='cpassword'
            value={inp.cpassword}
            onChange={(e)=>handleChange(e)}
            />
            <button type='submit' className='btn'>Create User</button>

            <span>Already a member? <Link to='/login'>Login</Link></span>
        </form>
    </FormField>
    <ToastContainer />
    </>
  )
}

const FormField = styled.div`
    .heading{
        font-size:2rem;
    }

    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color: #2A2F4F;
    color: white;

    form{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:1rem;
        width:50rem;
        background-color:#2D2F40;
        border-radius:0.5rem;
        padding:2rem;
        
        input{
            background-color: #FFFFFF;
            border: 1px solid #2A2F4F; 
            border-radius: 0.5rem;
            padding:1rem;
            width:20rem;
            font-size:1rem;
            outline:none;
        }
        
        .btn{
            border-radius: 0.5rem;
            width: 8rem;
            border: none;
            text-align:center;
            text-transform: uppercase;
            height:2rem;
            background-color: #A5D7E8;
            &:hover{
                background-color: #576CBC;
            }
        }

        span{
            font-size: 1.3rem;
            text-transform: uppercase;
            a{
                text-decoration:none;
                color: #A5D7E8;
            }
        }
        
    }
`;


export default Reg