import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart } from "react-icons/fa6";
import { FaSun, FaMoon, FaDownload } from 'react-icons/fa';
import { NavLinks } from "./";
import { useGlobalContext } from '../hooks/useGlobalContext';
// firebase
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "light";
}

function Navbar() {
  const { likedImages = [], downloadImages = [], user, dispatch } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const [downloadCount, setDownloadCount] = useState(downloadImages.length);
  const [likedCount, setLikedCount] = useState(likedImages.length);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    setDownloadCount(downloadImages.length);
    setLikedCount(likedImages.length);
  }, [downloadImages, likedImages]); 

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success("See you soon");
      navigate('/login'); 
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className='bg-base-200'>
      <div className='navbar align-elements'>
        <div className="navbar-start">
          <Link className='hidden md:flex' to='/'>
            <FcStackOfPhotos className='w-10 h-10' />
          </Link>
          <div className='dropdown md:hidden'>
            <div tabIndex={0} role="button">
              <FcStackOfPhotos className='w-10 h-10' />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal rounded-box">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end flex gap-6 items-center">
          <Link to='/downloadImages'>
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">
                {downloadCount}
              </span>
              <FaDownload className='h-6 w-6' />
            </div>
          </Link>
          <Link to='/likedImages'>
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">
                {likedCount}
              </span>
              <FaHeart className='h-6 w-6' />
            </div>
          </Link>
          <label className="swap swap-rotate">
            <input type="checkbox" onClick={toggleTheme} />
            <FaSun className="swap-off h-6 w-6 fill-current" />
            <FaMoon className="swap-on h-6 w-6 fill-current" />
          </label>

          <div className='flex gap-3 items-center'>
            {user && user.displayName ? (
              <p>{user.displayName}</p> 
            ) : (
              <p>U</p> 
            )} 

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    // Safely handle user photoURL, defaulting to a placeholder if null
                    src={user && user.photoURL ? user.photoURL : "https://via.placeholder.com/40"} 
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><a>Settings</a></li>
                <li><button onClick={signOutUser}>Logout</button></li>
              </ul>
            </div>
          </div>

          <div>
            <div className="avatar">
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
