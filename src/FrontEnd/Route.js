import React, { useState, useEffect } from 'react';
import './App.css';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
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
import MapPage from './QF/pages/map/map';
import CheckoutPage from './QF/pages/checkout/chekoutPage';
import PaymentSuccessPage from './QF/pages/success/success';
import ErrorPage from './QF/pages/error/errorpsge';

import './modal.css'

function Modal() {
    const [showSignIn, setShowSignIn] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/SignIn')

    };

    const handleSignUp = () => {
        navigate('/SignUp')

    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Welcome!</h2>
                <p>Please sign in or sign up to continue.</p>
                <div className="modal-buttons">
                    <button onClick={handleSignIn}>Sign In</button>
                    <button onClick={handleSignUp}>Sign Up</button>
                </div>
                {/* <button className="close-button">Close</button> */}
            </div>
        </div>
    );
}


const ProtectedRoute = ({ children }) => {
    const [data, setData] = useState(false);

    useEffect(() => {
        const response = localStorage.getItem("response");
        if (response) {
            setData(JSON.parse(response));
        }
    }, []);

    console.log(data);
    if (data) {
        return children;
    }

    return <Modal />
};

const routerConfig = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/SignIn',
        element: <SignIn />,
    },
    {
        path: '/SignUp',
        element: <SignUp />,
    },
    {
        path: '/Contact-Us',
        element: <ContactUs />,
    },
    {
        path: '/ContactUs',
        element: <ContactUs />,
    },
    {
        path: '/Categories',
        element: <ServicesCategories />,
    },
    {
        path: '*',
        element: <Error />,
    },
    //Create
    // {
    //     path: '/forgotpassword',
    //     element: (
    //         <ProtectedRoute>
    //             <ForgotPassword />
    //         </ProtectedRoute>
    //     ),
    // },
    {
        path: '/SignUp/otp',
        element: (
            // <ProtectedRoute>
                <OTPpage />
            // {/* </ProtectedRoute> */}
        ),
    },
    {
        path: '/map/:id',
        element: (
            <ProtectedRoute>
                <MapPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <UserDashboard />
            </ProtectedRoute>
        ),
    },
    // Create
    {
        path: '/online/professionals',
        element: (
            <ProtectedRoute>
                <ProfessionalList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/Categories/:category',
        element: (
            <ProtectedRoute>
                <AllServices />
            </ProtectedRoute>
        ),
    },
    {
        path: '/checkout/:proId/:category',
        element: (
            <ProtectedRoute>
                <CheckoutForm />
            </ProtectedRoute>
        ),
    },
    {
        path: '/chat/:s/:c/:b',
        element: (
            <ProtectedRoute>
                <ChatPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/Orders',
        element: (
            <ProtectedRoute>
                <ClientOrders />
            </ProtectedRoute>
        ),
    },
    {
        path: '/professionals/dashboard/:id/:serviceId',
        element: (
            <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/professional/:professionalId',
        element: (
            <ProtectedRoute>
                <Professional />
            </ProtectedRoute>
        ),
    },
    {
        path: '/categories/:category/:subCategory',
        element: (
            <ProtectedRoute>
                <ServicePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/service/:ServiceId',
        element: (
            <ProtectedRoute>
                <Service />
            </ProtectedRoute>
        ),
    },
    {
        path: '/user/:userId',
        element: (
            <ProtectedRoute>
                <User />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/:adminId',
        element: (
            <ProtectedRoute>
                <Admin />
            </ProtectedRoute>
        ),
    },
    {
        path: '/newService',
        element: (
            <ProtectedRoute>
                <NewService />
            </ProtectedRoute>
        ),
    },
    {
        path: '/services',
        element: (
            <ProtectedRoute>
                <ServiceList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/users',
        element: (
            <ProtectedRoute>
                <UserList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin-dashboard',
        element: (
            <ProtectedRoute>
                <AdminHome />
            </ProtectedRoute>
        ),
    },
    // Create
    // {
    //     path: '/settings/:id',
    //     element: (
    //         <ProtectedRoute>
    //             <SettingsPage />
    //         </ProtectedRoute>
    //     ),
    // },
    {
        path: '/newAdmin',
        element: (
            <ProtectedRoute>
                <NewAdmin />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admins',
        element: (
            <ProtectedRoute>
                <AdminList />
            </ProtectedRoute>
        ),
    },

    {
        path: '/checkout/:id',
        element: (
            <ProtectedRoute>
                <CheckoutPage />
            </ProtectedRoute>
        ),
    },


    {
        path: '/success',
        element: (
            <ProtectedRoute>
                <PaymentSuccessPage />
            </ProtectedRoute>
        ),
    },


    {
        path: '/error',
        element: (
            <ProtectedRoute>
                <ErrorPage />
            </ProtectedRoute>
        ),
    },


    {
        path: '/RegisterAsProfessional',
        element: (
            <ProtectedRoute>
                <RegisterAsProfessional />
            </ProtectedRoute>
        ),
    },


    {
        path: '/success.html',
        element: (
            <ProtectedRoute>
                <Success />
            </ProtectedRoute>
        ),
    },

    {
        path: '/under-construction',
        element: (
            <ProtectedRoute>
                <UnderConstruction />
            </ProtectedRoute>
        ),
    },

];

const router = createBrowserRouter(
    routerConfig
);
export default router;