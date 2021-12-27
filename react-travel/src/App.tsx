import React from "react";
import styles from "./App.module.css";
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage,
} from "./pages";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import { useSelector } from "./redux/hooks";

// const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
//   const routeComponent = (props) => {
//     return isAuthenticated ? (
//       React.createElement(component, props)
//     ) : (
//       <Redirect to={{ pathname: "/signIn" }} />
//     );
//   };
//   return <Route render={routeComponent} {...rest} />;
// };

function App() {
  // const jwt = useSelector((s) => s.user.token);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route path="/shoppingCart" element={<ShoppingCartPage />} />
          <Route path="/placeOrder" element={<PlaceOrderPage />} />
          {/* <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            element={<ShoppingCartPage />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
