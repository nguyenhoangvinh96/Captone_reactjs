import React, { useEffect, useState } from 'react'
import { Avatar, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LOG_OUT } from '../features/Auth/constants';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import {RollbackOutlined} from '@ant-design/icons'

const url = "https://edu.cfd-engineer.com/static/assets/img/single.png"

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const { infoUser } = useSelector(state => state.authReducer);
  const Naviagate = useNavigate()
  const logOut = () => {
    Swal.fire({
      text: 'Bạn chắc chắn muốn đăng xuất ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EA580C',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken');
        dispatch({
          type: LOG_OUT
        })
        Swal.fire({
          title: 'Đăng xuất thành công',
          icon: 'success',
          timer: 1500,
        })
        Naviagate("/")
      }
    })
  }

}

export default HeaderAdmin