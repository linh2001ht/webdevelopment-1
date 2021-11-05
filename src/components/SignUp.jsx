import React, { useState } from 'react';
import { createNewUserService } from "../services/userService"

function SignUp() {

    const [userInfo, setUserInfo] = useState({
        email: "",
        username: "",
        age: "",
        password: ""
    });

    const handleOnchangeInput = (event, id) => {
        let copyState = {...userInfo}
        copyState[id] = event.target.value

        setUserInfo({...copyState})

        console.log("copystate ", copyState)
        console.log("event 1:", event.target.value, id)
    }

    const handleAddNewUser = async () => {
        console.log("data modal", userInfo)
        try {
            let response = await createNewUserService(userInfo)
            alert(response.message)
            console.log("response create user:", response)
        } catch (e) {
            console.log(e)
        }
        
    }

    return (
        <div className="sign-up-container">
            <div>
                <p className="sign-up-title">Sign Up!</p>
            </div>
            <div >
                <div className="sign-up-input-container" >
                    <label className="sign-up-labels">Email address: (*)</label>
                    <input className="sign-up-inputs" autoComplete="off" type="email" name="email" id="email"
                    onChange = {(event) => { handleOnchangeInput(event, "email") }} 
                    value={userInfo.email} /><br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Username: (*)</label>
                    <input className="sign-up-inputs" autoComplete="off" type="text" name="username" id="uname"
                    onChange = {(event) => { handleOnchangeInput(event, "username") }} 
                    value={userInfo.username} /><br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Gender: </label>
                    <input className="sign-up-radios" type="radio" name="Male" value="male" />Male
                    <input className="sign-up-radios" type="radio" name="Female" value="female" />Female<br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Age: </label>
                    <input className="sign-up-inputs" autoComplete="off" type="text" name="age" id="age"
                    onChange = {(event) => { handleOnchangeInput(event, "age") }} 
                    value={userInfo.age} /><br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Password: (*)</label>
                    <input className="sign-up-inputs" autoComplete="off" type="password" name="password" id="pwd"
                    onChange = {(event) => { handleOnchangeInput(event, "password") }} 
                    value={userInfo.password} /><br />
                </div>
                <div className="sign-up-input-container">
                    <label className="sign-up-labels">Confirm password: (*)</label>
                    <input className="sign-up-inputs" autoComplete="off" type="password" name="confirm-password" id="cf-pwd" /><br />
                </div>
            </div>
            <div className="sign-up-button-container">
                {/* <input className="sign-up-buttons" type="submit" value="Sign Up" /> */}
                <button className="sign-up-buttons" onClick={()=> handleAddNewUser() }>Sign Up</button>
                <button className="sign-up-buttons" onClick={() => {
                        window.open("/", "_self");
                        window.close();
                    }}>Cancel</button>
            </div>
        </div>
    )
}

export default SignUp
