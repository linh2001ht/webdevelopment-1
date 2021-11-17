import React, { useContext, useState } from 'react';
import { Navbar, Container, NavLink, Nav } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from './Authentication/UserContext'
import { withRouter } from "react-router-dom"
import { getAllUser } from "../services/userService"

var isRun = false
function HomePage() {
    const { username, setUsername, userID, setUserID, profile, setProfile } = useContext(UserContext);
    const [ user, setUser ] = useState({})
    let history = useHistory()
    const getUser = async (username) => {
        let response = await getAllUser("ALL")
        if(response && response.errCode === 0) {
            const data = response.users
            data.forEach( (item) => {
                if(item.role===0)  {
                    let obj = {
                        username : "",
                        email : "",
                        gender: "",
                        age: 1
                    }
                    console.log("username", username)
                    if(username === item.username){
                        console.log("run")
                        setUserID(item.id)
                        obj.username = item.username
                        obj.email = item.email
                        obj.gender = item.gender
                        obj.age = item.age
                        setProfile(obj)
                        console.log("profile", profile)
                        return item
                    }
                }
            })
        }
    }
    
    if(!isRun) {
        getUser(username)
        isRun = true
    }

    // console.log("username in homepage: " , username)
    
    const style = () => {
        return (
          <style jsx>{`
            .myTitle {
                color:#dffffd;
                font-size:2rem;

                
            }
            .nav {
                margin-left: 20%;
                width: 50%;
                display: flex;
            }
            .navlink {
                color: #dffffd;
                margin: 0% 10%;
            }
            .logout {
                color: #dffffd;
                margin-left: 200px;
            }
          `}</style>
        )
      }
    return (
        <div className="sample">
        {style()}
        {/* {getUser(username)} */}
            <Navbar bg="myBg" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand className="myTitle" href="/homepage">Obstacle Crossed</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <div className="nav">
                        <Link className="navlink" to="/shop" >Shop</Link>
                        <Link className="navlink" to="/rank" >Ranking</Link>
                    </div>
                    <NavLink className="logout" href="/" onClick={() => history.push("/")}>Logout</NavLink>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="home-picture-container">
                <div className="pic">
                    <img src="#" alt="avatar" />
                </div>
                <Link to="/userprofile" className="username-tag">{username}</Link>
            </div>
            <div className="play-background">
                <button className="button-container">
                    {/* <label className="play-text">PLAY</label> */}
                    <Link to="/play" className="play-text">PLAY</Link>
                </button>
            </div>
        </div> 
    )
    
}

export default withRouter(HomePage)
