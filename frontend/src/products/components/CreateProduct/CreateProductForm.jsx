import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/20/solid";

import FormField from "src/shared/components/FormField";
import ChoiceField from "src/shared/components/ChoiceField";
import commonConstants from "src/products/constants/CommonConstants";
import TextArea from "src/shared/components/TextArea";
import FileField from "src/shared/components/FileField";

const { categories } = commonConstants;

const CreateProductForm = () => {
  const { watch, setValue, resetField } = useFormContext();
  const imageUrl = useMemo(() => watch("image-url"), [watch("image-url")]);

  const handleClearImage = () => {
    setValue("image-url", "", { shouldValidate: true });
    resetField("image");
  };

  return (
    <div>
      <ChoiceField
        label="Category"
        name="category"
        choices={categories}
        required
      />
      <FormField
        name="title"
        placeholder="Enter title"
        label="Title"
        type="text"
        required
      />
      <TextArea
        name="description"
        placeholder="Enter description"
        label="Description"
        type="text"
        rows={5}
        required
      />
      <FormField
        name="price"
        placeholder="Enter Price"
        label="Price"
        type="number"
        required
      />
      <FileField
        name="image"
        label="Upload Image"
        accept="image/png, image/jpeg"
        required
      />
      {/* image preview  */}
      {imageUrl && (
        <div className="relative border rounded-md p-2">
          <button
            className="absolute top-3 right-3 rounded-full h-5 w-5 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-opacity-75 text-white shadow-md"
            type="button"
            onClick={handleClearImage}
          >
            <XMarkIcon />
          </button>
          <img
            className="object-contain max-h-80 mx-auto rounded-md"
            src={imageUrl}
            alt="product"
          />
        </div>
      )}
    </div>
  );
};

export default CreateProductForm;
