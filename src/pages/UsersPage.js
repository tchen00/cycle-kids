import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AdminAppLayout";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../config/firebase'

const UsersPage = () => {

  const [users, setUsers] = useState([])

  useEffect(async () => {

    // let tempUsers = []

    getDocs(query(collection(db, "users"), where("type", "==", 'user'))).then((snapshot) => {
      
      Promise.all(
        snapshot.docs.map((doc) => {
          console.log("doc:", doc.data())
          return ({
            userId: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            schoolName: doc.data().schoolName
          })
        }
      )).then((result) => {
        console.log("result:", result)
        setUsers(result)
      })
      
      // docs.forEach((doc) => {
      //   tempUsers.push({
      //     firstName: doc.data().firstName,
      //     lastName: doc.data().lastName,
      //     email: doc.data().email,
      //     schoolName: doc.data().schoolName
      //   })
      // }).then(() => {
      //   setUsers(tempUsers)
      // })

    })

  }, [])

  return(
    <AppLayout>
      <div className="mx-10 py-10">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        School Name
                      </th>
                      {/* <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((person) => (
                      <tr key={person.userId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{person.firstName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{person.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{person.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{person.schoolName}</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default UsersPage;