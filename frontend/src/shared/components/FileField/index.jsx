import { useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";

const FileField = (props) => {
  const {
    name,
    label = "",
    placeholder = "",
    required = false,
    ...extraProps
  } = props;
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const urlFieldName = useMemo(() => `${name}-url`, [name]);
  const inputRef = useRef();

  const errorMessage =
    _.get(errors, name)?.message || _.get(errors, urlFieldName)?.message;

  useEffect(() => {
    if (!watch(urlFieldName)) {
      inputRef.current.value = "";
    }
  }, [watch(urlFieldName)]);

  const onChange = (e) => {
    setValue(name, e.target.files, { shouldValidate: true });
    setValue(urlFieldName, URL.createObjectURL(e.target.files[0]), {
      shouldValidate: true,
    });
  };

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
          ref={inputRef}
          type={"file"}
          name={name}
          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
          placeholder={placeholder}
          onChange={onChange}
          {...extraProps}
        />
      </div>
      <p className="text-red-500 text-xs text-right font-light h-4 mt-1">
        {errorMessage}
      </p>
    </div>
  );
};

export default FileField;
