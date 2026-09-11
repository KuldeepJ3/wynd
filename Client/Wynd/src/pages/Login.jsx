import { useContext, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext.jsx"
import { jwtDecode } from 'jwt-decode'
import './pagesGCss.css'

function Login() {
    const [formData, setFormData] = useState({email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false) // 1. Added state for hide/show

    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
            const response = await axios.post(API_URL, {
                email: formData.email,
                password: formData.password
            })  

            console.log("Response Data: ", response.data);

            localStorage.setItem("Token", response.data.token)

            alert(response.data.message);

            const decodedUserData = jwtDecode(response.data.token)
            setUser(decodedUserData)    

            navigate('/home', { replace: true })

        } catch (error) {
            if (error.response) {
                if (error.response.status === 404 || error.response.status === 401) {
                    alert(error.response.data.message);
                } else {
                    alert("Something went wrong. Please try again.");
                }
            } else {
                console.error("Login failed:", error);
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
                    <h2 className="text-3xl font-extrabold text-white text-center mb-8">Welcome Back</h2>

                    <label className="text-sm font-semibold text-gray-300 mb-1">Email</label>
                    <input
                        type="email" // Changed to email
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mb-5 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                        placeholder="john@example.com"
                    />
                    
                    <label className="text-sm font-semibold text-gray-300 mb-1">Password</label>
                    <div className="relative mb-8">
                        <input
                            // Dynamic type toggling based on showPassword state
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-16 placeholder-gray-400"
                            placeholder="••••••••"
                        />
                        {/* Hide/Show Button */}
                        <button
                            type="button"
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
                        Log In
                    </button>

                    {/* Navigation to Signup */}
                    <p className="text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <button 
                            type="button" 
                            onClick={() => navigate('/signup')}
                            className="text-blue-400 hover:text-blue-300 font-semibold hover:underline focus:outline-none"
                        >
                            Sign up here
                        </button>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login;