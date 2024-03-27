
import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { getCookie, getData } from "../../QF/utils/utils";
import { BOOKING_BASE_PATH, CANCEL_BOOKING_PATH, CONFIRM_BOOKING_PATH, DELETE_BOOKING_PATH } from "../../QF/constants/constant";
import { DATA_MAPPER_BOOKING } from "../../QF/mappers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './CommonStyles.css'

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
    try {
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
        window.location.reload();
      }

    }
    catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      const url = `${DELETE_BOOKING_PATH}/?id=${bookingId}`;
      const res = await getData(url);
      let modalContent = "";

      if (res.code === 200) {
        switch (res.code) {
          case 200:
            modalContent = 'Booking Delete successfully!';
            toast.success(modalContent)
            break;
          case 412:
            modalContent = 'Problem With Booking Deletion!';
            toast.success(modalContent)

            break;
          default:
            modalContent = 'Something went wrong with the backend!';
            toast.success(modalContent)
        }
        setData((prv) => prv.map((el) => el === bookingId ? { ...el, isCanceled: !el.isCanceled } : el));
        window.location.reload();

      }
    }
    catch (error) {
      console.error('Failed to Delete booking:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const url = `${CANCEL_BOOKING_PATH}/?id=${bookingId}`;
      const res = await getData(url);
      let modalContent = "";

      if (res.code === 200) {
        switch (res.code) {
          case 200:
            modalContent = 'Booking Cancelled successfully!';
            toast.success(modalContent)
            break;
          case 412:
            modalContent = 'Problem With Booking Cancellation!';
            toast.success(modalContent)

            break;
          default:
            modalContent = 'Something went wrong with the backend!';
            toast.success(modalContent)
        }
        setData((prv) => prv.map((el) => el === bookingId ? { ...el, isCanceled: !el.isCanceled } : el));
        window.location.reload();

      }
    }
    catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  return (
    <div className="wrapper">
      <Section title="Completed" data={data.filter(e => e.status === "Completed")} confirm={handleConfirmBooking} deleteBooking={handleDelete} cancel={handleCancelBooking} />
      <Section title="Pending" data={data.filter(e => e.status === "Pending")} confirm={handleConfirmBooking} deleteBooking={handleDelete} cancel={handleCancelBooking} />
      <Section title="Canceled" data={data.filter(e => e.status === "Cancelled")} confirm={handleConfirmBooking} deleteBooking={handleDelete} cancel={handleCancelBooking} />
      <Section title="Approved" data={data.filter(e => e.status === "Accepted")} confirm={handleConfirmBooking} deleteBooking={handleDelete} cancel={handleCancelBooking} />
    </div>
  );
};

function Section({ title, data, confirm, deleteBooking, cancel }) {
  return (
    <div className="section">
      <Typography variant="h2" className="sectionTitle">
        {title}
      </Typography>
      <Grid container spacing={3} className="card-container">
        {data?.length > 0 ? data?.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <CustomCard {...order} confirm={confirm} deleteBooking={deleteBooking} cancel={cancel} />
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

function CustomCard({ bookingId, serviceName, description, customerName,contactNumber,status, dateOfAppointment, dateOfBooking, professional, confirm, cancel, deleteBooking,associatedCustomer, associatedServiceman }) {

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
          Customer name : {customerName}
        </Typography>

        <Typography variant="h6" className="cardTitle">
          Customer Contact: {contactNumber}
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
        {RenderButton(status, confirm, bookingId, deleteBooking, cancel, associatedServiceman, associatedCustomer)}
      </Box>
    </Card>
  );
}

function RenderButton(status, confirm, id, deleteBooking, cancel, pId, associatedCustomer) {
  const navigate = useNavigate()
  const handleChat = async () => {
    navigate(`/chat/${pId}/${associatedCustomer}/${id}`)
  };
  if (status === "Pending") {
    return (
      <>
        {pId === getCookie("userId") && <Button onClick={() => confirm(id)} className="accept">Accept</Button>}
        <Button onClick={() => cancel(id)} className="reject">Reject</Button>
      </>
    );
  } else if (status === "Completed") {
    return (
      <>
        <Button onClick={() => deleteBooking(id)} className="reject">delete</Button>
      </>
    );
  } else if (status === "Cancelled") {
    return <Button onClick={() => deleteBooking(id)} className="reject">delete</Button>;
  } else if (status === "Accepted") {
    return (
      <>
        <Button className="approved" onClick={handleChat}>Chat</Button>
        <Button onClick={() => cancel(id)} className="approved">Cancel</Button>
      </>
    );
  } else {
    return null;
  }
}
