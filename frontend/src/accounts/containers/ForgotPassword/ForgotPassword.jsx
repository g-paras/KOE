import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

import FormField from "src/shared/components/FormField";
import Button from "src/shared/components/Button";
import stateUrls from "src/shared/constants/StateUrls";
import useApiClient from "src/shared/hooks/useApiClient";
import BaseContext from "src/shared/contexts/BaseContext";
import sharedCommonConstants from "src/shared/constants/CommonConstants";

import validationSchema from "./validationSchema";
import StateCard from "src/shared/components/StateCard/StateCard";

const ForgotPasswordContainer = () => {
  const [submitted, setSubmitted] = useState(false);
  const { authenticated } = useContext(BaseContext);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { loading, action, error } = useApiClient({
    isOpenUrl: true,
    requestFor: "FORGOT_PASSWORD",
  });

  /**
   * Register submit handler
   */
  const onSubmit = (data) => {
    action({
      payload: {
        username: data.username,
      },
    }).then((res) => {
      if (
        res &&
        res.status === sharedCommonConstants.RESPONSE_STATUS.HTTP_200_OK
      ) {
        setSubmitted(true);
      }
    });
  };

  /**
   * redirect authenticated user to home page
   */
  useEffect(() => {
    if (authenticated) {
      navigate(stateUrls.HOME);
    }
  }, []);

  return (
    <section className="mt-12 md:mt-0">
      <div className="px-6 py-8">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 mx-auto border">
          {!submitted ? (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                Forgot Password
              </h1>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <FormField
                    required
                    name="username"
                    placeholder="Enter Email"
                    type="text"
                    autoComplete="off"
                    label="Email Address"
                    endAdorement="@kiet.edu"
                  />
                  <Button
                    btnText="Submit"
                    extraClasses="rounded-md text-sm mt-2"
                    loading={loading}
                  />
                  {error && error.non_field_errors && (
                    <p className="text-red-500 text-xs text-center font-light h-4 my-2">
                      {error.non_field_errors[0]}
                    </p>
                  )}
                </form>
              </FormProvider>
            </div>
          ) : (
            <StateCard
              icon={CheckCircleIcon}
              description="We have sent you an email to reset password, Please check."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordContainer;
