import { useEffect } from "react";

import ProductListItem from "src/products/components/ProductListItem";
import useApiClient from "src/shared/hooks/useApiClient";
import emptyCardImage from "src/shared/assets/empty-cart.png";

const Skeleton = () => (
  <div className="rounded-md animate-pulse">
    <div className="h-40 bg-gray-200 rounded-md w-full mb-2"></div>
    <div className="h-16 bg-gray-200 rounded-md w-full"></div>
  </div>
);

const BookmarksContainer = () => {
  const { data, loading, action } = useApiClient({
    isOpenUrl: false,
    requestFor: "BOOKMARKS",
  });

  useEffect(() => {
    action({});
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
        {(data || []).map((item) => (
          <ProductListItem key={item.product.slug} {...item.product} />
        ))}
        {loading && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </div>
      {data && data.length === 0 && (
        <div className="text-center">
          <img
            className="w-48 mx-auto"
            src={emptyCardImage}
            alt="no bookmarks found"
          />
          <p className="font-semibold text-sm mt-5">
            No Items Found, Let's go and bookmark some items
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarksContainer;
