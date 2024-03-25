
import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import './CommonStyles.css'
import { getCookie, getData } from "../../QF/utils/utils";
import { BOOKING_BASE_PATH, CONFIRM_BOOKING_PATH } from "../../QF/constants/constant";
import { DATA_MAPPER_BOOKING } from "../../QF/mappers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ClientOrders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams({ id: getCookie("userId"), isServiceman: JSON.parse(localStorage.getItem("response"))?.isServiceman === "P" }).toString();
    const url = `${BOOKING_BASE_PATH}?${queryParams}`;

    getData(url).then(e => {
      if (e.code === 200) {
        const res = DATA_MAPPER_BOOKING(e.data);
        setData(res);
      }
    });

  }, []);

  const handleConfirmBooking = async (bookingId) => {
    //   try {
    const url = `${CONFIRM_BOOKING_PATH}?id=${bookingId}`;
    const res = await getData(url);
    let modalContent = "";
    if (res.code === 200) {
      switch (res.code) {
        case 200:
          modalContent = 'Booking Confirmed successfully!';
          toast.success(modalContent)
          break;
        case 412:
          modalContent = 'Problem With Booking Creation!';
          toast.success(modalContent)

          break;
        default:
          modalContent = 'Something went wrong with the backend!';
          toast.success(modalContent)
      }
      setData((prv) => prv.map((el) => el === bookingId ? { ...el, isCanceled: !el.isCanceled } : el));
    }
    //   } catch (error) {
    //     // console.error('Failed to cancel booking:', error);
    //   }
  };

  return (
    <div className="wrapper">
      <Section title="Completed" data={data.filter(e => e.status === "Completed")} />
      <Section title="Pending" data={data.filter(e => e.status === "Pending")} confirm={handleConfirmBooking} />
      <Section title="Canceled" data={data.filter(e => e.status === "Cancelled")} />
      <Section title="Approved" data={data.filter(e => e.status === "Accepted")} />
    </div>
  );
};

function Section({ title, data, confirm }) {
  return (
    <div className="section">
      <Typography variant="h2" className="sectionTitle">
        {title}
      </Typography>
      <Grid container spacing={3} className="card-container">
        {data?.length > 0 ? data?.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <CustomCard {...order} confirm={confirm} />
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

function CustomCard({ bookingId, serviceName, description, status, dateOfAppointment, dateOfBooking, professional, confirm }) {

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
        {RenderButton(status, confirm, bookingId)}
      </Box>
    </Card>
  );
}

function RenderButton(status, confirm, id) {
  const navigate = useNavigate()
  const handleChat = async (bookingId) => {
    navigate(`/chat/${id}`)
  };
  if (status === "Pending") {
    return (
      <>
        <Button onClick={() => confirm(id)} className="accept">Accept</Button>
        <Button className="reject">Reject</Button>
      </>
    );
  } else if (status === "Completed") {
    return (
      <>
        <Button className="reject">delete</Button>
      </>
    );
  } else if (status === "Canceled") {
    return <Button className="reject">delete</Button>;
  } else if (status === "Accepted") {
    return (
      <>
        <Button className="approved" onClick={handleChat}>Chat</Button>
        <Button className="approved">Cancel</Button>
      </>
    );
  } else {
    return null;
  }
}
