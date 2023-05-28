import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

import FormField from "src/shared/components/FormField";
import PasswordField from "src/shared/components/PasswordField";
import logo from "src/shared/assets/logo.png";
import Button from "src/shared/components/Button";
import stateUrls from "src/shared/constants/StateUrls";
import useApiClient from "src/shared/hooks/useApiClient";
import BaseContext from "src/shared/contexts/BaseContext";
import sharedCommonConstants from "src/shared/constants/CommonConstants";

import loginFormValidation from "./validationSchema";
import StateCard from "src/shared/components/StateCard/StateCard";

const LoginForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { authenticated } = useContext(BaseContext);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(loginFormValidation),
  });

  const { loading, action, error } = useApiClient({
    isOpenUrl: true,
    requestFor: "REGISTER",
  });

  /**
   * Register submit handler
   */
  const onSubmit = (data) => {
    action({
      payload: {
        username: data.username,
        password: data.password,
        confirm_password: data.rePassword,
        email: data.username + "@kiet.edu",
        first_name: data.firstName,
        last_name: data.lastName,
      },
    }).then((res) => {
      if (
        res &&
        res.status === sharedCommonConstants.RESPONSE_STATUS.HTTP_201_CREATED
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
                Welcome!
              </h1>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="flex space-x-2">
                    <FormField
                      required
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                      label="First Name"
                    />
                    <FormField
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                      label="Last Name"
                    />
                  </div>
                  <FormField
                    required
                    name="username"
                    placeholder="Enter Email"
                    type="text"
                    autoComplete="off"
                    label="Email Address"
                    endAdorement="@kiet.edu"
                  />
                  <PasswordField
                    required
                    label="Password"
                    name="password"
                    placeholder={"Enter Password"}
                  />
                  <PasswordField
                    required
                    label="Re-enter Password"
                    name="rePassword"
                    placeholder="Enter Password"
                  />
                  <Button
                    btnText="Sign Up"
                    extraClasses="rounded-md text-sm mt-2"
                    loading={loading}
                  />
                  {error && error.username && (
                    <p className="text-red-500 text-xs text-center font-light h-4 my-2">
                      {error.username[0]}
                    </p>
                  )}
                  {error && error.password && (
                    <p className="text-red-500 text-xs text-center font-light h-4 my-2">
                      {error.password[0]}
                    </p>
                  )}
                  <p className="text-sm font-light text-gray-500 mt-2">
                    Already have an account?{" "}
                    <a
                      href={stateUrls.LOGIN}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Login
                    </a>
                  </p>
                </form>
              </FormProvider>
            </div>
          ) : (
            <StateCard
              icon={CheckCircleIcon}
              description="Congratulations, your account has been successfully created. Check your inbox for verification mail."
              actionText="Re-send verification mail"
              link={stateUrls.RESEND_EMAIL_VERIFICATION}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
