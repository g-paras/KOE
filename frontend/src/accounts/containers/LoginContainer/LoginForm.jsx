import { useState, useEffect, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import FormField from "src/shared/components/FormField";
import PasswordField from "src/shared/components/PasswordField";
import Button from "src/shared/components/Button";
import stateUrls from "src/shared/constants/StateUrls";

import loginFormValidation from "./validationSchema";
import useApiClient from "src/shared/hooks/useApiClient";
import commonConstants from "src/shared/constants/CommonConstants";
import commonUtils from "src/shared/utils/commonUtils";
import { useNavigate } from "react-router-dom";
import BaseContext from "src/shared/contexts/BaseContext";

const LoginForm = () => {
  const [authErrors, setAuthErrors] = useState([]);
  const methods = useForm({
    resolver: zodResolver(loginFormValidation),
  });
  const navigate = useNavigate();

  const { authenticated } = useContext(BaseContext);

  const { loading, action } = useApiClient({
    isOpenUrl: true,
    requestFor: "LOGIN",
    logoutOnUnautorized: false,
  });

  const onSubmit = (data) => {
    setAuthErrors("");
    action({
      payload: {
        username: data.username,
        password: data.password,
      },
    }).then((res) => {
      if (res?.status === 401) {
        setAuthErrors(res?.data?.detail || []);
      } else if (
        res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK &&
        res?.data?.auth_token
      ) {
        commonUtils.setAuthToken(res.data.auth_token);
        navigate(0);
      }
    });
  };

  /**
   * If auth token exists then redirect user to home page
   */
  useEffect(() => {
    if (authenticated) navigate("/");
  }, []);

  return (
    <section className="mt-12 md:mt-0">
      <div className="px-6 py-8">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 mx-auto border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
              Log in to your account
            </h1>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormField
                  name="username"
                  placeholder="Library Id"
                  type="text"
                  label="Email Address"
                  endAdorement={"@kiet.edu"}
                />
                <PasswordField
                  label="Password"
                  name="password"
                  placeholder="Enter Password"
                />
                <div className="flex items-center mb-3">
                  {/* <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">
                        Remember me
                      </label>
                    </div>
                  </div> */}
                  <Link
                    to={stateUrls.FORGOT_PASSWORD}
                    className="text-sm font-medium text-blue-600 hover:underline ml-auto"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  btnText="Log in"
                  extraClasses="rounded-md text-sm"
                  loading={loading}
                />
                <p className="text-red-500 text-xs text-center font-light h-4 my-2">
                  {authErrors}
                </p>
                <p className="text-sm font-light text-gray-500 mt-2">
                  Don't have an account yet?{" "}
                  <a
                    href={stateUrls.REGISTER}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
