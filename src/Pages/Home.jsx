import React from 'react';
import { Link } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useMember from '../Hooks/useMember';
import Tags from '../Components/Tags';
import Add from '../Components/Add';

const Home = () => {
    const [ isAdmin ] = useAdmin()
    const [ isMember] = useMember()

    console.log(isAdmin)
    console.log('member', isMember)




   


    return (
        <div>
           <div className='grid grid-cols-5 gap-7'>
            <div>
            <Tags></Tags>
            </div>

            <div className='col-span-3'>
            <h2 className='text-4xl font-bold text-center py-10 border-2'>Hello from post</h2>
            </div>

            <div>
            <Add></Add>
            </div>

           </div>
        </div>
    );
};

export default Home;