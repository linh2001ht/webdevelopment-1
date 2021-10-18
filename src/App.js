/* eslint-disable react/jsx-pascal-case */
import React, {useState} from 'react'
// import { Select } from 'antd';
// import 'antd/dist/antd.css';
// import SignIn from './components/SignIn';
// import './App.css'
// import SignUp from './components/SignUp';
import Navbar from './components/Toppage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Appi from './components/Profile_manager';
// import Slider from './components/UserProfile/Slider';
// import App_user from './components/UserProfile/Profile_user';
import HomePage from './components/HomePage';
import Shop from'./components/Shop.js';
function App() {
  const adminUser = {
    username: "admin",
    password: "admin123",
  }

  // const { Option } = Select;

  
  const [user, setUser] = useState({username: "", password: ""});
  const [error, setError] = useState("")

  const Login = details => {
    console.log(details);
    if(details.username === adminUser.username && details.password === adminUser.password){
      console.log("Logged in successfully!");
      setUser({
        username: details.username,
        password: details.password,
      });
    }
      
    else 
      console.log("Details do not match!");
      setError("Details do not match!")
  }


  const Logout = () => {
    setUser({
      username: "",
      password: "",
      // role: "",
    });
    setError("");
  }

  return (
    <>
    <div className="App">
      {/* {(user.username !== "") ? (
        <div>
          welcome {adminUser.username}
          <button onClick={Logout}>Log out</button>
        </div>
      ) : (
        <SignIn Option={Option} Login={Login} error={error}/>
      )} */}
      {/* <SignUp /> */}
      {/* <App_user /> */}
      {/* <Router>
      <Navbar />
      </Router> */}
      {/* <HomePage /> */}
      <Shop />
    </div>
    </>
  

  );
  
  
}
export default App;
