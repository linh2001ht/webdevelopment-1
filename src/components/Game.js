import React, { useEffect, useState, useContext, useMemo } from "react";
import { UserContext } from "./Authentication/UserContext";
import "./Game.css";
import { Link } from "react-router-dom";
import { editUserService } from "../services/userService"
import { getAllUser } from '../services/userService';



const zeroPad = (num, places) => String(num).padStart(places, "0");



export default function Game() {

  const updateScore = async (userID, scor) => {
    console.log("Saved score: ", Math.floor(scor))
    try {
      let update = await editUserService({id: userID, score: Math.floor(scor)})
      console.log("update", update)
      console.log("update diem thanh cong")

    } catch {
      console.log("Luu diem that bai")
    }
  }




  const { username, userID, profile, setUsername, setProfile, highScore, setHighScore } = useContext(UserContext)
  const fps = 60;
  const [start, setStart] = useState(false);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [HScore, setHScore] = useState(highScore);
  const [stoneX, setStoneX] = useState([]);
  const [itemX, setItemX] = useState(-30);
  

  useEffect(() => {
    console.log("mesage from usesEfect")
    if(score >= HScore) {
      setHighScore(score)
    }
  }, [stoneX])

  const [giftX, setGiftX] = useState(-100);
  const [sword, setSword] = useState(false);
  const [shuriken, setShuriken] = useState([]);
  const [bomb, setBomb] = useState([]);
  const [portalIn, setPortalIn] = useState(false);
  const [portalOut, setPortalOut] = useState(false);
  const [swords, setSwords] = useState(5);
  const [shurikens, setShurikens] = useState(5);
  const [bombs, setBombs] = useState(5);
  const [portals, setPortals] = useState(5);
  const [charY, setCharY] = useState(380);
  const [charO, setCharO] = useState(1);
  const [jump, setJump] = useState(false);

  function hitOP() {
    stoneX.forEach((x) => {
      if (
        charO === 1 &&
        x >= 140 &&
        x <= 200 &&
        charY >= 280 + 2 * Math.abs(150 - x)
      ) {
        setStarted(false);
        updateScore(userID, score)
      }
    });
  }

  function hitGP() {
    if (giftX >= 140 && giftX <= 200 && charY <= 200) {
      setGiftX(-100);
      const n = Math.floor(Math.random() * 4);
      switch (n) {
        case 0:
          setSwords(swords + 1);
          break;
        case 1:
          setShurikens(shurikens + 1);
          break;
        case 2:
          setBombs(bombs + 1);
          break;
        case 3:
          setPortals(portals + 1);
          break;
        default:
          break;
      }
    }
  }

  function hitOSh() {
    for (let i = 0; i < stoneX.length; i++) {
      for (let j = 0; j < shuriken.length; j++) {
        if (
          stoneX[i] <= shuriken[j].x &&
          shuriken[j].x <= stoneX[i] + 100 &&
          -200 <= shuriken[j].y &&
          shuriken[j].y <= -100
        ) {
          stoneX[i] = -100;
          shuriken[j].x = 1300;
        }
      }
    }
  }

  function hitOSw() {
    for (let i = 0; i < stoneX.length; i++) {
      if (
        180 <= stoneX[i] &&
        stoneX[i] <= 300 &&
        280 <= charY &&
        charY <= 380
      ) {
        stoneX[i] = -100;
      }
    }
  }

  function hitOB() {
    for (let i = 0; i < stoneX.length; i++) {
      for (let j = 0; j < bomb.length; j++) {
        if (
          stoneX[i] <= bomb[j].x &&
          bomb[j].x <= stoneX[i] + 100 &&
          -200 <= bomb[j].y &&
          bomb[j].y <= -100
        ) {
          stoneX[i] = -100;
          bomb[j].y = -100;
        }
      }
    }
  }

  const generationObstance = (tmp) => {
    if (tmp.length === 0) {
      let num = Math.floor(Math.random() * 3);
      for (let i = 0; i < num; ++i) {
        let random = Math.floor(Math.random() * 100) % 60;
        tmp.push(random + tmp.length * (random + 600) + 1200);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (!started) {
      if (!start && e.keyCode === 32) {
        setStart(true);
      }
    } else
      switch (e.keyCode) {
        case 32:
          if (!started && !start) {
            setStart(true);
          }
          if (!jump && charY === 380 && charO !== 0) {
            setJump(true);
          }
          break;
        case 49:
          if (swords) {
            setSword(true);
            hitOSw();
            setTimeout(() => {
              setSword(false);
            }, 500);
            setSwords(swords - 1);
          }

          break;
        case 50:
          if (shurikens) {
            setShuriken(shuriken.push({ x: 180, y: -510 + charY }));
            setShurikens(shurikens - 1);
          }
          break;
        case 51:
          if (bombs) {
            setBomb(
              bomb.push({
                x: 180,
                y: -540 + charY,
                x0: 180,
                y0: -540 + charY,
                t: 0
              })
            );
            setBombs(bombs - 1);
          }
          break;
        case 52:
          if (portals && charO === 1) {
            setPortalIn(true);
            setCharO(0);
            setTimeout(() => {
              setPortalIn(false);
            }, 900);
            setTimeout(() => {
              setPortalOut(true);
              setTimeout(() => {
                setPortalOut(false);
                setCharO(0.5);
                setTimeout(() => {
                  setCharO(1);
                }, 3000);
              }, 900);
            }, 3000);
            setPortals(portals - 1);
          }

          break;
        default:
      }
  };
  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);

    return function cleanup() {
      window.removeEventListener("keypress", handleKeyPress);
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      if (start) {
        setStarted(true);
        setScore(0);
        setStoneX([]);
        setCharY(380);
        setCharO(1);
        setSwords(5);
        setShurikens(5);
        setBombs(5);
        setPortals(5);
        setGiftX(-100);
        setSword(false);
        setShuriken([]);
        setBomb([]);
        setPortalIn(false);
        setPortalOut(false);
        setStart(false);
      }
      if (started) {
        hitOP();
        hitOSh();
        hitOB();
        let level = Math.min(300, Math.floor(score / 100));
        let speed = (600 + level) / fps;
        if (giftX > -100) {
          setGiftX(giftX - speed);
        } else {
          let random = Math.floor(Math.random() * 100);
          if (random === 0) setGiftX(1500);
        }
        let tmp = [];
        stoneX.forEach((x) => {
          if (2 * x + 100 >= speed) tmp.push(x - speed);
        });

        generationObstance(tmp);
        setStoneX(tmp);
        tmp = [];
        shuriken.forEach((el) => {
          if (el.x <= 1300) tmp.push({ x: el.x + 20, y: el.y });
        });
        setShuriken(tmp);
        tmp = [];
        bomb.forEach((el) => {
          if (el.y < -100)
            tmp.push({
              x: 20 * Math.cos(-Math.PI / 4) * el.t + el.x0,
              y: 0.5 * el.t * el.t + 20 * Math.sin(-Math.PI / 4) * el.t + el.y0,
              x0: el.x0,
              y0: el.y0,
              t: el.t + 1
            });
        });
        setBomb(tmp);
        if (charY !== 380 || jump) {
          if (charY === 100) setJump(false);
          if (jump) setCharY(charY - 14);
          else setCharY(charY + 14);
        }
        hitGP();
        setScore(score + 0.1);
      } else {
        if (score >= HScore) {
          setHScore(score)
        }
      }
    }, 1000 / fps );

    return () => clearInterval(id);
  }, [score, start, jump]);




  return (
    <div className="game">
      <div
        style={{
          position: "relative",
          backdropColor: "white",
          top: 10
        }}
      >
        <span className="swords" style={{ left: 50 }} />
        <span
          style={{
            position: "relative",
            top: 5,
            right: 860
          }}
        >
          {zeroPad(swords, 2)}
        </span>
        <span className="shurikens" style={{ left: 150 }} />
        <span
          style={{
            top: 5,
            position: "relative",
            right: 795
          }}
        >
          {zeroPad(shurikens, 2)}
        </span>
        <span className="bombs" style={{ left: 250 }} />
        <span
          style={{
            position: "relative",
            top: 5,
            right: 725
          }}
        >
          {zeroPad(bombs, 2)}
        </span>
        <span className="portals" style={{ left: 350 }} />
        <span
          style={{
            position: "relative",
            top: 5,
            right: 655
          }}
        >
          {zeroPad(portals, 2)}
        </span>
        {/* High score */}
        <span
          style={{
            position: "relative",
            right: 200
          }}
        >
          H:{zeroPad(Math.floor(HScore), 5)}
        </span>
        {/* Present score */}
        <span
          style={{
            position: "relative",
            left: 0
          }}
        >
          {zeroPad(Math.floor(score), 5)}{" "}
        </span>
        {/* Add exit button */}
        {/* <span className="exit-container">
          <Link className="exit-button" to="/homepage" >out!</Link>
        </span> */}
      </div>
      <div
        id="character"
        style={{
          top: charY,
          opacity: charO
        }}
      />

      <div
        style={{
          position: "relative"
        }}
      >
        {stoneX.map((x, index) => (
          <div
            className="stone"
            key={index}
            style={{
              left: x
            }}
          />
        ))}
      </div>
      <div className="platform" />
      <div
        className="gift"
        style={{
          top: -30,
          left: giftX
        }}
      />
      <div className="sun" />
      <div
        className="cloud"
        style={{
          top: -180,
          left: 100
        }}
      />
      <div
        className="cloud"
        style={{
          top: -270,
          left: 450
        }}
      />
      <div
        className="cloud"
        style={{
          top: -300,
          left: 850
        }}
      />
      <div
        style={{
          position: "relative"
        }}
      >
        {sword && (
          <div
            className="sword"
            style={{
              position: "absolute",
              left: 180,
              top: -540 + charY
            }}
          />
        )}
        {shuriken.length > 0 &&
          shuriken.map((el, index) => (
            <div
              className="shuriken"
              key={index}
              style={{
                left: el.x,
                top: el.y
              }}
            />
          ))}
        {bomb.length > 0 &&
          bomb.map((el, index) => (
            <div
              className="bomb"
              key={index}
              style={{
                left: el.x,
                top: el.y
              }}
            />
          ))}
        {portalIn && <div className="portalIn" />}
        {portalOut && <div className="portalOut" />}
      </div>
    </div>
  );
}
