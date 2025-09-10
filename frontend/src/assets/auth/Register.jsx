

import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      // fetch to data with post and get register 
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("register failed");
      }

      const data = await response.json();

      // saving token in localstorage
      if (data.status==true){
        console.log("register compepte go to login page ");
        
      }else {
        console.log("register fail may u allready have register or ur cardentical are wrong ");
        
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-2"
            {...register("username", { required: "Username is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        
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

export default Register;
