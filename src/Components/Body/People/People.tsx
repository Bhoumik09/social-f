import userImg from '../../../assets/user.jpeg'

const People = () => {
    return (
        <div className='flex items-center gap-4 px-4  border-2 border-black rounded-lg bg-gradient-to-tl from-orange-200 p-2  bg-opacity-40 '>
            <div className='rounded-full self-center w-10 h-10 border  '>
                <img src={userImg} alt="userImage" className='rounded-full' />
            </div>
            <div className='flex-grow font-medium'>
                Bhoumik
            </div>
            <div className='text-blue-700 font-bold cursor-pointer'>
                Follow
            </div>
        </div>
    )
}

export default People
