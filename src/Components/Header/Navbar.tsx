import React, { useState } from 'react';
import userImg from '../../assets/user.jpeg'
import axios from 'axios';
import { backend } from '../../App';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/image.png'
interface User {
  username?: string;
}

const Navbar = React.memo(({ user }: { user?: User }) => {
  const [isCaretDown, setIsCaretDown] = useState<boolean>(true);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await axios.post(`${backend}/logout`);
      Cookies.remove('token');
      navigate('/');
    } catch (e) {
      console.log('Error in Logging Out', e);
    }

  }
  return (

    <div className="bg-gradient-to-l from-orange-400 to bg-orange-600  py-1 px-4 h-[100px] flex w-full justify-between items-center">
      <div id="logo" className="">
        <div className="border h-[80px] w-[80px] rounded-3xl max-sm:hidden">
          <img src={logo} alt="logo" className="h-full w-full rounded-3xl  object-cover " />
        </div>
      </div>
      <div id="seachBar">
        <input type="text" className="p-2 rounded-lg" placeholder="Search" />
      </div>
      <div id="userButton" className="w-200 flex gap-3 items-center flex-col max-sm:flex-row cursor-pointer">
        <div id="userAvatar" className="rounded-full border h-10 w-10 sm:h-14 sm:w-14">
          <img src={userImg} alt="userImg" className="w-full h-full rounded-full" />
        </div>
        <div id="userAvatar" className="rounded-full gap-1 justify-center items-center flex sm:flex-grow  sm:flex-col" onClick={() => setIsCaretDown((prev) => !prev)} >
          <div className='inline-block first-letter:uppercase font-semibold max-sm:hidden'>{user?.username}</div>
          <div>
            <i
              className={`fa-solid fa-caret-down caret-icon ${isCaretDown ? "down" : "up"
                }`}

            ></i>
          </div>
          {!isCaretDown && <button onClick={logOut} className='absolute transition-all  animate-pulse top-[14%] right-2 font-sem-bold z-30 bg-orange-400 p-2 rounded-md text-xl '>
            Logout
          </button>}
        </div>
      </div>
    </div>
  );
});

export default Navbar;
