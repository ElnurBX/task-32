import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ROUTES from "./Routes/routes";
import "./app.scss";
import MainContext from "./context/context";
import { useState } from "react";

function App() {
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState('false');
  const [cartBasket, setCartBasket] = useState([]);
  const router = createBrowserRouter(ROUTES);
  return (
    <MainContext.Provider value={{setCartBasket, cartBasket, loading, setLoading, error, setError}}>
    <RouterProvider router={router }/>
    </MainContext.Provider>
  );
}

export default App;
