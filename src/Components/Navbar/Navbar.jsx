import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [battery, setBattery] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());

      if ("getBattery" in navigator) {
        navigator.getBattery().then((battery) => {
          setBattery(Math.round(battery.level * 100));

          battery.onLevelChange = () => {
            setBattery(Math.round(battery.level * 100));
          };
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav>
        <div className="nav-left">
          <div className="time">
            {time} <span className="dot"></span>
          </div>
        </div>
        <div className="cam"><div className="inner-cam"></div></div>
        <div className="nav-right">
          <i className="fa fa-wifi"></i>{" "}
          {battery === 100 ? (
            <>
              <i className="fa fa-battery-full" style={{ color: "green" }}></i>{" "}
              {battery}
            </>
          ) : battery > 60 ? (
            <>
              <i className="fa fa-battery-three-quarters"></i> {battery}
            </>
          ) : battery > 40 ? (
            <>
              <i className="fa fa-battery-half"></i> {battery}
            </>
          ) : (
            <>
              <i className="fa fa-battery-empty" style={{ color: "red" }}></i>{" "}
              {battery}
            </>
          )}
          %
        </div>
      </nav>
    </>
  );
}

export default Navbar;
