import ProgressBar from "./ProgressBar";
import React, {useState} from "react";

export function ProgressBlock({ progress, title}) {

    return (
        <div className="block">

            <div className="block-title" id="name"> {title}</div>
            <div align="left" className="percentage-display" id="percentage">{progress}%</div>

            <div className="bar">
                <ProgressBar progress={progress}/>

            </div>

        </div>


    )
}