
import { adminService } from "./services/adminService";
import Swal from "sweetalert2";
export const fetchFilms = async (dispatch)=>{
    try{
        const res = await adminService.getFilms()
        dispatch({
            type: "GET_FILMS",
            payload: res.data.content
        })
    }catch(err){
        console.log(err);
    }
}

export const fetchListUser = async (dispatch)=>{
    try{
        const res = await adminService.getListUser();
        dispatch({
            type: "GET_LIST_USER",
            payload: res.data.content
        })
    }catch(err){
        console.log(err);
    }
}
export const searchUer = (tuKhoa) => async (dispatch) =>{
    try{
        const res =  await adminService.searchUser(tuKhoa);
        dispatch({
            type: "GET_LIST_USER",
            payload: res.data.content
        })
    
    }catch(err){
        console.log(err);
    }
}
export const searchFilms = (tuKhoa) => async (dispatch) =>{
    try{
        const res =  await adminService.searchFilms(tuKhoa);
        dispatch({
            type: "GET_FILMS",
            payload: res.data.content
        })
    
    }catch(err){
        console.log(err);
    }
}
export const addNewFilms = async (data)=>{
    try{
        const res = await adminService.addNewFilms(data);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm Phim Thành Công',
            showConfirmButton: false,
            timer: 1500,
          })
    }catch(err){
        if(err.response.status === 500){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                text: "Phim đã tồn tại",
                title: err.response.data.content,
                showConfirmButton: true,
                // timer: 1500,
              })
        }
        console.log(err);
    }
}
export const infoFilms = (id)=>  async (dispatch) =>{
    try{
        const res = await adminService.infoFilms(id);
        dispatch({
            type: "INFO_FILMS",
            payload: res.data.content
        })
    }catch(err){
        console.log(err);
    }
}
export const uploadFilms = async  (formData) =>{
    try{
    const res = await adminService.updateFilms(formData);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cập nhập thành Công',
        showConfirmButton: false,
        timer: 1500,
      })
    }catch(err){
        if(err.response.status === 500){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: err.response.data.content,
                showConfirmButton: true,
                // timer: 1500,
              })
        }
        console.log(err);
    }
}
export const deleteFimls =  (maPhim) =>async (dispatch) =>{
    try{
    const res = await adminService.deleteFilms(maPhim);
    dispatch(fetchFilms)
    }catch(err){
        console.log(err);
    }
}
export const fetchCumRap =  async (dispatch) =>{
    try{
    const res = await adminService.getInfoTheaterSystem();
    dispatch({
        type:"LIST_RAP",
        payload: res.data.content
    })

    }catch(err){
        console.log(err);
    }
}