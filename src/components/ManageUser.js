import React, {useState, useEffect} from 'react';
import { Nav } from 'react-bootstrap';
import "../App.css"
import DataTable from './createTable';
import Appi from "./Profile_manager"
import NavigationBar from "./navigationBar"

function ManageUser() {
    const [ userID, setUserID ]  = useState(0)
    const [ state, setState ] = useState('start')
    const [ profile, setProfile ] = useState({
        username: "",
        email: "",
        sex: "",
        age: 1
    });
    const a = []

    return (
        <div>
        {state === 'start' && (
            <>
                <NavigationBar />
                <p className="list-users">List of users</p>
                <DataTable state={state} setState={setState} profile={profile} setProfile={setProfile} userID={userID} setUserID={setUserID}/>
            </>
        )}
        {state === 'change-page' && <Appi profile={profile} setState={setState} userID={userID} setUserID={setUserID} />}


        </div>
    );
}

export default ManageUser;