// import StarRatings from 'react-star-ratings';
import React, { useState, useEffect } from "react";
import style from "./userDashboard.module.css";
import axios from "axios";
import { dateFormatterWithDayName, getCookie, getData, postData } from "../../QF/utils/utils";
import { BOOKING_BASE_PATH, GET_REVIEW_PATH, POST_REVIEW_PATH } from "../../QF/constants/constant";
import { DATA_MAPPER_BOOKING, DATA_MAPPER_REVIEW } from "../../QF/mappers";
import { Button } from "@mui/material";
import AddReviewModal from "../../QF/components/modal/modal";

function UserDashboard() {
  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);
  const [review, setReview] = useState([]);
  const [modal, setModal] = useState(false);
  const [ids, setIds] = useState({});


  const handleReviewSubmit = async (reviewData) => {

    const res = await postData(POST_REVIEW_PATH, reviewData)
  };

  useEffect(() => {
    const queryParams = new URLSearchParams({ id: getCookie("userId"), isServiceman: JSON.parse(localStorage.getItem("response"))?.isServiceman === "P" }).toString();
    const url = `${BOOKING_BASE_PATH}?${queryParams}`;
    const reviewUrl = `${GET_REVIEW_PATH}?${queryParams}`

    Promise.all([
      getData(url),
      getData(reviewUrl)
    ])
      .then(responses => {
        const [dataResponse, reviewResponse] = responses;

        if (reviewResponse.code === 200) {
          const res = DATA_MAPPER_REVIEW(reviewResponse.data);
          setReview(res);
        }
        if (dataResponse.code === 200) {
          const res = DATA_MAPPER_BOOKING(dataResponse.data);
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
                    <th>Status</th>

                    <th>Add Review</th>
                    <th>MAP</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {order.map((row, index) => {
                    return (

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

                        <td>{row.status}</td>
                        {row.status === "Completed" ? <Button onClick={() => {
                          setIds({
                            reviewerId: getCookie('userId'),
                            associatedJob: row.bookingId,

                            associatedServiceman: row.professional._id
                          })

                          setModal(true)

                        }}>Add Review</Button> : <td> - </td>}
                        {row.status === "Accepted" ? <Button onClick={() => {
                          // setIds({
                          //   reviewerId: getCookie('userId'),
                          //   associatedJob: row.bookingId,

                          //   associatedServiceman: row.professional._id
                          // })

                          // setModal(true)

                        }}>MAP</Button> : <td> - </td>}

                      </tr>
                      
                    )

                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className={style.recentActivity}>
          <h2>Reviews</h2>
          {review?.length === 0 ? (
            <div style={{ height: "auto", width: "100%" }}>
              <p>Order Is empty, please make some order</p>
            </div>
          ) : (
            <div style={{ marginTop: "48px", display:"flex" }}>
              {review.map((row, index) => (
                <div style={{ margin: "18px" }}>

                <ReviewCard review={row} />
              </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {modal &&

        <AddReviewModal
          showModal={modal}
          setShowModal={setModal}
          handleSubmit={handleReviewSubmit}
          ids={ids}
        />
      }
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

const ReviewCard = ({ review }) => {
  const defaultReview = {
    reviewId: review.reviewId,
    title: review.quality,
    rating: review.recommend,
    reviewer: review?.name,
    feedback: review.feedback,
    serviceName: review.serviceName,
    image: 'https://via.placeholder.com/150',
  };
  const { title, rating, feedback, serviceName, image } = {
    ...defaultReview,
    ...review,
  };
  return (
    <button className="lg:flex bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden mb-4">
      <div className="lg:w-1/3">
        <img
          className="w-full h-auto lg:h-64 object-cover object-center"
          src={image}
          alt="Reviewer"
        />
      </div>
      <div className="lg:w-2/3 lg:border-r border-gray-200">
        <div className="p-6 text-left">
          <h2 className="text-2xl font-semibold mb-2">
            {/* <a href={`/profile/${getCookie('userId')}`}> */}
            {/* <small>Reviewer -</small>
              {reviewer}
            </a> */}
          </h2>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex items-center mb-2">
            {/* <StarRatings
              rating={rating}
              starRatedColor="#f4c713"
              numberOfStars={5}
              starDimension="24px"
              starSpacing="2px"
            /> */}
            <span className="ml-2">{rating} out of 5</span>
          </div>
          <p className="mb-4">{feedback}</p>
          <p className="mb-4">Service: {serviceName}</p>
        </div>
      </div>
    </button>
  );
};
