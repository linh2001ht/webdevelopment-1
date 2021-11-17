import React, {useContext} from "react";
import "./Shop.css";
import LockImage from "../assets/images/Locker.png";
import { UserContext } from "./Authentication/UserContext";

const Shop = () => {

    const { username } = useContext(UserContext)
    
    return(
    
        <div>
        {console.log("username in shop : " + username)}
            <div class="bar">
                <div class="nar">
                {/* thay 0 thành 1, đổi thứ tự, tương tự với page ranking */}
                <a onClick={() => {
                    window.open("/homepage", "_self") 
                    window.close();
                }}><i class="fas fa-arrow-circle-left"></i></a>
                    <span class="titlegame">Obstacles Crossed</span>
                </div>
            </div>

            <div class="character"></div>
            <label>{username}</label>
            <div class="shop">
            
                    <div class="news_item">
                        <h4>Character 1</h4>
                        <img src={LockImage} alt=""/>
                        <div class="content">
                        </div>
                    </div>
                    <div class="news_item">
                        <h4>Character 2</h4>
                        <img src={LockImage} alt=""/>
                        <div class="content">
                        </div>
                    </div>
                    <div class="news_item">
                        <h4>Character 3</h4>
                        <img src={LockImage} alt=""/>
                        <div class="content">
                        </div>
                    </div>
                    <div class="news_item">
                        <h4>Character 4</h4>
                        <img src={LockImage} alt=""/>
                        <div class="content">
                        </div>
                    </div>
                    <div class="news_item">
                        <h4>Character 5</h4>
                        <img src={LockImage} alt=""/>
                        <div class="content">
                        </div>
                    </div>
                    <div class="news_item">
                        <h4>Character 6</h4>
                        <img src={LockImage} alt=""/>
                        <div class="content">
                        </div>
                    </div>
            
            </div>
        </div>
    );
}

export default Shop;