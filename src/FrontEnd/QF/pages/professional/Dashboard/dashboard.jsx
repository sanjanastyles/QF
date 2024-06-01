// ProfilePage.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dateFormatter, getCookie, getData } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faUniversity } from "@fortawesome/free-solid-svg-icons";
import "./dashboard.css";
import { PRO_PAGE_PATH } from "../../../constants/constant";

const ProfilePage = () => {
  const [data, setData] = useState();
  const { id, serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams({ id: id }).toString();
    const url = `${PRO_PAGE_PATH}?${queryParams}`;

    getData(url).then((response) => {
      if (response.code) {
        setData(response.data);
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
            <img
              alt="Profile"
              src="/asset/img.jpg"
              className="avatar"
            />
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
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
