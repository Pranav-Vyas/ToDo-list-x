import React from 'react';
import "./Home.css";
import { Link } from "react-router-dom";


function Home() {
    return (
        <>
            <div className="home-wrapper">

                <div className="main-header">
                    <div className="heading">

                        <h1 className="heading-text">Your busy Life Deserve This</h1>
                        <img className="todo-img" src="https://www.nicepng.com/png/full/835-8355467_do-list-vector.png" alt="" />
                    </div>
                    <div className="auth-container">
                        <div className="row">

                            <button className="auth-btn"><Link className='auth-btn-link' to="/login">Login</Link></button>
                            <button className="auth-btn"><Link className='auth-btn-link' to="/register">Register</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home