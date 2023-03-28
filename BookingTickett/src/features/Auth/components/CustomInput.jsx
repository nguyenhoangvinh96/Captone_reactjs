import { useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
const CustomInput = ({ label, ...props }) => {
    const { t, i18n } = useTranslation();
    const [field, meta] = useField(props);
    const normalClassInput = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-[#393E46] dark:text-white'
    const errorClassInput = "bg-red-50 border border-red-500 text-red-700 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-blue-500 block w-full p-2 dark:bg-[#393E46] dark:text-white  "
    return (
        <>
            {/* <p className='text-gray-500'>{label}</p> */}
            {/* truyền props (name,type,placeholder) */}
            {/* field để giá trị có thể thay đổi */}
            <input
                {...field}
                {...props}
                className={meta.touched && meta.error ?
                    errorClassInput : normalClassInput}
            />
            {/* hiển thị lỗi */}
            {meta.touched && meta.error &&
                <span className='text-xs text-red-500'>{t(`${meta.error}`)}</span>}
        </>
    );
};

export default CustomInput;