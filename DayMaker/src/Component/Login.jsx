import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import logo from '../assets/Pr.avif'



export default function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    useEffect(() => {
        let auth = localStorage.getItem("user");
        if (auth) navigate("/");
    });
    const collectData = async () => {
        // console.log(email, password);
        let result = await fetch("http://localhost:5000/Login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        // console.log(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
        } else {
            alert("please enter correct password");
        }
    };

    return (
        <>
            <div className="login-container">
                <div className='login-card'>
                    <img src={logo}></img>
                    <input type='email' placeholder='Email' value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='password' placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    <button className='login-button' onClick={collectData}>Log in</button>
                </div>
            </div>
        </>
    )
}