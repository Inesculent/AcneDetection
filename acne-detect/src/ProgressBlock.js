import ProgressBar from "./ProgressBar";
import React, {useState, useEffect} from "react";

export function ProgressBlock({ progress, title, hasBar}) {

    const[color, setColor] = useState("white");

    useEffect(() => {
        if (progress <= 8) {
            setColor("#a5f30a");
        } else if (progress <= 16) {
            setColor("#f3cc0a");
        } else if (progress <= 18) {
            setColor("#e95b0e");
        }
        else {
            setColor("#CD5C5C");
        }
    }, [progress]);

    if (hasBar){
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
    else{
        return (
            <div className="block">

                <div className="block-title" id="name"> {title}</div>
                <div align="middle" className="value-display" id="value" style={{color:color}}>{progress} Units</div>

            </div>


        )
    }

}