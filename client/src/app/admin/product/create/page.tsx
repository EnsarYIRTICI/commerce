"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import {
  Checkbox,
  Label,
  TextInput,
  Table,
  Textarea,
  Flowbite,
} from "flowbite-react";

import { LuArrowRight } from "react-icons/lu";
import { IoAddCircle } from "react-icons/io5";

import { RiDeleteBin6Line } from "react-icons/ri";
import { navigateProductPage } from "@/lib/utils/navigateUtils";
import { useAuth } from "@/lib/contexts/AuthContext";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, CircleMinus, PencilIcon, Plus } from "lucide-react";
import { Dropdown } from "@/components/Dropdown";
import { useProductCreate } from "@/lib/contexts/ProductCreateContext";
import Dropzone from "@/components/Dropzone";
import ImagePicker from "@/components/ImagePicker";

import { Stepbar, StepbarItem } from "@/components/Stepbar";

import { capitalize } from "@/lib/utils/stringUtils";
import { v4 as uuidv4 } from "uuid";
import { createProduct } from "@/lib/services/product.service";
import { useToast } from "@/lib/contexts/ToastContext";
import { variantSchema } from "@/lib/validators/variantSchema";
import { productSchema } from "@/lib/validators/productSchema";
import {
  CreateProductDto,
  CreateProductVariantDto,
} from "@/lib/dto/createProduct.dto";
import { ToastType } from "@/lib/enum/toast_type.enum";
import { useContent } from "@/lib/contexts/ContentContext";

interface ProductFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string | any | null;
  error?: string;
  area?: boolean;
  dropdown?: {
    data?: any[];
    parent?: {
      name: string;
      value?: any;
    };
  };
}

