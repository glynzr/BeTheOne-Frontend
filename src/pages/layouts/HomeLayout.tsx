import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header-components/Header'
import Footer from '../../components/footer-components/Footer'
const HomeLayout = () => {
  return (
    <div className='h-full flex flex-col w-full bg-[#F7FAFC] '>
      <Header/>
      <div className='overflow-auto'>
      <Outlet/>
      <Footer/>
      </div>
    </div>
  )
}

export default HomeLayout