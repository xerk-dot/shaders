import React from 'react';
import './Carousel.scss';

const Carousel = ({ images, width, height }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel" style={{ width, height }}>
      <div className="carousel-image">
        <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
      </div>
      <div className="carousel-arrow left" onClick={goToPrevious}>
        <span>&#10094;</span>
      </div>
      <div className="carousel-arrow right" onClick={goToNext}>
        <span>&#10095;</span>
      </div>
    </div>
  );
};

export default Carousel; 