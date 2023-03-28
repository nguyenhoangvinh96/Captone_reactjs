import React, { useEffect, useState } from 'react'
import {  Cascader, DatePicker, Form,  InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCumRap, infoFilms } from './thunk';
import { adminService } from './services/adminService';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import 'dayjs/locale/de'
import dayjs from "dayjs";
import Swal from 'sweetalert2';

const Showtime = (props) => {
const thongTinPhim = useSelector(state=>state.adminReducer.infoFilms)
const ThongTinCumRap = useSelector(state=> state.adminReducer.cumRap)
const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchCumRap)
        dispatch(infoFilms(id))
    },[])
    const {id} = useParams();
const formik = useFormik({
    initialValues:{
        maPhim: id,
        ngayChieuGioChieu:"",
        maRap:"",
        giaVe:""
    },
    onSubmit: async (values) =>{
      try{
        const res = await adminService.upShowTime(values)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tạo lịch Chiếu Thành Công',
          showConfirmButton: false,
          timer: 1500,
        })
      }catch(err){
        console.log(err);
      }
    }
});


const [cumRap,setCumRap] = useState([])
    async function  handlChangeHeThongRap(value){
      
      try{
         const res = await adminService.getInfoCluster(value);
         setCumRap(res.data.content)
         
      }catch(err){console.log(err);}
      
    }
    const onOk = (value)=>{
      formik.setFieldValue("ngayChieuGioChieu",dayjs(value).format("DD/MM/YYYY hh:mm:ss"))
    }
    const handlchangeInput =(value)=>{
      formik.setFieldValue("giaVe",value)
    }
    const handlChangeCumRap =(value)=>{
      formik.setFieldValue("maRap",value[0])

    }
  return (
    <div className='container mx-auto p-4 '>
    <Form 
     name="basic"
     labelCol={{
       span: 10,
     }}
     wrapperCol={{
       span: 15,
     }}
    //  style={{
    //    maxWidth: 600,
    //  }}
     initialValues={{
       remember: true,
     }}
     autoComplete="off"
     className="bg-slate-300 h-96 "
     onSubmitCapture={formik.handleSubmit}
    >
    <h2 className='font-bold text-xl ml-10'>Tạo Lịch chiếu</h2>
    <div className='flex'>
    <div className='ml-96 font-bold'>
    <h2 className='mb-3'>Tên Phim: {thongTinPhim.tenPhim}</h2>
    <img src={thongTinPhim.hinhAnh} alt="" className='w-36' />
    </div>
    <div className='ml-28 font-bold'>
    <Form.Item label="Hệ thống rạp">
      <Cascader options={ThongTinCumRap?.map((items)=>({label: items.tenHeThongRap, value:items.maHeThongRap , key:items.maHeThongRap
}))}  onChange={handlChangeHeThongRap} placeholder="Hệ thống rạp"/>
    </Form.Item>
    <Form.Item label="Cụm Rạp">
   <Cascader options={cumRap?.map((items)=>({label:items.tenCumRap, value: items.maCumRap,key:items.maCumRap}))}  placeholder="Cụm rạp" onChange={handlChangeCumRap}/>
    </Form.Item>
    <Form.Item label="Ngày Chiếu Giờ Chiếu">
     <DatePicker showTime  onOk={onOk} />
    </Form.Item>
    <Form.Item label="Giá Vé">
     <InputNumber  onChange={handlchangeInput} placeholder="Giá vé"/>
    </Form.Item>
    <Form.Item label="chức năng">
     <button onClick={onsubmit} className="bg-sky-500 py-2 px-1 text-white rounded-lg hover:bg-sky-700  ">tạo lịch chiếu</button>
    </Form.Item>
    </div>
    </div>
  
    
    
    </Form>
    </div>
  )
}

export default Showtime