import React, { useState } from "react";
import Navbar from "../../components/navbar";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false); // cooldown state
  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    
    setDisabled(true);
    setTimeout(() => setDisabled(false), 4000);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/api/image/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);

      if (data.status) {
        alert("Image uploaded successfully!");
        setFile(null);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        >
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15a4 4 0 014-4h1m6 0h1a4 4 0 014 4v5H3v-5zM7 10l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            <p className="mt-2 text-gray-600">
              {file ? file.name : "Click or drag an image here to upload"}
            </p>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <button
            type="submit"
            disabled={disabled}
            className={`mt-6 w-full px-4 py-2 rounded transition ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {disabled ? "Please wait..." : "Upload Image"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
