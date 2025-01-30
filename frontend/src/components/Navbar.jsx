import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";
import getLocalUser from '../context/getLocalUser';
import { useCartContext } from '../context/CartContext';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const user = getLocalUser()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItemCount } = useCartContext();
  const logout = useLogout();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-yellow-400">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" to="/">
              <span className="sr-only">Home</span>
              <img src="/lego.svg" alt="" className='h-8 w-8' />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link className="text-white-500 transition hover:text-white-500/75" to="/discover">
                    Discover
                  </Link>
                </li>

                {/* <li>
                  <Link className="text-white-500 transition hover:text-white-500/75" to="/cart">
                    Cart
                  </Link>
                </li> */}

                <li>
                  <Link className="text-white-500 transition hover:text-white-500/75" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </nav>

            {user ? (
              <div className="hidden md:relative md:block dropdown-container">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="overflow-hidden rounded-full border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <span className="sr-only">Toggle dashboard menu</span>

                  <img
                    src="https://avatar.iran.liara.run/public/"
                    alt=""
                    className="size-10 object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                    role="menu"
                  >
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        My profile
                      </Link>

                      {user.role === 'admin' && (
                        <div className="p-2">
                          <Link
                            to="/admin"
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            role="menuitem"
                          >
                            Administrator
                          </Link>
                        </div>
                      )}

                      <Link
                        to="/cart"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center"
                        role="menuitem"
                      >
                        <FaCartPlus className="text-lg" />
                        {cartItemCount > 0 && (
                          <span className="ms-2 mb-5 inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs font-bold leading-none text-white">
                            {cartItemCount}
                          </span>
                        )}
                      </Link>

                    </div>



                    <div className="p-2">
                      <form method="POST" action="#">
                        <button
                          type="submit"
                          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          role="menuitem"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                            />
                          </svg>

                          <Link
                            className="ms-2"
                            to="/login"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-end gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="inline-block rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
                    to="/login"
                  >
                    Login
                  </Link>

                  <div className="hidden sm:flex">
                    <Link
                      className="group relative inline-block overflow-hidden border border-red-600 px-8 py-3 focus:outline-none focus:ring"
                      to="/register"
                    >
                      <span
                        className="absolute inset-y-0 right-0 w-[2px] bg-red-600 transition-all group-hover:w-full group-active:bg-red-500"
                      ></span>

                      <span
                        className="relative text-sm font-medium text-red-600 transition-colors group-hover:text-white"
                      >
                        Register
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;