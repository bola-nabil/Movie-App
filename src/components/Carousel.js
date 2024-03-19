import { useState, useEffect } from "react";
import { img_300, noPicture } from "../config/config"
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from 'axios';
import "../css/Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Gallery = (props) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((item) => (
    <div className="carouselItem">
      <img
        src={item.profile_path ? `${img_300}/${item.profile_path}` : noPicture}
        alt={item?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{item?.name}</b>
    </div>
  ));


  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  }

  const fetchCredits = async() => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setCredits(data.cast);
  }

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  },[]);


  return (
      <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
  );
}

export default Gallery;