import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom" // 1. Imported for navigation
import './pagesGCss.css'

function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${baseUrl}/signup`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })

            console.log("Response Data: ", response.data);
            alert(response.data.message);
            navigate('/login');

        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message)
            } else {
                console.error("Signup failed:", error);
                alert("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <>
            {/* Dark mode background */}
            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">

                {/* Dark mode card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col border border-gray-700"
                >
                    <h2 className="text-3xl font-extrabold text-white text-center mb-8">Create Account</h2>

                    <label className="text-sm font-semibold text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mb-5 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                        placeholder="John Doe"
                    />

                    <label className="text-sm font-semibold text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mb-5 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                        placeholder="john@example.com"
                    />

                    <label className="text-sm font-semibold text-gray-300 mb-1">Password</label>
                    {/* Relative container so we can position the Hide/Show button inside it */}
                    <div className="relative mb-8">
                        <input
                            // If showPassword is true, make it text. Otherwise, hide it as a password!
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            // pr-16 ensures the text doesn't run underneath the button
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-16 placeholder-gray-400"
                            placeholder="••••••••"
                        />
                        {/* The Hide/Show Button */}
                        <button
                            type="button" // Important: type="button" prevents it from submitting the form!
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-400 hover:text-white focus:outline-none transition-colors"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md mb-6"
                    >
                        Sign Up
                    </button>

                    {/* Navigation to Login */}
                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-blue-400 hover:text-blue-300 font-semibold hover:underline focus:outline-none"
                        >
                            Log in here
                        </button>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Signup;