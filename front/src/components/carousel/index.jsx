import Slider from 'infinite-react-carousel';
import styles from './index.module.css'
const Carousel = ({items}) => {

    const settings =  {
        adaptiveHeight: true,
        initialSlide: true,
        slidesToShow: 4
    };
    return (
        <div className={styles.carousel}>
            <Slider  {...settings}>
                {items}
            </Slider>
        </div>

    );
};

export default Carousel;
