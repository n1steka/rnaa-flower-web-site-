"use client";
import React from "react";


const Input = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors,
}) => {
    return (
        <div className="w-full relative">
            <input
                autoComplete="off"
                id={id}
                type={type}
                placeholder=""
                disabled={disabled}
                {...register?.(id, { required })}
                className={`
                    pear w-full p-4 pt-6 outline-none by-whitefont-light border-2
                    rounded-md transition
                    disabled:opacity-70 disabled:cursor-not-allowed my-2
                    ${errors && errors[id] ? 'border-rose-400' : 'border-slate-300'}
                    ${errors && errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}
                `}
            />

            <label
                className={`absolute cursor-text duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                htmlFor={id}
            >
                {label}
            </label>
            {
                <p>
                    {errors && errors[id] ? label + " " + "Хоосон байж болохгүй" : ""}
                </p>
            }
        </div>
    );
};

export default Input;
