import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/icons/logo2.png";
import navbarStyles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAllCookies, getCookie } from "../../QF/utils/utils";

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("response"));
    if (response) {
      setUserData({ ...response, role: response?.isServiceman ? response?.isServiceman : "A" });
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("response");
    navigate("/");
    deleteAllCookies()


    window.location.reload();
    toast.success("Logged out Successfully");
  };

  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.navbar_links_logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={navbarStyles.custom_Class}>QwickFix Services</div>

      <div className={navbarStyles.navbar_links}>
        <div className={navbarStyles.navbar_links_container}>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/Categories">Categories</Link></p>
          {userData.isServiceman === "C" && <p><Link to="/RegisterAsProfessional">Register As Professional</Link></p>}
          {getCookie('userId') && userData.type !== "admin" ? <p><Link to="/orders">Your orders</Link></p> : null}
          
          <p>


            {userData.type === "admin" && (
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            )
            }

          </p>
          {userData.type !== "admin" && getCookie("userId") ? <p><Link to="/dashboard">Dashboard</Link></p> : null}


          {userData.type !== "admin" && <p><Link to="/ContactUs">Contact Us</Link></p>}
        </div>
      </div>

      <div className={navbarStyles.navbar_sign}>
        <p className={navbarStyles.signIn}>
          {userData.name || userData.fullName ? userData.name ?? userData.fullName : <Link to="/SignIn">Sign in</Link>}
        </p>
        <p className={navbarStyles.logout}>
          {userData.name || userData.fullName ? (
            <p onClick={handleLogout}>Logout</p>
          ) : (
            <p>
              <Link to="/SignUp">Sign up</Link>
            </p>
          )}
        </p>
      </div>

      <div className={navbarStyles.navbar_menu}>
        {toggleMenu ? (
          <RiCloseLine color="#fff" size={30} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="#fff" size={30} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className={navbarStyles.navbar_menu_background}>
            <div className={`${navbarStyles.navbar_menu_container} ${navbarStyles.scale_up_center}`}>
              <div className={navbarStyles.navbar_menu_container_links}>
                <p onClick={() => setToggleMenu(false)}><Link to="/">Home</Link></p>
                <p onClick={() => setToggleMenu(false)}><Link to="/Categories">Categories</Link></p>
                {userData.isServiceman === "C" && <p><Link to="/RegisterAsProfessional">Register As Professional</Link></p>}
                {getCookie('userId') && userData.type !== "admin" ? <p><Link to="/orders">Your orders</Link></p> : null}

                <p>


                  {userData.type === "admin" && (
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                  )
                  }

                </p>
                {userData.type !== "admin" && getCookie("userId") ? <p><Link to="/dashboard">Dashboard</Link></p> : null}


                {userData.type !== "admin" && <p onClick={() => setToggleMenu(false)}><Link to="/ContactUs">Contact Us</Link></p>}
              </div>
              <div className={navbarStyles.navbar_menu_container_links_sign}>
                <p onClick={() => setToggleMenu(false)} className={navbarStyles.signIn}>
                  {userData.isServiceman ? userData?.name : <Link to="/SignIn">Sign in</Link>}
                </p>
                <div onClick={() => setToggleMenu(false)} className={navbarStyles.logout}>
                  {userData.name ? (
                    <p onClick={handleLogout}>Logout</p>
                  ) : (
                    <Link to="/SignUp">Sign up</Link>
                  )}
                </div>
              </div>
              <div onClick={() => setToggleMenu(false)} className={navbarStyles.navbar_close_button}>
                <RiCloseLine size={40} />
              </div>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};
