import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
const HomeNews = () => {
    const { t, i18n } = useTranslation();
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
  

    ];
    return (
        <div className='max-w-4xl mx-auto tabHomeNews my-14 '>
            <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
        </div>
    );
};

export default HomeNews;