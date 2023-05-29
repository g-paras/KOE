import { Route } from "react-router-dom";

import PrivateRoute from "src/shared/components/PrivateRoute/PrivateRoute";
import SetTitle from "../components/SetTitle";

const getRoutes = (routes, authenticated) => {
  return routes.map(({ guarded, title, path, ...rest }) => (
    <Route
      key={path}
      path={path}
      element={
        <SetTitle
          title={title}
          children={
            guarded ? (
              <PrivateRoute
                authenticated={authenticated}
                component={<rest.component />}
              />
            ) : (
              <rest.component />
            )
          }
        />
      }
    />
  ));
};

export default getRoutes;
