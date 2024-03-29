import React, { useState } from 'react';
import { Button } from '@mui/material';
import './modal.css';

const AddReviewModal = ({ showModal, setShowModal, handleSubmit, ids }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [quality, setQuality] = useState(''); // Initial quality value

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const handleReviewSubmit = () => {
    handleSubmit({ recommend:rating, quality, feedback:reviewText, ...ids });
    setReviewText('');
    setRating(0);
    setQuality('');
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Add Review</h2>
            <div>
              <label>Rating:</label>
              <select value={rating} onChange={(e) => handleRatingChange(parseInt(e.target.value))}>
                {[...Array(6).keys()].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Quality:</label>
              <select value={quality} onChange={handleQualityChange}>
                <option value="">Select</option>
                <option value="Poor">Poor</option>
                <option value="Fair">Fair</option>
                <option value="Good">Good</option>
                <option value="Very Good">Very Good</option>
                <option value="Excellent">Excellent</option>
              </select>
            </div>
            <div>
              <label>Feedback:</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            <Button onClick={handleReviewSubmit}>Submit Review</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddReviewModal;
