import { Fragment, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useFormContext } from "react-hook-form";
import _ from "lodash";

const ChoiceField = (props) => {
  const { name, label, choices, required } = props;
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const selected = useMemo(() => watch(name), [watch(name)]);

  const handleOnChange = (value) => {
    setValue(name, value);
  };

  const errorMessage = _.get(errors, name)?.message;
  /**
   * TODO: use controller to auto-focus on form error
   */
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-gray-900 after:text-red-500 ${
          required && "after:content-['_*']"
        }`}
      >
        {label}
      </label>
      <Listbox onChange={handleOnChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm  bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {choices.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                    }`
                  }
                  value={person.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          <div className="text-red-500 text-xs text-right font-light h-4 mt-1">
            {errorMessage}
          </div>
        </div>
      </Listbox>
    </div>
  );
};

export default ChoiceField;
