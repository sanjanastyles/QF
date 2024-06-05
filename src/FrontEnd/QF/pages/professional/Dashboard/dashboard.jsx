// ProfilePage.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dateFormatter, getCookie, getData } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import "./dashboard.css";
import { PRO_PAGE_PATH } from "../../../constants/constant";

const ProfilePage = () => {
  const [data, setData] = useState();
  const { id, serviceId } = useParams();
  const [review, setReview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams({ id: id }).toString();
    const url = `${PRO_PAGE_PATH}?${queryParams}`;

    getData(url).then((response) => {
      if (response.code) {
        setData(response.data);
        const res = response.data.reviews;
        setReview(res);
      } else {
        setData([]);
      }
    });
  }, [id]);

  if (!data) return <div>Loading....</div>;

  return (
    <>
      <div className="background-image">
        <div className="overlay"></div>
      </div>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            <img alt="Profile" src="/asset/img.jpg" className="avatar" />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">{data.userData.name}</h2>
            <div className="profile-info">
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                Contact {data.userData.email}
              </p>
              <p>
                <FontAwesomeIcon icon={faUniversity} className="icon" />
                Joined on {dateFormatter(data.userData.createdAt)}
              </p>
            </div>
            <div className="profile-actions">
              <button
                className="view-jobs-button"
                onClick={() => {
                  navigate(`/history/${getCookie("userId")}`);
                }}
              >
                View Jobs
              </button>
              <div className="service-button">
                <Link to={`/checkout/${id}/${serviceId}`}>
                  <button className="book-service-button">Book Service</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat">
              <div className="number">{data.numberOfReviews}</div>
              <div className="label">Feedback</div>
            </div>
            <div className="stat">
              <div className="number">{data.userData.refer ?? 0}</div>
              <div className="label">Referral</div>
            </div>
            <div className="stat">
              <div className="number">{data.numberOfJobs}</div>
              <div className="label">Jobs</div>
            </div>
          </div>
          <div className="job-list">
            <h3 className="section-heading">Jobs</h3>
            <ul>
              {data.userData.jobs.map(({ name }, index) => (
                <li key={index} className="job-item">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <>
            {review?.length === 0 ? (
              <div style={{ height: "auto", width: "100%" }}>
                <p>No reviews</p>
              </div>
            ) : (
              <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                {review.map((row, index) => (
                  <div style={{ margin: "18px" }}>
                    <ReviewCard review={row} />
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

const ReviewCard = ({ review }) => {
  const defaultReview = {
    reviewId: review.reviewId,
    title: review.quality,
    rating: review.recommend,
    reviewer: review?.name,
    feedback: review.feedback,
    serviceName: review.serviceName,
    image: "https://via.placeholder.com/150",
  };
  const { title, rating, feedback, serviceName } = {
    ...defaultReview,
    ...review,
  };
  return (
    <div
      className={`review-container bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden mb-4`}
    >
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
    </div>
  );
};
