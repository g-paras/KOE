import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CreateProductForm from "src/products/components/CreateProduct/CreateProductForm";
import productCommonConstants from "src/products/constants/CommonConstants";
import Button from "src/shared/components/Button";
import Loader from "src/shared/components/Loader/Loader";
import { default as commonConstants, default as sharedCommonConstants } from "src/shared/constants/CommonConstants";
import stateUrls from "src/shared/constants/StateUrls";
import useApiClient from "src/shared/hooks/useApiClient";
import commonUtils from "src/shared/utils/commonUtils";

import { productFormValidationSchema } from "./validationSchema";

const CreateProduct = () => {
  /**
   * state, constants & hooks
   */
  const { slug } = useParams();
  const navigate = useNavigate();

  const { loading: fetchingProduct, action } = useApiClient({
    isOpenUrl: false,
    requestFor: "GET_PRODUCT",
  });

  const { loading: savingProduct, action: saveProduct } = useApiClient({
    isOpenUrl: false,
    requestFor: "EDIT_PRODUCT",
  });

  const loading = fetchingProduct || savingProduct;

  const methods = useForm({
    resolver: zodResolver(productFormValidationSchema),
    defaultValues: {
      category: productCommonConstants.CATEGORIES.OTHERS,
      title: "",
      description: "",
      price: undefined,
      image: [],
    },
  });

  useEffect(() => {
    if (!loading)
      action({
        routeParams: {
          slug: slug,
        },
      }).then((res) => {
        if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK) {
          if (!res.data.permissions.can_edit_product) {
            navigate("/not-found");
          }
          methods.reset({
            category: res.data.category,
            title: res.data.title,
            description: res.data.description,
            price: res.data.price.toString(),
            "image-url": res.data.image,
          });
          methods.setValue("category", res.data.category);
        }
      });
  }, [slug]);

  /**
   * Submit handler for step form
   */
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    if (data.image && data.image.length !== 0) {
      formData.append("image", data.image[0]);
    }
    saveProduct({
      payload: formData,
      headers: { "Content-Type": "multipart/form-data" },
      routeParams: {
        slug: slug,
      },
    }).then((res) => {
      if (res?.status === sharedCommonConstants.RESPONSE_STATUS.HTTP_200_OK) {
        navigate(
          commonUtils.replaceRouteParams(stateUrls.PRODUCT_DETAIL_PAGE, {
            slug: res.data.slug,
          })
        );
        toast.success("Yay, Ad details has been updated!");
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CreateProductForm />
          <Button
            btnText="Save Details"
            type="submit"
            extraClasses="ml-auto mt-4"
            loading={savingProduct}
          />
        </form>
      </FormProvider>
      {loading && <Loader />}
    </div>
  );
};

export default CreateProduct;
