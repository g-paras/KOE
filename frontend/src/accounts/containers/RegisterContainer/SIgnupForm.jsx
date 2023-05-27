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
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img className="h-16 mr-2" src={logo} alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          {submitted ? (
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
            <div className="">
              <div className="rounded-t-md bg-green-500 p-8">
                <CheckCircleIcon className="text-white h-36 mx-auto" />
              </div>
              <div className="rounded-b-md bg-white-500 p-8 text-center text-gray-800">
                <p>
                  Congratulations, your accout has been successfully created.
                  Check your inbox for verification mail.
                </p>
                <Link
                  to="/email-verification"
                  className="inline-block mt-4 px-4 py-2 text-sm bg-indigo-500 text-white rounded-md"
                >
                  Re-send verification mail
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
