import './Navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';


export default function Navbar() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/register");
    };
    return (
        <>
            <div className='nav-bar'>
                <ul>
                    {auth ?
                        (<>
                            <li> <Link className="nav-items" to="/" >Home</Link></li>
                            <li> <Link className="nav-items" to="/work" >Work</Link></li>
                            <li> <Link className="nav-items" to="/add-work" >Add Work</Link></li>
                            <li> <Link className="nav-items" to="/about" >About Us</Link></li>
                            <li> <Link className="nav-items" to="/logout" onClick={logout}>Log Out</Link></li>

                        </>) : (
                            <>
                                <li> <Link className="nav-items" to="/about" >About Us</Link></li>
                                <li> <Link className="nav-items" to="/register" >Register</Link></li>
                                <li> <Link className="nav-items" to="/login" >Login</Link></li>
                            </>)}

                </ul>
            </div>
        </>
    )
}