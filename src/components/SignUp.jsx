import React, { useState, useEffect } from 'react'
// import { getAllUser } from '../services/userService'

function SignUp() {
    const [ account, setAccount ] = useState({
        email: "",
        username: "",
        gender: true,
        age: "",
        password: "",
        confirm: ""
    })

    // const handleSignUp = () => {
    //     if(!account.email.includes("@") || !account.email.includes(".")) {
    //         console.log("Invalid email!")
    //     }
    //     // if(username)  nếu username trùng với username có trong database -> console.log("username đã đc sd")
    //     if(account.age !== parseInt(account.age, 10))
    //     {
    //         console.log("Tuoi khong hop le")
    //     }
    //     if(account.password !== account.confirm) {
    //         console.log("hãy xác nhận mật khẩu đúng!")
    //     }
    //     // nếu 1 trong những cái trên sai -> reset lại tất cả 
    //     // nếu đúng -> add vào database
    //     // làm giúp t phần radio luôn nha, chọn male với female ấy
    // }
    const handleSignUp = () => {}

    console.log("sign up is call")
    // const handleSignUp = async () => {
    //     let response = await getAllUser("ALL")
    //     console.log("get user from node.js: ", response)
    // }

    // useEffect(async () => {
    //     let response = await getAllUser("ALL")
    //     console.log("get user from node.js: ", response)
    // })

    
    return (
        <div className="sign-up-container">
            <div>
                <p className="sign-up-title">Sign Up!</p>
            </div>
            <div >
                <div className="sign-up-input-container" >
                    <label className="sign-up-labels">Email address: (*)</label>
                    <input className="sign-up-inputs" autoComplete="off" type="email" name="email" id="email" onChange= {e => setAccount({...account, email: e.target.value})} value={account.email}/><br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Username: (*)</label>
                    <input className="sign-up-inputs" autoComplete="off" type="text" name="username" onChange= {e => setAccount({...account, username: e.target.value})} value={account.username}/><br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Gender: </label>
                    <input className="sign-up-radios" type="radio" name="Male" value="male" />Male
                    <input className="sign-up-radios" type="radio" name="Female" value="female" />Female<br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Age: </label>
                    <input className="sign-up-inputs" autoComplete="off" type="text" name="age" id="age" onChange= {e => setAccount({...account, age: e.target.value})} value={account.age}/><br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Password: (*)</label>
                    <input className="sign-up-inputs" autoComplete="off" type="password" name="password" id="pwd" onChange= {e => setAccount({...account, password: e.target.value})} value={account.password}/><br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Confirm password: (*)</label>
                    <input className="sign-up-inputs" autoComplete="off" type="password" name="confirm-password" id="cf-pwd" onChange= {e => setAccount({...account, confirm: e.target.value})} value={account.confirm}/><br />
                </div>
            </div>
            <div className="sign-up-button-container">
                <input className="sign-up-buttons" type="submit" onClick={handleSignUp} value="Sign Up" />
                <button className="sign-up-buttons" onClick={() => {
                        window.open("/", "_self");
                        window.close();
                    }}>Cancel</button>
            </div>
        </div>
    )
}

export default SignUp
