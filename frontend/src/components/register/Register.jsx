import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username:"",
        password:""
    });
    let name,value;

    const handleOnChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();
        const {username, password} = user;
        const res = await fetch("/register", {
            mode: 'cors',  
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "username": username,
                    "password": password
                }
            )
        });
        const data = await res.json();
        if (res.status >200 || !data) {
            window.alert(data.error);
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('LoginId', data.user._id);
            console.log(" in signup page ",data.user);
            navigate('/todo')
        }

    } 

    return (
        <>
            <div className="login-wrapper">
                <div className="loginContainer">
                    <h1>Register</h1>
                    <form className="login-form" action="">
                        <input autoComplete="off" onChange={handleOnChange} required className="login-input" type="text" name="username" placeholder="Username" />
                        <input autoComplete="off" onChange={handleOnChange} required className="login-input" type="password" name="password" placeholder="Password" />
                        <button onClick={postData} className="login-btn" type="submit">Register</button>
                    </form>
                    <Link to="/login">Already a user? Login here</Link><br />
                    <Link to="/">Go to home</Link>
                </div>
            </div>
        </>
    )
}

export default Register