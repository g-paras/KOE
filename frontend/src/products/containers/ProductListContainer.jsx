import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductListItem from "src/products/components/ProductListItem";
import commonConstants from "src/shared/constants/CommonConstants";
import useApiClient from "src/shared/hooks/useApiClient";
import emptyCardImage from "src/shared/assets/empty-cart.png";

const Skeleton = () => (
  <div className="rounded-md animate-pulse">
    <div className="h-40 bg-gray-200 rounded-md w-full mb-2"></div>
    <div className="h-16 bg-gray-200 rounded-md w-full"></div>
  </div>
);

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search] = useSearchParams();
  const { loading, action } = useApiClient({
    isOpenUrl: true,
    requestFor: "PRODUCTS_LIST",
  });

  useEffect(() => {
    if (!loading) {
      action({
        queryParams: search.get("query")
          ? {
              title: search.get("query"),
            }
          : {},
      }).then((res) => {
        if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK) {
          setProducts([...res.data.results]);
          setNextUrl(res.data.next);
        }
      });
    }
  }, [search]);

  /**
   * Load More click handler
   */
  const getNextResult = useCallback(() => {
    action({
      queryParams: {
        cursor: nextUrl,
        title: search.get("query"),
      },
    }).then((res) => {
      if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK) {
        setNextUrl(res.data.next);
        setProducts((prev) => [...prev, ...res.data.results]);
      }
    });
  }, [nextUrl, search]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
        {products.map((item) => (
          <ProductListItem key={item.slug} {...item} />
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
      {!loading && products && products.length === 0 && (
        <div className="text-center">
          <img
            className="w-48 mx-auto"
            src={emptyCardImage}
            alt="no bookmarks found"
          />
          <p className="font-semibold text-sm mt-5">No Items Found</p>
        </div>
      )}
      {!loading && (
        <div className="my-5 text-center">
          {nextUrl ? (
            <button
              onClick={getNextResult}
              className="bg-indigo-500 text-white rounded-md hover:bg-indigo-600 px-5 py-2"
            >
              Load More
            </button>
          ) : (
            <p className="text-sm text-gray-600">
              You have reached the end of this page :)
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListContainer;
