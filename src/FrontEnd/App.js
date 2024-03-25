import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { Home } from './pages/Home';
import { ContactUs } from './pages/Contact-Us';
import { RegisterAsProfessional } from './pages/Register-as-professional';
import { ServicesCategories } from './pages/Services/ServicesCategories';
import { ClientOrders } from './container/Orders-Dashboards/ClientOrders'
import { SignUp } from './container/SignIn-SignUp/Sign-Up/SignUp';
import { SignIn } from './container/SignIn-SignUp/Sign-In/SignIn';

import AllServices from './pages/Services/AllServices';

import ServicePage from './pages/service-details-pages/appliance-repair/ApplianceRepairCheckout';

// pages for admin dashboard

import AdminHome from "./pages/admin-dashboard-pages/admin-home/adminHome";
import UserList from "./pages/admin-dashboard-pages/users/userList/UserList";
import User from "./pages/admin-dashboard-pages/users/user/User";

import ServiceList from "./pages/admin-dashboard-pages/services/serviceList/ServiceList";
import Service from "./pages/admin-dashboard-pages/services/service/Service";
import NewService from "./pages/admin-dashboard-pages/services/newServices/NewService";
import ProfessionalList from "./pages/admin-dashboard-pages/professionals/professionalList/ProfessionalList";
import Professional from "./pages/admin-dashboard-pages/professionals/professional/Professional";
import NewProfessional from "./pages/admin-dashboard-pages/professionals/newProfessional/NewProfessional";
import AdminList from "./pages/admin-dashboard-pages/admins/adminList/AdminList";
import Admin from "./pages/admin-dashboard-pages/admins/admin/Admin";
import NewAdmin from "./pages/admin-dashboard-pages/admins/newAdmin/NewAdmin";
import CheckoutForm from './pages/checkout-form/CheckoutForm';
import Error from './pages/Error Page/Error';
import UnderConstruction from './pages/under-construction/UnderConstruction';
import Success from './pages/Success/Success';

import UserDashboard from './pages/user-dashboard/userDashboard';
import OTPpage from './QF/pages/otp/otppage';
import ProfilePage from './QF/pages/professional/Dashboard/dashboard';
import ChatPage from './QF/pages/chat/chatpage';



function App() {

  const [data, setData] = useState({});

  // Data is passed in local storage from sign in form
  useEffect(() => {
    const response = localStorage.getItem("response");
    if (response) {
      setData(JSON.parse(response));
    }
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Common Routes */}
        <Route exact path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignUp/otp" element={<OTPpage />} />
        <Route path="/Categories" element={<ServicesCategories />} />
        <Route path="/Contact-Us" element={<ContactUs />} />
        <Route path="/checkout/:proId/:category" element={<CheckoutForm />} />
        <Route path="/Orders" element={<ClientOrders />} />
        <Route path="/online/professionals" element={<ProfessionalList />} />


        {/*  Chat page */}

        <Route path="/chat/:bookingId" element={<ChatPage />} />

        {/* Professionals */}
        <Route path="/professionals/dashboard/:id/:serviceId" element={<ProfilePage />} />
        <Route path="/professional/:professionalId" element={<Professional />} />

        {/* AdminFlow */}
        <Route path="/admins" element={<AdminList />} />
        <Route path="/newAdmin" element={<NewAdmin />} />
        <Route path="/admin-dashboard" element={<AdminHome />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/newService" element={<NewService />} />

        <Route path="/admin/:adminId" element={<Admin />} />
        <Route path="/service/:ServiceId" element={<Service />} />
        <Route path="/user/:userId" element={<User />} />




        {/* Link in pages/services/ServicesCategories*/}
        <Route path="/Categories/:category" element={<AllServices />} />


        {/* Link in components/services/services.jsx */}
        <Route path="/categories/:category/:subCategory" element={<ServicePage />} />

        {data && (
          <Route
            path="/dashboard"
            element={
              data.role === "admin" ? (
                <AdminHome />
              ) : data.role === "professional" ? (
                <UnderConstruction />
              ) : (
                <UserDashboard />
              )
            }
          />
        )}

        <Route path="/RegisterAsProfessional" element={<RegisterAsProfessional />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="*" element={<Error />} />
        <Route path="/under-construction" element={<UnderConstruction />} />
        <Route path="/success.html" element={<Success />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
