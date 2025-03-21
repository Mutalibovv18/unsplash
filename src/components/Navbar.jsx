//react-router dom
import { Link } from 'react-router-dom'

// react-icons
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart } from "react-icons/fa6";
import {FaSun, FaMoon} from 'react-icons/fa'

// components
import {NavLinks} from "./"

function Navbar() {
  return <header className='bg-base-200'>
   <div className='navbar align-elements'>
<div className="navbar-start ">
<Link className='hidden md:flex' to='/'>
<FcStackOfPhotos className='w-10 h-10'/>
</Link>
<div className='dropdown md:hidden'>
<div tabIndex={0} role="button">
<FcStackOfPhotos className='w-10 h-10'/>
</div>
<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
   <NavLinks/>
  </ul>
</div>
</div>
<div className="navbar-center hidden md:flex">
<ul className="menu menu-horizontal rounded-box">
  <NavLinks/>
</ul>
</div>
<div className="navbar-end flex gap-3 items-center">
  <Link to='/likedImages'>
  <div className="indicator">
  <span className="indicator-item badge badge-sm badge-secondary">0</span>
  <FaHeart className='h-6 w-6'/>
</div>
  </Link>
  <label className="swap swap-rotate">
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" />

  {/* sun icon */}
<FaSun className="swap-on h-6 w-6 fill-current"/>

  {/* moon icon */}
  <FaMoon className="swap-off h-6 w-6 fill-current"/>

</label>
</div>
</div>
  </header>
   
  
}

export default Navbar