// JavaScript for Progress Bar
const loaderLine = document.getElementById('loader-line');
const percentageDisplay = document.getElementById('percentage');
const incButton = document.getElementById('inc-btn');
const decButton = document.getElementById('dec-btn');
const resetButton = document.getElementById('reset-btn');

let progress = 0; // Progress percentage
const totalLength = loaderLine.getTotalLength(); // Total length of the SVG path

// Initialize the progress bar
const initializeProgressBar = () => {
    loaderLine.style.strokeDasharray = totalLength; // Set dash array to total path length
    loaderLine.style.strokeDashoffset = totalLength; // Set dash offset to total length (fully hidden)
    percentageDisplay.textContent = `${progress}%`; // Set initial percentage text
};

// Function to update the progress bar and text
const updateProgressBar = () => {
    const offset = totalLength - (progress / 100) * totalLength; // Calculate new offset
    loaderLine.style.strokeDashoffset = offset; // Update offset
    percentageDisplay.textContent = `${progress}%`; // Update percentage text
};

// Event listeners for buttons
incButton.addEventListener('click', () => {
    if (progress < 100) {
        progress += 10; // Increment progress by 10%
        updateProgressBar();
    }
});

decButton.addEventListener('click', () => {
    if (progress > 0) {
        progress -= 10; // Decrement progress by 10%
        updateProgressBar();
    }
});

resetButton.addEventListener('click', () => {
    progress = 0; // Reset progress to 0%
    updateProgressBar();
});

// Initialize the progress bar on page load
initializeProgressBar();
