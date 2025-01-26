import './App.css';
import './ProgressBar'
import {ProgressBlock} from "./ProgressBlock";
import React, {useEffect, useState} from "react";
import ImageUpload from "./ImageUpload";
import ImageDisplay from "./ImageDisplay";
import app from './firebase';
import {getAuth} from 'firebase/auth';
import Buttons from './signInWithGoogle';
import Chart from './chart'

const auth = getAuth(app);

const {GoogleSignInButton, GoogleSignOutButton} = Buttons;





function App() {
    const [refreshKey, setRefreshKey] = useState(null);
    const [constantValue, setConstantValue] = useState("Initial Value");
    const [numberAcne, setNumberAcne] = useState("Initial Value");
    const [user, setUser] = useState(null);
    const label = user ? `Signed In as ${user.displayName}` : "Not Signed In";


    // Request to addData to SQL
    function addData(){
        console.log("addData function called.");
        const date = new Date();

        const payload = {
            acne_cells: numberAcne,
            acne_coverage: constantValue,
            date: date.toISOString(), // Use ISO format for dates
            user_id: user.uid,
            filename: refreshKey,
        };

        console.log("Payload being sent:", payload);

        return fetch(`http://127.0.0.1:8000/update-database/`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        }).then((response) => {

            if (!response.ok) {
                throw new Error(`Error! ${response.status}`);
            }

            console.log("Added successfully!!!");

            return response.json()
        });
    }

    // Authenticates a user based on Firebase UID
    async function authenticate() {

        const getUrl = `http://127.0.0.1:8000/authenticate/${user.uid}`;
        try {
            const response = await fetch(getUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error("Error during authentication verification:", error);
        }
    }

    // Adds a user to the database
    async function add_user(){
        const postUrl = `http://127.0.0.1:8000/update-user/`;

        const response = await fetch(postUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.uid,        // Updated key to match AddUser model
                email: user.email,       // Email field
                name: user.displayName,  // Name field
            }),
        });

        if (response.ok){
            console.log("Added user successfully!!!");

            return await response.json();
        }

    }


    // When we add a new image, we need to update the display, refreshKey triggers the change
    const handleUploadSuccess = async (im_path) => {
        // Increment the refreshKey to trigger ImageDisplay update
        console.log("New path");
        setRefreshKey(im_path);
        console.log(im_path);

    };

    // We need async here such that this triggers only when we successfully update values for Acne
    useEffect(() => {
        const verifyAndAppend = async () => {
            if (user !== null) {

                try {
                    const data = await authenticate()

                    if (data === true) {
                        console.log("Authentication verified. Proceeding...");
                        // Add the new data
                        await addData();
                    }
                    else {
                        console.log("Attempting to add user to database");

                        await add_user();

                        const verify = await authenticate();

                        if (verify === true) {
                            // Add the new data
                            await addData();
                        }
                    }
                } catch (error) {
                    console.error("Error during authentication verification:", error);
                }
            }
        };

        if (constantValue !== "Initial Value" && numberAcne !== "Initial Value") {
            verifyAndAppend();
        }
    }, [constantValue, numberAcne]);



    return (
    <div className="App">

        <div className={"button-container"}>
            <GoogleSignInButton updateUser={setUser} />

            {user && (
                <div>
                    <h3>User: {user.displayName}</h3>
                </div>
            )}

        </div>


        <div className="container">

            <div className="left">
                <h1>Analysis</h1>

                <div className="divider"></div>

                <ProgressBlock progress={numberAcne} title={"Acne Detected"} hasBar ={false}/>


                <ProgressBlock progress={constantValue} title={"Acne Coverage"} hasBar={true}/>

                <Chart title={label} dat={[1,2,3,10]} user={user}/>
            </div>


            <div className="right">
                <header className="App-header">
                    <div>
                        <ImageUpload updateConstant={setConstantValue} updateValue={setNumberAcne}
                                     onUploadSuccess={handleUploadSuccess}/>
                    </div>

                    <div className="divider"></div>

                    <div>
                        <ImageDisplay refreshKey={refreshKey}/>
                    </div>
                </header>
            </div>
        </div>
    </div>
    );
}

export default App;
