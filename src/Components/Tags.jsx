const Tags = () => {

    const tags = [  '#love', '#instagood', '#fashion', '#photooftheday', '#photography', '#art', '#beautiful', '#nature', '#travel', '#fitness']



    



    return (
        <div className="bg-white shadow-lg">
            <div className="p-5">
            <h2 className='text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[120px] '>Popular Tags</h2>


            <div className="mt-5 flex flex-col gap-3">
            
            {
                tags.map((tag,index)=> <p className="hover:underline" key={index}>{tag}</p>)
            }
            </div>

        </div>
        </div>
    );
};

export default Tags;