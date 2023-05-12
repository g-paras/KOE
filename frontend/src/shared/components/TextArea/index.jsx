import { useFormContext } from "react-hook-form";
import _ from "lodash";

const TextArea = (props) => {
  const {
    name,
    type,
    label,
    placeholder,
    required,
    cols,
    maxLimit,
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
      <textarea
        cols={cols}
        type={type}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mt-1"
        placeholder={placeholder}
        {...register(name)}
        {...extraProps}
      />
      {/* TODO: show value length  */}
      {/* <div className="text-xs text-right font-light h-4">
        {value?.length || 0}/{maxLimit || 250}
      </div> */}
      <div className="text-red-500 text-xs text-right font-light h-4 mt-1">
        {errorMessage}
      </div>
    </div>
  );
};

export default TextArea;
