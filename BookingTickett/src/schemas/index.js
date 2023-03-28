import * as yup from 'yup';

const passwordRegex = /^[0-9]{5,10}$/;
const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
const fullnameRegex = /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/;
const usernameRegex = /^[A-z_](\w|\.|_){3,7}$/
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const advanceSchema = yup.object().shape({
    taiKhoan: yup
        .string()
        .min(4, 'Tài khoản phải có ít nhất 4 kí tự')
        .matches(usernameRegex, { message: "Tài khoản phải bao gồm 4-6 kí số và bắt đầu bằng chữ" })
        .required('Vui lòng nhập tài khoản'),
    maNhom: yup
        .string()
        .oneOf(['GP01', 'GP02', 'GP03', 'GP04', 'GP05', 'GP06', 'GP07'], null)
        .required('Vui lòng chọn nhóm'),
    matKhau: yup
        .string()
        .min(6, 'Mật khẩu phải là số từ 6-10 kí tự')
        .matches(passwordRegex, { message: "Mật khẩu phải là số từ 6-10 kí tự" })
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
        .string()
        .required('Vui lòng xác nhận mật khẩu')
        .oneOf([yup.ref('matKhau'), null], 'Mật khẩu không giống nhau')
    ,
    email: yup
        .string()
        .matches(emailRegex, { message: "Email không hợp lệ" })
        .required('Vui lòng nhập email'),
    soDt: yup
        .string()
        .matches(phoneRegex, { message: "Số điện thoại không hợp lệ" })
        .required('Vui lòng nhập số điện thoại'),
    hoTen: yup
        .string()
        .matches(fullnameRegex, { message: "Họ và tên phải viết hoa chữ cái đầu" })
        .required('Vui lòng nhập họ tên'),

})