export default function page() {
  const { user } = useContent();

  const { categories, product_attributes, step, setStep, loading, setLoading } =
    useProductCreate();

  const { addToast } = useToast();

  const [productData, SetProductData] = useState<FormData | null>(null);

  const [productFields, setProductFields] = useState<ProductFieldProps[]>([
    {
      name: "name",
      label: "Name:",
      value: "",
      placeholder: "Product Name",
    },
    {
      name: "description",
      label: "Description:",
      value: "",
      placeholder: "Leave a description...",
      area: true,
    },
    {
      name: "parent_category",
      label: "Category:",
      placeholder: "categories",
      dropdown: {
        data: categories,
      },
    },
    {
      name: "category",
      label: "Sub Category:",
      placeholder: "sub categories",
      dropdown: {
        parent: {
          name: "parent_category",
        },
      },
    },
  ]);

  const steps = [
    {
      text: "Product Information",
      schema: () => true,
    },
    {
      text: "Variant Information",
      schema: () => true,
    },
    {
      text: "Review",
      schema: () => true,
    },
  ];

  const _finish = async () => {
    try {
      if (productData) {
        setLoading(true);

        Array.from(productData.entries()).forEach(([key, value]) => {
          console.log(`${key}:`, value);
        });

        await createProduct(productData);

        window.location.href = "/product";
      }
    } catch (error: any) {
      console.error(error);

      errorToast(error.message);

      setLoading(false);
    }
  };

  const _continue = () => {
    if (steps[step - 1].schema()) {
    }
  };

  const _back = () => {
    setStep((prev) => prev - 1);
  };

  const validateProducts = () => {
    let isValid = true;

    const updatedFields = productFields.map((field) => {
      const fieldName = field.name;

      // Dropdown fields (e.g., category, subcategory)

      if (field.dropdown) {
        if (!field.value) {
          isValid = false;
          return { ...field, error: "This field is required." };
        }
        return { ...field, error: "" };
      }

      // Other fields based on productSchema

      const { error } = productSchema.extract(fieldName).validate(field.value);

      if (error) {
        isValid = false;

        return { ...field, error: error.details[0].message };
      } else {
        return { ...field, error: "" };
      }
    });

    setProductFields(updatedFields);

    return isValid;
  };

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProductFields((prev) =>
      prev.map((f) =>
        f.name === e.target.name
          ? {
              ...f,
              value: e.target.value,
              error: "",
            }
          : f
      )
    );
  };

  const onDropdownSelect = (
    name: string,
    item: any,
    index: number,
    parentValue: any
  ) => {
    setProductFields((prev) =>
      prev.map((f) =>
        f.name === name
          ? {
              ...f,
              dropdown: parentValue
                ? {
                    ...f.dropdown,
                    parent: {
                      ...f.dropdown?.parent!,
                      value: parentValue,
                    },
                  }
                : f.dropdown,
              value: item,
              error: "",
            }
          : f
      )
    );
  };

  function parentValue(field: ProductFieldProps) {
    return productFields.find((f) => f.name === field.dropdown?.parent?.name)
      ?.value;
  }

  const errorToast = (message: string) => {
    addToast(message, ToastType.ERROR);
  };

  const successToast = (message: string) => {
    addToast(message, ToastType.SUCCESS);
  };

  // useEffect(() => {
  //   console.log("categories: ", categories);
  //   console.log("product_attributes: ", product_attributes);
  // }, []);

  return (
    <div className="h-screen w-screen flex">
      <Stepbar>
        {steps.map((node, i) => (
          <StepbarItem key={i} text={node.text} index={i} />
        ))}
      </Stepbar>

      <div className="h-screen flex-1 overflow-y-scroll">
        <div className={`  md:w-[32rem] px-[1.25rem] w-full h-full space-y-8`}>
          <h1 className="pt-8 text-3xl font-bold">Product Information</h1>

          {productFields.map((field, i) =>
            field.dropdown ? (
              <div
                key={i}
                className={
                  field.dropdown.parent
                    ? `transition-all transform duration-300 ${
                        parentValue(field)?.children.length
                          ? "opacity-100"
                          : "opacity-0 max-h-0"
                      }`
                    : ""
                }
              >
                <div className="mb-2 text-sm">{field.label}</div>
                <Dropdown
                  className="shadow-md"
                  name={field.name}
                  parentValue={parentValue(field)}
                  parentPrevValue={field.dropdown.parent?.value}
                  items={
                    field.dropdown.parent
                      ? parentValue(field)?.children
                      : field.dropdown.data
                  }
                  value={field.value?.name ?? ""}
                  placeholder={field.placeholder}
                  onSelect={onDropdownSelect}
                />
                <div className="mt-1 text-sm text-red-400">{field.error}</div>
              </div>
            ) : field.area ? (
              <div key={i}>
                <div className="mb-2 text-sm">{field.label}</div>
                <textarea
                  value={(field.value as string) ?? ""}
                  name={field.name}
                  onChange={onInputChange}
                  className="textarea textarea-bordered w-full text-sm resize-none shadow-md"
                  placeholder={field.placeholder}
                  rows={4}
                />
                <div className="mt-1 text-sm text-red-400">{field.error}</div>
              </div>
            ) : (
              <div key={i}>
                <div className="mb-2 text-sm">{field.label}</div>
                <input
                  className="input input-bordered w-full text-sm shadow-md"
                  value={(field.value as string) ?? ""}
                  name={field.name}
                  onChange={onInputChange}
                  placeholder={field.placeholder}
                />
                <div className="mt-1 text-sm text-red-400">{field.error}</div>
              </div>
            )
          )}
        </div>
      </div>

      <div
        className="w-full absolute bottom-0 bg-white "
        style={{
          boxShadow:
            "0 -2px 20px -0px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className=" md:w-[32rem] md:ml-[24rem] ml-[0rem] py-[1.5rem] px-[1.25rem] w-full flex items-center justify-between ">
          <UnderlineButton disabled={loading} onClick={navigateProductPage}>
            <span>Cancel</span>
          </UnderlineButton>

          <Button disabled={loading} onClick={_continue}>
            <span className="ml-3 mr-3">Continue</span>
            <LuArrowRight size={21} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const Button = ({
  onClick,
  children,
  disabled,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
            flex rounded-2xl bg-slate-700  p-2 text-white text-sm
            border-black border transition-all 
            hover:bg-white hover:text-black
            `}
    >
      {children}
    </button>
  );
};

const UnderlineButton = ({
  onClick,
  children,
  disabled,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="underline underline-offset-2 cursor-pointer hover:text-slate-500 transition-all font-bold"
    >
      {children}
    </button>
  );
};
