import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { LoadingContext } from "../Context/LoadingContext.jsx";
import axios from "axios";

function Explore() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { setIsLoading } = useContext(LoadingContext);

    // State for managing the selected item modal & reviews
    const [selectedItem, setSelectedItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState("");
    const [newRating, setNewRating] = useState(5);

    const showcaseItems = [
        // --- CATEGORY: Timepiece (3 items) ---
        {
            id: 1,
            name: "Chronos V-1",
            category: "Timepiece",
            price: "$4,200",
            tag: "Limited Edition",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
            description: "A precision-engineered luxury timepiece built with aerospace-grade materials and automatic kinetic movement."
        },
        {
            id: 2,
            name: "Aurelia Tourbillon",
            category: "Timepiece",
            price: "$12,500",
            tag: "Masterpiece",
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
            description: "An intricate open-heart tourbillon watch showcasing absolute horological excellence."
        },
        {
            id: 3,
            name: "Ember Chronograph",
            category: "Timepiece",
            price: "$3,100",
            tag: "Bespoke",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
            description: "Rose gold casing paired with a deep obsidian dial and precision sub-dials."
        },

        // --- CATEGORY: Audio (3 items) ---
        {
            id: 4,
            name: "Obsidian Masterpiece",
            category: "Audio",
            price: "$2,800",
            tag: "Acoustic Excellence",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
            description: "Studio-grade acoustic headphones delivering immersive soundscapes wrapped in obsidian trim."
        },
        {
            id: 5,
            name: "Nova Acoustic Pods",
            category: "Audio",
            price: "$650",
            tag: "Hi-Res Audio",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
            description: "True wireless earbuds featuring active noise cancellation and pristine tuning."
        },
        {
            id: 6,
            name: "Sonora Valve Amplifier",
            category: "Audio",
            price: "$4,900",
            tag: "Audiophile",
            image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
            description: "Hand-wired vacuum tube amplifier delivering warm, rich analog audio depth."
        },

        // --- CATEGORY: Mobility (3 items) ---
        {
            id: 7,
            name: "Apex Carbon Cruiser",
            category: "Mobility",
            price: "$8,500",
            tag: "Handcrafted",
            image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
            description: "Lightweight carbon-fiber urban cruiser designed for high performance and sleek aesthetics."
        },
        {
            id: 8,
            name: "Veloce Urban e-Bike",
            category: "Mobility",
            price: "$3,800",
            tag: "Electric",
            image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80",
            description: "Sleek commuter e-bike blending seamless battery integration with agile handling."
        },
        {
            id: 9,
            name: "Strata Titanium Scooter",
            category: "Mobility",
            price: "$1,650",
            tag: "Foldable",
            image: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=600&auto=format&fit=crop&q=80",
            description: "Ultra-portable aerospace-grade titanium kick scooter built for city streets."
        },

        // --- CATEGORY: Living (3 items) ---
        {
            id: 10,
            name: "Helios Gold Espresso",
            category: "Living",
            price: "$1,950",
            tag: "Bespoke",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
            description: "Hand-polished gold espresso machine for barista-quality extractions at home."
        },
        {
            id: 11,
            name: "Luminary Ceramic Vase",
            category: "Living",
            price: "$450",
            tag: "Hand-Thrown",
            image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a5f?w=600&auto=format&fit=crop&q=80",
            description: "Minimalist matte ceramic vessel crafted by master European artisans."
        },
        {
            id: 12,
            name: "Kashmir Cashmere Throw",
            category: "Living",
            price: "$820",
            tag: "Luxury Comfort",
            image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80",
            description: "Plush, ultra-soft pure cashmere throw blanket designed for modern interiors."
        },

        // --- CATEGORY: Workspace (3 items) ---
        {
            id: 13,
            name: "Vanguard Kinetic Desk",
            category: "Workspace",
            price: "$3,400",
            tag: "Ergonomic",
            image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&auto=format&fit=crop&q=80",
            description: "Smart motorized sit-stand desk crafted from sustainable solid walnut."
        },
        {
            id: 14,
            name: "Atelier Leather Blotter",
            category: "Workspace",
            price: "$290",
            tag: "Full-Grain",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
            description: "Hand-stitched full-grain leather desk mat that protects and elevates your workspace."
        },
        {
            id: 15,
            name: "Orbit Brass Lamp",
            category: "Workspace",
            price: "$680",
            tag: "Adjustable",
            image: "https://images.unsplash.com/photo-1534349762230-10cadf05cfd1?w=600&auto=format&fit=crop&q=80",
            description: "Solid brushed brass task light featuring dimmable ambient temperature control."
        },

        // --- CATEGORY: Lighting (3 items) ---
        {
            id: 16,
            name: "Aether Pendant Lamp",
            category: "Lighting",
            price: "$1,200",
            tag: "Minimalist",
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
            description: "Ambient suspended lighting fixture casting a warm, glare-free aura."
        },
        {
            id: 17,
            name: "Eclipse Wall Sconce",
            category: "Lighting",
            price: "$750",
            tag: "Geometric",
            image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80",
            description: "Architectural wall fixture diffusing soft, halo-like illumination."
        },
        {
            id: 18,
            name: "Prism Crystal Chandelier",
            category: "Lighting",
            price: "$4,500",
            tag: "Statement Piece",
            image: "https://images.unsplash.com/photo-1543257580-726e5d0fc2b2?w=600&auto=format&fit=crop&q=80",
            description: "Hand-cut optical crystal pendants suspended in a modern geometric brass frame."
        },

        // --- CATEGORY: Travel (3 items) ---
        {
            id: 19,
            name: "Zenith Titanium Case",
            category: "Travel",
            price: "$980",
            tag: "Ultra-Durable",
            image: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?w=600&auto=format&fit=crop&q=80",
            description: "Crushproof titanium travel case built to accompany you across the globe."
        },
        {
            id: 20,
            name: "Nomad Leather Duffle",
            category: "Travel",
            price: "$740",
            tag: "Vegetable-Tanned",
            image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&auto=format&fit=crop&q=80",
            description: "Spacious weekend duffle crafted from supple, weather-resistant leather."
        },
        {
            id: 21,
            name: "Voyager Tech Folio",
            category: "Travel",
            price: "$320",
            tag: "Organized",
            image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80",
            description: "Waterproof organizer pouch designed to keep cords, chargers, and passports secure."
        },

        // --- CATEGORY: Culinary (3 items) ---
        {
            id: 22,
            name: "Solis Chef Knife Set",
            category: "Culinary",
            price: "$1,450",
            tag: "Damascus Steel",
            image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&auto=format&fit=crop&q=80",
            description: "Hand-forged Damascus steel blades paired with ergonomic handles."
        },
        {
            id: 23,
            name: "Cast Iron Dutch Oven",
            category: "Culinary",
            price: "$350",
            tag: "Enamelled",
            image: "https://images.unsplash.com/photo-1584936353982-fbc4ebd4534e?w=600&auto=format&fit=crop&q=80",
            description: "Heavy-duty enamelled cast iron pot engineered for exceptional heat retention."
        },
        {
            id: 24,
            name: "Himalayan Salt Grilling Block",
            category: "Culinary",
            price: "$180",
            tag: "Gourmet",
            image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80",
            description: "Pure mineral salt slab used for searing, curing, and naturally seasoning foods."
        }
    ];

    // Fetch reviews whenever a product is selected
    useEffect(() => {
        if (!selectedItem) return;

        const fetchReviews = async () => {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            try {
                const response = await axios.get(`${baseUrl}/${selectedItem.id}`);
                if (response.data.success) {
                    setReviews(response.data.reviews);
                }
            } catch (error) {
                console.error("Failed to load reviews:", error);
            }
        };

        fetchReviews();
    }, [selectedItem]);

    const handleAddToCart = async (item, e) => {
        if (e) e.stopPropagation();
        const token = localStorage.getItem('Token');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

        try {
            const response = await axios.post(`${baseUrl}/add-to-cart`, {
                id: item.id,
                name: item.name,
                price: item.price
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.Success) {
                alert("Item Added Successfully!!");
            }
        } catch (error) {
            alert("Failed to add item to cart.");
        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!newReviewText.trim() || !selectedItem) return;

        const token = localStorage.getItem('Token');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

        try {
            const response = await axios.post(`${baseUrl}/add`, {
                productId: selectedItem.id,
                rating: Number(newRating),
                comment: newReviewText
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setReviews([response.data.review, ...reviews]);
                setNewReviewText("");
                alert("Review submitted successfully!");
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
            alert("Failed to post review. Please ensure you are logged in.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 py-8 sm:py-16 px-4 sm:px-6 lg:px-8 relative selection:bg-amber-500/30 selection:text-amber-200">

            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-amber-600/5 blur-[120px] sm:blur-[140px] pointer-events-none rounded-full"></div>

            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10">

                {/* Top Navigation Buttons */}
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
                            Click any item card to view details, specifications, and client reviews.
                        </p>
                    </div>
                </div>

                {/* Grid Feed of Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {showcaseItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300 cursor-pointer" 
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

                                <div className="h-40 bg-zinc-950/50 rounded-2xl border border-zinc-800/60 flex items-center justify-center overflow-hidden relative group-hover:border-amber-500/20 transition">
                                    <img    
                                        src={item.image}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-light text-white tracking-wide truncate">{item.name}</h3>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-amber-400 text-sm font-semibold">{item.price}</p>
                                        <div className="flex items-center gap-1 text-amber-400 text-xs">
                                            <span>★</span>
                                            <span className="text-zinc-400">4.9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={(e) => handleAddToCart(item, e)}
                                className="mt-6 w-full py-2.5 bg-zinc-800/50 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 text-xs font-semibold tracking-wider uppercase rounded-xl transition border border-zinc-700/50 hover:border-amber-500 cursor-pointer active:scale-95"
                            >
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            {/* PRODUCT DETAILS & REVIEW MODAL */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
                        
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* Modal Header & Image */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium uppercase tracking-widest text-amber-400">
                                    {selectedItem.category}
                                </span>
                                <span className="text-zinc-600">•</span>
                                <span className="text-xs text-zinc-400">{selectedItem.tag}</span>
                            </div>
                            
                            <h2 className="text-2xl sm:text-3xl font-light text-white">{selectedItem.name}</h2>
                            <p className="text-xl font-semibold text-amber-400">{selectedItem.price}</p>

                            <div className="h-64 w-full rounded-2xl overflow-hidden border border-zinc-800 relative">
                                <img 
                                    src={selectedItem.image} 
                                    alt={selectedItem.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="text-zinc-300 text-sm font-light leading-relaxed">
                                {selectedItem.description}
                            </p>
                        </div>

                        {/* RECOMMENDED PICKS SECTION (Same Category) */}
                        <div className="space-y-3 border-t border-zinc-800 pt-6">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Recommended Picks in {selectedItem.category}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {showcaseItems
                                    .filter(item => item.category === selectedItem.category && item.id !== selectedItem.id)
                                    .map((recItem) => (
                                        <div 
                                            key={recItem.id}
                                            onClick={() => setSelectedItem(recItem)}
                                            className="bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800/60 hover:border-amber-500/40 transition flex items-center gap-3 cursor-pointer group"
                                        >
                                            <img 
                                                src={recItem.image} 
                                                alt={recItem.name} 
                                                className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition"
                                            />
                                            <div className="overflow-hidden">
                                                <h4 className="text-xs font-medium text-white truncate">{recItem.name}</h4>
                                                <p className="text-xs text-amber-400 font-semibold mt-0.5">{recItem.price}</p>
                                                <span className="text-[10px] text-zinc-500 truncate block">{recItem.tag}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="space-y-4 border-t border-zinc-800 pt-6">
                            <h3 className="text-lg font-light text-white">Customer Reviews</h3>

                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                {reviews.length === 0 ? (
                                    <p className="text-xs text-zinc-500 italic">No reviews yet. Be the first to review this item!</p>
                                ) : (
                                    reviews.map((rev) => (
                                        <div key={rev._id} className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/60 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-white">{rev.userName}</span>
                                                <span className="text-amber-400 text-xs">{"★".repeat(rev.rating)}</span>
                                            </div>
                                            <p className="text-xs text-zinc-400 font-light">{rev.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Add Review Form */}
                            <form onSubmit={handleAddReview} className="space-y-3 pt-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Add Your Review</h4>
                                <div className="flex gap-2">
                                    <select 
                                        value={newRating} 
                                        onChange={(e) => setNewRating(e.target.value)}
                                        className="bg-zinc-800 text-white text-xs px-3 py-2 rounded-xl border border-zinc-700 focus:outline-none"
                                    >
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                    <input 
                                        type="text" 
                                        placeholder="Write your review..." 
                                        value={newReviewText}
                                        onChange={(e) => setNewReviewText(e.target.value)}
                                        className="flex-1 bg-zinc-800 text-white text-xs px-4 py-2 rounded-xl border border-zinc-700 focus:outline-none focus:border-amber-500"
                                    />
                                    <button 
                                        type="submit"
                                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold rounded-xl transition cursor-pointer"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="flex gap-3 pt-4 border-t border-zinc-800">
                            <button 
                                onClick={(e) => handleAddToCart(selectedItem, e)}
                                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold tracking-wider uppercase rounded-xl transition cursor-pointer"
                            >
                                Add To Cart
                            </button>
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold tracking-wider uppercase rounded-xl transition cursor-pointer"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Explore