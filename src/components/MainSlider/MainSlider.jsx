import React from "react";
import slide1 from "../../Assets/images/slider-image-1.jpeg";
import slide2 from "../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../Assets/images/slider-image-3.jpeg";
import blog1 from "../../Assets/images/grocery-banner-2.jpeg";
import blog2 from "../../Assets/images/grocery-banner.png";

import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="row py-2 gx-0">
        <div className="col-md-9">
          <Slider {...settings}>
            <img height={400} src={slide1} alt="slide1" />
            <img height={400} src={slide2} alt="slide2" />
            <img height={400} src={slide3} alt="slide3" />
          </Slider>
        </div>
        <div className="col-md 3">
          <img height={200} className="w-100" src={blog1} alt="slide1" />
          <img height={200} className="w-100" src={blog2} alt="slide1" />
        </div>
      </div>
    </>
  );
}
