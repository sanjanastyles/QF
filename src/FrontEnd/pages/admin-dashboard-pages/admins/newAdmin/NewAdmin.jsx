import { CREATE_ADMIN_PATH } from "../../../../QF/constants/constant";
import { postData } from "../../../../QF/utils/utils";
import Sidebar from "../../../../components/admin-dashboard/sidebar/Sidebar";
import "./newAdmin.css";
import { useState } from "react";
import { toast } from "react-toastify";


export default function NewAdmin() {
  const [values, setValues] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      postData(CREATE_ADMIN_PATH, {
        username: values.username,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })


      toast.success("New Admin Created!");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Values");
      } else if (err.response?.status === 409) {
        toast.error("Username, Phone or Email already exists!");
      } else if (err.response?.status === 403) {
        toast.error("You are Unauthorized");
      } else {
        toast.error("Fail to Create Admin");
      }
    }
  };

  return (
    <div className="sidebar-container">
      <Sidebar />
      <div className="newAdmin">
        <h2 className="newAdminTitle">New Admin</h2>
        <form onSubmit={handleSubmit} className="newAdminForm">
          <div className="newAdminItem">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="john"
              onChange={onChange}
              required
            />
          </div>
          <div className="newAdminItem">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Smith"
              onChange={onChange}
              required
            />
          </div>
          <div className="newAdminItem">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              onChange={onChange}
              required
            />
          </div>
          <div className="newAdminItem">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="*********"
              onChange={onChange}
              required
            />
          </div>
          <div className="newAdminItem">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="+91 0000000000"
              onChange={onChange}
              required
            />
          </div>

          <button className="newAdminButton">Create</button>
        </form>
      </div>
    </div>
  );
}
