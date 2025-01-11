import logo from './128px-Black_Sun.svg.png';
import './App.css';
import './ProgressBar'
import ProgressBar from "./ProgressBar";
import {ProgressBlock} from "./ProgressBlock";
import React, { useState } from "react";


let progress = 80;

let progress2 = 40;

function App() {
  return (
    <div className="App">

        <div className="container">

            <div className="left">
                <h1>Analysis</h1>

                <div className="divider"></div>

                <ProgressBlock progress={progress} title={"Acne Detected"}/>


                <ProgressBlock progress={progress2} title={"Acne Coverage"}/>
            </div>

            <div className="right">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn Redact
                    </a>
                </header>

            </div>
        </div>


    </div>
  );
}

export default App;
