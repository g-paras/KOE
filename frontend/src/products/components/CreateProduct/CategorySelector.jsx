import React from "react";
import { RadioGroup } from "@headlessui/react";

import commonConstants from "src/products/constants/CommonConstants";
import { useFormContext } from "react-hook-form";

const { categories } = commonConstants;

const CategorySelector = () => {
  const { getValues, setValue } = useFormContext();
  const selected = getValues().category;

  const setSelected = (value) => {
    setValue('category', value);
  }

  return (
    <div>
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="text-lg font-semibold">What would you like to sell ?</RadioGroup.Label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2 mt-4">
          {categories.map((plan) => (
            <RadioGroup.Option
              key={plan.name}
              value={plan}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300"
                    : ""
                }
                  ${
                    checked
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 hover:shadow-md focus:outline-none h-40 border`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-center">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium text-center ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {plan.name}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {/* {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="h-6 w-6" />
                      </div>
                    )} */}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CategorySelector;
