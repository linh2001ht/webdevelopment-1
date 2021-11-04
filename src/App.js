/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { useContext, createContext, useState, useMemo } from 'react'
import { Select } from 'antd';
import 'antd/dist/antd.css';
import SignIn from './components/SignIn';
import './App.css'
import SignUp from './components/SignUp';
import Navbar from './components/Toppage';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Appi from './components/Profile_manager';
import Profile_user_final from './components/UserProfile/Profile_user_final';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import Checkin from'./components/Checkin';
import AboutUs from "./components/pages/AboutUs";
import { ProvideAuth, UserContext, useAuth }  from './components/Authentication/UserContext';
import { Nav } from 'react-bootstrap';
import Ranking from './components/pages/Rank';
import Shop from'./components/Shop';
import Game from './components/Game';
import ManageUser from './components/ManageUser';
import HomePageAdmin from './components/Homepage_Admin';

function App() {

  const auth = useAuth();
  const fictionUser = [{
    username: "user01",
    password: "user123",
    role: 0
  },
  {
    username: "admin01",
    password: "admin123",
    role: 1
  }
]
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ role, setRole ] = useState(1)
  const value = useMemo(() => ({ username, setUsername, password, setPassword, role, setRole }), [ username, setUsername, password, setPassword, role, setRole ]);

  const [error, setError] = useState("")
  const Login = details => {
    console.log(details);
    let isHas = false;
    fictionUser.forEach(acc => {
      if(details.username === acc.username && details.password === acc.password){
        console.log("Logged in successfully!");
        details.role = acc.role.toString()
        setRole(acc.role)
        console.log("set role")
        setUsername(details.username)
        setPassword(details.password)
        console.log("set acc")
        setError("");
        isHas = true;
      }
    })
    if(isHas === true) return true;
    else {
      console.log("Details do not match!");
      setError("Details do not match!");
      return false;
    }
  }
  return (
    <ProvideAuth>
      <Router>
        {/* <div className="App">
          <Navbar />
        </div> */}

          <Switch>
            <Route exact path="/" component={Navbar}/>
            <Route
              exact 
              path="/signin"
              render={ props => (
               <SignIn {...props} defaultUser={fictionUser} error={error} Login={Login} />
             )} 
            />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/signup" component={SignUp} />
            <UserContext.Provider value={{ username, password, role }}>
              <Route exact path="/homepage" component={HomePage} />
              <Route exact path="/homepagemanager" component={HomePageAdmin} />
              <Route exact path="/managerprofile" component={Appi} />
              <Route exact path="/userprofile" component={Profile_user_final} />
              <Route exact path="/shop" component={Shop} /> 
              <Route exact path="/rank" component={Ranking} />
              <Route exact path="/play" component={Game} />
              <Route exact path="/manageusers" component={ManageUser} />
            </UserContext.Provider>
          </Switch>
      </Router>
    </ProvideAuth>
    
  );
}



export default App;