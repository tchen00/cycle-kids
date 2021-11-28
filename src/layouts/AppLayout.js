import React from "react";
import { Link, useHistory } from "react-router-dom";

// const navigation = [
//   { name: 'Solutions', href: '#' },
//   { name: 'Pricing', href: '#' },
//   { name: 'Docs', href: '#' },
//   { name: 'Company', href: '#' },
// ]

const AppLayout = ({children}) => {
  return(
    <div>
      <header className="bg-indigo-600">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <Link to="/">
                <span className="sr-only">Workflow</span>
                <h1 className="text-3xl font-bold text-white">
                  Cycle Kids
                </h1>
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
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
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