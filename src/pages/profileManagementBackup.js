// import React, { useState } from "react";
// import Link from "next/link";


// export default function ProfileManagement() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     skills: "",
//     address1: "",
//     address2: "",
//     city: "",
//     state: "",
//     zip: "",
//     preferences: "",
//     date: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Profile Updated Successfully!");
//   };

//   return (
//     <div className="profile-container">

//             {/* Navigation Bar */}
//             <nav className="bg-gray-800 text-white px-4 py-3 fixed top-0 left-0 right-0 z-10 shadow-lg">
//         <div className="flex items-center justify-between max-w-6xl mx-auto">
//           {/* Left side: Home */}
//           <Link href="/" className="text-xl font-bold">
//             Home
//           </Link>

//           {/* Right side: Login, Sign Out, Registration, Profile Management, Event Management, Volunteer Matching, Volunteer History, and Notification */}
//           <div className="flex items-center space-x-4">
//             <Link href="/profileManagement" className="hover:text-gray-400">
//               Profile
//             </Link>
//             <Link href="/signout" className="hover:text-gray-400">
//               Sign Out
//             </Link>
//             <Link href="/registration" className="hover:text-gray-400">
//               Registration
//             </Link>
//             <Link href="/profileManagement" className="hover:text-gray-400">
//               Profile Management
//             </Link>
//             <Link href="/eventManagement" className="hover:text-gray-400">
//               Event Management
//             </Link>
//             <Link href="/volunteerMatching" className="hover:text-gray-400">
//               Volunteer Matching
//             </Link>
//             <Link href="/volunteerHistory" className="hover:text-gray-400">
//               Volunteer History
//             </Link>
//             <button className="relative hover:text-gray-400">
//               {/* Notification Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 17h5l-1.405-1.405A2.003 2.003 0 0118 14V9a6 6 0 10-12 0v5a2.003 2.003 0 01-1.595 1.595L4 17h5m6 0v1a3 3 0 11-6 0v-1"
//                 />
//               </svg>
//               {/* Notification Badge */}
//               <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="profile-box">
//         <h1 className="profile-title">User Profile Management</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="fullName">Full Name *</label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               placeholder="Enter full name"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="skills">Select Skills *</label>
//             <select
//               id="skills"
//               name="skills"
//               value={formData.skills}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Skills</option>
//               <option value="coding">Coding</option>
//               <option value="design">Design</option>
//               <option value="marketing">Marketing</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="address1">Address Line 1 *</label>
//             <input
//               type="text"
//               id="address1"
//               name="address1"
//               placeholder="Enter address"
//               value={formData.address1}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="address2">Address Line 2</label>
//             <input
//               type="text"
//               id="address2"
//               name="address2"
//               placeholder="Enter address"
//               value={formData.address2}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="preferences">Preferences</label>
//             <textarea
//               id="preferences"
//               name="preferences"
//               placeholder="Enter preferences"
//               value={formData.preferences}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="city">City *</label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 placeholder="Enter city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="state">State *</label>
//               <select
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select State</option>
//                 <option value="TX">Texas</option>
//                 <option value="CA">California</option>
//                 <option value="NY">New York</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="zip">Zip *</label>
//               <input
//                 type="text"
//                 id="zip"
//                 name="zip"
//                 placeholder="Enter zip"
//                 value={formData.zip}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="date">Select Dates *</label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="profile-button">Save Profile</button>
//         </form>
//       </div>
//     </div>
//   );
// }
