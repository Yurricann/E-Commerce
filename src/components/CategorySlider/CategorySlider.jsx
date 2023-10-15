import React from "react";
import Style from "./CategorySlider.module.css";
import Slider from "react-slick";
import { useQuery } from "react-query";
import axios from "axios";

export default function CategorySlider() {
  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery("CategorySlider", getCategories);

  return (
    <>
      {data?.data.data ? (
        <Slider {...settings}>
          {" "}
          {data?.data.data.map((category) => (
            <img
              className="w-100"
              height={200}
              src={category.image}
              alt={category.name}
              key={category._id}
            ></img>
          ))}{" "}
        </Slider>
      ) : (
        ""
      )}
    </>
  );
}
