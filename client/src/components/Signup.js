import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../assests/form.css'
import Footer from './partials/Footer';

function Signup(){
    const [inputValues, setInputValues] = useState({
        fullName: '',
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const fullnameError = document.querySelector('.fullname.errors');
    const emailError = document.querySelector('.email.errors');
    const usernameError = document.querySelector('.username.errors');
    const passwordError = document.querySelector('.password.errors');

    const handleChange = (e) =>{
        setInputValues({...inputValues, 
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        fullnameError.textContent='';
        emailError.textContent='';
        usernameError.textContent='';
        passwordError.textContent='';
        
        try{
            const payload = { 
                fullname: inputValues.fullName, 
                email: inputValues.email, 
                username: inputValues.username, 
                password: inputValues.password}

            const result = await axios.post('http://localhost:3000/user/signup',
                payload    
            );

            if(result.errors){
                fullnameError.textContent = result.errors.fullname
                emailError.textContent = result.errors.email
                usernameError.textContent = result.errors.username
                passwordError.textContent = result.errors.password
            }
            else{
                navigate('/login');
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
        <div className='card'>
            <h2>SignUp Form</h2>
            <form action='/login' className='form' onSubmit={handleSubmit} method='POST'>
                
                <label>Fullname<p className='required'> *</p>
                <input type='text' name='fullName' value={inputValues.fullName} onChange={handleChange} placeholder="Full Name"/></label>
                <p className='fullname errors'></p>
                <label>Email<p className='required'> *</p>
                <input type='email' name='email' value={inputValues.email} onChange={handleChange} placeholder="Email"/></label>
                <p className='email errors'></p>
                <label>Username<p className='required'> *</p>
                <input type='text' name='username' value={inputValues.username} onChange={handleChange} placeholder="Username"/></label>
                <p className='username errors'></p>
                <label>Password<p className='required'> *</p>
                <input type='password' name='password' value={inputValues.password}  onChange={handleChange} placeholder="Password"/></label>
                <p className='password errors'></p>
                <button type='submit'>SignUp</button>
            </form>
        </div>
        <Footer />
        </>
    ) 
}

export default Signup