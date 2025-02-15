import React, { useState } from "react";
import "../styles/profileManagement.css";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1 className="profile-title">User Profile Management</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Select Skills *</label>
            <select
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            >
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
              placeholder="Enter address"
              value={formData.address1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address2">Address Line 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="Enter address"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="preferences">Preferences</label>
            <textarea
              id="preferences"
              name="preferences"
              placeholder="Enter preferences"
              value={formData.preferences}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                <option value="TX">Texas</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="zip">Zip *</label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="Enter zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
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
