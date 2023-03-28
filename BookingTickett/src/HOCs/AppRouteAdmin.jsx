import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RouteAdmin = ({ isAdmin,  Component, redirectPath }) => {
    // lấy infor dưới reducer 
    const { infoUser } = useSelector(state => state.authReducer);
    const token = localStorage.getItem('userToken');
    // chỉ được vào khi đã login 
     // chỉ dc vào khi user là quản trị
     if (isAdmin) {
        if(!token){
            return <Navigate to={redirectPath} />
        }
        if (!infoUser) return <div className='h-screen w-screen bg-white dark:bg-[#222831] '>
            <div className='flex items-center justify-center'>
                <Spin className='text-orange-600 ' size='large'>
                </Spin>
                <h2 className='font-bold text-orange-600 text-2xl ml-10'>Đang Kiểm Tra quyền truy Cập !!!</h2>
            </div>
        </div>
        if (infoUser.maLoaiNguoiDung === 'KhachHang') {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1600,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'error',
                title: "Không đủ quyền truy cập !"
            })
        }
        return infoUser.maLoaiNguoiDung === 'QuanTri' ? <Component /> : <Navigate to={redirectPath} />
    
        
       }
     
    return (
        <Component />
    );
};

export default RouteAdmin;