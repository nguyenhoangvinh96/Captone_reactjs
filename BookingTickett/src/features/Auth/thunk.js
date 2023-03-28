import { AuthService } from "./services/authService";
import * as actionTypes from './constants'
import { DISPLAY_LOADING, HIDDEN_LOADDING } from '../Booking/constants'
import Swal from 'sweetalert2'
export const postLoginInfo = data => async (dispatch) => {
    try {
        // hiện loading khi đăng nhập * slow 3G
        dispatch({
            type: DISPLAY_LOADING
        })
        const res = await AuthService.signIn(data);
        localStorage.setItem('userToken', res.data.content.accessToken);
        dispatch({
            type: actionTypes.POST_LOGIN_INFO,
            payload: res.data.content
        })
        dispatch({
            type: HIDDEN_LOADDING
        })
    } catch (err) {

        dispatch({
            type: HIDDEN_LOADDING
        })
    }
}

export const fetchProfile = async (dispatch) => {
    try {
        const res = await AuthService.fetchProfile();
        await dispatch({
            // type giống với mục login vì để đẩy dữ liệu user lên reducer 
            type: actionTypes.POST_LOGIN_INFO,
            payload: res.data.content
        })
    } catch (err) {
        console.log(err)
    }
}


export const postSignUp = data => async (dispatch) => {
    try {
        const res = await AuthService.signUp(data);
        return true
    } catch (err) {
        console.log(err.response.data.content);
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
            icon: 'error',
            title: `${err.response.data.content}`
        })
        return false
    }
}

export const updateUser = data => async (dispatch) => {
    try {
        const res = await AuthService.updateUser(data);
        return true
    } catch (err) {
        console.log(err);
        return false
    }
}