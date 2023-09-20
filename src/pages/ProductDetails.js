import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const [formData, setFormData] = useState(new FormData());
  const [data, setData] = useState([]);
  const { id } = useParams();

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
          console.log(response);
        });
    } catch (error) {}
  };

  console.log(data);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="pt-20 font-bold text-primary text-5xl">{data.name}</h1>
      <div className="container flex flex-row justify-between">
        <div className="w-full h-rm-nav flex pt-20">
          {data.length > 0 ? (
            <div className="flex flex-row w-full">
              <div className="w-1/3 ">
                <img
                  className="w-full h-96 object-cover shadow-lg"
                  src={`${data.images[0].path}`}
                  alt={data.name}
                />
              </div>
              <div className="flex-1 pl-60">
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

      {/* book section */}
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="py-12 w-full bg-secondary text-center font-bold text-2xl text-primary">
          Book your slot
        </h1>
        <form className="w-custom-50 flex flex-col justify-center items-start my-20 text-sm">
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
      </div>
    </div>
  );
}

export default ProductDetails;

{
  /* <img src={`${serverURL + data.images[0].path}`} alt={data.name} /> */
}
