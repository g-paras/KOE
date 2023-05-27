import { useState } from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const FormField = (props) => {
  const { name, label, placeholder, required, ...extraProps } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = _.get(errors, name)?.message;
  const [show, setShow] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-gray-900 after:text-red-500 ${
          required && "after:content-['_*']"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mt-1"
          placeholder={placeholder}
          {...register(name)}
          {...extraProps}
        />
        <button
          type="button"
          className="absolute top-0 right-2 h-full text-gray-700"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? (
            <EyeIcon className="h-5" />
          ) : (
            <EyeSlashIcon className="h-5" />
          )}
        </button>
      </div>
      <p className="text-red-500 text-xs text-right font-light h-4 mt-1">
        {errorMessage}
      </p>
    </div>
  );
};

export default FormField;
