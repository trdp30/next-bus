import React, { useState } from "react";
import RegisterForm from "../Forms/RegisterForm";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

function Register() {
  const method = useForm()
const onSubmit = (data) => {
  console.log("Form data submitted:", data);
 };

  return (
    <div className="flex justify-center items-center my-10">
      <Card className="basis-96">
        <Typography variant="h5" className="text-center mt-2 text-[#06b6d4]">
          Register
        </Typography>
        <div className="flex space-x-2 px-4 mt-2">
          <div
            className="flex-1 border-[1px] border-[#06b6d4] flex flex-col items-center 
          justify-center cursor-pointer overflow-hidden"
          >
            <img
              src="./user.png"
              alt="userImage"
              className="scale-105 hover:scale-100 transition-all object-cover"
            />
            <p className="text-center font-semibold">User</p>
          </div>
          <div className="flex-1 border-[1px] border-[#06b6d4] flex flex-col items-center justify-center cursor-pointer">
            <img
              src="./vehicle.png"
              alt="userImage"
              className="p-2 scale-105 hover:scale-100 transition-all object-cover"
            />
            <p className="text-center font-semibold">Vehicle</p>
          </div>
        </div>
        <Typography
          variant="paragraph"
          className="text-center mt-2 text-gray-400"
        >
          Hello user ! <br />{" "}
          <span>Please fill out the form below to get started</span>
        </Typography>
        <CardBody className="flex flex-col gap-4">
        <RegisterForm  method={method} />
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <Typography variant="small" className="text-gray-400 font-medium">
            NO ACCOUNT ? <span className="text-[#06b6d4]">SIGN UP</span>{" "}
          </Typography>
          <Button className="bg-[#06b6d4]" onClick={method.handleSubmit(onSubmit)}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
