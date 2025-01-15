import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-10 min-h-screen">
     <div>
        <img src="/404.webp" alt="" />
     </div>
     <div>
       <Link to={'/'}> <button className='btn rounded-md text-white bg-[#005694] hover:text-black hover:bg-[#005694]'>Take Me Home</button></Link>
     </div>
    </section>
  )
}

export default Error