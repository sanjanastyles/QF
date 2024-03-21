/**
 * @TODO need to replace with Actual Api DATA
 * @REFER Starfire
 */

import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import './CommonStyles.css'
import { getCookie, getData } from "../../QF/utils/utils";
import { BOOKING_BASE_PATH } from "../../QF/constants/constant";
import { DATA_MAPPER_BOOKING } from "../../QF/mappers";



export const ClientOrders = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const queryParams = new URLSearchParams({ id: getCookie("userId"), isServiceman: JSON.parse(localStorage.getItem("response"))?.isServiceman === "P" }).toString();
    const url = `${BOOKING_BASE_PATH}?${queryParams}`

    getData(url).then(e => {
      if (e.code === 200) {
        const res = DATA_MAPPER_BOOKING(e.data)
        setData(res)
      }
    })

  }, [])
  return (
    <div className="wrapper">
      <Section title="Completed" data={data.filter(e => e.status === "Completed")} />
      <Section title="Pending" data={data.filter(e => e.status === "Pending")} />
      <Section title="Canceled" data={data.filter(e => e.status === "Cancelled")} />
      <Section title="Approved" data={data.filter(e => e.status === "Accepted")} />
    </div>
  );
};

function Section({ title, data }) {
  return (
    <div className="section">
      <Typography variant="h2" className="sectionTitle">
        {title}
      </Typography>
      <Grid container spacing={3} className="card-container">
        {data?.length > 0 ? data?.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <CustomCard {...order} />
          </Grid>
        )) : (
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5">
              Nothing to show...
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

function CustomCard({ serviceName, description, status, dateOfAppointment, dateOfBooking, professional }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <img src={img} alt={title} className="cardImg" /> */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" className="cardTitle">
          Service Name : {serviceName}
        </Typography>
        <Typography variant="body2" className="cardDescription">
          Description : {description}
        </Typography>
        <Typography variant="h6" className="cardTitle">
          dateOfAppointment : {dateOfAppointment}
        </Typography>
        <Typography variant="h6" className="cardTitle">
          dateOfBooking : {dateOfBooking}
        </Typography>

        <Typography variant="h6" className="cardTitle">
          professional name : {professional.name}
        </Typography>

        <Typography variant="h6" className="cardTitle">
          professional email: {professional.email}
        </Typography>
        <Typography variant="body1" className="status">
          Status: {status}
        </Typography>
        <Typography variant="h6" className="cardPrice">
          ₹{100}
        </Typography>
        {renderButton(status)}
      </Box>
    </Card>
  );
}

function renderButton(status) {
  switch (status) {
    case "Pending":
      return <Button className="pending">Pending</Button>;
    case "Completed":
      return (
        <>
          <Button className="accept">Accept</Button>
          <Button className="reject">Reject</Button>
        </>
      );
    case "Canceled":
      return <Button className="completed" disabled>Cancelled</Button>;
    case "Approved":
      return <Button className="approved">Approved</Button>;
    default:
      return null;
  }
}

