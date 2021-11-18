import React, {useState, useEffect} from 'react';
import { Nav } from 'react-bootstrap';
import "../App.css"
import DataTable from './createTable';
import Appi from "./Profile_manager"
import NavigationBar from "./navigationBar"
import { getAllUser } from '../services/userService';


// const columns = [
//     { id: 'no', label: 'ID User', minWidth: 50 },
//     { id: 'username', label: 'Username', minWidth: 150, align: 'center' },
//     { id: 'email', label: 'Email', minWidth: 200, align: 'center' },
//     { id: 'detail', label: 'Detail', minWidth: 150, align: 'center' }
// ]
// const createData = (no, username, email, detail) => {
//     return {no, username, email, detail };
// }


// var isDone = false
// const rows = []

function ManageUser() {
    const [ userID, setUserID ]  = useState(0)
    const [ state, setState ] = useState([])
    const [ profile, setProfile ] = useState({
        username: "",
        email: "",
        sex: "",
        age: 1
    });
    // const a = []

    // const DetailButton = ({userId}) => {
        
    //     return <button 
    //                 className="detail-button" 
    //                 onClick={ async () => {
    //                     let res = await getAllUser(userId)
    //                     setUserID(userId)
    //                     console.log("userId", userId)
    //                     setProfile(res.users)
    //                     console.log("res.users", res.users)
    //                     setState([1])
    //                     console.log("run")
    //                 }}
    //     >Detail</button>
        
    // }
    // const getData = async () => {
    //     let response = await getAllUser("ALL")
    //     if(response && response.errCode === 0) {
    //         const data = response.users
    //         if(isDone === false) {
    //             data.forEach( (item) => {
    //                 if(item.role===0)
    //                     rows.push(createData(item.id, item.username, item.email, <DetailButton userId={item.id} />))
    //             })
    //             isDone = true
    //             console.log("rows",rows)
    //             return rows
    //         } else {
    //             return;
    //         }
    //     }
    // }
    // useEffect(() => {
    //     getData()
    // }, [state])
    return (
        <div>
        {state.length === 0 && (
            <>
                <NavigationBar />
                <p className="list-users">List of users</p>
                <DataTable state={state} setState={setState} profile={profile} setProfile={setProfile} userID={userID} setUserID={setUserID}/>
            </>
        )}
        {state.length !== 0 && <Appi profile={profile} state={state} setState={setState} userID={userID} setUserID={setUserID} />}


        </div>
    );
}

export default ManageUser;