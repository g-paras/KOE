import { BrowserRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import BaseConnect from "src/shared/components/BaseConnect/BaseConnect";
import ROUTES from "src/shared/constants/RouteConstants";
import getRoutes from "src/shared/utils/RouteUtils";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BaseConnect
            component={({ authenticated }) => (
              <Routes>{getRoutes(ROUTES, authenticated)}</Routes>
            )}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
