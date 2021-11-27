import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../config/firebase'

const SignupPage = () => {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    // firstName: "",
    // lastName: "",
  });
  // const { signup } = useAuth();
  // const auth = getAuth();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); //prevents form from refreshing
    setErr("");
    setLoading(true);
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((user) => {
        // db.collection("users").doc(user.user.uid).set({}).then(() => {
          // setTimeout(() => history.push("/finish-profile"), 500);
          console.log("account created!")
          setLoading(false);
          setAccountCreated(true);
        // })
      })
      .then(() => {
        setCredentials({email: "", password: ""})
      })
      .catch((e) => {
        setErr(e.message);
        setLoading(false);
      });
  }

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials)
  }

  return (
    <LandingLayout>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign in to an existing account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="space-y-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    </LandingLayout>
  )

}

export default SignupPage;

