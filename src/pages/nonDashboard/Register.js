import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authContext";

// components
import Topnav from "../../components/Topnav";
import Footer from "../../components/Footer";

function Register() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, "Name must be atleast 5 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10, "Phone is not correct")
        .required("Phone is required"),
      password: Yup.string()
        .min(8, "Password must be atleast 8 characters")
        .required("Password is required"),
      cpassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password does not match"
      ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios
          .post(`${process.env.REACT_APP_API_URL}/user`, values)
          .then((response) => {
            setLoading(false);
            setSuccessMsg("Successfully Registered");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="w-full justify-center items-center min-h-screen flex flex-col">
      <div className="w-full flex justify-center shadow">
        <div className="container flex flex-col">
          <Topnav />
        </div>
      </div>
      <section className="flex flex-1 justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="shadow-xl w-96 p-10 rounded-md border-2 border-gray-1"
        >
          <div className="flex flex-col justify-center items-center mb-10">
            <h1 className="text-4xl font-bold text-primary">Register</h1>
            {successMsg !== "" ? (
              <>
                <p className="mt-5 text-sm block p-3 rounded bg-secondary text-primary">
                  {successMsg}
                </p>
              </>
            ) : null}
          </div>
          <div className="flex flex-col mb-5 text-sm">
            <label
              className={`font-semibold ${
                formik.touched.fullName && formik.errors.fullName
                  ? "text-red-danger"
                  : ""
              }`}
              htmlFor=""
            >
              {formik.touched.fullName && formik.errors.fullName
                ? formik.errors.fullName
                : "Full Name"}
            </label>
            <input
              className="p-2 border-2 rounded"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="flex flex-col  mb-5 text-sm">
            <label
              className={`font-semibold ${
                formik.touched.email && formik.errors.email
                  ? "text-red-danger"
                  : ""
              }`}
              htmlFor=""
            >
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "Email"}
            </label>
            <input
              className="p-2 border-2 rounded"
              name="email"
              type="email"
              placeholder="something@something.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="flex flex-col mb-5 text-sm">
            <label
              className={`font-semibold ${
                formik.touched.phone && formik.errors.phone
                  ? "text-red-danger"
                  : ""
              }`}
              htmlFor=""
            >
              {formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : "Phone"}
            </label>
            <input
              className="p-2 border-2 rounded"
              name="phone"
              type="text"
              placeholder="0134567891"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="flex flex-col mb-5 text-sm">
            <label
              className={`font-semibold ${
                formik.touched.password && formik.errors.password
                  ? "text-red-danger"
                  : ""
              }`}
              htmlFor=""
            >
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : "Password"}
            </label>
            <input
              className="p-2 border-2 rounded"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="flex flex-col mb-5 text-sm">
            <label
              className={`font-semibold ${
                formik.touched.cpassword && formik.errors.cpassword
                  ? "text-red-danger"
                  : ""
              }`}
              htmlFor=""
            >
              {formik.touched.cpassword && formik.errors.cpassword
                ? formik.errors.cpassword
                : "Confirm Password"}
            </label>
            <input
              className="p-2 border-2 rounded"
              name="cpassword"
              type="password"
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="flex justify-center items-center">
            {loading ? (
              <button
                type="submit"
                className="px-5 py-2 border shadow-md rounded bg-primary text-background text-sm w-full"
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 border shadow-md rounded bg-primary text-background text-sm w-full"
              >
                Register
              </button>
            )}
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex justify-center items-center">
            <p className="text-sm mr-2">Have an account ? </p>
            <a
              href="/login"
              className="text-sm font-semibold hover:text-primary"
            >
              Sign In
            </a>
          </div>
        </form>
      </section>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Register;
