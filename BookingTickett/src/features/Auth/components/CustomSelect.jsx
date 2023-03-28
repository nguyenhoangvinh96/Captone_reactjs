import { useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
const CustomSelect = ({ label, ...props }) => {
    const { t, i18n } = useTranslation();
    const [field, meta] = useField(props);
    const normalClass = 'bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:text-white dark:bg-[#393E46]';
    const errorClass = 'bg-red-50 border border-red-500 text-red-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2';
    return (
        <>
            {/* <p className='text-gray-500'>{label}</p> */}
            {/* truyền props (name,type,placeholder) */}
            {/* field để giá trị có thể thay đổi */}
            <select
                {...field}
                {...props}
                className={
                    meta.touched && meta.error ?
                        errorClass : normalClass}
            />
            {/* hiển thị lỗi */}
            {meta.touched && meta.error &&
                <span className='text-xs text-red-500'>{t(`${meta.error}`)}</span>}
        </>
    );
};

export default CustomSelect;