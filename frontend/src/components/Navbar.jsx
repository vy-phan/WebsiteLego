import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-yellow-400">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block" to="/">
              <span className="sr-only">Home</span>
              <img src="/lego.svg" alt="Lego Logo" className="h-12" />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link className="text-white-500 transition hover:text-white-500/75" to="/discover"> Discover </Link>
                </li>

                {/* <li>
                  <Link className="text-white-500 transition hover:text-white-500/75" to="/cart"> Cart </Link>
                </li>
                */}

                <li>
                  <Link className="text-white-500 transition hover:text-white-500/75" to="/about"> About </Link>
                </li> 
              </ul>
            </nav>

            <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar