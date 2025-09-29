import React from 'react';

import AdminReport from '../../Components/AdminReport';
import { Helmet } from 'react-helmet-async';

const Activities = () => {
    return (
        <div className='min-h-screen'>
             <Helmet> <title>PostPad | Admin | Activity </title></Helmet>
            <h2 className=' text-3xl lg:text-4xl font-bold text-center'> Admin Activities or Reports</h2>    
            <p className='mt-3 text-xl text-center'> All users Reported Comments with reason Will Show here for admin Action </p>
            <AdminReport></AdminReport>

        </div>
    );
};

export default Activities;