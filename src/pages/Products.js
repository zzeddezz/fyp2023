import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get("https://us-central1-booking-system-fyp.cloudfunctions.net/server/product/allproduct").then((response) => {
        setData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const truncateWord = (desc, wordLimit) => {
    console.log(desc)
    const words = desc.split(" ");
    const truncated = words.slice(0, wordLimit).join(" ");

    if (words.length > wordLimit) {
      return truncated + "...";
    }

    return truncated;
  };

  return (
    <div className="w-full flex justify-center h-rm-nav">
      <div className="container flex flex-wrap">
        {data.length > 0 ? (
          data.map((item) => (
            <a key={item._id} href={`/product/${item._id}`} className="py-20">
              <div className="w-72 h-80 rounded-lg border-2 border-gray-1 shadow-lg relative mr-20 hover:shadow hover:cursor-pointer">
                <div className="w-72 bg-secondary h-48 rounded-lg absolute -top-6 -left-6 ">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={`${item.images[0].path} `}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col items-start p-5 mt-40">
                  <h1 className="font-semibold text-xl text-accent block">
                    {item.name}
                  </h1>
                  <p className="text-sm text-text text-start mt-2.5 block ">
                    {truncateWord(item.description, 10)}
                  </p>
                </div>
                <div className="border-t border-accent flex justify-center items-center h-10">
                  <p className="text-sm font-bold text-primary">
                    Click for more info!
                  </p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="w-full flex justify-center items-center p-60">
            <p>No Product at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
