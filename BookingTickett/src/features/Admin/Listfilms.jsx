import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFimls, fetchFilms, searchFilms } from './thunk'
import { Table, Space, Button, Input, Tooltip } from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, DesktopOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PlusCircleOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
const ListFilms = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchFilms)
  }, [dispatch])
  const goToEditFilms = (id) => { Navigate("/admin/films/edit/" + id) }; // đi đến trang edit films
  const goToShowTimme = (id) => { Navigate("/admin/films/showtime/" + id) } // đi đến trang show time 
  const listFilms = useSelector(state => state.adminReducer.films)
  const onSearchFilms = (value) => {
    value === "" ? dispatch(fetchFilms) : dispatch(searchFilms(value))
  }

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm mã phim`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            className='bg-sky-500'
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [{
    title: "Mã Phim",
    dataIndex: "maPhim",
    ...getColumnSearchProps('maPhim'),

  },
  {
    title: "Hình Ảnh",
    dataIndex: "hinhAnh",
  },
  {
    title: "Tên Phim",
    dataIndex: "tenPhim",

  },
  {
    title: "Sắp chiếu",
    dataIndex: "sapChieu",
  },
  {
    title: "Đang chiếu",
    dataIndex: "dangChieu",

  },
  {
    title: "Phim Hot",
    dataIndex: "hot",

  },

  // {
  //   title: "Mô Tả",
  //   dataIndex: "moTa",
  //   width: 780
  // },
  {
    title: "Hành Động",
    dataIndex: "thaoTac",

  },
  ]

}

export default ListFilms