import React from "react";

import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

import { LoginDto } from "@/lib/dto/login.dto";

export interface FormFieldProps {
  key: string;
  placeholder: string;
  type?: string;
  label: string;
}

export default function FormInput({
  field,
  register,
  errors,
}: Readonly<{
  field: FormFieldProps;
  register: UseFormRegister<LoginDto>;
  errors: FieldErrors<LoginDto>;
}>) {
  return (
    <div key={field.key} className="flex flex-col">
      <label className="mb-2" htmlFor={field.key}>
        {field.label}
      </label>

      <input
        className="input input-bordered"
        type={field.type}
        placeholder={field.placeholder}
        {...register(field.key as Path<LoginDto>)}
      />

      {errors[field.key as keyof FieldErrors<LoginDto>] && (
        <p className="text-red-400 text-sm mt-1">
          {String(errors[field.key as keyof FieldErrors<LoginDto>]!.message)}
        </p>
      )}
    </div>
  );
}
