import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Link } from "react-router-dom";
import { listProducts } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";

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

  const dispatch = useDispatch();

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

  const { allProducts } = useSelector((state) => state.product);

  const handleCart = (productId) => {
    dispatch(addToCart(productId));
  }

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch])

  return (
    <section className='md:px-4 bg-lime-400'>
      <Slider {...settings}>
        {allProducts?.slice(0, 20).map((item) => {
          const { id, name, image, price } = item;
          return (
            <div className='' key={id}>
              <div className='bg-white mx-2 rounded p-2'>
                <img src={image} alt='' className='w-full h-32 object-cover' />
                <div className='mt-2'>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-gray-600 text-md">2kg packet</p>
                  <h4 className="py-2 text-green-400">KES {price}</h4>
                  <div className='flex justify-between'>
                    <Link to={`/shop/products/${id}`} className='bg-lime-400 p-1 text-white rounded flex items-center justify-center'>
                      <ZoomInIcon />
                    </Link>
                    <button className='bg-lime-700 p-1 text-white rounded flex items-center justify-center'>
                      <AddShoppingCartIcon onClick={() => handleCart(id)} />
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
