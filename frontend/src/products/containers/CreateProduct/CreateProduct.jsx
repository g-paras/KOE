import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import CategorySelector from "src/products/components/CreateProduct/CategorySelector";
import CreateProductForm from "src/products/components/CreateProduct/CreateProductForm";
import commonConstants from "src/products/constants/CommonConstants";
import sharedCommonConstants from "src/shared/constants/CommonConstants";
import Button from "src/shared/components/Button";

import {
  categorySelectorValidation,
  createProductValidation,
} from "./validationSchema";
import useApiClient from "src/shared/hooks/useApiClient";
import { useNavigate } from "react-router-dom";
import stateUrls from "src/shared/constants/StateUrls";
import commonUtils from "src/shared/utils/commonUtils";

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
  const navigate = useNavigate();

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

  const { action, loading } = useApiClient({
    isOpenUrl: false,
    requestFor: "CREATE_PRODUCT",
  });

  /**
   * Submit handler for step form
   */
  const onSubmit = (data) => {
    if (step.active === 0) {
      setStep((prev) => ({ ...prev, active: 1 }));
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("image", data.image[0]);
      formData.append("price", data.price);
      action({
        payload: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        if (
          res?.status === sharedCommonConstants.RESPONSE_STATUS.HTTP_201_CREATED
        ) {
          navigate(
            commonUtils.replaceRouteParams(stateUrls.PRODUCT_DETAIL_PAGE, {
              slug: res.data.slug,
            })
          );
          toast.success("Yay, your Ad has been created");
        }
      });
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
            loading={loading}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateProduct;
