import { Link } from "react-router-dom";

const ProductListItem = (props) => {
  const { title, category, description, image, price, slug } = props;
  return (
    <Link to={`/item/${slug}`} className="border rounded-md hover:shadow-md">
      <img className="h-56 lg:h-48 rounded-t-md m-auto" src={image} alt="" />
      <div className="p-4 bg-gray-50 rounded-b-md">
        <div className="flex justify-between items-center">
          <span> &#8377; {price}</span>
          <span className="bg-indigo-100 border border-indigo-500 rounded-full px-2 text-sm text-indigo-500">
            {category}
          </span>
        </div>
        <div className="text-lg font-semibold text-gray-800 truncate">{title}</div>
        <div className="text-gray-700 truncate text-sm">{description}</div>
      </div>
    </Link>
  );
};

export default ProductListItem;
