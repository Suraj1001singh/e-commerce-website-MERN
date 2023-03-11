import "./App.css";
import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header/Header";

import ProductOverview from "./components/productOverview/ProductOverview";
import Checkout from "./components/pages/checkout/Checkout";
import Login from "./components/login/Login";
import HomePage from "./components/pages/homePage/HomePage";
import AllProductPage from "./components/pages/allProductPage/AllProductPage";
import NoPageFound from "./components/loaderPage/noPageFound/NoPageFound";
import Loader from "./components/loader/Loader";
import OrderHistory from "./components/pages/orderHistory/OrderHistory";
import OrderDetail from "./components/pages/orderHistory/orderDetail/OrderDetail";
import Categories from "./components/admin/categories/Categories";
import GlobalContext from "./context/GlobalContext";
import CreateProducts from "./components/admin/createProducts/CreateProducts";
import EditProduct from "./components/admin/editProduct/EditProduct";

import PhotoViewer from './components/photoViewer/PhotoViewer'


function App() {
  const context = useContext(GlobalContext);
  const { state } = context;
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/allProducts" component={AllProductPage}></Route>
          <Route exact path="/detail/:id" component={ProductOverview}></Route>
          <Route exact path="/checkout" component={Checkout}></Route>
          <Route exact path="/orderhistory" component={isLogged ? OrderHistory : NoPageFound}></Route>
          <Route exact path="/orderhistory/:id" component={isLogged ? OrderDetail : NoPageFound}></Route>
          <Route exact path="/login" component={isLogged ? NoPageFound : Login}></Route>
          <Route exact path="/register" component={isLogged ? NoPageFound : Login}></Route>
          <Route exact path="/loader" component={Loader}></Route>

          {/* //admin routes */}
          <Route exact path="/categories" component={isAdmin ? Categories : NoPageFound}></Route>
          <Route exact path="/createproducts" component={isAdmin ? CreateProducts : NoPageFound}></Route>
          <Route exact path="/editproduct/:id" component={isAdmin ? EditProduct : NoPageFound}></Route>
          <Route exact path="/no" component={NoPageFound}></Route>
          
          <Route exact path="/photo" component={PhotoViewer}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
