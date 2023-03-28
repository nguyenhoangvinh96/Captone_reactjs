import { https } from "../../../serivce/config"
export const movieService = {
    getBanners: () => https.get('QuanLyPhim/LayDanhSachBanner?maNhom=GP04'),
    getMoviesPagination: (soTrang) => https.get('QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP03', {
        params: {
            soTrang,
            soPhanTuTrenTrang: 8
        }
    }),
    getTabs: () => https.get('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP07'),
    getScheduleDetail: (id) => {
        const url = 'QuanLyDatVe/LayDanhSachPhongVe'
        return https.get(url, {
            params: {
                MaLichChieu: id
            }
        })
    },
    // lấy thông tin phim cho trang chi tiết
    getDetailMovie: (id) => {
        const url = `QuanLyRap/LayThongTinLichChieuPhim`
        return https.get(url, {
            params: {
                MaPhim: id
            }
        })
    },
    getListSeats: (id) => {
        const url = `QuanLyDatVe/LayDanhSachPhongVe`
        return https.get(url, {
            params: {
                MaLichChieu: id
            }
        })
    },
    postBookTicket: (infoBook) => {
        const url = `QuanLyDatVe/DatVe`
        return https.post(url, infoBook,
            {
                headers: {
                    TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOCIsIkhldEhhblN0cmluZyI6IjA2LzA4LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MTI4MDAwMDAwMCIsIm5iZiI6MTY2MjM5NzIwMCwiZXhwIjoxNjkxNDI3NjAwfQ.66mNB20qUNFA8TlIzjAq7Ekv1hVfR3hQB4I3_yLui8Y',
                    Authorization: "Bearer " + localStorage.getItem('userToken')
                }
            })
    }
}