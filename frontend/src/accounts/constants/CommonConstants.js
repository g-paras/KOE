const accountsCommonConstants = {
  USERNAME_REGEX: /^[a-zA-Z](?!.*\.\.)(?:[a-zA-Z0-9]*\.?)*[a-zA-Z0-9]$/,
  USERNAME_MAX_LEN: 25,
  ERROR_MESSAGES: {
    REQRUIRED: "This field is required",
  },
};

export default accountsCommonConstants;
