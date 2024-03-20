import { toast } from "react-toastify";
import { CREATE_SERVICE_PATH } from "../../../../QF/constants/constant";
import { postData } from "../../../../QF/utils/utils";
import Sidebar from "../../../../components/admin-dashboard/sidebar/Sidebar";
import "./newService.css";
import { useState } from "react";

export default function NewService() {

  const [values, setValues] = useState({
    name: "",
    keyWord: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      postData(CREATE_SERVICE_PATH,{
        name: values.name,
        keyWord: values.keyWord,
      })
      toast.success(`${values.name} has been added to the database`);
    } catch (err) {
      if (!err?.response) {
      } else if (err.response?.status === 400) {
        toast.error("Service already exists");
      } else if (err.response?.status === 403) {
        toast.error("You are Unauthorized to perform this action");
      } else {
        toast.error("Unable to Create Service");
      }
    }
  };

  return (
    <div className="sidebar-container">
      <Sidebar />
      <div className="newService">
        <h2 className="addServiceTitle">New Category</h2>
        <form onSubmit={handleSubmit} className="addServiceForm">
          <div className="addServiceItem">
            <label>Name</label>
            <input
              name="name"
              onChange={onChange}
              type="text"
              placeholder="Enter Category Name"
              required
            />
          </div>
          <div className="addServiceItem">
            <label>Key Word</label>
            <input
              name="keyWord"
              onChange={onChange}
              type="text"
              placeholder="Enter keyWord"
              required
            />
          </div>
          <button className="addServiceButton">Create</button>
        </form>
      </div>
    </div>
  );
}
