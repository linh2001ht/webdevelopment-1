import React, { useState, useEffect } from 'react';
import { Button } from '../NavButton';
import { Link, useHistory } from 'react-router-dom';
import '../Toppage.css';
import fblogo from '../../assets/images/Facebook Icon .png'; 
import instalogo from '../../assets/images/instagram-logo.png';
import AboutUs from '../pages/AboutUs';
import SignInAdmin from './SignInAdmin';

function Admin() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  // const [bgState, setBgState] = useState(false);

  let history = useHistory();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);//tat di (nhan dau x)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []); 

  window.addEventListener('resize', showButton);

  return (
    <>
     {/*Phan navigation bar cua toppage*/}
      <nav className='navbar'>
        <div className='navbar-container'>
        <p className="game-title-toppage">Obstacles Crossed</p> 
          <Link to='/' className='navbar-logo' onClick={() => {
            closeMobileMenu();
            // setBgState(false);
          }}>
            <i class='fas fa-gamepad' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>

            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />  {/* Neu click dong thi
            hien dau x,neu chua click thi van con bars */}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/aboutus' className='nav-links' onClick={() => {
                closeMobileMenu();
                history.push("/aboutus");
                }}  >
                About Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='./signinadmin'
                className='nav-links'
                onClick={closeMobileMenu}
                
                // component={SignIn}
              >
                Login
              </Link>
            </li>

            {/* <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li> */}
          </ul>
          {button && <Button type="button" buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
      </nav>

 {/*Phan hinh anh game cua toppage*/}
      <div className= "hero-container"  >
        <h1 className="slogan">BEST TEAM NAME</h1>
      </div>

 
 {/*Phan How to play cua toppage*/}
      <div className="How-to-play">
        <h2>how to play</h2>
        <p className="howtoplay-para">プレイヤーは、障害を乗り越えるための武器や能力を手に入れることができます。
          ただし、1回しか使用できません。武器は出現回数は無制限です。
          走っている間、武器はランダムに出現します。
        </p>
      </div>


    {/*Phan contact us cua toppage*/}
      <div className='footer'>
        <p className="contact-us">contact us</p>
        <img  className="toppage-imgs" src={instalogo} width="65"
          height="60" alt="ins-logo"/>
        <img className="toppage-imgs" src={fblogo} width="130"
          height="60" alt="fb-logo" />
        <a className="mail" href="mailto: abc@example.com">bestteamname@gmail.com</a>
      </div>
    </>
  );
}

export default Admin;