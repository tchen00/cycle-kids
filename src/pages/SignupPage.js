import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AdminAppLayout";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { auth, db } from '../config/firebase'

const SignupPage = () => {

  const [pageLoading, setPageLoading] = useState(false)
  // const [user, setUser] = useState(false);
  // const [admin, setAdmin] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    schoolName: ""
  });
  // const { signup } = useAuth();
  // const auth = getAuth();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  // useEffect(async () => {

  //   const unsub = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(true)
  //       getDoc(doc(db, "users", user.uid)).then((result) => {
  //         if (result.data().type === 'admin'){
  //           setAdmin(true)
  //         }
  //       })
  //     } else {
  //       // User is not signed in.
  //     }
  //     setPageLoading(false)
  //   });

  //   return unsub

  // }, [])

  function handleSubmit(e) {
    e.preventDefault(); //prevents form from refreshing
    setErr("");
    setLoading(true);
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((user) => {
        console.log("user:", user.user)
        setDoc(doc(db, "users", user.user.uid), {
          type: 'user',
          firstName: credentials.firstName,
          lastName: credentials.firstName,
          schoolName: credentials.schoolName,
          email: credentials.email
        }).then(() => {
          // setTimeout(() => history.push("/finish-profile"), 500);
          console.log("account created!")
          setLoading(false);
          setAccountCreated(true);
        })
      })
      .then(() => {
        setCredentials({firstName: "", lastName: "", schoolName: "", email: "", password: ""})
      })
      .catch((e) => {
        setErr(e.message);
        setLoading(false);
      });
  }

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(credentials)
  }

  if (pageLoading) {
    return(
      <AppLayout>

      </AppLayout>
    )
  }

  return (
    // (user && admin) ?
    <AppLayout>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
            {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/" className="font-medium text-cycleOrange hover:text-cycleOrange">
                sign in to an existing account
              </Link>
            </p> */}
          </div>
          <form className="mt-8 space-y-12" action="#" method="POST" onSubmit={handleSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  // autoComplete="email"
                  required
                  value={credentials.firstName}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  // autoComplete="email"
                  required
                  value={credentials.lastName}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Last name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                School name
                </label>
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  // autoComplete="email"
                  required
                  value={credentials.schoolName}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="School name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="space-y-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create an account
              </button>
              <div className={accountCreated ? "rounded-md bg-green-50 p-4" : "hidden"}>
                <div className="flex">

                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">Successfully created account. <Link to="/" className="underline hover:text-green-700">Click here</Link> to log in.</p>
                  </div>
                  <div className="ml-auto pl-3">

                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
    // :
    // <AppLayout>
    //   {/* <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
    //     <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="py-16">
    //         <div className="text-center">
    //           <h1 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">Sorry, you're not authorized to view this page.</h1>
    //         </div>
    //       </div>
    //     </main>
    //   </div> */}
    // </AppLayout>
    )

}

export default SignupPage;

