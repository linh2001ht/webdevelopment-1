import React, { useEffect, useState } from "react";
import "./game.css";

const zeroPad = (num, places) => String(num).padStart(places, "0");

export default function Game() {
  const fps = 60;
  const [start, setStart] = useState(false);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [HScore, setHScore] = useState(0);
  const [stoneX, setStoneX] = useState([]);
  const [itemX, setItemX] = useState(-30);
  const [swords, setSwords] = useState(0);
  const [shurikens, setShurikens] = useState(0);
  const [booms, setBooms] = useState(0);
  const [portals, setPortals] = useState(0);
  const [charY, setCharY] = useState(380);
  const [jump, setJump] = useState(false);
  const handleKeyPress = (e) => {
    switch (e.keyCode) {
      case 32:
        if (!started && !start) {
          setStart(true);
        }
        if (!jump && charY === 380) {
          setJump(true);
        }
        break;
      case 49:
        if (swords) setSwords(swords - 1);
        break;
      case 50:
        if (shurikens) setShurikens(shurikens - 1);
        break;
      case 51:
        if (booms) setBooms(booms - 1);
        break;
      case 52:
        if (portals) setBooms(portals - 1);
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
        setSwords(0);
        setShurikens(0);
        setBooms(0);
        setPortals(0);
        setItemX(-100);
        setStart(false);
      }
      if (started) {
        stoneX.forEach((x) => {
          if (x >= 100 && x <= 200 && charY >= 280) {
            setStarted(false);
          }
        });
        let level = Math.min(200, Math.floor(score / 100));
        let speed = (600 + level) / fps;
        if (itemX > -100) {
          setItemX(itemX - speed);
        } else {
          let random = Math.floor(Math.random() * 100);
          if (random === 0) setItemX(1500);
        }
        let tmp = [];
        stoneX.forEach((x) => {
          if (2 * x + 100 >= speed) tmp.push(x - speed);
        });

        if (tmp.length === 0) {
          let num = Math.floor(Math.random() * 3);
          for (let i = 0; i < num; ++i) {
            let random = Math.floor(Math.random() * 100) % 60;
            tmp.push(random + tmp.length * (random + 600) + 1200);
          }
        }
        setStoneX(tmp);
        if (charY !== 380 || jump) {
          if (charY === 100) setJump(false);
          if (jump) setCharY(charY - 14);
          else setCharY(charY + 14);
        }
        if (itemX >= 100 && itemX <= 200 && charY <= 200) {
          setItemX(-100);
          const n = Math.floor(Math.random() * 4);
          switch (n) {
            case 0:
              setSwords(swords + 1);
              break;
            case 1:
              setShurikens(shurikens + 1);
              break;
            case 2:
              setBooms(booms + 1);
              break;
            case 3:
              setPortals(portals + 1);
              break;
            default:
              break;
          }
        }
        setScore(score + 0.1);
      } else {
        if (score >= HScore) setHScore(score);
      }
    }, 1000 / fps);

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
        <span className="sword" style={{ left: 50 }} />
        <span
          style={{
            position: "relative",
            top: 5,
            right: 830
          }}
        >
          {zeroPad(swords, 2)}
        </span>
        <span className="shuriken" style={{ left: 150 }} />
        <span
          style={{
            top: 5,
            position: "relative",
            right: 770
          }}
        >
          {zeroPad(shurikens, 2)}
        </span>
        <span className="boom" style={{ left: 250 }} />
        <span
          style={{
            position: "relative",
            top: 5,
            right: 710
          }}
        >
          {zeroPad(booms, 2)}
        </span>
        <span className="portal" style={{ left: 350 }} />
        <span
          style={{
            position: "relative",
            top: 5,
            right: 645
          }}
        >
          {zeroPad(portals, 2)}
        </span>
        <span
          style={{
            position: "relative",
            right: 200
          }}
        >
          H:{zeroPad(Math.floor(HScore), 5)}
        </span>
        <span
          style={{
            position: "relative",
            left: 0
          }}
        >
          {zeroPad(Math.floor(score), 5)}{" "}
        </span>
      </div>
      <div
        id="character"
        style={{
          top: charY
        }}
      />

      <div
        style={{
          position: "relative"
        }}
      >
        {stoneX.map((x) => (
          <div
            className="stone"
            key={x}
            style={{
              left: x
            }}
          />
        ))}
      </div>
      <div className="platform" />
      <div
        className="item"
        style={{
          top: -30,
          left: itemX
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
    </div>
  );
}
