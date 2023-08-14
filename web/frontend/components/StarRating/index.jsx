import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./StarRating.css";

const StarRating = ({ name, rating, handleRateChange }) => {

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={(e) => handleRateChange(e, index)}
          >
            <FontAwesomeIcon icon={faStar} size="lg" />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
