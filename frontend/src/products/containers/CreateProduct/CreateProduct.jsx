import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CategorySelector from "src/products/components/CreateProduct/CategorySelector";
import CreateProductForm from "src/products/components/CreateProduct/CreateProductForm";
import commonConstants from "src/products/constants/CommonConstants";
import Button from "src/shared/components/Button";

import {
  categorySelectorValidation,
  createProductValidation,
} from "./validationSchema";

const { categories } = commonConstants;

const CreateProduct = () => {
  /**
   * state, constants & hooks
   */
  const [selected, setSelected] = useState(categories[0].name);
  const [step, setStep] = useState({
    active: 0,
    steps: ["Category Selector", "Product Details"],
  });

  /**
   * Return validation schema for step form
   */
  const validationSchema = useMemo(
    () =>
      step.active === 0 ? categorySelectorValidation : createProductValidation,
    [step.active]
  );

  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  /**
   * Submit handler for step form
   */
  const onSubmit = () => {
    if (step.active === 0) {
      setStep((prev) => ({ ...prev, active: 1 }));
    } else {
      console.log("Product created");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step.active === 0 ? (
            <CategorySelector selected={selected} setSelected={setSelected} />
          ) : (
            <CreateProductForm />
          )}
          <Button
            btnText={step.active === 0 ? "Continue" : "Post"}
            type="submit"
            extraClasses="ml-auto mt-4"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateProduct;
