import React from 'react';
import AddTags from './AddTags';
import AdminReport from '../../Components/AdminReport';

const Activities = () => {
    return (
        <div className='min-h-screen'>
            <h2 className='text-4xl font-bold text-center'> Admin Activities or Reports</h2>
            <AddTags></AddTags>
            <AdminReport></AdminReport>

        </div>
    );
};

export default Activities;