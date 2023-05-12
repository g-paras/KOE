import _ from "lodash";

import commonConstants from "../constants/CommonConstants";

const Categories = (props) => {
  const { extraClasses } = props;
  return (
    <div className={`overflow-x-auto flex space-x-2 px-4 ${extraClasses}`}>
      {_.map(commonConstants.CATEGORIES, (key, value) => (
        <span
          key={key}
          className="px-2 py-1 rounded-full border normal-case text-indigo-500 border-indigo-500 bg-indigo-50 md:text-sm"
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default Categories;
