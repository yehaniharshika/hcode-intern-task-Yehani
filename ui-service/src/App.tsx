import "./App.css";
import { RootLayout } from "./components/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import store from "./store/store.ts";
import SettingPage from "./pages/SettingPage.tsx";
import ExportVehiclesPage from "./pages/ExportVehiclesPage.tsx";
import "animate.css";
import VehiclePage from "./pages/VehiclePage.tsx";
import Logout from "./pages/Logout.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        { path: "", element: <Navigate to="/signup" replace /> },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/uploads", element: <VehiclePage /> },
        { path: "/reports", element: <ExportVehiclesPage /> },
        { path: "/setting", element: <SettingPage /> },
        { path: '/logout', element: <Logout /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}

export default App;
