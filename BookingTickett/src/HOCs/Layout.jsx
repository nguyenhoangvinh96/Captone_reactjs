import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import ButtonDarkMode from '../components/ButtonDarkMode';
const Layout = (props) => {
    return (
        <div className='dark:bg-[#fdfdfd] text-black'>
            <Header />
            <div className='mt-14'></div>
            {props.children}
            <Footer />
            <Loading/>
            <ButtonDarkMode/>
        </div>
    );
};

export default Layout;