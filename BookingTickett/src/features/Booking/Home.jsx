import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../HOCs/Layout';
import { fetchProfile } from '../Auth/thunk';
import HomeCarousel from './components/HomeCarousel';
import HomeNews from './components/HomeNews';
import HomeTabs from './components/HomeTabs';
import IntroduceApp from './components/IntroduceApp';
import MovieList from './components/MovieList';
import { fetchBanners, fetchInfoTheater, fetchMovies } from './thunk';

const Home = () => {
    const dispatch = useDispatch();
    const [useSearch, setSearchParam] = useSearchParams();

    useEffect(() => {
        dispatch(fetchBanners);
        dispatch(fetchInfoTheater);
        // fetch dữ liệu infoUser mới
        dispatch(fetchProfile)
    }, [])

    useEffect(() => {
        dispatch(fetchMovies(useSearch.get('page')))
    }, [useSearch.get('page')])
    return (
        <Layout>
            <HomeCarousel />
            <MovieList />
            <HomeTabs />
            <HomeNews />
            <IntroduceApp/>
        </Layout>
    );
};

export default Home;