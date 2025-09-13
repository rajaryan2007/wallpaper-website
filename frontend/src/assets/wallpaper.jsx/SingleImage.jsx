import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("authToken");

  const fetchSingleImage = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/image/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Error fetching single image");
        return;
      }

      const result = await response.json();
      setImage(result);
    } catch (error) {
      console.log("Unable to get image", error);
    }
  };

  useEffect(() => {
    fetchSingleImage();
  }, [id]);

  return (
    <div className="s">
      {image ? (
        <div className="bg-white p-4 shadow rounded">
          <img
            src={image.image.url}
            alt="single"
            className="w-500 h-auto rounded"
          />
          <p className="mt-2 text-gray-600">
            Uploaded at: {new Date(image.image.createdAt).toLocaleString()}
          </p>
          <a
            href={image.download}
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </a>
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default SingleImage;
