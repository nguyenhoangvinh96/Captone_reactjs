import React, { useState } from 'react';
import { Card } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ModalVideo from 'react-modal-video'
const { Meta } = Card;
const MovieItem = (props) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState(false)
    const { item } = props;
    const navigateSeat = (id) => {
        // const a = localStorage.getItem('userToken');
        // if (!a) {
        //     return navigate('/signin/')
        // }

        navigate('/detail/' + id)
    }
    return (
        <Card
            style={{ height: 580 }}
            hoverable
            cover={<img onClick={() => {
                navigateSeat(item.maPhim)
            }} className='h-96 object-cover' alt="example" src={item.hinhAnh} />}
        >
            <div className=''>
                <div>
                    <Meta
                        onClick={() => {
                            navigateSeat(item.maPhim)
                        }}
                        className='text-orange-500'
                        title={item.tenPhim} description={item.moTa.length > 60 ? item.moTa.slice(0, 60) + '...' : item.moTa} />
                </div>
                <div className='absolute bottom-3 w-full left-0 px-4'>
                    {/* to={`/detail/${item.maPhim}`} */}
                    <button
                        onClick={() => {
                            navigateSeat(item.maPhim)
                        }}
                        className='w-full rounded-lg p-2 font-bold text-center block bg-orange-600 hover:bg-orange-800 text-white hover:text-white'  >{t('ĐẶT VÉ')}</button>
                </div>
            </div>
            <button className="btnOpenModalVideo" onClick={() => setOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ maxWidth: 30, textAlign: 'center' }} className="inline-block">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
            </button>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen}
                //  regex lấy ID của URL 
                videoId={item ? item.trailer.match(/\/(?:embed\/|watch\?v=)?([a-zA-Z0-9_-]{11})/)[1] : ""}
                onClose={() => setOpen(false)} />
        </Card>
    )
};

export default MovieItem;