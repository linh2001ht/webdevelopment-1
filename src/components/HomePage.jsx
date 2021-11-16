import React, { useContext } from 'react';
import { Navbar, Container, NavLink, Nav } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from './Authentication/UserContext'


function HomePage() {
    const { username, password } = useContext(UserContext);
    let history = useHistory()
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
            <Navbar bg="myBg" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand className="myTitle" href="#home" style={{color:"#dffffd"}}>Obstacle Crossed</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <div className="nav">
                        <NavLink className="navlink" href="/shop" onClick={() => history.push("/shop")}>Shop</NavLink>
                        <NavLink className="navlink" href="/rank" onClick={() => history.push("/rank")}>Ranking</NavLink>
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

export default HomePage
