import React from 'react';
import { Carousel } from 'antd'
import { useSelector } from 'react-redux';
const HomeCarousel = () => {
    const { banners } = useSelector(state => state.bookingReducer);
    return (
        <Carousel
        autoplay={true}
        effect={'fade'}
        className='bg-black text-white h-100'>
            {banners.map(item =>
                <img key={item.maPhim} src={item.hinhAnh} alt={item.maPhim} className='h-100' />
            )}
        </Carousel>
    );
};

export default HomeCarousel;