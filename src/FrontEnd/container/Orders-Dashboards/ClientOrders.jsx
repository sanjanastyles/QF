/**
 * @TODO need to replace with Actual Api DATA
 * @REFER Starfire
 */

import React from "react";
import { Card, Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import './CommonStyles.css'

const mockData = {
  completed: [
    {
      id: 1,
      img: "path/to/image1.jpg",
      title: "Appliance Repair",
      description: "Household Appliances",
      price: "450",
      status: "Completed",
    },
    {
      id: 2,
      img: "path/to/image2.jpg",
      title: "Appliance Repair",
      description: "Fan Repair",
      price: "500",
      status: "Completed",
    },
  ],
  pending: [
    {
      id: 3,
      img: "path/to/image3.jpg",
      title: "House Cleaning",
      description: "Pest Control",
      price: "300",
      status: "Pending",
    },
  ],
  canceled: [
    {
      id: 4,
      img: "path/to/image4.jpg",
      title: "Event Management",
      description: "Photography",
      price: "600",
      status: "Canceled",
    },
  ],
};

export const ClientOrders = () => {
  return (
    <div className="wrapper">
      <Section  title="Completed" data={mockData.completed} />
      <Section title="Pending" data={mockData.pending} />
      <Section title="Canceled" data={mockData.canceled} />
      <Section title="Approved" data={mockData.approved} />
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

function CustomCard({ img, title, description, price, status }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <img src={img} alt={title} className="cardImg" />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" className="cardTitle">
          {title}
        </Typography>
        <Typography variant="body2" className="cardDescription">
          {description}
        </Typography>
        <Typography variant="body1" className="status">
          Status: {status}
        </Typography>
        <Typography variant="h6" className="cardPrice">
          ₹{price}
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

