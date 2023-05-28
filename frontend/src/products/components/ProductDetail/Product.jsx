import {
  BookmarkIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  ShoppingBagIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import moment from "moment";
import { Link } from "react-router-dom";
import ViewMakeOffer from "./ViewMakeOffer";

const Product = (props) => {
  const {
    title,
    description,
    image,
    price,
    category,
    created_at,
    owner,
    permissions,
    onDeleteClick,
    onMarkSoldClick,
    bookmarked,
    handleAddRemoveBookmark,
    getOffers,
    offers,
    offersLoading,
    makeOffer,
    acceptRejectOffer,
  } = props;
  return (
    <div className="block md:flex p-5 md:space-x-4">
      <div className="w-full mb-4 md:mb-0 md:w-1/2 lg:w-2/3 border rounded-md min-h-[16rem] grid place-items-center">
        <img
          className="rounded-md max-h-[32rem]"
          src={image}
          alt="product detail"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 flex-col space-y-3">
        {/* TODO: add owner actions  */}
        {permissions?.can_edit_product && (
          <div className="flex flex-row-reverse gap-x-2">
            <button
              onClick={() => onDeleteClick?.()}
              className="text-sm border rounded px-2 py-1 flex items-center space-x-1 hover:bg-red-50 hover:shadow border-red-500 text-red-500"
            >
              <TrashIcon className="h-5 inline" /> <span>Delete</span>
            </button>
            <button
              onClick={() => onMarkSoldClick?.()}
              className="text-sm border rounded px-2 py-1 flex items-center space-x-1 hover:bg-green-50 hover:shadow border-green-500 text-green-500"
            >
              <ShoppingBagIcon className="h-5 inline" /> <span>Mark Sold</span>
            </button>
            <Link
              to="edit"
              className="text-sm border rounded px-2 py-1 flex items-center space-x-1 hover:bg-blue-50 hover:shadow border-blue-500 text-blue-500"
            >
              <PencilSquareIcon className="h-5 inline" /> <span>Edit</span>
            </Link>
          </div>
        )}
        <div className="bg-gray-100 p-3 rounded-md flex-col space-y-3 border">
          <div className="flex justify-between">
            <span className="text-4xl font-semibold">&#8377; {price}</span>
            <button onClick={handleAddRemoveBookmark} className="self-start">
              {bookmarked ? (
                <BookmarkIcon className="w-6" />
              ) : (
                <BookmarkIconOutline className="w-6" />
              )}
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <TagIcon className="h-8" />
              <div className="flex-col">
                <p className="text-sm text-gray-700">Category</p>
                <p className="font-semibold text-gray-800">{category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDaysIcon className="h-8" />
              <div className="flex-col">
                <p className="text-sm text-gray-700">Posted</p>
                <p className="font-semibold text-gray-800">
                  {moment(created_at).fromNow()}
                </p>
              </div>
            </div>
          </div>
          <ViewMakeOffer
            btnText={permissions?.is_owner ? "View Offers" : "Make Offer"}
            getOffers={getOffers}
            offersLoading={offersLoading}
            offers={offers}
            makeOffer={makeOffer}
            isOwner={permissions?.is_owner}
            acceptRejectOffer={acceptRejectOffer}
          />
        </div>
        <div className="bg-gray-100 p-3 rounded-md border">
          <p className="text-sm font-semibold text-gray-700 mb-1">Title</p>
          <p>{title}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-md border">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Description
          </p>
          <p>{description}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-md flex items-center space-x-4 border">
          <img src={owner?.avatar} alt="owner" className="w-24" />
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Seller Information
            </p>
            <p>
              {owner?.first_name} {owner?.last_name}
            </p>
            <p>{owner?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
