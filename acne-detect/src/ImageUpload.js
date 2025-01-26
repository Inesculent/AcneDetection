import React, { useState } from "react";




const ImageUpload = ({ updateConstant , updateValue, onUploadSuccess}) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    // Handle file upload
    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedImage) {
            setUploadStatus("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
            console.log("Trying")
            const response = await fetch("http://127.0.0.1:8000/upload-image/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {

                const result = await response.json();
                setUploadStatus(`Upload successful: ${result.number}`);
                updateValue(result.number)
                updateConstant(result.cover)
                onUploadSuccess(result.file_path);



            } else {
                setUploadStatus("Upload failed. Please try again.");
            }
        } catch (error) {
            console.log(error)
            setUploadStatus("An error occurred while uploading the image.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h1>Image Upload</h1>

            {/* Image Preview */}
            {previewUrl && (
                <div>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{ width: "100%", height: "auto", marginBottom: "20px" }}
                    />
                </div>
            )}

            {/* File Input and Upload Button */}
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: "20px" }}
                />
                <button type="submit" style={{ display: "block", margin: "0 auto" }}>
                    Upload
                </button>
            </form>

            {/* Upload Status */}
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default ImageUpload;
