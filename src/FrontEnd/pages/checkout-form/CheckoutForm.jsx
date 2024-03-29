import React, { useState } from "react";
import { Dropdown } from "../../components/dropdown/Dropdown";
import styles from "./checkoutForm.module.css";
import { Cities } from "../../Data/CityData";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCookie, postData } from "../../QF/utils/utils";
import { BOOKING_PAGE_PATH } from "../../QF/constants/constant";

const CheckoutForm = () => {
  const { proId, category } = useParams();
  const nav = useNavigate()
  const [childData, setChildData] = useState("");

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    serviceDate: "",
    address: "",
    note: "",
    phoneNumber: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        serviceName: category,
        phoneNumber: values.phoneNumber,
        serviceDate: values.serviceDate,
        note: values.note,
        fullName: values.fullName,
        address: values.address,
        associatedCustomer: getCookie("userId"),
        associatedServiceman: proId,
        email: "userEmail",
        city: childData,
        offerPrice: 500,
// coods:[{
//   lat:
//   lon:
// }]
      };

      const response = await postData(BOOKING_PAGE_PATH, data).then(e => {
        nav('/');
        e.code < 300 ?
          toast.success("Service Booked Successfully") : toast.error("Service Not Booked Successfully");
      });
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("Professionals not available for selected location");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized access");
      } else {
        console.error("Error occurred:", err);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.title}>Checkout Order</div>
          <div className={styles.content}>
            <form onSubmit={handleSubmit}>
              <div className={styles["user-details"]}>
                <div className={styles["input-box"]}>
                  <span className={styles.details}>Full Name</span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Dear"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className={styles["input-box"]}>
                  <span className={styles.details}>Phone Number</span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className={styles["input-box"]}>
                  <span className={styles.details}>Service Date</span>
                  <input
                    name="serviceDate"
                    type="date"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className={styles["input-box"]}>
                  <span className={styles.details}>Address</span>
                  <textarea
                    name="address"
                    onChange={onChange}
                    type="text"
                    placeholder="Enter your Address"
                    required
                  />
                </div>
                <div className={styles["input-box"]}>
                  <span className={styles.details}>City</span>
                  <Dropdown
                    name="city"
                    selectedCity={(childData) => setChildData(childData)}
                    placeholder="Enter the City"
                    data={Cities}
                    required
                  />
                </div>
                <div className={styles["input-box"]}>
                  <span className={styles.details}>Note</span>
                  <textarea
                    name="note"
                    onChange={onChange}
                    type="text"
                    placeholder="Describe the problem in detail"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="button">
                Book Service
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutForm;
