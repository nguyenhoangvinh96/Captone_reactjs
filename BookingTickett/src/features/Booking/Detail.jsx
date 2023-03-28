import React, { useEffect, useState } from 'react';
import style from './utils/detail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailMovie } from './thunk';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Rate, Tabs } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import ModalVideo from 'react-modal-video'
import { useTranslation } from 'react-i18next';
import Layout from '../../HOCs/Layout';
import '../../assets/styles/circle.css'
const Detail = () => {
    const [isOpen, setOpen] = useState(false)
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const dispatch = useDispatch()
    const { detailMovie } = useSelector(state => state.bookingReducer);
    const navigate = useNavigate();
    // lấy id trên url sau đó fetchAPI để lấy dữ liệu của phim sau đó render ra giao diện
    useEffect(() => {
        dispatch(fetchDetailMovie(id))
    }, [])
    // luôn scroll to top mặc định
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    const navigateSeats = (id) => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            return navigate('/signin/')
        }
        navigate('/seats/' + id)
    }

    const [tabPosition, setTabPosition] = useState('left');
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 960px)');
        if (mediaQuery.matches) {
            setTabPosition('top');
        } else {
            setTabPosition('left');
        }

        const handleMediaQueryChange = (event) => {
            if (event.matches) {
                setTabPosition('top');
            } else {
                setTabPosition('left');
            }
        };

        mediaQuery.addListener(handleMediaQueryChange);
        return () => mediaQuery.removeListener(handleMediaQueryChange);
    }, []);

    const items = [
        {
            key: '1',
            label: <h3 className='text-lg font-bold ' >{t('LỊCH CHIẾU')}</h3>,
            children: <div className='px-3 dark:text-white'>
                {detailMovie.heThongRapChieu?.length ?
                    <Tabs
                        tabPosition={tabPosition}
                        items={detailMovie.heThongRapChieu?.map(item => {
                            return {
                                key: item.maHeThongRap,
                                label: <div className='md:min-w-[200px] flex items-center'>
                                    <img src={item.logo} alt={item.logo} width={40} className='mr-3' />
                                    <h3>{item.tenHeThongRap}</h3>
                                </div>,
                                children: item.cumRapChieu?.map(item =>
                                    <div key={item.maCumRap} className='ml-4 flex' >
                                        <img src={item.hinhAnh} alt={item.hinhAnh} width={60} className='mr-3' />
                                        <div>
                                            <h3 className='font-bold dark:text-black'>{item.tenCumRap}</h3>
                                            <p className='text-gray-500 dark:text-gray-300' style={{ fontSize: 12 }}>{item.diaChi}</p>
                                            <div className="grid grid-cols-3 md:grid-cols-4 gap-1">
                                                {item.lichChieuPhim?.slice(0, 4).map(item =>
                                                    <button onClick={() => {
                                                        navigateSeats(item.maLichChieu)
                                                    }}
                                                        key={item.maRap}
                                                        className='bg-slate-400 p-1 inline-block rounded-sm text-black hover:bg-orange-600 hover:text-black' >
                                                        {moment(item.ngayChieuGioChieu).format('hh:mm A')}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    /> :
                    <h3 className='text-center text-lg'>{t('Hiện tại phim chưa có lịch chiếu')}</h3>
                }
            </div>,
        },
        {
            key: '2',
            label: <h3 className='text-lg font-bold' >{t('THÔNG TIN')}</h3>,
            children: <div className='dark:text-black'>
                <div className="grid grid-cols-12 px-8 pt-2">
                    <div className='col-span-12'>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >{t('Ngày công chiếu')}</h3>
                            <p className='w-2/3'>{moment(detailMovie.ngayKhoiChieu).format('L')}</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >{t('Tình trạng')}</h3>
                            <p className='w-2/3'>{detailMovie.sapChieu ? <span className='tagDetailSapChieu'>{t('Sắp chiếu')}</span> : <span className='tagDetailDangChieu'>{t('Đang chiếu')}</span>}</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >{t('Đạo diễn')}</h3>
                            <p className='w-2/3'>John Davis</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >{t('Diễn viên')}</h3>
                            <p className='w-2/3'>Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >{t('Thể loại')}</h3>
                            <p className='w-2/3'>Hành Động, Giả Tưởng</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >{t('Quốc gia')}</h3>
                            <p className='w-2/3'>Mỹ</p>
                        </div>
                    </div>
                    <div className='col-span-12'>
                        <h3 className='font-bold mb-2  '> {t('Nội dung')} </h3>
                        <p  >{detailMovie.moTa}</p>
                    </div>
                </div>
            </div>,
        },

    ]
    console.log(detailMovie)
    console.log(detailMovie.trailer?.match(/\/(?:embed\/|watch\?v=)?([a-zA-Z0-9_-]{11})/)[1]);

    return (
        <Layout>
            <div className={style['glass-container']} style={{ backgroundImage: `url(${detailMovie.hinhAnh})` }} >
                <div className={style.glass}></div>
                <div className={style.content} >
                    <div className="mx-auto max-w-4xl mt-14 md:flex md:justify-between px-3">
                        <div className='flex font-bold text-white'>
                            <div className='relative'>
                                <img width={200} src={detailMovie.hinhAnh} className='shadow-2xl' alt="" />
                                <button className="btnOpenModalVideo" onClick={() => setOpen(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ maxWidth: 30, textAlign: 'center' }} className="inline-block">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                    </svg>
                                </button>
                            </div>
                            <div className='ml-4 max-w-lg' style={{ maxWidth: 500 }}>
                                <p>{moment(detailMovie.ngayKhoiChieu).format('DD/MM/yyyy - hh:mm A')}</p>
                                <h3 className='text-3xl mt-3'>{detailMovie.tenPhim}</h3>
                                <div className='flex my-1'>
                                    {detailMovie.hot && <div className="tagDetailHot mr-3">Hot</div>}
                                    {detailMovie.dangChieu && <div className="tagDetailDangChieu mr-3">{t('Đang chiếu')}</div>}
                                    {detailMovie.sapChieu && <div className="tagDetailSapChieu ">{t('Sắp chiếu')}</div>}
                                </div>

                                <p className='hidden lg:block' style={{ fontSize: 12, fontWeight: "normal" }}>{detailMovie.moTa}</p>
                                <br />
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <div className={`c100 p${detailMovie.danhGia * 10} small md:big  orange`}>
                                <span>{detailMovie.danhGia / 2}</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <div className='bg-slate-400 bg-opacity-30 rounded-lg p-1 px-1 my-1'>
                                <Rate style={{ background: "white", padding: '2px 7px', borderRadius: 6 }} allowHalf value={detailMovie.danhGia / 2} />
                            </div>
                            <p className='text-white'> {+detailMovie.danhGia * 6} {t('người đánh giá')}</p>
                        </div>
                    </div>


                </div>

            </div>
            <div className='bg-[#EEEEEE] dark:bg-[#222831] py-10'>
                <div className='detailTabs mx-auto max-w-4xl text-white bg-white dark:bg-[#393E46]  rounded-lg min-h-[350px] shadow-2xl'>
                    <Tabs
                        style={{ outline: 'none' }}
                        defaultActiveKey="1"
                        centered
                        items={items}
                    />
                </div>
            </div>

            <ModalVideo channel='youtube' autoplay isOpen={isOpen}
                //  regex lấy ID của URL 
                videoId={detailMovie ? detailMovie.trailer?.match(/\/(?:embed\/|watch\?v=)?([a-zA-Z0-9_-]{11})/)[1] : ""}
                onClose={() => setOpen(false)} />
        </Layout>
    );
};

export default Detail;