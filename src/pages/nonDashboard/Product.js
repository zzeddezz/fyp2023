import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// components
import Topnav from "../../components/Topnav";
import Footer from "../../components/Footer";

function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const serverUrl = `${process.env.REACT_APP_API_URL}/`;

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/product/allproduct`).then((response) => {
        setData(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const truncateWord = (desc, wordLimit) => {
    const words = desc.split(" ");
    const truncated = words.slice(0, wordLimit).join(" ");

    if (words.length > wordLimit) {
      return truncated + "...";
    }

    return truncated;
  };

  return (
    <div className="w-full justify-center items-center min-h-screen flex flex-col">
      <div className="w-full flex justify-center shadow">
        <div className="container flex flex-col">
          <Topnav />
        </div>
      </div>
      <section className="container flex flex-1 flex-col mt-20">
        <h1 className="text-4xl font-semibold text-primary text-center md:text-start">
          Products
        </h1>
        {loading ? (
          <div className="flex md:flex-row flex-col md:justify-start justify-center items-center flex-wrap gap-10 md:mt-0">
            <Stack className="mt-10" spacing={1}>
              <Skeleton
                variant="rectangular"
                width={288}
                height={320}
                className="rounded-lg"
              />
            </Stack>
            <Stack className="mt-10" spacing={1}>
              <Skeleton
                variant="rectangular"
                width={288}
                height={320}
                className="rounded-lg"
              />
            </Stack>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col md:justify-start justify-center items-center flex-wrap mt-10 md:mt-0">
            {data.length > 0 ? (
              data.map((item) => (
                <a
                  key={item._id}
                  href={`/product/${item._id}`}
                  className="md:py-20 py-10"
                >
                  <div className="w-72 h-80 rounded-lg border-2 border-gray-1 shadow-lg relative md:mr-20 hover:shadow hover:cursor-pointer">
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
        )}
      </section>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Product;
