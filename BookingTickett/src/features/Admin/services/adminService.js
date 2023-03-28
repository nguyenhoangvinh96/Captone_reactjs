import { https } from "../../../serivce/config";

export const adminService = {
   getFilms: ()=> https.get("/QuanLyPhim/LayDanhSachPhim"),
   getListUser: ()=>https.get("/QuanLyNguoiDung/LayDanhSachNguoiDung"),
   searchUser: (tuKhoa)=>https.get("/QuanLyNguoiDung/TimKiemNguoiDung",{
      params:{
         tuKhoa:tuKhoa
      }
   }),
   searchFilms: (tuKhoa)=>https.get("/QuanLyPhim/LayDanhSachPhim",{
      params:{
         tenPhim:tuKhoa
      }
   }),
   addNewFilms: (data)=>https.post("/QuanLyPhim/ThemPhimUploadHinh",data),
   infoFilms: (id)=>https.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`),
   updateFilms: (formData)=>https.post("/QuanLyPhim/CapNhatPhimUpload",formData),
   deleteFilms: (maPhim)=>https.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`),
   getInfoTheaterSystem: ()=>https.get("/QuanLyRap/LayThongTinHeThongRap"),
   getInfoCluster:(maRap)=>https.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`),
   upShowTime: (data) =>https.post("/QuanLyDatVe/TaoLichChieu",data)
};