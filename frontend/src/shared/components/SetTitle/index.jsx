const { useEffect } = require("react");

const SetTitle = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return children;
};

export default SetTitle;
