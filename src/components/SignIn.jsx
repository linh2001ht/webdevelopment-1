import React, { useState, useEffect, useContext } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import logo from './logo.png';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom'
import { UserContext } from "../components/Authentication/UserContext"
import { handleLoginApi } from "../services/userService"

// function SignIn( { defaultUser,  error, setError, setIsAuth }) {


//     let history = useHistory()
//     const { username, setUsername, password, setPassword } = useContext(UserContext)
//     const [details, setDetails] = useState({username: "", password: ""}); // TODO thay ở đây để chuyển role


//     const Login = (details) => {
//         let isHas = false;
//         defaultUser.forEach( (acc) => {
//           if(details.username === acc.username && details.password === acc.password){
//             console.log("Logged in successfully!");
//             setIsAuth(true)
//             // details.role = acc.role
//             // setRole(acc.role)
//             setUsername(details.username)
//             console.log("username: " + username)
//             setPassword(details.password)
//             console.log(username, password)
//             setError("");
//             isHas = true;
//           }
//         })
//         if(isHas === true) return true;
//         else {
//           console.log("Details do not match!");
//           setError("Details do not match!");
//           return false;
//         }
//     }

//     async function submitHandler(e) {
//         e.preventDefault();
//         var urlencoded = new URLSearchParams();
//             return fetch('http://localhost:8082/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },

//             body: urlencoded
//             })
//             .then(data => data.json())
//             .then(result => {
//                 console.log("result: " + JSON.stringify(result));
//                 console.log("detail : " + JSON.stringify(details))
//                 if(Login(details)) {
//                     // console.log("detail role: " + details.role)
//                     localStorage.setItem("accessToken", result.accessToken);
//                     history.push("/homepage");
//                 }
                
//             })
//         }
    
//     useEffect(() => {
//         async () => {
//             await submitHandler();
//         }
//     }, [details])

    

//     return (
//             <div className="sign-in-container">
//                 <div className="form-inner">
//                     <div className="sign-in-title-bar"> 
//                     <p className="sign-in-title">Obstacles Crossed</p> 
//                     <a 
//                         className="sign-in-close-button"
//                         onClick={() => {
//                             window.open("/", '_self');
//                             window.close();
//                     }}>X</a>
//                     </div>
//                     <p className="cheering">WELCOME TO OUR WORLD</p>
//                     <div className="logo-container">
//                         <img className="logo" src={logo} alt="img"/>
//                     </div>
//                     {(error !== "") ? <div className="error">{error}</div> : ""}
//                     <div className="sign-in-input-container">
//                         <div>
//                             <label className="sign-in-labels" htmlFor="username">USERNAME:</label><br/>
//                             <input className="sign-in-inputs" autoComplete="off" placeholder="  username..." type="text" name="username" id="uname" onChange= {e => setDetails({...details, username: e.target.value})} value={details.username} />
//                             </div>
//                         <div>
//                             <label className="sign-in-labels" htmlFor="password">PASSWORD:</label><br/>
//                             <input className="sign-in-inputs" placeholder="  password..." type="password" name="password" id="pwd" onChange= {e => setDetails({...details, password: e.target.value})} value={details.password} />
//                         </div>
//                     </div>
//                     <input className="SubmitBtn" type="button" onClick={submitHandler} value="Login" /><br />
//                     <div className="sign-up-btn">
//                         <a className="sign-up-btn"  href='/SignUp' onClick={() => history.push("/signup")} >Sign Up</a><br />
//                     </div>
//                     <div className="reset-pwd-btn">
//                         <a className="rs-btn" href='#' >Forgot password?</a>
//                     </div>
                    
//                 </div>
//             </div>
        
//     )

// }
// export default SignIn

function SignIn() { 
 
    const [details, setDetails] = useState({username: "", password: ""});
    const [err, setErr] = useState("")
    let history = useHistory()
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setErr("")
        // console.log(details)
 
        try {
            console.log("running")
            let data = await handleLoginApi(details.username, details.password);
            if (data && data.errCode !== 0) {
                setErr(data.message)
 
            }
            if (data && data.errCode === 0) {
                console.log('loging success');
                history.push("/homepage");

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
                <div className="sign-in-title"> Obstacles Crossed </div>
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
 
export default SignIn