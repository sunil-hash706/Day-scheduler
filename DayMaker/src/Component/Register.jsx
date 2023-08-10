import './Register.css'
import axios from 'axios'
import { useEffect, useState } from "react";
import logo from '../assets/Pr.avif'
import { useNavigate } from "react-router-dom";

export default function register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    });




    const collectData = async () => {

        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let check = regex.test(email)
        if (!check) {
            alert("Email is Not Valid");
        }
        else if (password !== cnfPassword) {
            alert("Password does not match");
        }
        else if (name === "") {
            alert("Name not given")
        }
        else if (password.length < 8) {
            alert("Password is too small")
        }
        else {
            let result = await fetch("http://localhost:5000/register", {
                method: "post",
                body: JSON.stringify({ name, email, city, password, cnfPassword }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();
            console.warn(result);
            localStorage.setItem("user", JSON.stringify(result));
            if (result) {
                navigate("/");
            }
        }
    };
    return (
        <>
            <div className="register-container">
                <div className='register-card'>
                    <img src={logo}></img>
                    <input type='Text' placeholder='Name' value={name}
                        onChange={(e) => setName(e.target.value)}></input>
                    <input type='email' placeholder='Email' value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='Text' placeholder='City' value={city}
                        onChange={(e) => setCity(e.target.value)}></input>
                    <input type='password' placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    <input type='password' placeholder='Conferm Password' value={cnfPassword}
                        onChange={(e) => setCnfPassword(e.target.value)}></input>
                    <button className='register-button' onClick={collectData}>Register</button>
                </div>
            </div>
        </>
    )
}