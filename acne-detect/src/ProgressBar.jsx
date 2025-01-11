import React, { useRef, useState, useEffect } from "react";

const ProgressBar = ({ progress }) => {
    const svgRef = useRef(null);
    const [pathLength, setPathLength] = useState(400); // Default path length

    useEffect(() => {
        if (svgRef.current) {
            // Dynamically calculate path length based on container width
            const containerWidth = svgRef.current.offsetWidth;
            setPathLength(containerWidth - 10); // Subtracting a small margin for padding
        }

        // Optional: Update on window resize for responsiveness
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

    const dashOffset = pathLength - (progress / 100) * pathLength; // Calculate offset based on progress

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
                        stroke: "#538ac4",
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
