import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase'
import logo from "../assets/logo.jpg"

// const navigation = [
//   { name: 'Solutions', href: '#' },
//   { name: 'Pricing', href: '#' },
//   { name: 'Docs', href: '#' },
//   { name: 'Company', href: '#' },
// ]

const AppLayout = ({children}) => {

  const navigate = useNavigate();

  function handleSignOut(){
    signOut(auth).then(() => {
      navigate("/")
    })
  }

  return(
    <div>
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-cycleOrange lg:border-none">
            <div className="flex items-center">
              <Link to="/videos">
                {/* <h1 className="text-3xl font-bold text-white">
                  Cycle Kids
                </h1> */}
                <img 
                  className="h-10"
                  src={logo}
                  alt='logo'
                />
              </Link>
              {/* <div className="hidden ml-10 space-x-8 lg:block">
                {navigation.map((link) => (
                  <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                    {link.name}
                  </a>
                ))}
              </div> */}
            </div>
            <div className="ml-10 space-x-4">
              <button
                className="inline-block bg-cycleOrange py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:shadow"
                onClick={handleSignOut}
              >
                Log out
              </button>
            </div>
          </div>
          {/* <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
            {navigation.map((link) => (
              <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                {link.name}
              </a>
            ))}
          </div> */}
        </nav>
      </header>

      <div>{children}</div>

    </div>
  )
}

export default AppLayout;