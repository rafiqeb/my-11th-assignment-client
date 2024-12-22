import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../authentication/AuthProvider";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='volentear'>All Volunteer</NavLink></li>
    </>

    const links2 = <>
        <li><Link to='/volentearNeed'>Add Volunteer need</Link></li>
        <li><Link to='/myPosts'>Manage My Posts</Link></li>
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Care Bridge</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end space-x-4">
                    <div>
                        <div>
                            {user && user?.photoURL ? (<img
                                referrerPolicy="no-referrer" className="w-[40px] h-[40px] rounded-full" src={user.photoURL} alt="" />) : (<p className="text-4xl"><FaUserCircle /></p>)}
                        </div>
                    </div>
                    <div>
                        {
                            user && user?.email ? (<button onClick={logOut} className="btn btn-primary">Logout</button>) : (<Link to='/login' className="btn btn-primary">Login</Link>)
                        }
                    </div>
                    <div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost">
                                <p>My Profile</p>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {links2}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;