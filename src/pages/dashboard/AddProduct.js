import React, { useState } from "react";
import Sidenav from "../../components/Sidenav";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import axios from "axios";

function AddProduct() {
  const [images, setImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      length: "",
      thickness: "",
      material: "",
      description: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      length: Yup.number().required("Length is required"),
      thickness: Yup.number().required("Thickness is required"),
      material: Yup.string().required("Material is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("productName", values.productName);
      formData.append("length", values.length);
      formData.append("thickness", values.thickness);
      formData.append("material", values.material);
      formData.append("description", values.description);
      images.forEach((image) => {
        formData.append("images", image);
      });

      // const data = {};
      // for (let [key, value] of formData.entries()) {
      //   data[key] = value;
      // }
      // console.log(data);

      try {
        await axios
          .post("https://us-central1-booking-system-fyp.cloudfunctions.net/server/product", formData)
          .then((response) => {
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="w-full flex min-h-screen justify-center">
      <div className="w-48 flex flex-col">
        <Sidenav />
      </div>
      <div className="flex-1 justify-center items-center">
        <div className="px-20 py-12">
          <h1 className="font-medium text-2xl text-primary">Add Product</h1>
          <div className="flex justify-center items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="border-4 w-full mt-10 border-gray-1 rounded-md shadow-lg p-10"
            >
              <div className="mb-5">
                <label
                  className="block mb-2 font-semibold text-primary"
                  htmlFor=""
                >
                  Product Name
                </label>
                <input
                  className="p-2 w-1/2 border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0 "
                  type="text"
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Patio Awning"
                />
              </div>

              <div className="mb-5">
                <label
                  className="block mb-2 font-semibold text-primary"
                  htmlFor=""
                >
                  Length (ft)
                </label>
                <input
                  className="p-2 w-1/2 border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0 "
                  type="text"
                  name="length"
                  value={formik.values.length}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="20ft"
                />
              </div>

              <div className="mb-5">
                <label
                  className="block mb-2 font-semibold text-primary"
                  htmlFor=""
                >
                  Thickness (mm)
                </label>
                <input
                  className="p-2 w-1/2 border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0 "
                  type="text"
                  name="thickness"
                  value={formik.values.thickness}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="4mm"
                />
              </div>

              <div className="mb-5">
                <label
                  className="block mb-2 font-semibold text-primary"
                  htmlFor=""
                >
                  Material
                </label>
                <input
                  className="p-2 w-1/2 border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0 "
                  type="text"
                  name="material"
                  value={formik.values.material}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Metal"
                />
              </div>

              <div className="mb-5">
                <label
                  className="block mb-2 font-semibold text-primary"
                  htmlFor=""
                >
                  Description
                </label>
                <textarea
                  className="p-2 w-1/2 border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Description of the product"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>

              <div className="mb-5">
                <label
                  className="block mb-2 font-semibold text-primary"
                  htmlFor=""
                >
                  Product Image
                </label>
                <Dropzone
                  onDrop={(acceptedFiles) => setImages(acceptedFiles)}
                  multiple
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="flex items-center justify-center w-1/2 shadow rounded-md border-2 border-dotted border-gray-2 cursor-pointer hover:bg-gray-1">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="px-10 py-20">Drag 'n' drop files here</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>

              <div className="flex justify-start items-center">
                <button
                  type="submit"
                  className="px-5 py-2 border border-r-4 border-b-4 shadow-md rounded bg-secondary text-background text-sm text-primary w-1/2 hover:bg-primary hover:text-background hover:border-primary transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
