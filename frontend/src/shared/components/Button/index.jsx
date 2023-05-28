const Button = (props) => {
  const {
    btnText,
    loading,
    loadingText,
    disabled,
    onClick,
    extraClasses,
    ...extraProps
  } = props;

  return (
    <button
      className={`px-4 py-2 bg-indigo-500 rounded text-white w-full flex items-center justify-center hover:bg-indigo-600 ${
        (disabled || loading) && "cursor-default opacity-50"
      } ${extraClasses}`}
      onClick={onClick}
      {...extraProps}
    >
      {loading && (
        <svg
          className="animate-spin mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {(loading && loadingText) || btnText}
    </button>
  );
};

export default Button;
