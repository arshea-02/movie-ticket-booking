import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
//import { Link } from 'react-router-dom'
import axios from 'axios'
//import Header from './partials/Header'
import Footer from './partials/Footer';
import '../assests/form.css'


function Login(){
    const [inputValues, setInputValues] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate()
;    const usernameError = document.querySelector('.username.errors');
    const passwordError = document.querySelector('.password.errors');

    const handleChange = (e) =>{
        setInputValues({...inputValues,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
   
        usernameError.textContent='';
        passwordError.textContent='';

        try{
            const payload =  { username: inputValues.username, password: inputValues.password }
            const result = await axios.post(
              "http://localhost:3000/user/login",
              payload,
            );

            if(result.errors){
                usernameError.textContent = result.errors.username
                passwordError.textContent = result.errors.password
            }
            else{
                try{
                    const response = await axios.get("http://localhost:3000/user");
                    for(const user of response.data){
                        if(user.username === inputValues.username){
                            user.isAdmin===true ? 
                            localStorage.setItem('isAdmin', user.isAdmin) :
                            localStorage.removeItem('isAdmin');
                        }
                    }
                    localStorage.setItem('token', result.data.token)
                    Cookies.set('jwt', result.data.token);
                    //axios.put("http://localhost:3000/", Cookies(result.data.token));
                    navigate('/');
                }catch(err){console.log(err)}
                
            }
        }catch(err){
            console.log('Error', err);
        }   
    }
    
    return (
        <>
        <div className='card'>
            <h2>Login Form</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label>Userame<p className='required'>*</p>
                <input type='text' name='username' value={inputValues.username} onChange={handleChange} placeholder="Username"/></label>
                <p className='username errors'></p>
                <label>Password<p className='required'>*</p>
                <input type='password' name='password' value={inputValues.password} onChange={handleChange} placeholder="Password"/></label>
                <p className='password errors'></p>
                <p className='forgot'>Forgot Password</p>
                <button type='submit'>Login</button>
                
            </form>
        </div>
        <Footer />
        </>
    ) 
}

export default Login