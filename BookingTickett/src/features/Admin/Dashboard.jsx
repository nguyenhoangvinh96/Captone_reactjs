import React from 'react'
import AdminLayout from '../../HOCs/AdminLayout'
import { Outlet } from 'react-router-dom'
import User from './User'

const Dashboard = () => {
  return (
    <AdminLayout>
        <Outlet/>
    </AdminLayout>
  )
}

export default Dashboard