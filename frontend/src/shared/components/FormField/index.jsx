import { useFormContext } from "react-hook-form";
import _ from "lodash";

const FormField = (props) => {
  const {
    name,
    type,
    label,
    placeholder,
    required,
    endAdorement,
    ...extraProps
  } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = _.get(errors, name)?.message;

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
      <div className="flex mt-1 w-full">
        <input
          type={type}
          name={name}
          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
            endAdorement ? "rounded-r-none" : ""
          }`}
          placeholder={placeholder}
          {...register(name)}
          {...extraProps}
        />
        {endAdorement && (
          <div className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg rounded-l-none p-2.5">
            {endAdorement}
          </div>
        )}
      </div>
      <p className="text-red-500 text-xs text-right font-light h-4 mt-1">
        {errorMessage}
      </p>
    </div>
  );
};

export default FormField;
