"use client";

import { useProductCreate } from "@/lib/contexts/ProductCreateContext";
import React, { ReactNode, useState } from "react";

import {
  Checkbox,
  Label,
  TextInput,
  Table,
  Textarea,
  Flowbite,
} from "flowbite-react";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, CircleMinus, PencilIcon, Plus } from "lucide-react";
import { Dropdown } from "@/components/Dropdown";
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

interface VariantFieldGroupProps {
  id: string;
  fields: VariantFieldProps[];
}

interface VariantFieldProps {
  id?: number;
  name: string;
  label?: string;
  dropzoneVisible?: boolean;
  placeholder?: string;
  value: string | File[] | any;
  error?: string;
  type?: string;
  dropdown?: {
    data: any[];
  };
}

export default function page() {
  const { categories, product_attributes, step, setStep, loading, setLoading } =
    useProductCreate();

  const [variantGroupDraft, setVariantGroupDraft] = useState([
    {
      name: "image",
      label: "Images:",
      value: [],
      dropzoneVisible: false,
    },
    {
      name: "name",
      label: "Name:",
      placeholder: "ex. 256GB Red",
      value: "",
    },
    {
      name: "sku",
      label: "Sku:",
      placeholder: "ex. HJ3453534",
      value: "",
    },
    {
      name: "stock",
      label: "Stock:",
      placeholder: "ex. 12",
      value: "",
      type: "number",
    },
    {
      name: "price",
      label: "Price: $",
      placeholder: "ex. 15",
      value: "",
      type: "number",
    },
  ]);

  const [variantFieldGroups, setVariantFieldGroups] = useState<
    VariantFieldGroupProps[]
  >([
    {
      id: uuidv4(),
      fields: variantGroupDraft,
    },
  ]);

  const validateVariants = () => {
    let isValid = true;

    const updatedGroups = variantFieldGroups.map((group) => {
      const updatedFields = group.fields.map((field) => {
        const fieldName = field.name.split(":")[0];

        // Image field

        if (fieldName === "image") {
          if (
            !field.value ||
            (Array.isArray(field.value) && field.value.length === 0)
          ) {
            isValid = false;
            return { ...field, error: "At least one image is required." };
          }

          const invalidFiles = (field.value as File[]).filter((file) => {
            const isValidType = [
              "image/jpeg",
              "image/png",
              "image/gif",
            ].includes(file.type);
            const isValidSize = file.size <= 2 * 1024 * 1024; // 2 MB
            return !isValidType || !isValidSize;
          });

          if (invalidFiles.length > 0) {
            isValid = false;
            return {
              ...field,
              error: "Images must be JPEG, PNG, or GIF, and less than 2 MB.",
            };
          }

          return { ...field, error: "" };
        }

        // Dropdown fields

        if (field.dropdown) {
          if (!field.value) {
            isValid = false;
            return { ...field, error: "This field is required." };
          }
          return { ...field, error: "" };
        }

        // Other fields

        const { error } = variantSchema
          .extract(fieldName)
          .validate(field.value);

        if (error) {
          isValid = false;

          return { ...field, error: error.details[0].message };
        } else {
          return { ...field, error: "" };
        }
      });

      return { ...group, fields: updatedFields };
    });

    setVariantFieldGroups(updatedGroups);

    return isValid;
  };

  const addAnotherVariant = () => {
    setVariantFieldGroups((prev) => {
      return [
        ...prev,
        {
          id: uuidv4(),
          fields: variantGroupDraft,
        },
      ];
    });
  };

  const onVariantGroupDelete = (groupId: string) => {
    setVariantFieldGroups((prev) =>
      prev.filter((group) => group.id !== groupId)
    );
  };

  const onVariantGroupInputChange = (
    groupId: string,
    fieldName: string,
    value: string | File[]
  ) => {
    toggleDropzone(groupId, false);

    setVariantFieldGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.map((f) =>
                f.name === fieldName
                  ? {
                      ...f,
                      value,

                      error: "",
                    }
                  : f
              ),
            }
          : group
      )
    );
  };

  const onVariantGroupFieldDelete = (groupId: string, fieldName: string) => {
    setVariantFieldGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.filter((field) => field.name !== fieldName),
            }
          : group
      )
    );
  };

  const onVariantImageDelete = (groupId: string, index: number) => {
    setVariantFieldGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.map((field) =>
                field.name === "image"
                  ? {
                      ...field,
                      value: (field.value as File[]).filter(
                        (_, i) => i !== index
                      ),
                    }
                  : field
              ),
            }
          : group
      )
    );
  };

  const onVariantGroupDropdownSelect = (
    item: any,
    groupId: string,
    fieldName: string
  ) => {
    setVariantFieldGroups((prevGroup) =>
      prevGroup.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.map((f) =>
                f.name === fieldName
                  ? {
                      ...f,
                      value: item,
                    }
                  : f
              ),
            }
          : group
      )
    );
  };

  const onVariantGroupAttributeSelect = (item: any, groupId: string) => {
    setVariantFieldGroups((prevGroup) =>
      prevGroup.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: [
                ...group.fields,
                {
                  name: item.name,
                  value: "",
                  dropdown: {
                    data: item.values,
                  },
                },
              ],
            }
          : group
      )
    );
  };

  const toggleDropzone = (groupId: string, state: boolean) => {
    setVariantFieldGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.map((field) =>
                field.name === "image"
                  ? { ...field, dropzoneVisible: state }
                  : field
              ),
            }
          : group
      )
    );
  };

  return (
    <div>
      <>
        <h1 className="pt-8 text-3xl font-bold">Variant Information</h1>

        {variantFieldGroups.map((fieldGroup, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-xl border border-slate-300 shadow-md"
          >
            <div className="mt-4 mb-4 md:w-[28rem] w-11/12 font-medium flex justify-between">
              <span>Variant: {i + 1}</span>

              {i > 0 && (
                <CircleMinus
                  onClick={() => {
                    onVariantGroupDelete(fieldGroup.id);
                  }}
                  size={20}
                  className="text-red-500 hover:text-red-300 transition-all cursor-pointer"
                />
              )}
            </div>

            {fieldGroup.fields.map((field, i) =>
              field.name === "image" ? (
                <div
                  className="md:w-[28rem] w-11/12 mb-4"
                  key={i}
                  onDragOver={() => toggleDropzone(fieldGroup.id, true)}
                  onDragLeave={() => toggleDropzone(fieldGroup.id, false)}
                >
                  <div className="mb-2 pointer-events-none text-sm">
                    {field.label}
                  </div>

                  {field.dropzoneVisible ? (
                    <Dropzone
                      onDrop={(files) =>
                        onVariantGroupInputChange(
                          fieldGroup.id,
                          field.name,
                          files
                        )
                      }
                    />
                  ) : (
                    <ImagePicker
                      value={field.value as File[]}
                      onDelete={(index) =>
                        onVariantImageDelete(fieldGroup.id, index)
                      }
                      onChange={(files) =>
                        onVariantGroupInputChange(
                          fieldGroup.id,
                          field.name,
                          files
                        )
                      }
                    />
                  )}

                  <div className="mt-1 text-sm text-red-400">{field.error}</div>
                </div>
              ) : field.dropdown ? (
                <div key={i} className="md:w-[28rem] w-11/12 mb-4">
                  <div className="mb-2 text-sm">
                    {field.label
                      ? `${field.label}:`
                      : `${capitalize(field.name)}:`}
                  </div>

                  <div className="flex items-center">
                    <Dropdown
                      name={field.name}
                      items={field.dropdown.data}
                      onSelect={(name, item, index) => {
                        onVariantGroupDropdownSelect(
                          item,
                          fieldGroup.id,
                          field.name
                        );
                      }}
                      value={field.value.name as string}
                      placeholder={field.name}
                    />

                    <CircleMinus
                      onClick={() => {
                        onVariantGroupFieldDelete(fieldGroup.id, field.name);
                      }}
                      size={20}
                      className="ml-2 hover:text-slate-500 transition-all cursor-pointer"
                    />
                  </div>

                  <div className="mt-1 text-sm text-red-400">{field.error}</div>
                </div>
              ) : (
                <div key={i} className="md:w-[28rem] w-11/12 mb-4">
                  <div className="mb-2 text-sm">
                    {field.label ? field.label : capitalize(field.name)}
                  </div>
                  <input
                    type={field.type}
                    value={typeof field.value == "string" ? field.value : ""}
                    onChange={(e) => {
                      onVariantGroupInputChange(
                        fieldGroup.id,
                        field.name,
                        e.target.value
                      );
                    }}
                    className="input input-bordered w-full text-sm"
                    placeholder={field.placeholder}
                  />
                  <div className="mt-1 text-sm text-red-400">{field.error}</div>
                </div>
              )
            )}

            <div className="md:w-[28rem] w-11/12 mb-4 flex justify-end">
              <Dropdown
                name={"attributes"}
                items={product_attributes.filter(
                  (attr) =>
                    !fieldGroup.fields.some(
                      (f) => f.dropdown && f.name === attr.name
                    )
                )}
                disabled={
                  product_attributes.filter(
                    (attr) =>
                      !fieldGroup.fields.some(
                        (f) => f.dropdown && f.name === attr.name
                      )
                  ).length < 1
                }
                onSelect={(name, item, index) => {
                  onVariantGroupAttributeSelect(item, fieldGroup.id);
                }}
                placeholder="Attributes"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addAnotherVariant}
          className="flex text-blue-500  hover:text-blue-300 text-sm cursor-pointer transition-all"
        >
          <Plus className="mr-2" size={18} />

          <span>Add Another Variant</span>
        </button>

        <div className="pb-[6rem]"></div>
      </>

      <div
        className="w-full absolute bottom-0 bg-white "
        style={{
          boxShadow:
            "0 -2px 20px -0px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className=" md:w-[32rem] md:ml-[24rem] ml-[0rem] py-[1.5rem] px-[1.25rem] w-full flex items-center justify-between ">
          <UnderlineButton disabled={loading}>
            <span>Back</span>
          </UnderlineButton>

          <Button disabled={loading}>
            <span className="ml-3 mr-3">Finish</span>
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
