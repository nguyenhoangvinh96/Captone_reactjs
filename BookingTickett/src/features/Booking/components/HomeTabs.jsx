import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
const HomeTabs = () => {
    const { infoTheater } = useSelector(state => state.bookingReducer);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const navigateSeats = (id) => {
        const a = localStorage.getItem('userToken');

        if (!a) {
            return navigate('/signin/')
        }
        navigate('/seats/' + id)
    }
    const [tabPosition, setTabPosition] = useState('left');
    const [minWith, setminWith] = useState('min-w-[400px]')

    // khi màn hình nhỏ hơn 960px đổi position của Tabs
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 960px)');
        if (mediaQuery.matches) {
            setTabPosition('top');
            setminWith('')
        } else {
            setTabPosition('left');
            setminWith('md:min-w-[220px]')
        }

        const handleMediaQueryChange = (event) => {
            if (event.matches) {
                setTabPosition('top');
                setminWith('')
            } else {
                setTabPosition('left');
                setminWith('md:min-w-[220px]')
            }
        };
        mediaQuery.addListener(handleMediaQueryChange);
        return () => mediaQuery.removeListener(handleMediaQueryChange);
    }, []);

    return (
        <div className='mx-auto max-w-4xl mb-10' id='suatChieu' >
            <hr />
            <h1 className='text-center text-4xl font-bold my-10'>{t('CÁC SUẤT CHIẾU')}</h1>
            <Tabs
                style={{ height: 450 }}
                tabPosition='left'
                items={infoTheater.map((item, index) => {
                    return {
                        key: index,
                        label: <img src={item.logo} className='' width={42} height={42} alt={item.logo}
                            // ảnh bị lỗi sẽ hiển thị ảnh này
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "https://www.clker.com/cliparts/T/4/V/L/G/Z/red-error-icon.svg.hi.png";
                            }} />,
                        children: <Tabs
                            tabPosition={tabPosition}
                            style={{ height: 450 }}
                            items={item.lstCumRap.map(item => {
                                return {
                                    key: item.maCumRap,
                                    label: <div className='text-left'>
                                        <h3 className={classNames({ minWith }, 'md:w-72 text-left font-bold ml-4  dark:text-black')}>{item.tenCumRap}</h3>
                                    </div>,
                                    children: <div className='myTab'>
                                        {item.danhSachPhim.slice(0,3).map((item,index) => {
                                            return (<div className=' flex my-4 ml-2' key={index}>
                                                <img src={item.hinhAnh} alt="" width={80} height={170} />
                                                <div className='ml-2'>
                                                    <h4 className='font-bold text-sm mb-2 dark:text-black '>{item.tenPhim}</h4>
                                                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>{item.lstLichChieuTheoPhim.slice(0, 4).map((item, index) =>
                                                        <Button
                                                            key={item.maLichChieu}
                                                            className='hover:border-lime-600 max-w-[90px] dark:bg-[#f5f5f5] dark:text-black' onClick={() =>
                                                                navigateSeats(item.maLichChieu)}>
                                                            {moment(item.ngayChieuGioChieu).format('hh:mm A')}
                                                        </Button>
                                                    )}</div>
                                                </div>
                                            </div>)
                                        })}

                                    </div>
                                }
                            })}
                        />

                    }
                })}
            />
        </div>
    );
};

export default HomeTabs;