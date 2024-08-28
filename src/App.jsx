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
import { DataProvider } from "../src/components/Context/AppContext.jsx";
import LoginPage from "./components/Login/LoginPage.jsx";
import About from "./components/About/About.jsx";
import SignUpPage from "./components/Login/SignUpPage.jsx";
import ForgetPassword from "./components/Login/ForgetPassword.jsx";
import Home from "./components/Home/Home.jsx";
import Membership from "./components/MemberShip/Membership.jsx";
import PublicMemberShip from "./components/MemberShip/PublicMemberShip.jsx";
import OpenAIMembership from "./components/MemberShip/OpenAIMembership.jsx";
import IvestMembership from "./components/MemberShip/IvestMembership.jsx";
import SpaceXMembership from "./components/MemberShip/SpaceXMembership.jsx";
import FutureClubs from "./components/FutureClubs/FutureClubs.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import MyMemberShipClubs from "./components/MyMembershipClubs/MyMemberShipClubs.jsx";
import MyAccount from "./components/MyAccount/MyAccount.jsx";





function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Navigate to="home" />} /> */}
            <Route index element={<Home />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="SignUp" element={<SignUpPage />} />
            <Route path="Forget" element={<ForgetPassword />} />
            <Route path="About" element={<About />} />
            <Route path="Membership" element={<Membership />} />
            <Route path="Membership/PublicMemberShip" element={<PublicMemberShip />} />
            <Route path="Membership/OpenAIMembership" element={<OpenAIMembership />} />
            <Route path="Membership/IvestMembership" element={<IvestMembership />} />
            <Route path="Membership/SpaceXMembership" element={<SpaceXMembership />} />
            <Route path="Membership/FutureClubs" element={<FutureClubs />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Dashboard/MyMemberShipClubs" element={<MyMemberShipClubs />} />
            <Route path="Dashboard/MyAccount" element={<MyAccount />} />
         
          
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
