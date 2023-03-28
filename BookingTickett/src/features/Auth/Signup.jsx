import React from 'react';
import AuthLayout from '../../HOCs/AuthLayout';
import Layout from '../../HOCs/Layout';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';
import { NavLink, useNavigate } from 'react-router-dom';
import { Select, Space } from 'antd';
import Swal from 'sweetalert2'
//formik vs yup
import { Form, Formik } from 'formik';
import { advanceSchema } from '../../schemas/index';
import CustomInput from './components/CustomInput'
import CustomSelect from './components/CustomSelect'
import { useDispatch } from 'react-redux';
import { postSignUp } from './thunk';

const Signup = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (values, actions) => {
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        console.log(values)
        console.log(actions)
        actions.resetForm();
        const res = await dispatch(postSignUp(values));
        if (res) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2400,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Đăng ký thành công !'
            })
            navigate('/signin')
        }
    }

    return (
        <AuthLayout>
            <div className="">
                <div className="pt-16  md:pt-7">
                    <div className=" px-12 sm:px-24 md:px-24 lg:px-12  xl:px-18 max-w-xl mx-auto shadow-2xl py-4 rounded-xl dark:bg-[#393E46] ">
                        <div className=''>
                            <div className='flex justify-center items-center '>
                                <h2 className="  text-2xl text-orange-600 font-display font-semibold mr-2  xl:text-3xl
          xl:text-bold">{t('Đăng ký')}</h2>
                            </div>
                            <div className="mt-8">
                                <Formik
                                    initialValues={{
                                        taiKhoan: "",
                                        matKhau: "",
                                        confirmPassword: "",
                                        email: "",
                                        soDt: "",
                                        maNhom: "",
                                        hoTen: ""
                                    }}
                                    validationSchema={advanceSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="grid grid-cols-2 gap-0 md:gap-x-10 gap-y-4">
                                                {/* tài khoản  */}
                                                <div className='col-span-2  '>
                                                    <CustomInput
                                                        label='Tài khoản'
                                                        name='taiKhoan'
                                                        type='text'
                                                        placeholder={t('Nhập tài khoản')}
                                                    />
                                                </div>
                                                {/* mật khẩu */}
                                                <div className='col-span-2 md:col-span-1 ' >
                                                    <CustomInput
                                                        label='Mật khẩu'
                                                        name='matKhau'
                                                        type='text'
                                                        placeholder={t('Nhập mật khẩu')}
                                                    />
                                                </div>
                                                {/* xác nhận */}
                                                <div className='col-span-2 md:col-span-1 ' >
                                                    <CustomInput
                                                        label='Xác nhận'
                                                        name='confirmPassword'
                                                        type='text'
                                                        placeholder={t('Nhập lại mật khẩu')}
                                                    />
                                                </div>
                                                {/* email */}
                                                <div className='col-span-2 md:col-span-1 '>
                                                    <CustomInput
                                                        label='Email'
                                                        name='email'
                                                        type='text'
                                                        placeholder={t('Nhập email')}
                                                    />
                                                </div>
                                                {/* sdth */}
                                                <div className='col-span-2 md:col-span-1 ' >
                                                    <CustomInput
                                                        label='Họ và tên'
                                                        name='hoTen'
                                                        type='text'
                                                        placeholder={t('Nhập họ và tên')}
                                                    />
                                                </div>
                                                {/*  họ tên */}
                                                <div className='col-span-2 md:col-span-1 '>
                                                    <CustomInput
                                                        label='Số điện thoại'
                                                        name='soDt'
                                                        type='text'
                                                        placeholder={t('Nhập số điện thoại')}
                                                    />
                                                </div>
                                                {/* mã nhóm  */}
                                                <div className='col-span-2 md:col-span-1 ' >
                                                    <CustomSelect
                                                        label={t('Mã nhóm')}
                                                        name='maNhom'
                                                        type='text'
                                                    >
                                                        <option value="">{t('Chọn nhóm')}</option>
                                                        <option value="GP01">GP01</option>
                                                        <option value="GP02">GP02</option>
                                                        <option value="GP03">GP03</option>
                                                        <option value="GP04">GP04</option>
                                                        <option value="GP05">GP05</option>
                                                        <option value="GP06">GP06</option>
                                                        <option value="GP07">GP07</option>
                                                    </CustomSelect>
                                                </div>
                                            </div>
                                            <div className="mt-10">
                                                {!isSubmitting ?
                                                    <button
                                                        // nếu đang trong quá trình submitting button sẽ disable
                                                        type='submit'
                                                        className="bg-orange-600 text-gray-100 p-2.5  rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-orange-700 
                                shadow-lg duration-300 w-[60%] block mx-auto ">
                                                        {t('Đăng ký')}
                                                    </button>
                                                    :
                                                    <div className=''>
                                                        <button
                                                            type="button"
                                                            disabled
                                                            class="flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-2 rounded-full border border-orange-700 bg-orange-700 px-16 py-3 text-sm font-medium text-white transition hover:border-orange-800 hover:bg-orange-800 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:pointer-events-none disabled:opacity-75 mx-auto">
                                                            <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                                                                <path
                                                                    class="fill-blue-800"
                                                                    d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                                                                <path
                                                                    class="fill-blue-100"
                                                                    d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                                                            </svg>
                                                            <span>{t('Đang tải ...')}</span>
                                                        </button>
                                                    </div>

                                                }
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center dark:text-white">
                                    {t('Bạn đã có tài khoản ?')} <NavLink to='/signin' className="cursor-pointer text-orange-600 hover:text-orange-700">{t('Đăng nhập')}</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </AuthLayout>
    );
};

export default Signup;