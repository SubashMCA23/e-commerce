import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Myprofile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) return navigate('/'); 

        const response = await axios.get(`${apiUrl}/users/login`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          mobile: response.data.mobile,
        });
      } catch (error) {
        setError('Error fetching profile data');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(
        `${apiUrl}/users/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg text-indigo-600">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-lg">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          {editMode ? 'Edit Profile' : 'Profile'}
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {success && <div className="text-green-600 text-center mb-4">{success}</div>}

        {userData && !editMode ? (
          <>
            <p className="text-lg font-semibold text-gray-700">
              Name: <span className="font-normal text-gray-500">{userData.name}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Email: <span className="font-normal text-gray-500">{userData.email}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Mobile: <span className="font-normal text-gray-500">{userData.mobile}</span>
            </p>
            <button
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
