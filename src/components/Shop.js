import React, {useContext} from "react";
import "./Shop.css";
import LockImage from "../assets/images/Locker.png";
import { UserContext } from "./Authentication/UserContext";
import NavigationBar from "./navigationBar"
const Shop = () => {

    const { username } = useContext(UserContext)
    
    return(
    
        <div>
            <NavigationBar />
            <div class="character"></div>
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