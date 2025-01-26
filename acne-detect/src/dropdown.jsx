import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

//Dropdown to switch between Acne Units and Acne Coverage
const Dropdown = ({updateMetric}) => {
    const [selectedMetric, setSelectedMetric] = useState('Acne Units'); // Default value

    const handleChange = (event) => {
        updateMetric(event.target.value);
        setSelectedMetric(event.target.value);
        console.log('Selected metric:', event.target.value);

    };

    return (
        <FormControl className="drop"
            style={{
                minWidth: 200,
                margin: '10px',
            }}

            // Written with help of AI (Not super familiar with this library)
            sx={{
             color: 'white', // For the FormControl container
             '& .MuiInputLabel-root': {
                 color: 'white', // Label color
             },
             '& .MuiInputLabel-root.Mui-focused': {
                 color: 'white', // Label color when focused
             },
             '& .MuiSelect-root': {
                 color: 'white', // Selected value color
             },
             '& .MuiOutlinedInput-notchedOutline': {
                 borderColor: 'white', // Outline color
             },
             '&:hover .MuiOutlinedInput-notchedOutline': {
                 borderColor: 'lightgray', // Outline color on hover
             },
             '& .MuiSelect-icon': {
                 color: 'white', // Dropdown arrow color
             },
             '& .MuiMenuItem-root': {
                 color: 'white', // Menu item text color
                 backgroundColor: 'black', // Menu background color
             },
             '& .MuiMenuItem-root:hover': {
                 backgroundColor: 'gray', // Menu item hover background
             },
            }}
        >


            <InputLabel id="metric-selector-label">Select Metric</InputLabel>
            <Select
                labelId="metric-selector-label"
                value={selectedMetric}
                onChange={handleChange}
            >
                <MenuItem value="Acne Units">Acne Units</MenuItem>
                <MenuItem value="Acne Coverage">Acne Coverage</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Dropdown;
