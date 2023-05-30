import { useContext, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "src/shared/components/Button";
import FormField from "src/shared/components/FormField";
import TextArea from "src/shared/components/TextArea";
import BaseContext from "src/shared/contexts/BaseContext";

import validationSchema from "./validationSchema";
import useApiClient from "src/shared/hooks/useApiClient";
import sharedCommonConstants from "src/shared/constants/CommonConstants";
import { toast } from "react-toastify";

const EditProfileContainer = () => {
  const { first_name, last_name, avatar, username, about_me } =
    useContext(BaseContext);

  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    methods.reset({
      firstName: first_name,
      lastName: last_name,
      aboutMe: about_me,
      username,
    });
  }, []);

  const { loading, action } = useApiClient({
    isOpenUrl: false,
    requestFor: "EDIT_PROFILE",
  });

  const onSubmit = (data) => {
    action({
      payload: {
        first_name: data.firstName,
        last_name: data.lastName,
        about_me: data.aboutMe,
      },
    }).then((res) => {
      if (res?.status === sharedCommonConstants.RESPONSE_STATUS.HTTP_200_OK) {
        toast.success("Nice, details have been updated");
      }
    });
  };

  return (
    <div className="max-w-xl mx-6 md:mx-auto p-5 mt-8 border rounded-md shadow">
      {/* <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 mb-4 border-b pb-1">Edit Profile</h1> */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:space-x-4 md:items-center mb-2">
            <img
              className="mx-auto mb-4 w-48 md:mx-0 md:mb-0 rounded-md md:w-1/3 p-2"
              src={avatar}
              alt="avatar"
            />
            <div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <FormField
                    required
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <FormField
                endAdorement="@kiet.edu"
                name="username"
                label="Email Address"
                disabled
                removeFormErrorBlock
              />
            </div>
          </div>
          <TextArea
            rows={5}
            name="aboutMe"
            label="About Me"
            placeholder="A small description about yourself"
          />
          <Button
            loading={loading}
            extraClasses="mt-2"
            btnText="Save Details"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProfileContainer;
