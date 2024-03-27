import React, { useState, useEffect } from "react";
import style from "./userDashboard.module.css";
import axios from "axios";
import { dateFormatterWithDayName, getCookie, getData } from "../../QF/utils/utils";
import { BOOKING_BASE_PATH, CANCEL_BOOKING_PATH, CONFIRM_BOOKING_PATH, DELETE_BOOKING_PATH } from "../../QF/constants/constant";
import { DATA_MAPPER_BOOKING } from "../../QF/mappers";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { styled } from "@mui/system";

const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  "& .MuiDataGrid-cell": {
    fontSize: "14px",
    color: "#333",
  },
});

function UserDashboard() {
  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);


  useEffect(() => {
    const queryParams = new URLSearchParams({ id: getCookie("userId"), isServiceman: JSON.parse(localStorage.getItem("response"))?.isServiceman === "P" }).toString();
    const url = `${BOOKING_BASE_PATH}?${queryParams}`;

    getData(url)
      .then(response => {
        if (response.code === 200) {
          const res = DATA_MAPPER_BOOKING(response.data);
          setOrder(res);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

  }, []);


  useEffect(() => {
    const response = localStorage.getItem("response");
    if (response) {
      setData(JSON.parse(response));
    }
  }, []);


  const [rows, setRows] = useState([]);

  async function handleClick() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/service/getServices",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 className={style.heading}>Welcome, {data.name || "User"}!</h1>
      </header>

      <section className={style.section}>
        <div className={style.infoCard}>
          <h2>Your Profile</h2>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
        </div>

        <div className={style.actions}>
          <button className={style.button}>Edit Profile</button>
          <button className={style.button}>Change Password</button>
        </div>
      </section>

      <section className={style.section}>
        <h2>Your Orders</h2>
        <div className={style.ordersCard}>

          {order.length === 0 ? (
            <div style={{ height: "auto", width: "100%" }}>
              <p>Order Is empty, please make some order</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className={style.ordersTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name & Email</th>
                    <th>Service Name & Desc</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Phone</th>
                    {/* <th>Status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {order.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {row.customerName}
                      </td>
                      <td>
                        {row.serviceName} <br />{" "}
                        {row.description}
                      </td>
                      <td>
                        Service Date : {dateFormatterWithDayName(row.dateOfAppointment)} <br />{" "}
                        Booking Date : {dateFormatterWithDayName(row.dateOfBooking)}{" "}
                      </td>
                      <td>{row.address}</td>
                      <td>{row.contactNumber}</td>
                      {/* <td className={row.service.serviceStatus == "Pending"? style.pendingOrder : null} >{row.service.serviceStatus}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className={style.recentActivity}>
          <h2>Reviews</h2>
        </div>
      </section>

      {/* <section className={style.section}>
        <div className={style.supportCard}>
          <h2>Customer Support</h2>
          <p>Contact us if you need assistance.</p>
          <button className={style.button}>Contact Support</button>
        </div>
      </section> */}
    </div>
  );
}

export default UserDashboard;
