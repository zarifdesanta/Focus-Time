import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { MdPlayArrow, MdStop, MdReplay } from "react-icons/md";
import { preDefTimes as timeButtonList } from "../helper/ButonList";
import Button from "../components/Button";
import Footer from "../components/Footer";

function Home() {
  var [curSec, setCurSec] = useState(0);
  var [targetSec, setTragetSec] = useState(0);
  const [startFlag, setStartFlag] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isReseted, setIsReseted] = useState(true);

  const [hour, setHour] = useState("0" + 0);
  const [minute, setMinute] = useState("0" + 0);
  var [second, setSecond] = useState("0" + 0);

  //method to start countdown
  const startTimer = () => {
    setCurSec(targetSec);
    if (targetSec > 0) {
      setStartFlag(true);
      setIsDisabled(true);
      setIsReseted(false);
      if (targetSec <= 60) {
        setSecond(("0" + targetSec).slice(-2));
      } else {
        setSecond(60);
      }
      console.log(startFlag);
    } else {
      console.log(startFlag);
    }
  };

  //method to convert second to h:m:s
  const calculateTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const min = Math.floor((sec % 3600) / 60);
    setHour(("0" + h).slice(-2));
    setMinute(("0" + min).slice(-2));
    if (second <= 0 && startFlag) {
      setSecond(60);
    } else if (!startFlag) {
      if (sec > 60) {
        setSecond("0" + 0);
      } else {
        setSecond(("0" + sec).slice(-2));
      }
    } else if (second > 0 && startFlag) {
      second -= 1;
      setSecond(("0" + second).slice(-2));
    }
  };

  //method to update time; used in useEffect hooked -> every second interval
  const updateTimer = () => {
    if (startFlag) {
      curSec -= 1;
      setCurSec(curSec);

      calculateTime(curSec);
    }
  };

  //method to set Target time
  const handleSetTargetSec = (targetTime) => {
    calculateTime(targetTime);
    setTragetSec(targetTime);
  };

  const resetTimer = () => {
    setCurSec(0);
    setTragetSec(0);
    setStartFlag(false);
    setIsDisabled(false);
    setIsReseted(true);
    setHour("0" + 0);
    setMinute("0" + 0);
    setSecond("0" + 0);
  };

  const stopTimer = () => {
    setStartFlag(false);
  };

  //handle progress ui (classNames)
  const handleProgress = (classNameStart, classNameGeneral) => {
    if (startFlag) {
      //need to implement time based class
      for (let i = 0; i < timeButtonList.length; i++) {
        if (targetSec === timeButtonList[i].time) {
          return classNameStart + " " + timeButtonList[i].className;
        }
      }
      /*
      if (targetSec === timeButtonList[0]) {
        return classNameStart + " progress-5s";
      } else if (targetSec === timeButtonList[1]) {
        return classNameStart + " progress-1h";
      } else if (targetSec === timeButtonList[2]) {
        return classNameStart + " progress-15h";
      } else if (targetSec === timeButtonList[3]) {
        return classNameStart + " progress-2h";
      }*/
    } else if (!startFlag && !isReseted) {
      targetSec = 0;
      return classNameStart;
    } else {
      return classNameGeneral;
    }
  };

  //start and reset button disable state
  const handleDisableIconColor = () => {
    if (startFlag) {
      return "#88adb2";
    } else {
      return "#1f2728";
    }
  };

  //make particles amount list
  const ParticlesList = (amount = 7) => {
    let tmp = [];
    for (let i = 0; i < amount; i++) {
      tmp.push(i);
    }
    return tmp;
  };

  /* Depricated -> a modular method exists
  const handleSpinProgress = () => {
    if (startFlag) {
      //need to implement time based class
      if (targetSec === timeButtonList[0]) {
        return "spinner-bar start-spin-anim progress-30m";
      } else if (targetSec === timeButtonList[1]) {
        return "spinner-bar start-spin-anim progress-1h";
      } else if (targetSec === timeButtonList[2]) {
        return "spinner-bar start-spin-anim progress-15h";
      } else if (targetSec === timeButtonList[3]) {
        return "spinner-bar start-spin-anim progress-2h";
      }
    } else if (!startFlag && !isReseted) {
      return "spinner-bar start-spin-anim";
    } else {
      return "spinner-bar";
    }
  };

  const handleBgProgress = () => {
    if (startFlag) {
      //need to implement time based class
      if (targetSec === timeButtonList[0]) {
        return "body-wrapper-bg body-wrapper-bg-dark-start progress-30m";
      } else if (targetSec === timeButtonList[1]) {
        return "body-wrapper-bg body-wrapper-bg-dark-start progress-1h";
      } else if (targetSec === timeButtonList[2]) {
        return "body-wrapper-bg body-wrapper-bg-dark-start progress-15h";
      } else if (targetSec === timeButtonList[3]) {
        return "body-wrapper-bg body-wrapper-bg-dark-start progress-2h";
      }
    } else if (!startFlag && !isReseted) {
      targetSec = 0;
      return "body-wrapper-bg body-wrapper-bg-dark-start";
    } else {
      return "body-wrapper-bg body-wrapper-bg-dark-end";
    }
  };
  
  const handleProgressBar = () => {
    if (startFlag) {
      if (targetSec === timeButtonList[0]) {
        return "progress-start progress-30m";
      } else if (targetSec === timeButtonList[1]) {
        return "progress-start progress-1h";
      } else if (targetSec === timeButtonList[2]) {
        return "progress-start progress-15h";
      } else if (targetSec === timeButtonList[3]) {
        return "progress-start progress-2h";
      }
    }
  };*/

  useEffect(() => {
    if (curSec > 0) {
      const interval = setInterval(() => updateTimer(), 1000);

      return () => clearInterval(interval);
    } else {
      setStartFlag(false);
    }
  });

  //---Components---

  //----------------

  return (
    <div
      className={handleProgress(
        "body-wrapper-bg body-wrapper-bg-dark-start",
        "body-wrapper-bg body-wrapper-bg-dark-end"
      )}
    >
      <div
        className={
          //depricated for now
          startFlag
            ? "#body-wrapper-progress-start"
            : "#body-wrapper-progress-end"
        }
      ></div>
      <div className="particle-layer">
        {ParticlesList(8).map((i) => {
          return <div className="particle"></div>;
        })}
        {/**
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
         */}
      </div>
      <div className="body-wrapper-fg">
        {/*<h3 className="timer-text shadow">{curSec}</h3>*/}
        <h4 className="timer-text shadow">
          {hour}:{minute}:{second}
        </h4>

        {/** 
        <div className="progress-bar shadow">
          <div className={handleProgress("progress-start")}></div>
        </div>
        */}

        <div
          className={handleProgress(
            "spinner-bar start-spin-anim",
            "spinner-bar"
          )}
        >
          <button
            disabled={startFlag ? true : false}
            className={"primary-btn"}
            onClick={() => startTimer()}
            autoFocus={false}
          >
            <div className={startFlag ? "p-btn-anim" : ""}>
              <MdPlayArrow
                style={{
                  color: handleDisableIconColor(),
                  height: "80px",
                  width: "80px",
                }}
              ></MdPlayArrow>
            </div>
          </button>
        </div>

        <div className="secondery-btn-grid ">
          <button
            className="secondery-btn-circle shadow"
            onClick={() => stopTimer()}
          >
            <MdStop
              style={{ color: "#1f2728", height: "50px", width: "50px" }}
            ></MdStop>
          </button>
          <button
            className="secondery-btn-circle shadow"
            disabled={!startFlag ? false : true}
            onClick={() => resetTimer()}
          >
            <MdReplay
              style={{
                color: handleDisableIconColor(),
                height: "50px",
                width: "50px",
              }}
            ></MdReplay>
          </button>
        </div>
        <div className="time-btn-grid">
          {timeButtonList.map((item) => {
            return (
              <Button
                name={item.name}
                time={item.time}
                className="time-btn-circle shadow"
                oncClickMethod={() => handleSetTargetSec(item.time)}
                disabled={isDisabled}
              ></Button>
            );
          })}

          {/**
          <button
            className="time-btn-circle shadow"
            disabled={isDisabled}
            onClick={() => handleSetTargetSec(timeButtonList[0])}
          >
            5S
          </button>
          <button
            className="time-btn-circle shadow"
            disabled={isDisabled}
            onClick={() => handleSetTargetSec(timeButtonList[1])}
          >
            1H
          </button>
          <button
            className="time-btn-circle shadow"
            disabled={isDisabled}
            onClick={() => handleSetTargetSec(timeButtonList[2])}
          >
            1.5H
          </button>
          <button
            className="time-btn-circle shadow"
            disabled={isDisabled}
            onClick={() => handleSetTargetSec(timeButtonList[3])}
          >
            2H
          </button>
           */}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
