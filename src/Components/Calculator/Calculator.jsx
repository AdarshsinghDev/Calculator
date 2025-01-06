import React, { useEffect, useState } from "react";
import "./Calculator.css";
import Navabar from "../Navbar/Navbar";
import click from "../../assets/click.mp3";
import icon from "../../assets/icon.png";

function Calculator() {
  const [buttonValue, setButtonValue] = useState("");
  const sound = new Audio(click);
  const [slide, setSlide] = useState(() => {
    return localStorage.getItem("slide") === "true";
  });

  sound.preload = "auto";

  const handleButtonClick = (event) => {
    // Click sound effect
    if (event.target.classList.contains("click-sound")) {
      sound.currentTime = 0;
      sound.play();
    }

    const value = event.target.innerHTML;

    if (value === "=") {
      // the button value to add '*' where needed
      let expression = buttonValue;

      // Add '*' before opening parentheses if there's a number before it
      expression = expression.replace(/(\d)(\()/g, "$1*$2");

      try {
        // Eval the expression
        const result = eval(expression);
        setButtonValue(result.toString());
      } catch (error) {
        setButtonValue("Error");
      }
    } else {
      setButtonValue((prevValue) => prevValue + value);
    }

    if (document.getElementById("currentnum").value === "Error") {
      setButtonValue("");
    }
  };

  const slideBtn = () => {
    const newSlideState = !slide;
    setSlide(newSlideState);
    localStorage.setItem("slide", newSlideState);

    if (newSlideState) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedSlideState = localStorage.getItem("slide") === "true";

    setSlide(savedSlideState);
    if (savedSlideState) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <div className="main">
      <div className="inner-main">
        <div className="mode">
          <div className="mode-cont">
            <div
              className={`mode-circle ${slide ? "right" : "left"}`}
              onClick={slideBtn}
            ></div>
          </div>
        </div>
        <div className="box">
          <Navabar />
          <div className="box-cont">
            <div className="main-input">
              <input type="text" value={buttonValue} readOnly id="currentnum" placeholder="Enter Number" />
            </div>
            <div className="btn-cont">
              <div className="row row1">
                <button
                  className="btn-dark click-sound"
                  onClick={() =>
                    setButtonValue((prevValue) => prevValue.slice(0, -1))
                  }
                >
                  <i className="material-icons" style={{fontSize:'16px'}}>backspace</i>
                </button>
                <div style={{ width: "40px" }} className="logo-img">
                  <a href="https://adarshsinghdev.vercel.app/" target="_blank">
                    {" "}
                    <img style={{ width: "100%" }} src={icon} alt="" />
                  </a>
                </div>
                <button
                  className="btn-dark click-sound highlight-btn"
                  onClick={() => setButtonValue("")}
                >
                  C
                </button>
              </div>
              <div className="row row2">
                <button
                  className="btn-dark click-sound"
                  onClick={handleButtonClick}
                >
                  (
                </button>
                <button
                  className="btn-dark click-sound"
                  onClick={handleButtonClick}
                >
                  )
                </button>
                <button
                  className="btn-dark click-sound"
                  onClick={handleButtonClick}
                >
                  %
                </button>
                <button
                  className="btn-dark click-sound"
                  onClick={handleButtonClick}
                >
                  /
                </button>
              </div>
              <div className="row row3">
                <button className="click-sound" onClick={handleButtonClick}>
                  7
                </button>
                <button className="click-sound" onClick={handleButtonClick}>
                  8
                </button>
                <button className="click-sound" onClick={handleButtonClick}>
                  9
                </button>
                <button
                  className="btn-dark click-sound"
                  onClick={handleButtonClick}
                >
                  *
                </button>
              </div>
              <div className="row row4">
                <button className="click-sound" onClick={handleButtonClick}>
                  4
                </button>
                <button className="click-sound" onClick={handleButtonClick}>
                  5
                </button>
                <button className="click-sound" onClick={handleButtonClick}>
                  6
                </button>
                <button
                  className="btn-dark click-sound"
                  onClick={handleButtonClick}
                >
                  -
                </button>
              </div>
              <div className="row row5">
                <button className="click-sound" onClick={handleButtonClick}>
                  1
                </button>
                <button className="click-sound" onClick={handleButtonClick}>
                  2
                </button>
                <button className="click-sound" onClick={handleButtonClick}>
                  3
                </button>
                <button
                  className="btn-dark click-sound"
                  onClick={handleButtonClick}
                >
                  +
                </button>
              </div>
              <div className="row row6">
                <button className="click-sound" onClick={handleButtonClick}>
                  00
                </button>
                <button className="click-sound" onClick={handleButtonClick}>
                  0
                </button>
                <button className="click-sound" onClick={handleButtonClick}>
                  .
                </button>
                <button
                  className="btn-dark click-sound highlight-btn"
                  onClick={handleButtonClick}
                >
                  =
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
