const productsCommonConstants = {
  IMAGE_MAX_SIZE: 4,
  CATEGORIES: {
    QUANTUM: "QUANTUM",
    BOOK: "BOOK",
    ACCESSORIES: "ACCESSORIES",
    GADGET: "GADGET",
    ELECTRONICS: "ELECTROINCS",
    OTHERS: "OTHERS",
  },
  PRODUCT_STATUS: {
    ACTIVE: 1,
    SOLD: 2,
    REPORTED: 3,
  },
  OFFER_STATUS: {
    1: "PENDING",
    2: "ACCEPTED",
    3: "REJECTED",
  },
  OFFER_STATUS_MAP: {
    PENDING: 1,
    ACCEPTED: 2,
    REJECTED: 3,
  },
  categories: [
    {
      value: "QUANTUM",
      name: "Quantum",
    },
    {
      value: "BOOK",
      name: "Book",
    },
    {
      value: "ACCESSORIES",
      name: "Accessores",
    },
    {
      value: "GADGET",
      name: "Gadget",
    },
    {
      value: "ELECTRONICS",
      name: "Electronics",
    },
    {
      value: "OTHERS",
      name: "Others",
    },
  ],
};

export default productsCommonConstants;
