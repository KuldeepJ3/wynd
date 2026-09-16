import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate()
  const { user, setUser, updatedUserState } = useContext(UserContext);

  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form input states (pre-populated with current user data if available)
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Handler for form submission (plug in your update logic here)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('Token');
      const API_URL = 'http://localhost:8000';
      const formData = new FormData();

      formData.append('name', name);
      formData.append('email', email);

      if (selectedPhoto) {
        formData.append('profileImage', selectedPhoto)
      }

      const response = await axios.put(
        `${API_URL}/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          name: response.data.user.name,
          email: response.data.user.email,
          profileImage: response.data.user.profileImage
        }));
        if (response.data.token) {
          localStorage.setItem('Token', response.data.token);
        }
        setUser(response.data.user);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error.response?.data?.message || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('Token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 relative selection:bg-amber-500/30 selection:text-amber-200">

      {/* Background Ambient Glows (Matches 3D Showroom Aesthetic) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/5 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">

        {/* Profile Header / Banner Card */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:from-amber-500/15 transition-all duration-700"></div>

          <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
            {/* Avatar Showcase */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black p-1 border border-zinc-700/50 shadow-2xl flex items-center justify-center overflow-hidden relative">
              {user?.profileImage ? (
                <img src={`http://localhost:8000${user.profileImage}`} alt="Profile" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-amber-600/20 to-amber-400/20 flex items-center justify-center rounded-xl text-amber-400 text-4xl font-light tracking-wider">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
                </div>
              )}
            </div>

            {/* User Meta */}
            <div className="text-center sm:text-left space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-500/10 text-amber-400 text-[11px] font-medium tracking-[0.2em] uppercase rounded-full border border-amber-500/20 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                {user ? "Verified Member" : "Guest Account"}
              </span>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                {user ? user.name : "Guest User"}
              </h1>
              <p className="text-zinc-400 text-sm font-light">
                {user?.email || "Sign in to access your bespoke luxury showroom history and saved configurations."}
              </p>
            </div>
          </div>
        </div>

        {/* Grid Section for Details & Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Main Info Column */}
          <div className="md:col-span-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl space-y-8 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-800/80 pb-4">
                Account Credentials
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Full Name</p>
                  <p className="text-base font-light text-zinc-200">{user?.name || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Email Address</p>
                  <p className="text-base font-light text-zinc-200">{user?.email || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Member Since</p>
                  <p className="text-base font-light text-zinc-200">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Account Status</p>
                  <p className="text-base font-light text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-xs font-semibold tracking-wider uppercase rounded-xl transition shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95"
              >
                Edit Profile
              </button>
              <button onClick={handleLogout} className="px-6 py-3 bg-zinc-800/50 hover:bg-red-500/10 text-zinc-300 hover:text-red-400 text-xs font-semibold tracking-wider uppercase rounded-xl transition border border-zinc-700/50 hover:border-red-500/20 cursor-pointer active:scale-95">
                Logout
              </button>
            </div>
          </div>

          {/* Sidebar Widget Column */}
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-800/80 pb-4">
                Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm py-2 border-b border-zinc-800/40">
                  <span className="text-zinc-400 text-xs tracking-wider uppercase">Items in Cart</span>
                  <span className="font-semibold text-amber-400">0</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-zinc-800/40">
                  <span className="text-zinc-400 text-xs tracking-wider uppercase">Orders</span>
                  <span className="font-semibold text-amber-400">0</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/60 text-center space-y-1">
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider">Concierge Support</p>
              <span className="text-xs font-medium text-amber-400 cursor-pointer hover:underline">Get Assistance</span>
            </div>
          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL (LUXURY STYLE) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-8 shadow-2xl relative space-y-6">

            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-light tracking-wide text-white uppercase">Edit Profile</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-800 transition cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              {/* Update Photo Section */}
              <div className="space-y-2">
                <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-widest">
                  Profile Photograph
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}
                  className="w-full text-xs text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 cursor-pointer border border-zinc-800 rounded-xl bg-zinc-950/50 p-1"
                />
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-amber-500/50 transition text-sm font-light"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-amber-500/50 transition text-sm font-light"
                  placeholder="Enter your email"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold tracking-wider uppercase rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-xs font-semibold tracking-wider uppercase rounded-xl transition shadow-lg shadow-amber-500/10 cursor-pointer"

                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;