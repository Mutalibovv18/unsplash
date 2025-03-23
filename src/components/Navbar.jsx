import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart } from "react-icons/fa6";
import { FaSun, FaMoon, FaDownload } from 'react-icons/fa'
import { NavLinks } from "./"
import { useGlobalContext } from '../hooks/useGlobalContext';

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "light";
}

function Navbar() {
  const { likedImages = [], downloadImages = [] } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const [downloadCount, setDownloadCount] = useState(downloadImages.length);
  const [likedCount, setLikedCount] = useState(likedImages.length);

  useEffect(() => {
    setDownloadCount(downloadImages.length);
    setLikedCount(likedImages.length);
  }, [downloadImages, likedImages]); // Watch for changes

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
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
        </div>
      </div>
    </header>
  );
}

export default Navbar;
