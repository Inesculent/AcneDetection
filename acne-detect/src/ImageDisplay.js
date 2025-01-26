import React, { useEffect, useState } from "react";

// To display an image from the backend
const ImageDisplay = ({ refreshKey }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchImage = async () => {
            try {
                console.log(refreshKey);
                const response = await fetch(`http://127.0.0.1:8000/get-image/?file_path=${encodeURIComponent(refreshKey)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    console.log("Fetched image successfully", refreshKey)
                    const imageBlob = await response.blob();
                    const imageObjectURL = URL.createObjectURL(imageBlob);
                    if (isMounted) {
                        setImageUrl(imageObjectURL); // Update state only if mounted
                    }
                } else {
                    console.error("Failed to fetch the image");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        //Fetch the image
        fetchImage();

        return () => {
            isMounted = false; // Clean up on unmount to avoid setting state
        };
    }, [refreshKey]); // Re-run when refreshKey changes

    return (
        <div style={{textAlign: "center"}}>
            <h1>Image Display</h1>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Fetched from backend"
                    style={{maxWidth: "100%", height: "auto"}}
                />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ImageDisplay;
