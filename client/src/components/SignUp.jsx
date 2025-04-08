import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {useNavigate} from "react-router-dom"

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // const navigate= useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("submitting to server");
      const response =await axios.post("http://localhost:8000/api/user/signup",data);

      if (response.status===200) {
        toast.success("User registered successfully", {autoClose: 1200});
        // setTimeout(()=>navigate("/home"),1300)

      } else {
        toast.error("Something went wrong. Try again",{autoClose: 1200});
      }

    } catch (error) {
      toast.error(error?.response?.data?.msg ||"Registration failed",{autoClose:1200});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Sign Up to NewsVerse
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Username</label>
            <input
              type="text"
              {...register("userName", {
                required: "Username is required",
                minLength: {
                  value: 2,
                  message: "Username should be minimum 2 characters",
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.userName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              {...register("userEmail", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.userEmail ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors.userEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.userEmail.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              {...register("userPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters",
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.userPassword ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors.userPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.userPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
