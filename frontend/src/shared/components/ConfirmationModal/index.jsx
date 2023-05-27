import { Dialog } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";

const ConfirmationModal = (props) => {
  const {
    isOpen,
    onClose,
    title,
    description,
    onCancelClick,
    onSubmitClick,
    cancelText = "Cancel",
    submitText = "Confirm",
  } = props;

  return (
    <Dialog open={isOpen} onClose={() => onClose?.()}>
      <Dialog.Panel className="fixed h-screen bg-gray-500/80 w-full top-0 grid place-items-center transition-transform">
        <div className="bg-white rounded-md mx-10 md:mx-auto md:w-[32rem] p-6 relative">
          <button
            onClick={() => onClose?.()}
            className="absolute top-3 right-3 h-5 w-5 text-black rounded-full"
          >
            <XCircleIcon />
          </button>
          <Dialog.Title className="mt-3 md:mt-5 font-semibold">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-700 mt-3 md:mt-5">
            {description}
          </Dialog.Description>

          <div className="flex flex-row-reverse gap-x-2 mt-5 md:mt-10">
            <button
              className="border border-indigo-500 rounded px-3 py-1 text-sm bg-indigo-500 text-white"
              onClick={() => onSubmitClick?.()}
            >
              {submitText}
            </button>
            <button
              className="border rounded px-3 py-1 text-sm hover:shadow"
              onClick={() => onCancelClick?.()}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ConfirmationModal;
