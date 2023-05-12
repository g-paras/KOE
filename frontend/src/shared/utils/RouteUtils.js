import { Route } from "react-router-dom";

import PrivateRoute from "src/shared/components/PrivateRoute/PrivateRoute";

const getRoutes = (routes, authenticated) => {
  return routes.map(({ guarded, path, ...rest }) => (
    <Route
      key={path}
      path={path}
      element={
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
  ));
};

export default getRoutes;
