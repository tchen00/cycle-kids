import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AdminAppLayout";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../config/firebase'
 
const VideoDataPage = () => {
   const [HelmitFit, setHelmitFit] = useState([]) 
   const [BikeABCs, setBikeABCs] = useState([])
   const [GAndB, setGAndB] = useState([])
   const [RAndC, setRAndC] = useState([])
 
   useEffect(async () => {
       getDocs(query(collection(db, "HelmitFit"), where("type", "==", 'HelmitFit'))).then((snapshot) => {
           Promise.all(
            snapshot.docs.map((doc) => {
            console.log("doc:", doc.data())
           return ({
            videoID: doc.id,
            email: doc.data().email,
            playedTime: doc.data().timePlayed,
            percentagePlayed: doc.data().percentagePlayed,
           })
           }
       )).then((result) => {
           console.log("result:", result)
           setHelmitFit(result)
     })
   })
 }, [])
 
   useEffect(async () => {
       getDocs(query(collection(db, "BikeABCs"), where("type", "==", 'BikeABCs'))).then((snapshot) => {
           Promise.all(
            snapshot.docs.map((doc) => {
            console.log("doc:", doc.data())
           return ({
            videoID: doc.id,
            email: doc.data().email,
            playedTime: doc.data().timePlayed,
            percentagePlayed: doc.data().percentagePlayed,
           })
           }
       )).then((result) => {
           console.log("result:", result)
           setBikeABCs(result)
     })
   })
 }, [])
 
   useEffect(async () => {
       getDocs(query(collection(db, "GearingAndBraking"), where("type", "==", 'GearingAndBraking'))).then((snapshot) => {
           Promise.all(
           snapshot.docs.map((doc) => {
           console.log("doc:", doc.data())
           return ({
           videoID: doc.id,
           email: doc.data().email,
           playedTime: doc.data().timePlayed,
           percentagePlayed: doc.data().percentagePlayed,
           })
           }
       )).then((result) => {
           console.log("result:", result)
           setGAndB(result)
   })
   })
   }, [])
 
   useEffect(async () => {
       getDocs(query(collection(db, "RoadAndCommunication"), where("type", "==", 'RoadAndCommunication'))).then((snapshot) => {
           Promise.all(
            snapshot.docs.map((doc) => {
            console.log("doc:", doc.data())
           return ({
            videoID: doc.id,
            email: doc.data().email,
            playedTime: doc.data().timePlayed,
            percentagePlayed: doc.data().percentagePlayed,
           })
           }
       )).then((result) => {
           console.log("result:", result)
           setRAndC(result)
     })
   })
 }, [])
 
 
 return(
   <AppLayout>
     <div className="mx-10 py-10">
       <div className="flex flex-col">
         <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
           <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
             <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
               <p className="px-6 py-3 text-xl font-medium">Helmet Fit</p>
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                   <tr>
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
                       Time Played (Seconds)
                     </th>
                     <th
                       scope="col"
                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                       Percentage Played
                     </th>
 
                     {/* <th scope="col" className="relative px-6 py-3">
                       <span className="sr-only">Edit</span>
                     </th> */}
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {HelmitFit.map((video) => (
                     <tr key={video.videoID}>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.email}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.playedTime}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.percentagePlayed}</td>
                       {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <a href="#" className="text-indigo-600 hover:text-indigo-900">
                           Edit
                         </a>
                       </td> */}
                     </tr>
                   ))}
                 </tbody>
               </table>
              
               <p className="px-6 pb-3 pt-8 text-xl font-medium border-t">Bike ABCs</p>
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                   <tr>
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
                       Time Played (Seconds)
                     </th>
                     <th
                       scope="col"
                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                       Percentage Played
                     </th>
 
                     {/* <th scope="col" className="relative px-6 py-3">
                       <span className="sr-only">Edit</span>
                     </th> */}
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {BikeABCs.map((video) => (
                     <tr key={video.videoID}>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.email}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.playedTime}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.percentagePlayed}</td>
                       {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <a href="#" className="text-indigo-600 hover:text-indigo-900">
                           Edit
                         </a>
                       </td> */}
                     </tr>
                   ))}
                 </tbody>
               </table>
              
               <p className="px-6 pb-3 pt-8 text-xl font-medium border-t">Gearing and Braking</p>
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                   <tr>
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
                       Time Played (Seconds)
                     </th>
                     <th
                       scope="col"
                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                       Percentage Played
                     </th>
 
                     {/* <th scope="col" className="relative px-6 py-3">
                       <span className="sr-only">Edit</span>
                     </th> */}
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {GAndB.map((video) => (
                     <tr key={video.videoID}>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.email}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.playedTime}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.percentagePlayed}</td>
                       {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <a href="#" className="text-indigo-600 hover:text-indigo-900">
                           Edit
                         </a>
                       </td> */}
                     </tr>
                   ))}
                 </tbody>
               </table>
              
               <p className="px-6 pb-3 pt-8 text-xl font-medium border-t">Road and Communication</p>
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                   <tr>
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
                       Time Played (Seconds)
                     </th>
                     <th
                       scope="col"
                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                       Percentage Played
                     </th>
 
                     {/* <th scope="col" className="relative px-6 py-3">
                       <span className="sr-only">Edit</span>
                     </th> */}
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {RAndC.map((video) => (
                     <tr key={video.videoID}>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.email}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.playedTime}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{video.percentagePlayed}</td>
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
 
export default VideoDataPage;
