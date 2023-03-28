import React, { useEffect } from 'react'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,

  } from 'antd';
  import { useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {  infoFilms, uploadFilms } from './thunk';
import {  useParams } from 'react-router-dom';
import dayjs from 'dayjs';



const Editfilms = () => {
const dispatch = useDispatch()
const [imgScr, setImgSrc] = useState("");
const [componentSize, setComponentSize] = useState('Default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const {id}= useParams()
  
  useEffect(()=>{
    dispatch(infoFilms(id))
  },[dispatch, id])
  const thongTinPhim = useSelector(state=> state.adminReducer.infoFilms)
  const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
        maPhim:thongTinPhim?.maPhim,
        tenPhim:thongTinPhim.tenPhim,
        trailer:thongTinPhim?.trailer,
        moTa:thongTinPhim?.moTa,
        ngayKhoiChieu:dayjs(thongTinPhim?.ngayKhoiChieu).format(`DD/MM/YYYY`),
        dangChieu: thongTinPhim?.dangChieu,
        sapChieu: thongTinPhim?.sapChieu,
        danhGia:thongTinPhim?.danhGia,
        hot:thongTinPhim?.hot,
        hinhAnh:null,
        maNhom:"GP01"

    },
    onSubmit:(value)=>{
      let formData = new FormData();
      for(let key in value){
        if(key !== "hinhAnh"){
          formData.append(key,value[key]);
        }else{
          if(value.hinhAnh !== null){
          formData.append("File", value.hinhAnh, value.hinhAnh.name);
          }
        }
      }
      dispatch(uploadFilms(formData))
    }
  })
  const handleChangeDatePicker = (value)=>{
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu",ngayKhoiChieu);
  }

  const handleChangeSwitch =(name)=>{
    return(value)=>{
        formik.setFieldValue(name,value)
    }
  }
  const handleChangeFile = async (e)=>{
    let file = e.target.files[0];
    await formik.setFieldValue("hinhAnh",file)
    let  render = new FileReader();
    render.readAsDataURL(file);
    render.onload=(e)=>{
    setImgSrc(e.target.result)
    }
 
    
}
  return (
    <div>
  
    <Form
    onSubmitCapture={formik.handleSubmit}
    // labelCol={{
    //   span: 6,
    // }}
    wrapperCol={{
      span: 14,
    }}
    // layout="vertical"
    initialValues={{
      size: componentSize,
    }}
    onValuesChange={onFormLayoutChange}
    size={componentSize}
    style={{
      width:"97%",
    }}
    className="m-4 py-4 bg-slate-300 "
  >
    <h2 className=' ml-60 mb-5 text-2xl font-bold'>Cập Nhập Phim</h2>
    <Form.Item label="Form Size" name="size"  className='font-bold ml-60'>
      <Radio.Group>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item label="Tên Phim"  className='font-bold ml-60'>
      <Input name='tenPhim' onChange={formik.handleChange} style={{width:618}} value={formik.values.tenPhim} />
    </Form.Item>
    <Form.Item label="Trailer"  className='font-bold ml-64'>
      <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer}/>
    </Form.Item>
    <Form.Item label="Mô Tả"  className='font-bold ml-64'>
      <Input name='moTa'onChange={formik.handleChange}  value={formik.values.moTa}/>
    </Form.Item>
    <div className='flex ml-60'  >
    <Form.Item label="Ngày Khởi Chiếu"  className='font-bold mr-20'>
      <DatePicker  onChange={handleChangeDatePicker} format={"DD/MM/YYYY"} defaultValue={dayjs(formik.values.ngayKhoiChieu,"DD/MM/YYYY")}/>
    </Form.Item>
    <Form.Item label="Đang Chiếu"  className='font-bold mr-5' >
      <Switch  onChange={handleChangeSwitch("dangChieu")} checked={formik.values.dangChieu}/>
    </Form.Item>
    <Form.Item label="Sắp Chiếu"  className='font-bold mr-5' >
      <Switch  onChange={handleChangeSwitch("sapChieu")}  checked={formik.values.sapChieu}/>
    </Form.Item>
    <Form.Item label="Hot"  className='font-bold' >
      <Switch onChange={handleChangeSwitch("hot")}  checked={formik.values.hot} />
    </Form.Item>
    </div>
    <div className='flex' style={{marginLeft:306}}>
    <Form.Item label="Số Sao"  className='font-bold ' style={{marginRight:147}}>
      <InputNumber onChange={(value)=>{formik.setFieldValue("danhGia",value)}} min={1} max={5} value={formik.values.danhGia}/>
    </Form.Item>
    <Form.Item label="Hình Ảnh"  className='font-bold '>
      <input type="file" onChange={handleChangeFile}/> <br/>
      <img width={150} height={150} src={imgScr ===""? thongTinPhim.hinhAnh : imgScr} alt='...'/>
    </Form.Item>
    </div>
  
    <Form.Item  className='font-bold text-right mr-40'>
      <button type='submit' className='bg-sky-400 text-white p-1 rounded-md font-bold px-5 py-4'>Cập Nhập</button>
    </Form.Item>
  </Form>
    </div>
 
  )
}

export default Editfilms