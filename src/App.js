/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { useContext, createContext, useState, useMemo, useEffect } from 'react'
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
import GameAdmin from './components/admin/game';
import UserRank from './components/pages/UserRank'

function App() {

  // const auth = useAuth();
  const [ username, setUsername ] = useState(null)
  const [ highScore, setHighScore ] = useState(-1)
  const [ userID, setUserID ] = useState(-1)
  const [ error, setError ] = useState(null)
  const [ isAuth, setIsAuth ] = useState(false)
  const [ profile, setProfile ] = useState({
    username: "",
    email: "",
    sex: "",
    age: 1
});
  const value = useMemo(() => ({ isAuth, username, setUsername, userID, setUserID, highScore, setHighScore, profile, setProfile }),
   [ username, setUsername, userID, highScore, setHighScore, profile, setProfile ]);

  return (
    <ProvideAuth>
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
                  <SignIn {...props} setIsAuth={setIsAuth}  error={error} setError={setError}/>
                )} 
              />
              <Route 
                exact 
                path="/signinadmin"
                render={ props => (
                  <SignInAdmin {...props} setIsAuth={setIsAuth} error={error} setError={setError} />
                )}
              />

              {/* Player */}
              <Route exact path="/homepage" component={HomePage} isAuth={isAuth} />
              <Route exact path="/userprofile" component={Profile_user_final} isAuth={isAuth} />
              <Route exact path="/shop" component={Shop} isAuth={isAuth} /> 
              <Route exact path="/rank" component={UserRank} isAuth={isAuth}/>
              <Route exact path="/play" component={Game} isAuth={isAuth} />

              {/* Admin */}
              <Route exact path="/homepagemanager" component={HomePageAdmin} isAuth={isAuth} />
              <Route exact path="/managerprofile" component={Appi} isAuth={isAuth} />
              <Route exact path="/manageusers" component={ManageUser} isAuth={isAuth} />
              <Route exact path="/rankadmin" component={RankAdmin} isAuth={isAuth} />
              <Route path="/shopadmin" component={ShopAdmin} isAuth={isAuth} />
              <Route exact path="/playadmin" component={GameAdmin} />
              {/* thêm protected router nếu có thời gian */}
            </UserContext.Provider>
          </Switch>
      </Router>
    </ProvideAuth>
    
  );
}



export default App;