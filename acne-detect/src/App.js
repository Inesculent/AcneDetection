import './App.css';
import './ProgressBar'
import {ProgressBlock} from "./ProgressBlock";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImageDisplay from "./ImageDisplay";
import app from './firebase';
import { getAuth } from 'firebase/auth';
import GoogleSignInButton from './signInWithGoogle';
const auth = getAuth(app);



function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [constantValue, setConstantValue] = useState("Initial Value");
    const [numberAcne, setNumberAcne] = useState("Initial Value");

    const handleUploadSuccess = () => {
        // Increment the refreshKey to trigger ImageDisplay update
        setRefreshKey((prevKey) => prevKey + 1);
    };
    return (
    <div className="App">

        <div className="header">
            <p>

                <div className={"button-container"}>
                    <GoogleSignInButton/>

                </div>

            </p>
        </div>


        <div className="container">

            <div className="left">
                <h1>Analysis</h1>

                <div className="divider"></div>

                <ProgressBlock progress={numberAcne} title={"Acne Detected"} hasBar ={false}/>


                <ProgressBlock progress={constantValue} title={"Acne Coverage"} hasBar={true}/>
            </div>


            <div className="right">
                <header className="App-header">

                    <div>
                        <ImageUpload updateConstant={setConstantValue} updateValue={setNumberAcne}  onUploadSuccess={handleUploadSuccess}/>
                    </div>

                    <div>
                        <ImageDisplay refreshKey = {refreshKey}/>
                    </div>

                </header>

            </div>
        </div>
    </div>
    );
}

export default App;
