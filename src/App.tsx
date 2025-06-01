import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import moment from "moment";
import Links from "./pages/Link";

const App = () => {
  moment.locale('id'); // sebelum render

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/apps",
          element: <Apps />,
        },
        {
          path: "/links",
          element: <Links />
        }
      ])}
    />
  );
};

export default App;
