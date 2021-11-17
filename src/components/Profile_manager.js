import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Profile_manager.css";

const Appi = ({profile}) => {
    let history = useHistory();
    const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);

    const [userProfile, setUserProfile ] = useState(profile)
    const handleClick = async () => {
        let update = await editUserService({id: userID, username: userProfile.username, email: userProfile.email, gender: userProfile.gender, age: userProfile.age})
        console.log("update", update)
        alert("Update succeed! Please login again!")
        // window.open("/", "_self");
        // window.close();
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
            <div className="container-nav-pm">
            <a onClick={() => {
                        window.open("/manageusers", "_self");
                        window.close();
                }}><i class="fas fa-arrow-circle-left"></i></a>
                <div id="branding">
                    <h1>Obstacles Crossed</h1>
                </div>

            </div>

            <div className="userprofile-pm">
                <h1>user profile</h1>
            </div>

            <div className="App-pm">
                <div className="container-image-pm">
                    {error && <p className="errorMsg-pm">File not supported</p>}
                    <div
                        className="imgPreview-pm"
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

                        <div className="remove-pm">
                            {imgPreview && (
                                <button onClick={() => setImgPreview(null)}>Remove image</button>
                            )}
                        </div>
                    </div>

                </div>
                <div className="box-pm">

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
                <div className="save_cancel-pm">
                    <button id="cancel" onClick={() => history.push("/homepagemanager")} name="cancel">cancel</button>

                    <button id="done" onClick={handleClick}>save</button>
                </div>

            </div>
        </>
    );
};

export default Appi;
