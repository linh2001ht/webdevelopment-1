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
import ProtectedRoute from "./components/Authentication/ProtectedRoute"
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
import Admin from './components/admin/_admin';
import SignInAdmin from './components/admin/SignInAdmin';
import RankAdmin from './components/admin/rank';
import ShopAdmin from './components/admin/shop';

function App() {

  // const auth = useAuth();
  const fictionPlayer = [{
    username: "user01",
    password: "user123",
  }]
  const fictionAdmin = [{
    username: "admin01",
    password: "admin123",
  }]


  const [ username, setUsername ] = useState(null)
  const [ password, setPassword ] = useState(null)
  const [ error, setError ] = useState(null)
  // const [ role, setRole ] = useState(0)
  const [ isAuth, setIsAuth ] = useState(false)
  const value = useMemo(() => ({ isAuth, username, setUsername, password, setPassword }), [ username, setUsername ]);

  return (
    // <ProvideAuth>
      <Router>
          <Switch>
            <Route exact path="/" component={Navbar}/>
            <Route exact path="/_admin" component={Admin} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/signup" component={SignUp} />
            <UserContext.Provider value={value}>
              <Route
                exact 
                path="/signin"
                render={ props => (
                  <SignIn {...props} defaultUser={fictionPlayer} setIsAuth={setIsAuth}  error={error} setError={setError}/>
                )} 
              />
              <Route 
                exact 
                path="/signinadmin"
                render={ props => (
                  <SignInAdmin {...props} defaultUser={fictionAdmin} setIsAuth={setIsAuth} error={error} setError={setError} />
                )}
              />

              {/* Player */}
              <Route exact path="/homepage" component={HomePage} isAuth={isAuth} />
              <Route exact path="/userprofile" component={Profile_user_final} isAuth={isAuth} />
              <Route exact path="/shop" component={Shop} isAuth={isAuth} /> 
              <Route exact path="/rank" component={Ranking} isAuth={isAuth}/>
              <Route exact path="/play" component={Game} isAuth={isAuth} />

              {/* Admin */}
              <Route exact path="/homepagemanager" component={HomePageAdmin} isAuth={isAuth} />
              <Route exact path="/managerprofile" component={Appi} isAuth={isAuth} />
              <Route exact path="/manageusers" component={ManageUser} isAuth={isAuth} />
              <Route exact path="/rankadmin" component={RankAdmin} isAuth={isAuth} />
              <Route path="/shopadmin" component={ShopAdmin} isAuth={isAuth} />
              {/* thêm protected router nếu có thời gian */}
            </UserContext.Provider>
          </Switch>
      </Router>
    // </ProvideAuth>
    
  );
}



export default App;