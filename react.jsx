import React, { useState } from "react";
import ProgressBar from "./acne-detect/src/ProgressBar";

const App = () => {
    const [progress, setProgress] = useState(50); // Initial progress set to 50%

    return (
        <div style={{ padding: "20px" }}>
            <h1>SVG Progress Bar</h1>
            <ProgressBar progress={progress} />

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setProgress(Math.max(progress - 10, 0))}>
                    Decrease
                </button>
                <button onClick={() => setProgress(Math.min(progress + 10, 100))}>
                    Increase
                </button>
                <button onClick={() => setProgress(0)}>Reset</button>
            </div>
        </div>
    );
};

export default App;
