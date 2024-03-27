import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './input';
import Button from './button';
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
export default function Admin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log(data)
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("brand", data.brand);
            formData.append("category", data.category);
            formData.append("description", data.description);
            formData.append("file", data.file[0]);

            const response = await axios.post('/api/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

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
        <div className='w-full flex justify-center mt-20'>
            <ToastContainer />
            <div className='w-500'>
                <h1 className='text-2xl font-semibold my-4'>
                    Бараа нэмэх
                </h1>
                <Input
                    id="name"
                    label="Нэр"
                    register={register}
                    errors={errors}
                    required={true}
                    type="text"
                />
                <Input
                    id="brand"
                    label="Бренд"
                    register={register}
                    errors={errors}
                    required={true}
                    type="text"
                />
                <Input
                    id="category"
                    label="Категори"
                    register={register}
                    errors={errors}
                    required={true}
                    type="text"
                />
                <Input
                    id="description"
                    label="Тайлбар"
                    register={register}
                    errors={errors}
                    required={true}
                    type="text"
                />
                <Input
                    id="file"
                    label="Файл"
                    register={register}
                    errors={errors}
                    required={true}
                    type="file"
                />
                <Button label={isLoading ? "Уншиж байна" : " Бараа нэмэх"} onClick={handleSubmit(onSubmit)} />

            </div>
        </div>
    );
}
