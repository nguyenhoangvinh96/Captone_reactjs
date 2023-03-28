import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LOG_OUT } from "../features/Auth/constants";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { Select } from "antd";
const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.authReducer);
  const handleChange = (value = "vi") => i18n.changeLanguage(value);
  let token = localStorage.getItem("userToken");
  return (
    <div>
      <header className="p-2 bg-white text-black fixed dark:bg-[#110606] dark:text-white top-0 z-50 shadow-md w-full">
        <div className="container flex justify-between  mx-auto">
          <NavLink
            rel="noopener noreferrer"
            to="/"
            aria-label="Back to homepage"
            className="flex items-center"
          ></NavLink>
         
          {token && infoUser ? (
            <nav className="flex items-center">
              <NavLink
                to="/profile"
              >
                <img
                  width={36}
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  alt=""
                />
                <p className="font-bold ml-1 hidden sm:block">
                  {infoUser.taiKhoan}
                </p>
              </NavLink>
              <button
                onClick={async () => {
                  Swal.fire({
                    text: "Bạn chắc chắn muốn đăng xuất ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#EA580C",
                    cancelButtonColor: "grey",
                    confirmButtonText: "Log out",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      localStorage.removeItem("userToken");
                      dispatch({
                        type: LOG_OUT,
                      });
                      Swal.fire({
                        title: "Đăng xuất thành công",
                        icon: "success",
                        timer: 1500,
                      });
                    }
                  });
                }}
              >
                {t("Đăng xuất")}
              </button>
            </nav>
          ) : (
            <div className="items-center flex-shrink-0 flex">
              <NavLink
                to="/signin"
                className={(p) => {
                  const classes =
                    "self-center md:px-4 px-2 py-1.5 font-semibold rounded text-black dark:text-black duration-300 mr-2  ";
                }}
              >
                {t("Đăng nhập")}
              </NavLink>
              <NavLink
                to="/signup"
              >
                {t("Đăng ký")}
              </NavLink>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
