import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './input';
import Button from './button';

export default function Admin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='w-full flex justify-center mt-20'>
            <div className='w-500'>
                <h1 className='text-2xl font-semibold my-4'>
                    Бараа нэмэх
                </h1>
                <Input
                    id="name"
                    label="Нэр"
                    register={register}
                    errors={errors}
                    required
                    type="text"
                />
                <Input
                    id="brand"
                    label="Бренд"
                    register={register}
                    errors={errors}
                    required
                    type="text"
                />
                <Input
                    id="category"
                    label="Категори"
                    register={register}
                    errors={errors}
                    required
                    type="text"
                />
                <Input
                    id="file"
                    label="Файл"
                    register={register}
                    errors={errors}
                    required
                    type="file"
                />
                <Button label="Бараа нэмэх" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
}
