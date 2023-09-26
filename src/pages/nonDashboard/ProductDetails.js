import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useParams } from "react-router-dom";

// components
import Topnav from "../../components/Topnav";
import Footer from "../../components/Footer";

function ProductDetails() {
  const [formData, setFormData] = useState(new FormData());
  const [successMsg, setSuccessMsg] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();
  const serverURL = "${process.env.REACT_APP_API_URL}/";

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the formData object
    formData.set(name, value);
  };

  const generateRandomKey = () => {
    const keys = uuidv4().substring(0, 8);

    return keys;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingKey = generateRandomKey();
    formData.set("bookingKey", bookingKey.toUpperCase());
    formData.set("productName", data.name);

    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject);

    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/booking`, formDataObject)
        .then((response) => {
          setSuccessMsg(
            "Thank you! Your booking has been sent. Please check your email"
          );
        });
    } catch (error) {}
  };

  return (
    <div className="w-full justify-center items-center min-h-screen flex flex-col">
      <div className="w-full flex justify-center shadow">
        <div className="container flex flex-col">
          <Topnav />
        </div>
      </div>
      <section className="flex flex-col flex-1 justify-center items-center">
        <h1 className="pt-20 font-bold text-primary text-5xl">{data.name}</h1>
        <div className="container flex md:flex-row flex-col justify-between">
          <div className="w-full flex pt-20">
            {data.length > 0 ? (
              <div className="flex md:flex-row flex-col w-full px-8">
                <div className="md:w-1/3 w-full">
                  <img
                    className="w-full h-96 object-cover shadow-lg"
                    src={`${data.images[0].path}`}
                    alt={data.name}
                  />
                </div>
                <div className="md:flex-1 md:pl-60 mt-8 md:mt-0">
                  <div>
                    <h1 className="font-semibold text-primary text-lg">
                      Description
                    </h1>
                    <p className="pt-5 text-md font-gray-2 tracking-wider leading-7">
                      {data.description}
                    </p>
                  </div>
                  <div className="mt-5">
                    <h1 className="font-semibold text-primary text-lg">
                      Length (ft)
                    </h1>
                    <p className="pt-5 text-md font-gray-2 tracking-wider leading-7">
                      Maximum : {data.length}
                    </p>
                  </div>
                  <div className="mt-5">
                    <h1 className="font-semibold text-primary text-lg">
                      Thickness (mm)
                    </h1>
                    <p className="pt-5 text-md font-gray-2 tracking-wider leading-7">
                      Maximum : {data.thickness}
                    </p>
                  </div>
                  <div className="mt-5">
                    <h1 className="font-semibold text-primary text-lg">
                      Materials
                    </h1>
                    <p className="pt-5 text-md font-gray-2 tracking-wider leading-7">
                      {data.materials}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col flex-1 justify-center items-center mt-20">
        <h1 className="py-12 w-full bg-secondary text-center font-bold text-2xl text-primary">
          Book Your Slot
        </h1>
        {successMsg !== "" ? (
          <>
            <p className="mt-10 text-sm font-medium block p-3 rounded bg-secondary text-primary border">
              {successMsg}
            </p>
          </>
        ) : null}
        <form className="md:w-custom-50 w-full flex flex-col justify-center items-start my-10 text-sm px-8 md:px-0">
          <div className="w-full flex flex-col">
            <label className="text-text text-sm font-medium" htmlFor="">
              Name :
            </label>
            <input
              className="border p-2 rounded-md"
              type="text"
              name="name"
              value={formData.get("name")}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex mt-5 flex-col">
            <label className="text-text text-sm font-medium" htmlFor="">
              Email :
            </label>
            <input
              className="border p-2 rounded-md"
              type="text"
              name="email"
              value={formData.get("email")}
              onChange={handleChange}
            />
          </div>
          <div className="w-full my-5 flex flex-col">
            <label className="text-text text-sm font-medium" htmlFor="">
              Phone :
            </label>
            <input
              className="border p-2 rounded-md"
              type="number"
              name="phone"
              value={formData.get("phone")}
              onChange={handleChange}
            />
          </div>
          <div className="w-full mb-5 flex flex-col">
            <label className="text-text text-sm font-medium" htmlFor="">
              Address :
            </label>
            <textarea
              className="border p-2 rounded-md"
              name="address"
              value={formData.get("address")}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="w-full flex flex-col">
            <label className="text-text text-sm font-medium" htmlFor="">
              Booking Date :
            </label>
            <input
              className="border p-2 rounded-md"
              type="date"
              name="booking"
              value={formData.get("booking")}
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full justify-end items-center mt-5 text-sm text-background font-semibold">
            <button
              onClick={handleSubmit}
              className="border px-3 py-2 bg-primary rounded-lg shadow-md hover:shadow"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default ProductDetails;
