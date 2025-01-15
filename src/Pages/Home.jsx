import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {



    const sendData =()=>{
        const data ={
            ok: 'ok'
        }

        axios.post('http://localhost:5001/ok',data)
        .then(res=>{
            console.log(res.data)
        })
    }





    return (
        <div>
            <h2 className='text-4xl font-bold text-center py-10'>Hello from Home</h2>
            <button onClick={sendData} className='btn btn-primary bg-green-500'>Click me</button>
            <button className='btn btn-primary'>Click me</button>
            <Link to={'/login'}><button>Login</button></Link>
        </div>
    );
};

export default Home;