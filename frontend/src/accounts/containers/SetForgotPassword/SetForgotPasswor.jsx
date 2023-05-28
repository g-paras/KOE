import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import PasswordField from "src/shared/components/PasswordField";
import Button from "src/shared/components/Button";
import useApiClient from "src/shared/hooks/useApiClient";
import sharedCommonConstants from "src/shared/constants/CommonConstants";
import stateUrls from "src/shared/constants/StateUrls";

import validationSchema from "./validationSchema";

const SetForgotPasswordContainer = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { loading, action, error } = useApiClient({
    isOpenUrl: true,
    requestFor: "SET_FORGOT_PASSWORD",
  });

  /**
   * set password submit handler
   */
  const onSubmit = (data) => {
    action({
      payload: {
        token: token,
        password: data.password,
        confirm_password: data.rePassword,
      },
    }).then((res) => {
      if (res?.status === sharedCommonConstants.RESPONSE_STATUS.HTTP_200_OK) {
        navigate(stateUrls.LOGIN);
        toast.success("Nice, password has been updated");
      }
    });
  };

  return (
    <section className="mt-12 md:mt-0">
      <div className="px-6 py-8">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 mx-auto border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
              Reset Password
            </h1>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <PasswordField
                  required
                  label="New Password"
                  name="password"
                  placeholder={"Enter Password"}
                />
                <PasswordField
                  required
                  label="Re-enter Password"
                  name="rePassword"
                  placeholder="Re-enter Password"
                />
                <Button
                  btnText="Set Password"
                  extraClasses="rounded-md text-sm mt-2"
                  loading={loading}
                />
                {error && error.password && (
                  <p className="text-red-500 text-xs text-center font-light h-4 my-1 mt-2">
                    {error.password[0]}
                  </p>
                )}
                {error && error.token && (
                  <p className="text-red-500 text-xs text-center font-light h-4 my-1">
                    {error.token[0]}
                  </p>
                )}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetForgotPasswordContainer;
