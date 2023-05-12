import { BrowserRouter, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { AuthProvider } from "./contexts/AuthContext";
import { CreateAdProvider } from "./contexts/PostContext";
import ROUTES from "src/shared/constants/RouteConstants";
import getRoutes from "src/shared/utils/RouteUtils";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <CreateAdProvider>
              <Routes>{getRoutes(ROUTES, true)}</Routes>
            </CreateAdProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
