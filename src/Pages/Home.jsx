import React from 'react';
import { Link } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useMember from '../Hooks/useMember';
import Tags from '../Components/Tags';
import Add from '../Components/Add';
import SearchBar from '../Components/SearchBar';
import ShowPost from '../Components/ShowPost';

const Home = () => {
    const [ isAdmin ] = useAdmin()
    const [ isMember] = useMember()

    console.log('admin',isAdmin)
    console.log('member', isMember)




   


    return (
        <div>
           <div className='lg:grid p-1 sm:p-0 sm:grid-cols-5 gap-7'>
            <div className='hidden lg:block'>
            <Tags></Tags>
            </div>

            <div className='col-span-3'>
            <SearchBar></SearchBar>
            <ShowPost></ShowPost>
            </div>

            <div>
            <Add></Add>
            </div>

           </div>
        </div>
    );
};

export default Home;