import './App.css'
import {RootLayout} from "./components/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import Signup from './components/Signup.tsx';
import Login from './components/Login.tsx';
import store from './store/store.ts';



function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element : <RootLayout/>,
      children: [
        { path: '', element: <Navigate to="/signup" replace /> },
        { path: '/signup', element: <Signup /> },
        { path: '/login', element: <Login /> },
        { path: '/dashboard', element: <Dashboard /> },
        // { path: '/customer', element: <CustomerPage/> },
        // { path: '/product', element: <ProductsPage/> },
        // { path: '/orders', element: <OrdersPage /> },
        // { path: '/setting', element: <SettingPage /> },
        // { path: '/logout', element: <Logout /> },
      ],
    },
  ])

  return (
      <>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </>
  );
}

export default App
