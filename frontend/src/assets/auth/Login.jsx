import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

const onSubmit = async (formData) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("backend response:", data);

    if (data.acesstoken) {
      
      localStorage.setItem("authToken", data.acesstoken);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful ");

      
      if (data.user.role === "admin") {
        navigate("/upload"); 
      } else {
        navigate("/all-image");
      }
    } else {
      alert("No token received ");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded border px-3 py-2"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded border px-3 py-2"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>

        <button
          className="w-full mt-3 bg-blue-400 rounded p-2"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
