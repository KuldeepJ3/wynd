import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

function Explore() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const showcaseItems = [
        { id: 1, name: "Chronos V-1", category: "Timepiece", price: "$4,200", tag: "Limited Edition" },
        { id: 2, name: "Apex Carbon Cruiser", category: "Mobility", price: "$8,500", tag: "Handcrafted" },
        { id: 3, name: "Obsidian Masterpiece", category: "Audio", price: "$2,800", tag: "Acoustic Excellence" },
        { id: 4, name: "Helios Gold Espresso", category: "Living", price: "$1,950", tag: "Bespoke" },
        { id: 5, name: "Vanguard Kinetic Desk", category: "Workspace", price: "$3,400", tag: "Ergonomic" },
        { id: 6, name: "Aether Pendant Lamp", category: "Lighting", price: "$1,200", tag: "Minimalist" },
        { id: 7, name: "Zenith Titanium Case", category: "Travel", price: "$980", tag: "Ultra-Durable" },
        { id: 8, name: "Nova Acoustic Pods", category: "Audio", price: "$650", tag: "Hi-Res Audio" },
        { id: 9, name: "Solis Chef Knife Set", category: "Culinary", price: "$1,450", tag: "Damascus Steel" },
    ];

    const handleAddToCart = async(item) => {
        const token = localStorage.getItem('Token');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await axios.post(`${baseUrl}/add-to-cart` , {
            id: item.id,
            name: item.name, 
            price: item.price
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        if(response.data.Success){
            return alert("Item Added Successfully!!")
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 py-8 sm:py-16 px-4 sm:px-6 lg:px-8 relative selection:bg-amber-500/30 selection:text-amber-200">

            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-amber-600/5 blur-[120px] sm:blur-[140px] pointer-events-none rounded-full"></div>

            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10">

                {/* Top Navigation Buttons (Back & Cart) */}
                <div className="flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium tracking-wider uppercase rounded-2xl border border-zinc-800/80 hover:border-zinc-700 transition shadow-lg cursor-pointer active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>

                    <button 
                        onClick={() => navigate('/cart')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium tracking-wider uppercase rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition shadow-lg cursor-pointer active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        View Cart
                    </button>
                </div>

                {/* Explore Header / Banner Card */}
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-16 -top-16 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:from-amber-500/15 transition-all duration-700"></div>

                    <div className="relative z-10 space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-500/10 text-amber-400 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase rounded-full border border-amber-500/20 shadow-inner">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                            Showroom Gallery
                        </span>
                        <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
                            Explore Showcase
                        </h1>
                        <p className="text-zinc-400 text-xs sm:text-sm font-light">
                            Discover and configure bespoke luxury items curated exclusively for you.
                        </p>
                    </div>
                </div>

                {/* Grid Feed of 10 Luxury Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {showcaseItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 truncate">
                                        {item.category}
                                    </span>
                                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-medium tracking-wider uppercase rounded-full border border-amber-500/20 shrink-0">
                                        {item.tag}
                                    </span>
                                </div>

                                <div className="h-32 bg-zinc-950/50 rounded-2xl border border-zinc-800/60 flex items-center justify-center overflow-hidden relative group-hover:border-amber-500/20 transition">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        {user?.profileImage && (
                                            <img    
                                                src={`http://localhost:8000${user.profileImage}`}
                                                alt="Profile Preview"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <span className="text-zinc-600 font-light text-xs tracking-widest uppercase">Preview Canvas</span>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-light text-white tracking-wide truncate">{item.name}</h3>
                                    <p className="text-amber-400 text-sm font-semibold mt-1">{item.price}</p>
                                </div>
                            </div>

                            <button className="mt-6 w-full py-2.5 bg-zinc-800/50 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 text-xs font-semibold tracking-wider uppercase rounded-xl transition border border-zinc-700/50 hover:border-amber-500 cursor-pointer active:scale-95" onClick={() => handleAddToCart(item)}>
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Explore;