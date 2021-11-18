import React, { useState, useEffect, useContext } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import logo from '../logo.png';
import HomePageAdmin from "../Homepage_Admin";
import { Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom'
import { getRoles } from '@testing-library/react';
import { UserContext } from "../Authentication/UserContext"
import { handleLoginApi } from "../../services/userService"


function SignInAdmin() { 
    const { username, setUsername } = useContext(UserContext) 
    const [details, setDetails] = useState({username: "", password: ""});
    const [err, setErr] = useState("")
    let history = useHistory()
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setErr("")
        try {
            let data = await handleLoginApi(details.username, details.password);
            if (data && data.errCode !== 0) {
                setErr(data.message)
 
            }
            if (data && data.errCode === 0) {
                if(data.user.role == 1){
                    setUsername(details.username)
                    history.push("/homepagemanager");
                }
                else setErr("Username doesn't exist");
            }

 
        } catch (error) {
            if(error.response) {
                if(error.response.data) {
                    setErr(error.response.data.message)
                }
            }
 
        }
    }
 
    return (
        <form className="sign-in-container">
            <div className="form-inner">
                <div className="sign-in-title-bar"> Obstacles Crossed </div>
                <p className="cheering">WELCOME TO OUR WORLD</p>
                <div className="logo-container">
                    <img className="logo" src={logo} alt="img"/>
                </div>
                {/* {(err !== "") ? <div className="error">{err}</div> : ""} */}
                    <div className="error">{err}</div>
                <div className="sign-in-input-container">
                    <div>
                        <label className="sign-in-labels" htmlFor="username">USERNAME:</label><br/>
                        <input className="sign-in-inputs" autoComplete="off" placeholder="  username..." type="text" 
                        value={details.username} id="uname" 
                        onChange= {(event) => { setDetails({...details, username: event.target.value}); } }
                        value={details.username} />
                        </div>
                    <div>
                        <label className="sign-in-labels" htmlFor="password">PASSWORD:</label><br/>
                        <input className="sign-in-inputs" placeholder="  password..." type="password" name="password" id="pwd" 
                        onChange= {(event) => { setDetails({...details, password: event.target.value}); } }
                        value={details.password} />
                    </div>
                </div>
 
                <br />
                <button className="SubmitBtn" onClick= {handleLogin} >Login</button>
                {/* <input className="SubmitBtn" value="Login" onClick= {handleLogin} /> */}
                <br />
                <div className="sign-up-btn">
                    <a className="sign-up-btn"  href='#SignUp' >Sign Up</a><br />
                </div>
                <div className="reset-pwd-btn">
                    <a className="rs-btn" href='#' >Forgot password?</a>
                </div>
 
            </div>
        </form>
    )
}
 
export default SignInAdmin