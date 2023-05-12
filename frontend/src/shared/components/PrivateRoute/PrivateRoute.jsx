import { Navigate } from "react-router-dom";

import stateUrls from "src/shared/constants/StateUrls";

const PrivateRoute = (props) => {
  const { authenticated, component } = props;

  return (
    authenticated ? component : <Navigate to={stateUrls.LOGIN} />
  );
};

export default PrivateRoute;
