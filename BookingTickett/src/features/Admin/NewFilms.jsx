import React from 'react'
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
import { useDispatch } from 'react-redux';
import { addNewFilms } from './thunk';

const { TextArea } = Input;
const NewFilms = () => {
  const dispatch = useDispatch()
  const [imgScr, setImgSrc] = useState("");
  const [componentSize, setComponentSize] = useState('Default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: "GP01"
    },
    onSubmit: (value) => {
      let formData = new FormData();
      for (let key in value) {
        if (key !== "hinhAnh") {
          formData.append(key, value[key]);
        } else {
          formData.append("File", value.hinhAnh, value.hinhAnh.name);
        }
      }
      dispatch(addNewFilms(formData))
    }
  })
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  }

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    let render = new FileReader();
    render.readAsDataURL(file);
    render.onload = (e) => {
      setImgSrc(e.target.result)
    }
    formik.setFieldValue("hinhAnh", file)
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
        className=" py-4 bg-gray-200 dark:bg-[#050000] "
      >
        <h2 className=' ml-60 mb-5 text-2xl font-bold'>Thêm Phim</h2>
        <Form.Item label="Tên Phim" className='font-bold ml-60'>
          <Input name='tenPhim' onChange={formik.handleChange} style={{ width: 618 }} />
        </Form.Item>
        <Form.Item label="Trailer" className='font-bold ml-64'>
          <Input name='trailer' onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô Tả" className='font-bold ml-64'>
          <TextArea name='moTa' onChange={formik.handleChange} className="h-20" />
        </Form.Item>
        <div className='flex ml-60'  >
          <Form.Item label="Ngày Khởi Chiếu" className='font-bold mr-20'>
            <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
          </Form.Item>
          <Form.Item label="Đang Chiếu" className='font-bold mr-5' >
            <Switch onChange={handleChangeSwitch("dangChieu")} />
          </Form.Item>
          <Form.Item label="Sắp Chiếu" className='font-bold mr-5' >
            <Switch onChange={handleChangeSwitch("sapChieu")} />
          </Form.Item>
          <Form.Item label="Hot" className='font-bold' >
            <Switch onChange={handleChangeSwitch("hot")} />
          </Form.Item>
        </div>
        <div className='flex' style={{ marginLeft: 306 }}>
          <Form.Item label="Số Sao" className='font-bold ' style={{ marginRight: 147 }}>
            <InputNumber onChange={(value) => { formik.setFieldValue("danhGia", value) }} min={1} max={5} />
          </Form.Item>
          <Form.Item label="Hình Ảnh" className='font-bold '>
            <input type="file" onChange={handleChangeFile} /> <br />
            <img width={150} height={150} src={imgScr} alt='...' />
          </Form.Item>
        </div>
        <Form.Item className='font-bold text-right mr-40'>
          <button type='submit' className=' py-2 px-5 rounded text-black'>Thêm Phim</button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default NewFilms