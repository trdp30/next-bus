import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import {auth} from "../../utils/firebase"
import { auth } from "../utils/firebase";
import { useForm } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import logo from "../assets/logo.png";
const Login = () => {
  const [data, setData] = React.useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  console.log("data", data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({ defaultValues: initialValues });
  const onSubmit = (data) => {
    console.log("email", data?.email);
    console.log("password", data?.password);
    signInWithEmailAndPassword(auth, data?.email, data?.password)
      .then((userCredential) => {
        setData(userCredential);
        console.log("userCredential", userCredential);
      })
      .catch((errors) => console.error(errors));
  };
  // const email = watch('password');
  // const password = watch('password');

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="w-96 border-2 shadow-xl p-4 rounded-lg">
        <img
          src={logo}
          alt="logo"
          className="w-full h-auto items-center mb-5 rounded-lg"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <p className="text-red-600 text-xs">{errors?.email?.message}</p>
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
              <p className="text-red-600 text-xs">{errors?.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="h-10 w-full bg-blue-400 text-white rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
