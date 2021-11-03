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


function App() {

  const auth = useAuth();
  const fictionUser = {
    username: "user01",
    password: "user123",
  }
  

  // const [ user, setUser ] = useState({
  //   username: "",
  //   password: ""
  // })
  const [ username, setUsername ] = useState("usern")
  const [ password, setPassword ] = useState("pwd")
  
  const value = useMemo(() => ({ username, setUsername, password, setPassword }), [ username, setUsername, password, setPassword ]);

  const [error, setError] = useState("")
  const Login = details => {
    console.log(details);
    if(details.username === fictionUser.username && details.password === fictionUser.password){
      console.log("Logged in successfully!");
      setUsername(details.username)
      setPassword(details.password)
      setError("");
      return true;
    }
      
    else {
      console.log("Details do not match!");
      setError("Details do not match!")
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
               <SignIn {...props} defaultAccount={fictionUser} error={error} Login={Login} />
             )} 
            />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/signup" component={SignUp} />
            <UserContext.Provider value={{ username, password }}>
              <Route exact path="/homepage"  component={HomePage} />
              <Route exact path="/managerprofile" component={Appi} />
              <Route exact path="/userprofile" component={Profile_user_final} />
              <Route exact path="/shop" component={Shop} /> 
              <Route exact path="/rank" component={Ranking} />
            </UserContext.Provider>
          </Switch>
      </Router>
    </ProvideAuth>
    
  );
}



export default App;