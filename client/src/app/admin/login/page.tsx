"use client";

import Joi from "joi";

import { useState } from "react";

import { FieldErrors, Path, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { loginSchema } from "@/lib/validators/loginSchema";

import FormInput from "@/components/FormInput";
import { authLogin } from "@/lib/services/auth.service";
import { LoginDto } from "@/lib/dto/login.dto";

import Image from "next/image";

import backgroundImage from "@/lib/assets/images/shape-bg.jpg";

export default function page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (formData: LoginDto) => {
    try {
      await authLogin(formData);

      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);

      alert(error);
    }
  });

  const formFields = [
    {
      key: "email",
      label: "Email",
      placeholder: "Email",
    },
    {
      key: "password",
      label: "Password",
      placeholder: "Password",
      type: "password",
    },
  ];

  return (
    <div className="w-screen h-screen flex">
      <div className="md:w-6/12 w-full h-full flex items-center justify-center">
        <div className="w-[20rem]">
          <h1 className="text-2xl mb-5">Login</h1>

          <div className="flex max-w-md flex-col gap-4">
            {formFields.map((field) => (
              <FormInput
                key={field.key}
                errors={errors}
                register={register}
                field={field}
              />
            ))}

            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button
              className="btn btn-outline"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="md:visible invisible flex-1">
        <Image
          className="w-full h-full object-cover"
          src={backgroundImage}
          alt="image"
        />
      </div>
    </div>
  );
}
