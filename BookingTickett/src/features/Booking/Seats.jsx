import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './utils/seats.module.css'
import { fetchListSeat, postBookTicket } from './thunk'
import { NavLink, useParams } from 'react-router-dom';
import _ from 'lodash';
import { Tabs, Tour } from 'antd';
import * as actionTypes from './constants'
import Loading from '../../components/Loading';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';
import ButtonDarkMode from '../../components/ButtonDarkMode';

const Tabs1 = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const [open, setOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const steps = [
        {
            title: `${t('1. Chọn ghế')}`,
            description: `${t('Tick vào ô để chọn ghế.')}`,
            target: () => ref1.current,
        },
        {
            title: `${t('2. Các loại ghế')}`,
            description: `${t('Mô tả các loại ghế.')}`,
            target: () => ref2.current,
        },
        {
            title: `${t('3. Thông tin ghế')}`,
            description: `${t('Chi tiết về địa chỉ, giá tiền của ghế bạn đặt.')}`,
            target: () => ref3.current,
        },
        {
            title: `${t('4. Thanh toán')}`,
            description: `${t('Hãy thanh toán khi bạn đã xem lại thông tin.')}`,
            target: () => ref4.current,
        },
    ];

    const { infoUser } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const { listSeat, orderSeats } = useSelector(state => state.bookingReducer);
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchListSeat(id));
        return () => {
            dispatch({
                type: actionTypes.CLEAR_ORDER_SEAT
            })
        }
    }, []);

    const { thongTinPhim, danhSachGhe } = listSeat;
    const totalCount = orderSeats?.reduce((pre, curr) => pre + curr.giaVe, 0);
    const displaySeats = () => {
        return <div ref={ref1}>
            {danhSachGhe?.map((item, index) => {
                const classVipSeat = item.loaiGhe === 'Vip' ? 'VipSeat' : '';
                const classReversedSeat = item.daDat === true ? 'reservedSeat' : "";
                // khai báo let vì cần đổi giá trị
                let classCurrentSeat = '';


                // ktra trùng ghế trong mảng
                let indexCurrentSeat = orderSeats?.findIndex(seat => seat.maGhe === item.maGhe);
                if (indexCurrentSeat != -1) {
                    classCurrentSeat = 'currentChooseSeat'
                } else {
                    classCurrentSeat = ''
                }

                // ghế của mình đặt
                let myReservedSeatClass = '';
                if (infoUser.taiKhoan === item.taiKhoanNguoiDat) {
                    myReservedSeatClass = 'myReservedSeat'
                } else {
                    myReservedSeatClass = '';
                }
                return <Fragment key={item.stt}>
                    <div className='inline-block relative'>
                        <button
                            onClick={() => {
                                dispatch({
                                    type: actionTypes.ORDER_SEAT,
                                    payload: item
                                })
                            }}

                            disabled={item.daDat} className={`normalSeat ${classVipSeat} ${classReversedSeat} ${classCurrentSeat} ${myReservedSeatClass}`} >

                            {item.daDat ? (
                                myReservedSeatClass ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ maxWidth: 26 }} className="  mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="X-icon-button">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                            )
                                :
                                ''}
                        </button>
                    </div>
                    {(index + 1) % 16 === 0 ? <br /> : ''}
                </Fragment>
            }
            )}
        </div>
    }
    return (
        <div>
            <div className='grid grid-cols-12 h-full'>
                <div className='lg:col-span-9 p-1 md:p-0 col-span-12'>
                    <div className={style.screen}></div>
                    <div className={style.trapezoid}>{t('Màn hình')}</div>
                    <div className='text-center mt-3'>
                        <div className='mx-auto w-full'>
                            {displaySeats()}
                        </div>
                        <div className='grid grid-cols-3 gap-3  sm:grid-cols-5 sm:gap-2 max-w-xl mx-auto mt-5' ref={ref2}>
                            <div className='text-center text-sm text-gray-500'>
                                <button className="normalSeat"></button>
                                <p>{t('Ghế thường')}</p>
                            </div>
                            <div className='text-center text-sm text-gray-500'>
                                <button className="normalSeat VipSeat"></button>
                                <p>{t('Ghế VIP')}</p>
                            </div>
                            <div className='text-center text-sm text-gray-500'>
                                <button className="normalSeat currentChooseSeat"></button>
                                <p>{t('Ghế đang chọn')}</p>
                            </div>
                            <div className='text-center text-sm text-gray-500'>
                                <button className="normalSeat reservedSeat">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="X-icon-button">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <p>{t('Ghế đã được mua')}</p>
                            </div>
                            <div className='text-center text-sm text-gray-500'>
                                <button className="normalSeat myReservedSeat">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ maxWidth: 26 }} className="  mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>

                                </button>
                                <p>{t('Ghế của bạn')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 flex flex-col p-4 shadow-2xl col-span-12 rounded-xl md:mr-4 dark:bg-[#393E46] dark:text-white">
                    <h3 className='font-bold text-xl text-center mb-2'>
                        {t('HÓA ĐƠN')}</h3>
                    <div ref={ref3}>

                        <hr />
                        <div className='mt-1 mb-2'>
                            <h3 className='font-bold '>{thongTinPhim?.tenPhim}</h3>
                            <p className='text-sm'>{thongTinPhim?.diaChi}</p>
                            <p className='text-sm'>{thongTinPhim?.tenCumRap}</p>
                            <p className='text-sm'> {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
                            <p></p>
                        </div>
                        <hr />
                        <div className='mt-1 mb-2'>
                            <p className='text-sm text-gray-500'>{t('Ghế')}</p>
                            <div className="flex flex-wrap">
                                {_.sortBy(orderSeats, ['tenGhe'])?.map(item =>
                                    <span className='mr-2 text-lime-500 font-bold'>{item.tenGhe}</span>
                                )}
                            </div>

                        </div>
                        <hr />
                        <div className='mt-1 mb-2'>
                            <p className='text-gray-400 text-sm'>Email</p>
                            <p>{infoUser?.email}</p>
                        </div>
                        <hr />
                        <div className='mt-1 mb-2'>
                            <p className='text-gray-400 text-sm'>{t('Số điện thoại')}</p>
                            <p>{infoUser?.soDT}</p>
                        </div>
                        <hr />
                        <div className='mt-1 mb-2'>
                            <p className='text-gray-400 text-sm' >{t('Tổng tiền')} </p>
                            <p className='font-bold'  > {totalCount.toLocaleString()} đ</p>
                        </div>
                        <hr />
                        <div style={{ fontSize: 12 }} className='mt-1 mb-3'>
                            <p className='text-red-500 flex items-center'><ExclamationCircleOutlined className='mr-1' />{t('Lưu ý')} : </p>
                            <p>{t('Vé đã mua không thể đổi hoặc hoàn tiền.')}</p>
                        </div>
                    </div>
                    <div className='mt-auto'>
                        <div
                            onClick={async () => {
                                const info = {
                                    maLichChieu: id,
                                    danhSachVe: orderSeats
                                }
                                await dispatch({
                                    type: actionTypes.CLEAR_ORDER_SEAT
                                })
                                totalCount && await dispatch(postBookTicket(info));
                            }}
                            ref={ref4}
                            className='bg-lime-500 dark:bg-lime-600 dark:hover:bg-lime-800 text-center hover:bg-lime-600 duration-300 p-3 cursor-pointer font-bold rounded-xl text-white  '>
                            {t('THANH TOÁN')}
                        </div>
                    </div>
                </div>

            </div>
            <button
                className='border rounded-lg flex items-center ml-3 mb-3 px-1 border-orange-400 text-orange-400 hover:text-white hover:bg-orange-500 duration-300 font-bold'
                onClick={() => setOpen(true)}>
                {t('Hướng dẫn')}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            </button>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps}
                nextButtonProps={{ children: 'haha' }}
                prevButtonProps={{ children: '< haha' }}
            />
        </div>
    );
};
const Tabs2 = () => {
    const { t, i18n } = useTranslation();
    const { infoUser } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const { listSeat, orderSeats } = useSelector(state => state.bookingReducer);
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchListSeat(id))
    }, []);

    const { danhSachGhe } = listSeat;
    const displaySeats = () => {
        return <>
            {danhSachGhe?.map((item, index) => {
                const classVipSeat = item.loaiGhe === 'Vip' ? 'VipSeat' : '';
                const classReversedSeat = item.daDat === true ? 'reservedSeat' : "";
                // khai báo let vì cần đổi giá trị
                let classCurrentSeat = '';

                // ktra trùng ghế trong mảng
                let indexCurrentSeat = orderSeats?.findIndex(seat => seat.maGhe === item.maGhe);
                if (indexCurrentSeat != -1) {
                    classCurrentSeat = 'currentChooseSeat'
                } else {
                    classCurrentSeat = ''
                }
                // ghế của mình đặt
                let myReservedSeatClass = '';
                if (infoUser.taiKhoan === item.taiKhoanNguoiDat) {
                    myReservedSeatClass = 'myReservedSeat'
                } else {
                    myReservedSeatClass = '';
                }
                return <Fragment key={item.stt}>
                    <div className='inline-block relative'>
                        <button
                            onClick={() => {
                                dispatch({
                                    type: actionTypes.ORDER_SEAT,
                                    payload: item
                                })
                            }}

                            disabled={item.daDat} className={`normalSeat ${classVipSeat} ${classReversedSeat} ${classCurrentSeat} ${myReservedSeatClass}`} >

                            {item.daDat ? (
                                myReservedSeatClass ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ maxWidth: 26 }} className=" mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="X-icon-button">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                            )
                                :
                                ''}
                        </button>
                    </div>
                    {(index + 1) % 16 === 0 ? <br /> : ''}
                </Fragment>
            }
            )}
        </>
    }
    return (
        <div>
            <div className='max-w-3xl mx-auto'>
                <div className={style.screen}></div>
                <div className={style.trapezoid}>{t('Màn hình')}</div>
                <div className='text-center mt-3'>
                    <div className='mx-auto w-full'>
                        {displaySeats()}
                    </div>
                    <div className='grid grid-cols-3 gap-3  sm:grid-cols-5 sm:gap-2 max-w-xl mx-auto mt-5'  >
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat"></button>
                            <p>{t('Ghế thường')}</p>
                        </div>
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat VipSeat"></button>
                            <p>{t('Ghế VIP')}</p>
                        </div>
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat currentChooseSeat"></button>
                            <p>{t('Ghế đang chọn')}</p>
                        </div>
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat reservedSeat">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="X-icon-button">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p>{t('Ghế đã được mua')}</p>
                        </div>
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat myReservedSeat">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ maxWidth: 26 }} className="  mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                            </button>
                            <p>{t('Ghế của bạn')}</p>
                        </div>
                    </div>
                    <p className='text-red-500 italic'>{t('Vui lòng chụp lại màn hình')}</p>
                </div>
            </div>
            <button
                onClick={() => {
                    dispatch({
                        type: actionTypes.COMPLETE_CHECKOUT2
                    })
                }}
                className='
            fixed z-50 bottom-2 left-2 md:top-11 md:right-2 md:bottom-auto md:left-auto hover:bg-orange-700 duration-300 flex items-center
            focus:outline-none text-white bg-orange-500   focus:ring-4 focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-600'
            >
                <p>{t('TIẾP TỤC')}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                </svg>
            </button>
        </div>
    )
}
const Tabs3 = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    return (
        <div className='max-w-3xl mx-auto'>
            <h3 className='text-center text-xl font-bold text-lime-500'>THANH TOÁN THÀNH CÔNG !</h3>
            <div className="text-center">
                <div className=''>
                </div>
                <div className='font-bold dark:text-white my-1'>
                </div>
                <div className='mt-4'>

                    <NavLink to='/'
                        onClick={() => {
                            dispatch({
                                type: actionTypes.SET_DEFAULT_TAB
                            })
                        }}
                        className='font-bold 
                focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-red-900 hover:text-white duration-300'>{t('Quay lại trang chủ')}  </NavLink>
                </div>
            </div>
        </div>
    );
};





