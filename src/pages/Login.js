import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");

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
    <div className="w-full h-rm-nav flex justify-center items-center">
      <div className="container flex flex-col justify-center items-center p-20">
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
      </div>
    </div>
  );
}

export default Login;
