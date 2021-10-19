import React from "react";
import "./Checkin.css";
import BoxImage from "../assets/images/box-removebg-preview.png";
import ExitImage from "../assets/images/2.png";

const Checkin = () => {

    return(
            <div className="Checkinborder">
                <div className="Checkinpadding">
                    <div className="Checkinbox">
                        <img src={BoxImage} alt=""/>
                        <p>Day 1 </p>
                    </div>
                    <div className="Checkinbox">
                        <img src={BoxImage} alt=""/>
                        <p>Day 2</p>
                    </div>
                <div className="Checkinbox">
                    <img src={BoxImage} alt=""/>
                    <p>Day 3</p>
                </div>
                <div className="Checkinbox">
                    <img src={BoxImage} alt=""/>
                    <p>Day 4</p>
                </div>
                <div className="Checkinbox">
                    <img src={BoxImage} alt=""/>
                    <p>Day 5</p>
                </div>
                <div className="Checkinbox">
                    <img src={BoxImage} alt=""/>
                    <p>Day 6</p>
                </div>
                <div className="Checkinbox">
                    <img src={BoxImage} alt=""/>
                    <p>Day 7</p>
                </div>
                <div className="Checkinexit">
                    <img src={ExitImage} alt="" className="exitimg"/>
                </div>
            </div>
        </div>
    );
}

export default Checkin;