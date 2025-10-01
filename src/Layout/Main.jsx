import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Main = () => {
    return (
     <div className='bg-[#f5f5f5] dark:bg-[#171717] '>
           <Navbar></Navbar>
         <div className='bg-[#f5f5f5] dark:bg-[#060817] sm:w-11/12  lg:w-9/12 mx-auto'>
           <div className=''>
           </div>
           <Outlet></Outlet>
        </div>
           <Footer></Footer>
     </div>
    );
};

export default Main;