const Seats = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    const { activeTabs } = useSelector(state => state.bookingReducer);
    const items = [
        {
            key: '1',
            label: <h3 className='font-bold '>  {t('CHỌN GHẾ & THANH TOÁN')} </h3>,
            children: <div>
                <Tabs1 />
            </div>,
        },
        {
            key: '2',
            label: <h3 className='font-bold'>{t('XEM LẠI VỊ TRÍ GHẾ')}</h3>,
            children: <Tabs2 />,
        },
        {
            key: '3',
            label: <h3 className='font-bold'>{t('HOÀN TẤT')}</h3>,
            children: <Tabs3 />,
        },

    ];
    return (
        <div className='h-screen dark:text-white'>
            <div className='container mx-auto'>
                <Tabs
                    defaultActiveKey='1'
                    activeKey={activeTabs}
                    type="card"
                    items={items}
                />
            </div>
            <Loading />
            <div className='md:fixed z-50 md:top-2 md:right-4  bottom-4 right-3 md:bottom-auto m-3 md:m-0'>
                <NavLink
                    onClick={() => {
                        dispatch({
                            type: actionTypes.SET_DEFAULT_TAB
                        })
                    }}
                    to='/' className='flex hover:text-orange-600 duration-300'>
                    <p className='mr-2'> {t('Quay lại trang chủ')}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </NavLink>
            </div>

        </div>
    );
};

export default Seats;