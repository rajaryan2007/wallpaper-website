import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

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
        alert("login successful ");
      } else {
        alert("no token received ");
      }
    } catch (error) {
      console.error(error);
      alert("something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded border px-3 py-2"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>


        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded border px-3 py-2"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
