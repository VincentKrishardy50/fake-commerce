import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./routers/private_route";
import Home from "./pages/home";
import Login from "./pages/login";
import Details from "./pages/detail";
import { useEffect, useState } from "react";

const App = () => {
  const isLogin = localStorage.getItem("isLogin")
  const [LoggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (isLogin) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    const intervalId = setInterval(() => {
      const isLogin2 = localStorage.getItem("isLogin");
      if (isLogin2) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isLogin]);

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: (
          <PrivateRoute isLoggedIn={LoggedIn}>
<Home/>
          </PrivateRoute>
          ),
        },
        {
          path: ":id",
          element:(<PrivateRoute isLoggedIn={LoggedIn}>
            <Details/>
            </PrivateRoute>) ,
        },
      ],
    },
    {
      path: "/signinup",
      element: <Login setLoggedIn={setLoggedIn}/>,
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
