import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@material-tailwind/react";
const RegisterForm = ({ method }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = method;

  const password = watch("password");

  return (
    <form className="space-y-6">
      <div>
        <Input
          type="name"
          label="Name"
          {...register("name", {
            rsequired: "Name is required",
            pattern: {
              // value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid name address",
            },
          })}
        />
        {errors?.name && (
          <p className="text-red-600">{errors?.name?.message}</p>
        )}
      </div>
      <div>
        <Input
          type="email"
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors?.email && (
          <p className="text-red-600">{errors?.email?.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors?.password && (
          <p className="text-red-600">{errors?.password.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          label="Verify Password"
          {...register("verifyPassword", {
            required: "Verify Password is required",
            validate: (value) => value === password || "Passwords must match",
          })}
        />
        {errors?.verifyPassword && (
          <p className="text-red-600">{errors?.verifyPassword?.message}</p>
        )}
      </div>
    </form>
  );
};
export default RegisterForm;
