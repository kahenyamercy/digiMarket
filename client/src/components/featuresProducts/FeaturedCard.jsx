import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Link } from "react-router-dom";

const checkWindowWidth = () => {
  if (window.innerWidth <= 768) {
    if (window.innerWidth <= 534) {
      return 2;
    } else {
      return 3;
    }
  } else {
    return 6;
  }
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-angle-right'></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-angle-left'></i>
      </button>
    </div>
  );
};
const FeaturedCard = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: checkWindowWidth(),
    slidesToScroll: checkWindowWidth(),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const { categoryList } = useSelector((state) => state.category);

  return (
    <section className='md:px-4 bg-lime-400'>
      <Slider {...settings}>
        {categoryList?.map((item) => {
          const { id, name, image } = item;
          return (
            <div className='' key={id}>
              <div className='bg-white mx-2 rounded p-2'>
                <img src={image} alt='' className='w-full h-32 object-cover' />
                <div className='mt-2'>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-gray-600 text-md">2kg packet</p>
                  <h4 className="py-2 text-green-400">KES 0.00 </h4>
                  <div className='flex justify-between'>
                    <Link to={`/`} className='bg-lime-400 p-1 text-white rounded flex items-center justify-center'>
                      <ZoomInIcon />
                    </Link>
                    <button className='bg-lime-700 p-1 text-white rounded flex items-center justify-center'>
                      <AddShoppingCartIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default FeaturedCard;
