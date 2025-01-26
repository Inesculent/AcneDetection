import React, { useRef, useState, useEffect } from "react";

const ProgressBar = ({ progress }) => {
    const svgRef = useRef(null);
    const [pathLength, setPathLength] = useState(400); // Default path length

    let barStyle = 'gray'

    // Simple logic for dynamic coloring of bar
    if (progress < .5){
        barStyle = '#a5f30a';
    }
    else if (progress < 1){
        barStyle = '#f3cc0a';
    }
    else if (progress < 1.5){
        barStyle = '#e95b0e';
    }
    else{
        barStyle = '#CD5C5C';
    }

    useEffect(() => {
        if (svgRef.current) {
            // Dynamically calculate path length based on container width
            const containerWidth = svgRef.current.offsetWidth;
            setPathLength(containerWidth - 10); // Subtracting a small margin for padding
        }


        const handleResize = () => {
            if (svgRef.current) {
                const containerWidth = svgRef.current.offsetWidth;
                setPathLength(containerWidth - 10);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const svgStyle = {
        width: "100%",
        height: "8px",
    };
    // Calculate offset based on progress (log scale)
    const dashOffset = pathLength - (Math.log(progress + 1) / Math.log(progress + 10)) * pathLength;


    return (
        <div ref={svgRef} style={{ width: "100%" }}>
            <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg">
                {/* Background path */}
                <path
                    d={`M4 4 L${pathLength} 4`}
                    style={{
                        stroke: "#e0e0e0",
                        strokeLinecap: "round",
                        strokeWidth: "8",
                        fill: "none",
                    }}
                />
                {/* Foreground path (progress indicator) */}
                <path
                    d={`M4 4 L${pathLength} 4`}
                    style={{
                        stroke: barStyle,
                        strokeLinecap: "round",
                        strokeWidth: "8",
                        fill: "none",
                        strokeDasharray: pathLength,
                        strokeDashoffset: dashOffset,
                        transition: "stroke-dashoffset 0.3s ease-in-out",
                    }}
                />
            </svg>
        </div>
    );
};

export default ProgressBar;
