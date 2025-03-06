import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/animate.css";
import "./assets/css/bootstrap.css";
import "./assets/css/flaticon.css";
import "./assets/css/fontawesome-all.css";
import "./assets/css/hover.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/jquery.fancybox.min.css";
import "./assets/css/owl.css";
import "./assets/css/scrollbar.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import {
  appData,
  DataProvider,
} from "../src/components/Context/AppContext.jsx";
import LoginPage from "./components/Login/LoginPage.jsx";
import About from "./components/About/About.jsx";
import SignUpPage from "./components/Login/SignUpPage.jsx";
import ForgetPassword from "./components/Login/ForgetPassword.jsx";
import Home from "./components/Home/Home.jsx";
import Membership from "./components/MemberShip/Membership.jsx";
import OpenAIMembership from "./components/MemberShip/OpenAIMembership.jsx";
import IvestMembership from "./components/MemberShip/IvestMembership.jsx";
import SpaceXMembership from "./components/MemberShip/SpaceXMembership.jsx";
import FutureClubs from "./components/FutureClubs/FutureClubs.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import MyMemberShipClubs from "./components/MyMembershipClubs/MyMemberShipClubs.jsx";
import MyAccount from "./components/MyAccount/MyAccount.jsx";
import ScrollOnTop from "./components/Scroll/ScrollOnTop.jsx";
import { useEffect } from "react";
import { baseUrl } from "../apiConfig.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ResetPassword from "./components/Login/ResetPassword.jsx";
import PrivateRoute from "./components/Common/PrivateRoute.jsx";
import UnderConstruction from "./components/UnderConstruction.jsx";
import PrivateMembership from "./components/MemberShip/PrivateMembership.jsx";
import PublicMemberShip from "./components/MemberShip/PublicMemberShip.jsx";
import StaticPublicMembership from "./components/MemberShip/StaticPublicMembership.jsx";
import Articals from "./components/Blogs/Articals.jsx";
import News from "./components/Blogs/News.jsx";
import { TransactionHistory } from "./components/TransactionHistory/TransactionHistory.jsx";
import Shop from "./components/Shop/Shop.jsx";
import ContactUs from "./components/Contact/ContactUs.jsx";
import BlogList from "./components/Blog/BlogList.jsx";
import BlogView from "./components/Blog/BlogView.jsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <BrowserRouter>
          <ScrollOnTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <Route index element={<Navigate to="/" />} /> */}
              <Route index  element={<Home />} />
              <Route path="Login" element={<LoginPage />} />
              <Route path="ResetPassword" element={<ResetPassword />} />
              <Route path="SignUp" element={<SignUpPage />} />
              {/* <Route path="ContactUs" element={<UnderConstruction />} /> */}
              <Route path="ContactUs" element={<ContactUs />} />
              {/* <Route path="Blogs" element={<UnderConstruction />} /> */}
              <Route path="Blog" element={<BlogList />} />
              <Route path="Blog/View" element={<BlogView />} />
              <Route path="ConnectWallet" element={<UnderConstruction />} />
              <Route path="Forget" element={<ForgetPassword />} />
              <Route path="About" element={<About />} />
              <Route path="shop" element={<Shop />} />
                <Route
                  path="Membership/Public"
                  element={<PublicMemberShip />}
                />
                 <Route
                  path="Membership/FutureClubs"
                  element={<FutureClubs />}
                />
              <Route element={<PrivateRoute />}>
                <Route path="Membership" element={<Membership />} />
                <Route path="Articals" element={<Articals />} />
                <Route path="News" element={<News />} />
                <Route
                  path="Membership/PublicMemberShip"
                  element={<StaticPublicMembership />}
                />
                <Route
                  path="Membership/Private"
                  element={<PrivateMembership />}
                />
                <Route
                  path="Membership/OpenAIMembership"
                  element={<OpenAIMembership />}
                />
                <Route
                  path="Membership/IvestMembership"
                  element={<IvestMembership />}
                />
                <Route
                  path="Membership/SpaceXMembership"
                  element={<SpaceXMembership />}
                />
               
                <Route path="Dashboard" element={<Dashboard />} />
                <Route
                  path="Dashboard/MyMemberShipClubs"
                  element={<MyMemberShipClubs />}
                />
                <Route
                  path="Dashboard/TransactionHistory"
                  element={<TransactionHistory />}
                />
                <Route path="Dashboard/MyAccount" element={<MyAccount />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
