import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import FooterAdmin from "../components/FooterAdmin";
import SiderAdmin from "../components/SiderAdmin";
import BtnDarkMode from '../components/BtnDarkModeAdmin';
import { NavLink } from "react-router-dom";

const AdminLayout = (props) => {

  return (

    <div className="flex">
      <div className="bg-white" >
        <SiderAdmin />
      </div>
      <div style={{ width: "100%" }}>
        <HeaderAdmin className="mb-3" />
        {props.children}
        <FooterAdmin />
        <BtnDarkMode />
       
      </div>
    </div>


  );
};

export default AdminLayout;
