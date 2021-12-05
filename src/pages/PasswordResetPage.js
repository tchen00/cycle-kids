import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { auth, db } from '../config/firebase'

const PasswordResetPage = () => {

  const [credentials, setCredentials] = useState({
    email: "",
    // firstName: "",
    // lastName: "",
  });
  // const { signup } = useAuth();
  // const auth = getAuth();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); //prevents form from refreshing
    setLoading(true);
      sendPasswordResetEmail(auth, credentials.email)
      .then(() => {
        setEmailSent(true)
        setCredentials({email: ""})
      })
      .catch((e) => {
        setErr("Error sending email.");
        // setErr(e.message);
        setLoading(false);
      });
  }

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(credentials)
  }

  return (
    <LandingLayout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-cycleOrange hover:text-cycleOrange">
              create an account
            </Link>
          </p> */}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={credentials.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                {/* <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div> */}
                <div></div>

              </div>

              <div className="space-y-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send reset email
                </button>
                <div className={emailSent ? "rounded-md bg-green-50 p-4" : "hidden"}>
                  <div className="flex">

                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">Successfully sent email. </p>
                    </div>
                    <div className="ml-auto pl-3">

                    </div>
                  </div>
                </div>
                <div className={err ? "rounded-md bg-red-50 p-4" : "hidden"}>
                  <div className="flex">

                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{err}</p>
                    </div>
                    <div className="ml-auto pl-3">

                    </div>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </LandingLayout>
  )

}

export default PasswordResetPage;
