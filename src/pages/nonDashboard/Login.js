import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authContext";

// components
import Topnav from "../../components/Topnav";
import Footer from "../../components/Footer";

function Login() {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  // handle useFormik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/user/login`, {
            params: values,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);

            if (response.data.token) {
              setSuccessMsg("Successfully Login");
              setTimeout(() => {
                navigate("/");
              }, 2000);
            }
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
            <h1 className="text-4xl font-bold text-primary">Login</h1>
            {successMsg !== "" ? (
              <>
                <p className="mt-5 text-sm block p-3 rounded bg-secondary text-primary">
                  {successMsg}
                </p>
              </>
            ) : null}
          </div>

          <div className="flex flex-col  mb-5 text-sm">
            <label className="font-semibold" htmlFor="">
              Email
            </label>
            <input
              className="p-2 border-2 rounded"
              name="email"
              type="email"
              placeholder="something@something.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex flex-col mb-5 text-sm">
            <label className="font-semibold" htmlFor="">
              Password
            </label>
            <input
              className="p-2 border-2 rounded"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex justify-between items-center">
            <a href="/#" className="text-xs font-semibold hover:text-primary">
              forgot password?
            </a>
            <button
              type="submit"
              className="px-5 py-2 border shadow-md rounded bg-primary text-background text-sm"
            >
              Login
            </button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex justify-center items-center">
            <p className="text-sm mr-2">Don't have an account ? </p>
            <a
              href="/register"
              className="text-sm font-semibold hover:text-primary"
            >
              Sign up
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

export default Login;
