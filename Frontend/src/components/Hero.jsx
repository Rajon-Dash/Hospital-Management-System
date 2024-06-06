import React from "react";

const Hero = ({ title, imageUrl }) => {
  const imageStyles = {
    width: "400px",
    height: "500px",
  };
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero hic
          voluptas expedita, consectetur recusandae maiores optio excepturi vero
          impedit quo Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Atque, iusto. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Quos dolorum quam labore molestiae excepturi modi nam ex non
          repellat nesciunt.
        </p>
      </div>
      <div className="banner">
        <img
          src={imageUrl}
          style={imageStyles}
          alt="hero"
          className="animated-image"
        />
        <span>
          <img src="../../public/Vector.png" alt="" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
