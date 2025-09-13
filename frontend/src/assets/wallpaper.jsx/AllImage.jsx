import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../../components/navbar";
const AllImage = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const token = localStorage.getItem("authToken");

  const fetchAllImage = async (page = 1) => {
    try {
      const response = await fetch(
        `https://wallpaper-website-eta.vercel.app/api/image/All-image?page=${page}&limit=6`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("some error in response");
        return;
      }

      const data = await response.json();
      setImages(data.data); 
      setTotalPage(data.totalPage);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log(error);
      alert("unable to get image from backend");
    }
  };

  useEffect(() => {
    fetchAllImage(currentPage);
  }, [currentPage]);

  return (
    
    <div className="p-4">
      <Navbar/>
     

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-4">
        {images.length > 0 &&
          images.map((img) => (
            <div key={img._id} className="border p-2">
              <Link to={`/image/${img._id}`}>
                <img
                  src={img.url}
                  alt="uploaded"
                  className="w-full h-100 object-cover cursor-pointer"
                />
              </Link>
            </div>
          ))}
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPage}
        </span>

        <button
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllImage;
