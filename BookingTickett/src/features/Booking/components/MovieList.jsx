import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from './MovieItem';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const MovieList = () => {
    const dispatch = useDispatch();
    const { movies } = useSelector(state => state.bookingReducer);
    const [useSearch, setSearchParam] = useSearchParams();
    const { t, i18n } = useTranslation();
    return (
        <div className='max-w-4xl mx-auto' id='lichChieu'>
            <h1 className='text-center text-4xl font-bold my-10 text-black dark:text-black'>{t('DANH SÁCH PHIM')}</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-2 lg:grid-cols-4'>
                {movies.items?.map(item =>
                    <MovieItem key={item.maPhim} item={item} />
                )}
            </div>
            <Pagination current={+useSearch.get('page')} className='mt-6 mb-10' pageSize={1} total={movies.totalCount} onChange={(page, pageSize) => {
                setSearchParam({ page })
            }} />
        </div>
    );
};

export default MovieList;