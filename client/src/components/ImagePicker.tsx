import React, { useEffect, useRef } from "react";
import { IoAddCircle } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ImagePicker({
  value,
  onChange,
  onDelete,
}: Readonly<{
  value?: File[];
  onChange: (files: File[]) => void;
  onDelete: (index: number) => void;
}>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const deleteImage = (index: number) => {
    onDelete(index);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const files = e.target.files;

      const filesArray = Array.from(files);
      onChange(filesArray);

      e.target.value = "";
    }
  };

  return (
    <div className="w-full overflow-x-scroll overflow-y-hidden border border-slate-300 rounded-md">
      <input
        ref={fileInputRef}
        onChange={onFileInputChange}
        type="file"
        hidden
        multiple
      />

      <div className="w-full h-[5rem] flex">
        {value?.map((image, i) => (
          <ImageItem key={i} file={image} onDelete={() => deleteImage(i)} />
        ))}

        <div className="h-[5rem] w-[5rem] flex-shrink-0  flex items-center justify-center">
          <button
            onClick={filePicker}
            className="rounded-md border border-dashed border-slate-400 h-[4rem] w-[4rem] flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all"
          >
            <IoAddCircle size={23} className="text-slate-500 " />
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageItem({
  file,
  onDelete,
}: Readonly<{ file: File; onDelete: () => void }>) {
  const imageRef = useRef<HTMLImageElement>(null);

  const readImageFile = () => {
    if (file instanceof Blob) {
      const fr = new FileReader();

      fr.onload = (e) => {
        if (
          imageRef.current &&
          e.target &&
          typeof e.target.result === "string"
        ) {
          imageRef.current.src = e.target.result;
        }
      };

      fr.readAsDataURL(file);
    } else {
      console.error("The provided file is not of type Blob.");
    }
  };

  useEffect(() => {
    readImageFile();
  }, [file, imageRef.current]);

  return (
    <div className="h-[5rem] w-[5rem] flex items-center justify-center flex-shrink-0">
      <div
        onClick={onDelete}
        className="h-[4rem] w-[4rem] flex items-center justify-center group relative cursor-pointer"
      >
        <img
          ref={imageRef}
          className="w-full h-full object-cover rounded-md hover:brightness-75 transition-all "
        />

        <RiDeleteBin6Line className="absolute invisible group-hover:visible text-white pointer-events-none" />
      </div>
    </div>
  );
}
