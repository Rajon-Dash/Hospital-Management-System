import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="about Img" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
          ducimus tempora repudiandae, expedita tempore cupiditate laudantium
          optio! Rerum perferendis recusandae fugiat illo! Dolores tempora
          doloremque eligendi, itaque quaerat, vitae nobis, maiores deleniti
          unde assumenda a. Quis doloribus adipisci explicabo qui necessitatibus
          officiis culpa magnam eum! Facilis saepe minima magnam explicabo?
        </p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          laboriosam, repellendus tempora mollitia deleniti sequi aliquam natus
          impedit eius ut architecto, labore eligendi corporis numquam vero modi
          eos magni. Quis vero laborum commodi culpa asperiores!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, veritatis!</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  );
};

export default Biography;
