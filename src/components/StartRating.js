import React from "react";

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const decimalPart = rating % 1;

    const starStyle = {
      color: "orange", // Set star color (e.g., gold)
      fontSize: "25px", // Set star size
      marginRight: "4px", // Set spacing between stars
    };

    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} style={starStyle}>
            &#9733;
          </span>
        );
      } else if (i === fullStars && decimalPart > 0) {
        const partialWidth = `${decimalPart * 100}%`;
        const partialStarStyle = {};

        stars.push(
          <span key={i} style={partialStarStyle}>
            <span
              style={{
                ...starStyle,
                position: "absolute",
                width: partialWidth,
              }}
            >
              &#9733;
            </span>
            <span
              style={{
                ...starStyle,
                position: "relative",
                width: "100%",
                overflow: "hidden",
              }}
            >
              &#9734;
            </span>
          </span>
        );
      } else {
        stars.push(
          <span key={i} style={starStyle}>
            &#9734;
          </span>
        );
      }
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
