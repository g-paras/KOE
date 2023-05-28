import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "src/shared/components/ConfirmationModal";
import Loader from "src/shared/components/Loader/Loader";
import commonConstants from "src/shared/constants/CommonConstants";
import useApiClient from "src/shared/hooks/useApiClient";
import commonUtils from "src/shared/utils/commonUtils";

import Product from "../components/ProductDetail/Product";
import BaseContext from "src/shared/contexts/BaseContext";

const ProductDetailContainer = () => {
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [confirmationContent, setConfirmationContent] = useState({
    title: "",
    description: "",
  });

  const { authenticated } = useContext(BaseContext);

  const navigate = useNavigate();

  const {
    loading: productLoading,
    action,
    data,
  } = useApiClient({
    isOpenUrl: true,
    requestFor: "GET_PRODUCT",
  });
  const { loading: deleting, action: deleteAction } = useApiClient({
    isOpenUrl: false,
    requestFor: "DELETE_PRODUCT",
  });
  const { loading: markSoldLoading, action: markSoldAction } = useApiClient({
    isOpenUrl: false,
    requestFor: "MARK_SOLD",
  });
  const { loading: bookmarkLoading, action: addRemoveBookmarkAction } =
    useApiClient({
      isOpenUrl: false,
      requestFor: "ADD_REMOVE_BOOKMARK",
    });
  const { loading: makeOfferLoading, action: makeOfferAction } = useApiClient({
    isOpenUrl: false,
    requestFor: "MAKE_OFFER",
  });
  const { action: acceptRejectOfferAction } = useApiClient({
    isOpenUrl: false,
    requestFor: "ACCEPT_REJECT_OFFER",
  });
  const {
    loading: offersLoading,
    action: getOffersAction,
    data: offers,
  } = useApiClient({
    isOpenUrl: false,
    requestFor: "GET_OFFERS",
  });

  const loading =
    productLoading || deleting || markSoldLoading || bookmarkLoading;

  /**
   * Util to fetch product details
   */
  const fetchProductDetails = useCallback((slug) => {
    action({
      routeParams: {
        slug: slug,
      },
      headers: commonUtils.getAuthHeadersOrEmptyObject(),
    });
  }, []);

  /**
   * fetch product details when page loads or slug changes
   */
  useEffect(() => {
    if (!loading) fetchProductDetails(slug);
  }, [slug]);

  const deleteProduct = () => {
    setIsOpen(false);

    deleteAction({
      routeParams: {
        slug: slug,
      },
    }).then((res) => {
      if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_204_NO_CONTENT) {
        navigate("/");
        toast.success("Yay, Ad has been deleted!");
      }
    });
  };

  const markSoldProduct = () => {
    setIsOpen(false);

    markSoldAction({
      routeParams: {
        slug: slug,
      },
    }).then((res) => {
      if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK) {
        navigate("/");
        toast.success("Yay, Ad has been marked as sold!");
      }
    });
  };

  const handleAddRemoveBookmark = () => {
    if (authenticated) {
      addRemoveBookmarkAction({
        routeParams: {
          slug: slug,
        },
      }).then((res) => {
        if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK) {
          toast.success(
            data?.bookmarked ? "Bookmark removed" : "Bookmark Added"
          );
          fetchProductDetails(slug);
        }
      });
    } else {
      toast.error("Login Required");
    }
  };

  const onDeleteClick = () => {
    setIsOpen(true);
    setActionType("delete");
    setConfirmationContent({
      title: "Are you sure you want to delete your advertisement?",
      description: "Once your ad is deleted, you won't be able to restore it.",
    });
  };

  const onMarkSoldClick = () => {
    setIsOpen(true);
    setActionType("markSold");
    setConfirmationContent({
      title: "Are you sure you want to mark you Ad as sold?",
      description:
        "Once you marked your ad as sold, it won't be visible to other users",
    });
  };

  const handleCancleConfirmationClick = () => {
    setIsOpen(false);
    setActionType("");
  };

  const getOffers = useCallback(() => {
    if (!authenticated) {
      toast.error("Login Required");
    } else {
      getOffersAction({
        routeParams: {
          slug,
        },
      });
    }
  }, [slug]);

  const submitConfirmationHandler = useMemo(() => {
    if (actionType === "delete") {
      return deleteProduct;
    } else if (actionType === "markSold") {
      return markSoldProduct;
    } else {
      return handleCancleConfirmationClick;
    }
  }, [actionType]);

  const makeOffer = (data) => {
    if (!authenticated) {
      toast.error("Login Required");
    } else {
      makeOfferAction({
        routeParams: {
          slug,
        },
        payload: {
          price: data.price,
        },
      }).then((res) => {
        if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK) {
          toast.success("Yay, offer made successfully!");
          getOffersAction({
            routeParams: {
              slug,
            },
          });
        }
      });
    }
  };

  const acceptRejectOffer = (accept, offerId) => {
    if (!authenticated) {
      toast.error("Login Required");
    } else {
      acceptRejectOfferAction({
        payload: { accept },
        routeParams: {
          offerId,
          slug,
        },
      }).then((res) => {
        if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK) {
          toast.success(accept ? "Offer Accepted" : "Offer Rejected");
          getOffersAction({
            routeParams: {
              slug,
            },
          });
        }
      });
    }
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleCancleConfirmationClick}
        setIsOpen={setIsOpen}
        onCancelClick={handleCancleConfirmationClick}
        onSubmitClick={submitConfirmationHandler}
        {...confirmationContent}
      />
      {loading && <Loader />}
      {data && (
        <Product
          {...data}
          isOpen={isOpen}
          onDeleteClick={onDeleteClick}
          onMarkSoldClick={onMarkSoldClick}
          handleAddRemoveBookmark={handleAddRemoveBookmark}
          offersLoading={offersLoading}
          getOffers={getOffers}
          offers={offers}
          makeOffer={makeOffer}
          acceptRejectOffer={acceptRejectOffer}
        />
      )}
    </div>
  );
};

export default ProductDetailContainer;
