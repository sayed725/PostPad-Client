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
            <button className='btn btn-primary bg-green-500'>Click me</button>
            <button className='btn btn-primary'>Click me</button>
            <Link to={'/login'}><button>Login</button></Link>
        </div>
    );
};

export default Home;