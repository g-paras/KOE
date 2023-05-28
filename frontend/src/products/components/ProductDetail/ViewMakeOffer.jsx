import { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XCircleIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/20/solid";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";

import chickenImage from "src/shared/assets/chicken.png";
import BaseContext from "src/shared/contexts/BaseContext";
import FormField from "src/shared/components/FormField";
import { validationSchema } from "./validationSchema";
import productsCommonConstants from "src/products/constants/CommonConstants";

const OfferListItem = (props) => (
  <div className="rounded-md border">
    <div className="px-3 py-2">
      <div className="flex space-x-3">
        <img className="h-12" src={chickenImage} alt="asdf" />
        <div className="text-sm flex-1 my-auto">
          <div>
            {props?.user_details?.first_name} {props?.user_details?.last_name}
          </div>
          <div>{props?.user_details?.email}</div>
        </div>
        <div className="text-lg font-semibold">&#8377; {props.price}</div>
      </div>
    </div>
    <div className="border-t px-3 py-2 flex justify-between items-center bg-gray-100 rounded-b-md">
      <span className="text-sm px-2 py-1 self-start border bg-white rounded">
        {productsCommonConstants.OFFER_STATUS[props.status]}
      </span>
      {props.isOwner ? (
        <div>
          {props.status !==
            productsCommonConstants.OFFER_STATUS_MAP.ACCEPTED && (
            <button className="px-2 py-1 bg-indigo-500 text-white rounded text-sm" onClick={() => props.acceptRejectOffer(true, props.id)}>
              Accept
            </button>
          )}
          {props.status !==
            productsCommonConstants.OFFER_STATUS_MAP.REJECTED && (
            <button className="px-2 py-1 bg-red-500 ml-2 text-white rounded text-sm" onClick={() => props.acceptRejectOffer(false, props.id)}>
              Reject
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm">{moment(props.created_at).fromNow()}</p>
      )}
    </div>
  </div>
);

const Skeleton = () => (
  <>
    <div className="h-24 bg-gray-200 rounded-md animate-pulse"></div>
    <div className="h-24 bg-gray-200 rounded-md animate-pulse"></div>
  </>
);

const ViewOffers = (props) => {
  const {
    offers,
    getOffers,
    offersLoading,
    btnText,
    makeOffer,
    isOwner,
    acceptRejectOffer,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const { authenticated } = useContext(BaseContext);

  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const handleOnClick = () => {
    if (authenticated) {
      setIsOpen(true);
    }
    getOffers();
  };

  return (
    <div>
      <button
        onClick={handleOnClick}
        className="border w-full rounded-md px-3 py-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold cursor-pointer"
      >
        {btnText}
      </button>
      <Dialog open={isOpen} onClose={() => onClose?.()}>
        <Dialog.Panel className="fixed h-screen bg-gray-500/80 w-full top-0 grid place-items-center transition-transform py-5">
          <div className="bg-white rounded-md mx-10 my-10 w-full sm:mx-auto sm:w-[32rem] p-6 relative">
            <button
              onClick={() => onClose?.()}
              className="absolute top-3 right-3 h-5 w-5 text-black rounded-full"
            >
              <XCircleIcon />
            </button>
            <Dialog.Title className="mt-3 font-semibold">Offers</Dialog.Title>
            <div className="flex flex-col">
              <div className="flex-1 flex flex-col py-2 space-y-2 max-h-[24rem] overflow-y-scroll hide-scollbar">
                {offersLoading && <Skeleton />}
                {!offersLoading && (offers?.data || []).length === 0 && (
                  <div>
                    <ArchiveBoxXMarkIcon className="mx-auto h-16" />
                    <p className="text-center mt-2">No offers found!</p>
                  </div>
                )}
                {(offers?.data || []).map((item) => (
                  <OfferListItem
                    isOwner={isOwner}
                    {...item}
                    acceptRejectOffer={acceptRejectOffer}
                  />
                ))}
              </div>
              {!offersLoading && offers?.can_make_offer && (
                <div className="">
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(makeOffer)}>
                      <div className="mt-2 mb-1">
                        <FormField name="price" type="number" label="Price" />
                      </div>
                      <div className="flex flex-row-reverse gap-x-2 mt-1">
                        <button
                          className="border border-indigo-500 rounded px-3 py-1 text-sm bg-indigo-500 text-white"
                          type="submit"
                        >
                          Make Offer
                        </button>
                        <button
                          className="border rounded px-3 py-1 text-sm hover:shadow"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default ViewOffers;
