import React from 'react';
import { Link } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useMember from '../Hooks/useMember';

const Home = () => {
    const [ isAdmin ] = useAdmin()
    const [ isMember] = useMember()

    console.log(isAdmin)
    console.log('member', isMember)




   


    return (
        <div>
            <h2 className='text-4xl font-bold text-center py-10'>Hello from Home</h2>
           <div className='grid grid-cols-5'>
            

           </div>
        </div>
    );
};

export default Home;