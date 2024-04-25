import React, { useState } from "react";
import Input from "../pages/admin/input";
import Button from "../pages/admin/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
export default function CoverCom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      const response = await axios.put(
        "/api/cover/662aac80e56e73290c3cd1d2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response data:", response.data);
      if (response.data) {
        setIsLoading(false);
        toast.success(" Амжилттай нэмэглдээ");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1 className="text-2xl font-semibold my-4"> Cover зураг оруулах</h1>
      <Input
        id="file"
        label="Cover"
        register={register}
        errors={errors}
        required={true}
        type="file"
      />
      <Button
        label={isLoading ? "Уншиж байна" : " Бараа нэмэх"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
}
