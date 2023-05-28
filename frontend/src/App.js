import { BrowserRouter, Routes } from "react-router-dom";

import BaseConnect from "src/shared/components/BaseConnect/BaseConnect";
import ROUTES from "src/shared/constants/RouteConstants";
import getRoutes from "src/shared/utils/RouteUtils";

function App() {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <BrowserRouter>
        <BaseConnect
          component={({ authenticated }) => (
            <Routes>{getRoutes(ROUTES, authenticated)}</Routes>
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
