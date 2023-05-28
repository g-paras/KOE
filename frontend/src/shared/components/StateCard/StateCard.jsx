import { Link } from "react-router-dom";

const StateCard = ({
  icon,
  description,
  link,
  action,
  actionText,
  success = true,
}) => {
  const Icon = icon;
  return (
    <div className="rounded-md border">
      <div
        className={`rounded-t-md ${
          success ? "bg-green-500" : "bg-red-500/80"
        } p-8`}
      >
        <Icon className="text-white h-32 mx-auto" />
      </div>
      <div className="rounded-b-md p-8 text-center text-gray-800">
        <p>{description}</p>
        {link && (
          <Link
            to={link}
            className="inline-block mt-4 px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
          >
            {actionText}
          </Link>
        )}
        {action && (
          <button
            onClick={action}
            className="inline-block mt-4 px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default StateCard;
