import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Authentication/UserContext"
import './Profile_user.css';
import {getAllUser, editUserService} from "../../services/userService"
import { useHistory } from "react-router-dom";

var isGet = false

const App_user = () => {
    const { username, userID, profile, setUsername, setProfile } = useContext(UserContext) 
    const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);
    const [ userProfile, setUserProfile ] = useState(profile)
    let history = useHistory()
    console.log("user profile",userProfile)


    const handleClick = async () => {
        let update = await editUserService({id: userID, username: userProfile.username, email: userProfile.email, gender: userProfile.gender, age: userProfile.age})
        console.log("update", update)
        alert("Update succeed! Please login again!")
        window.open("/", "_self");
        window.close();
        

    }

    const handleImageChange = (e) => {
        setError(false);
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selected);
        } else {
            setError(true);
        }
    };
    
    return (
        <>
            <div className="container-nav-pu">
                <div className="branding">
                <p className="profile-user-title">Obstacles Crossed</p>
                </div>

            </div>

            <div className="userprofile">
                <h1>{userID} and {username}</h1>
            </div>

            <div className="App-pu">
                <div className="container-image-pu">
                    {error && <p className="errorMsg">File not supported</p>}
                    <div
                        className="imgPreview"
                        style={{
                            background: imgPreview
                                ? `url("${imgPreview}") no-repeat center/cover`
                                : "#131313"
                        }}
                    >
                        {!imgPreview && (
                            <>
                                <p>Add an image</p>
                                <label htmlFor="fileUpload" className="customFileUpload">
                                    Choose file
                                </label>
                                <input type="file" id="fileUpload" onChange={handleImageChange} />
                                <span>(jpg, jpeg or png)</span>
                            </>
                        )}

                        <div className="remove-pu">
                            {imgPreview && (
                                <button onClick={() => setImgPreview(null)}>Remove image</button>
                            )}
                        </div>
                    </div>

                </div>
                <div className="box-pu">

                    <label >username :</label>
                    <input id="username" type="text" name="username" value={userProfile.username} onChange={(event) => setUserProfile({...userProfile, username: event.target.value})} /><br /><br />

                    <label for="mail">mail :</label>
                    <input id="mail" type="email" name="email" value={userProfile.email} onChange={(event) => setUserProfile({...userProfile, email: event.target.value})}   /><br /><br />

                    <label for="sex">sex :</label>
                    <select id="sex" name="sex" value={userProfile.gender}  onChange={(event) => setUserProfile({...userProfile, gender: event.target.value})} >
                        <option value={0}>female</option>
                        <option value={1}>male</option>
                    </select><br /><br />

                    <label for="age">age :</label>
                    <input id="age" type="number" name="age" min="6" max="100" value={parseInt(userProfile.age)}  onChange={(event) => setUserProfile({...userProfile, age: event.target.value})} /><br /><br />

                </div>
                <div className="save_cancel-pu">
                    <button id="cancel" >cancel</button>

                    <button id="done" onClick={handleClick} >save</button>
                </div>

            </div>
        </>
    );
};
export default App_user;
