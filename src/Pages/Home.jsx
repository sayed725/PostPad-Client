import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2 className='text-4xl font-bold text-center py-10'>Hello from Home</h2>
            <button className='btn btn-primary'>Click me</button>
            <button className='btn btn-primary'>Click me</button>
            <Link to={'/login'}><button>Login</button></Link>
        </div>
    );
};

export default Home;