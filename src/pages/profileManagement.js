import React, { useState } from "react";
import Link from "next/link";

export default function ProfileManagement() {
  const [formData, setFormData] = useState({
    fullName: "",
    skills: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    preferences: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.skills) newErrors.skills = "Skills are required";
    if (!formData.address1) newErrors.address1 = "Address Line 1 is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip) newErrors.zip = "Zip is required";
    if (!formData.date) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Call the API to update the profile
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(formData), //sends profile form data to API in request
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
        console.log("Updated Profile:", data.profile);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile");
    }
  };

  //Body of User Profile Management Page
  return (
    <div className="profile-container">
      <nav className="bg-gray-800 text-white px-4 py-3 fixed top-0 left-0 right-0 z-10 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/profileManagement" className="hover:text-gray-400">Profile</Link>
            <Link href="/signout" className="hover:text-gray-400">Sign Out</Link>
            <Link href="/eventManagement" className="hover:text-gray-400">Event Management</Link>
          </div>
        </div>
      </nav>

      <div className="profile-box">
        <h1 className="profile-title">User Profile Management</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Select Skills *</label>
            <select id="skills" name="skills" value={formData.skills} onChange={handleChange} required>
              <option value="">Select Skills</option>
              <option value="coding">Coding</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address1">Address Line 1 *</label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State *</label>
            <select id="state" name="state" value={formData.state} onChange={handleChange} required>
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="zip">Zip *</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Select Dates *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="profile-button">Save Profile</button>
        </form>
      </div>
    </div>
  );
}

