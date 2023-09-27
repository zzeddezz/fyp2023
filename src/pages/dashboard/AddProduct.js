import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import axios from "axios";

// components
import Sidenav from "../../components/Sidenav";
import Footer from "../../components/Footer";
import AddProductModal from "../../components/Modal/addProductModal";

// context
import { useSideNav } from "../../utils/resizeContext";

function AddProduct() {
  const { isOpen, toggleIsOpen } = useSideNav();
  const [images, setImages] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => images.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  // set dropzone
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        setImages(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const thumbs = images.map((file) => (
    <div
      className="inline-flex border rounded-md mb-8 mr-8 w-28 h-28 p-2 box-border"
      key={file.name}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          className="block w-auto h-full"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  // set formik for form data
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

      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/product`, formData)
          .then((response) => {
            setSuccessMsg("New product created!");
            setIsModalOpen(true);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="fixed">
        <Sidenav />
      </div>
      <div
        className={`w-full duration-300 min-h-screen ${
          isOpen === true ? "ml-20" : "ml-60"
        }`}
      >
        <div className="w-full min-h-screen flex flex-col">
          <section className="flex flex-1 flex-col py-5 px-10 text-primary">
            <h1 className="font-medium text-2xl mt-10">Add Product</h1>

            <form
              onSubmit={formik.handleSubmit}
              className="border-4 w-full mt-10 border-gray-1 rounded-md shadow-lg p-10"
            >
              {successMsg !== "" ? (
                <p className="my-5 md:w-1/2 text-sm block p-3 rounded bg-secondary text-primary">
                  {successMsg}
                </p>
              ) : null}
              <div className="mb-5">
                <label
                  className={`block mb-2 font-semibold text-primary ${
                    formik.touched.productName && formik.errors.productName
                      ? "text-red-danger"
                      : ""
                  }`}
                  htmlFor=""
                >
                  {formik.touched.productName && formik.errors.productName
                    ? formik.errors.productName
                    : "Product Name"}
                </label>
                <input
                  className="p-2 md:w-1/2 w-full border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0 "
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
                  className={`block mb-2 font-semibold text-primary ${
                    formik.touched.length && formik.errors.length
                      ? "text-red-danger"
                      : ""
                  }`}
                  htmlFor=""
                >
                  {formik.touched.length && formik.errors.length
                    ? formik.errors.length
                    : "Length (ft)"}
                </label>
                <input
                  className="p-2 md:w-1/2 w-full border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0 "
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
                  className={`block mb-2 font-semibold text-primary ${
                    formik.touched.thickness && formik.errors.thickness
                      ? "text-red-danger"
                      : ""
                  }`}
                  htmlFor=""
                >
                  {formik.touched.thickness && formik.errors.thickness
                    ? formik.errors.thickness
                    : "Thickness (mm)"}
                </label>
                <input
                  className="p-2 md:w-1/2 w-full border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0 "
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
                  className={`block mb-2 font-semibold text-primary ${
                    formik.touched.material && formik.errors.material
                      ? "text-red-danger"
                      : ""
                  }`}
                  htmlFor=""
                >
                  {formik.touched.material && formik.errors.material
                    ? formik.errors.material
                    : "Material"}
                </label>
                <input
                  className="p-2 md:w-1/2 w-full border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0 "
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
                  className={`block mb-2 font-semibold text-primary ${
                    formik.touched.description && formik.errors.description
                      ? "text-red-danger"
                      : ""
                  }`}
                  htmlFor=""
                >
                  {formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : "Description"}
                </label>
                <textarea
                  className="p-2 md:w-1/2 w-full border-2 border-gray-2 rounded focus:border-2 focus:border-primary focus:outline-0"
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
                <section className="md:w-1/2 w-full">
                  <div
                    className={`flex flex-1 flex-col items-center p-10 border-2 border-dotted rounded-md cursor-pointer  ${
                      isFocused
                        ? "border-gray-2"
                        : isDragAccept
                        ? "border-green-success"
                        : isDragReject
                        ? "border-red-danger"
                        : ""
                    } `}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop files here</p>
                  </div>
                  <aside className="flex flex-row flex-wrap mt-10">
                    {thumbs}
                  </aside>
                </section>
              </div>

              <div className="flex justify-start items-center">
                <button
                  type="submit"
                  className="px-5 py-2 border border-r-4 border-b-4 shadow-md rounded bg-secondary text-background text-sm text-primary md:w-1/2 w-full hover:bg-primary hover:text-background hover:border-primary transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
          {isModalOpen && (
            <AddProductModal open={isModalOpen} clickClose={closeModal} />
          )}
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
