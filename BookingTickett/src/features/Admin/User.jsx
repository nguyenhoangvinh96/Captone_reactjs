import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUser, searchUer } from "./thunk";
import { Button, Input, Table, Tooltip } from "antd";
import { UserAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const User = () => {
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.adminReducer.user);
  useEffect(() => {
    dispatch(fetchListUser)
  }, [dispatch]);
  const onSearch = (value) => {
    value === "" ? dispatch(fetchListUser) : dispatch(searchUer(value))
  }
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      // width: 170
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      // width:200,
    },
    {
      title: "Email",
      dataIndex: "email",
      // width:230
    },
    {
      title: "Số điện Thoại",
      dataIndex: "soDT",
      // width:150
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
      // width: 150

    },
    {
      title: "Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      // width:200,
      filters: [
        {
          text: "KhachHang",
          value: "KhachHang"
        },
        {
          text: "QuanTri",
          value: "QuanTri"
        }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.maLoaiNguoiDung.startsWith(value),
    },
    {
      title: "Hành Động",
      dataIndex: "thaoTac",
    },
  ];
  return (
    <div className=" p-3 bg-gray-200 dark:bg-[#727272]">
      <h2 className="m-0 text-2xl font-bold text-center">Quản lý tài khoản</h2>
      <div className="flex justify-center items-center">
        <Button type="primary" className="my-3 bg-sky-500">
          <UserAddOutlined />
          Thêm người dùng
        </Button>
        <Input.Search placeholder="Tìm kiếm tên người dùng"
          onSearch={onSearch}
          style={{
            marginLeft: 15,
            width: 300
          }}
        />
      </div>

      <Table columns={columns} dataSource={dataSource.map((items) => {
        return {
          key: items.taikhoan,
          taiKhoan: items.taiKhoan,
          hoTen: items.hoTen,
          email: items.email,
          soDT: items.soDT,
          matKhau: <Input.Password value={items.matKhau} style={{ width: 150 }} />,
          maLoaiNguoiDung: items.maLoaiNguoiDung,
          thaoTac: <div className="flex items-center">
            <Tooltip title="Edit" color="green" key="green">
              <button className='ml-3 text-green-600 text-lg '><EditOutlined /></button>
            </Tooltip>
            <Tooltip title="Delete" color="red" key="red" >
              <button className='ml-5 text-red-600 text-lg '><DeleteOutlined /></button>
            </Tooltip>
          </div>
        }
      })} />

    </div>
  );
};

export default User;
