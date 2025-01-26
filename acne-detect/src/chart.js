import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {useState} from "react";
import Dropdown from './dropdown';


export default function Chart({title, dat, user}) {

    const [limit, setLimit] = useState(1);


    const [acneCover, setAcneCover] = useState([]);
    const [acneNumber, setAcneNumber] = useState([]);
    const [dates, setDates] = useState([]);
    const [metric, setMetric] = useState("Acne Units");


    const increment = () =>{

        if (limit + 1 <= 5){
            setLimit(limit + 1);
        }
    };

    const decrement = () =>{

        if (limit - 1 > 0){
            setLimit(limit -1);
        }
    };



    const handleClick = async (event) =>{


        console.log("Clicked");


        const response = await fetch(`http://127.0.0.1:8000/get-user-data/${user.uid}/${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {

            console.log("Fetched user data successfully");

            const result = await response.json();

            console.log("API Response:", result);


            if (result.data && Array.isArray(result.data)) {
                const acneData = result.data;

                //0 = ID, 1 = Acne Cells, 2 = Acne Coverage, 3 = Date, 4 = File

                setAcneNumber(acneData.map((item) => item[1]));
                setAcneCover(acneData.map((item) => item[2]));
                setDates(acneData.map((item) => item[3]));
            } else {
                console.error("Unexpected response format: `data` is not an array", result);
                setAcneCover([]);
                setDates([]);
            }

        }


    };


    return (
        <div className="chart">

            <h1>
                {title}
            </h1>

            <div className="chart_container">
                <BarChart

                    yAxis={[
                        {label: metric === 'Acne Units' ? 'Acne Units': 'Acne Cover',},
                    ]}


                    series={[
                        {
                            data: metric === 'Acne Units' ? acneNumber: acneCover,
                            color: metric === 'Acne Units' ? '#304566' : '#376630'
                        },

                    ]}

                    height={290}
                    xAxis={[{
                        data: dates,
                        scaleType: 'band',
                        label: 'Date'
                    },]}
                    margin={{top: 10, bottom: 40, left: 40, right: 35}}
                />


            </div>

            <button className="modButton" onClick={decrement}>

                Decrement

            </button>


            <button className="modButton" onClick={handleClick}>

                Graph

            </button>


            <button className="modButton" onClick={increment}>

                Increment

            </button>

            <h2>
                {limit}/5 Units
            </h2>

            <Dropdown updateMetric={setMetric}/>


        </div>
    );

}