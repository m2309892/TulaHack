import Slider from 'infinite-react-carousel';
const Carousel = ({items}) => {

    const settings =  {
        adaptiveHeight: true,
        initialSlide: true,
        slidesToShow: 4
    };
    return (
        <Slider  {...settings}>
            {items}
        </Slider>
    );
};

export default Carousel;
