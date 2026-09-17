import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";
import { ShoppingCart, Search, LogOut, Menu, User, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import MercedesCar from '../Components/MercedesCar';
import { LoadingContext } from "../Context/LoadingContext.jsx"
import './pagesGCss.css';

function Home() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { setIsLoading } = useContext(LoadingContext)

    const handleLogout = () => {
        localStorage.removeItem('Token');
        setUser(null);
        window.location.href = '/login';
    };

    const handleExploreRedirect = () => {
        try{
            setIsLoading(true);
            navigate('/explore')
        } finally {
            setIsLoading(false)
        }
    }

    const featuredProducts = [
        { id: 1, name: "Minimalist Chronograph", price: "$129.00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80" },
        { id: 2, name: "Acoustic Pro Earbuds", price: "$89.99", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80" },
        { id: 3, name: "Tuscan Leather Pack", price: "$159.00", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80" },
        { id: 4, name: "Titanium Eyewear", price: "$199.00", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80" }
    ];

    const categories = [
        { name: "Acoustic Engineering", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80" },
        { name: "Precision Wearables", image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=400&q=80" },
        { name: "Signature Carry", image: "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&w=400&q=80" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-gray-200 selection:text-black overflow-x-hidden">

            {/* REFINED BALANCED LUXURY NAVIGATION */}
            <nav className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.08]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="grid grid-cols-3 items-center h-20">
                        {/* Left: Brand Logo & Mobile Menu */}
                        <div className="flex items-center gap-4 justify-start">
                            <Menu className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white md:hidden transition-colors" />
                            <span className="text-xl font-light tracking-[0.35em] text-white cursor-pointer" onClick={() => navigate('/')}>WYND</span>
                        </div>

                        {/* Center: Search Bar */}
                        <div className="hidden md:flex justify-center w-full">
                            <div className="relative w-full max-w-xs group">
                                <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input type="text" placeholder="Search collection..." className="w-full bg-white/[0.03] text-gray-200 border border-white/[0.08] rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-white/30 transition-all placeholder-gray-500 font-light" />
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center justify-end gap-5">
                            <button onClick={() => navigate('/profile')} className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                <div className="bg-white/[0.05] p-2 rounded-full border border-white/[0.08]"><User className="h-3.5 w-3.5" /></div>
                                <span className="text-[11px] uppercase tracking-widest font-medium">{user ? user.name : "Account"}</span>
                            </button>
                            <div className="relative cursor-pointer text-gray-400 hover:text-white transition-colors p-2 bg-white/[0.03] rounded-full border border-white/[0.08]">

                            <ShoppingCart className="h-4 w-4" onClick={() => navigate('/cart')} />
                                
                            </div>
                            <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition-colors p-2 bg-white/[0.03] rounded-full border border-white/[0.08]">
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* CINEMATIC HERO */}
            <header className="relative bg-[#050505] overflow-hidden border-b border-white/[0.06] pt-16 pb-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-white/[0.03] to-white/[0.07] rounded-full blur-[120px] pointer-events-none"></div>
                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl md:text-7xl font-extralight tracking-tight mb-6 text-white">
                        Catch the <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Wynd</span>.
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-base md:text-lg text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
                        Architected for uncompromising lifestyle performance. Meticulously crafted for the modern minimalist.
                    </motion.p>
                </div>
            </header>

            {/* 🔥 LUXURY 3D SHOWCASE STAGE 🔥 */}
            <section id="car-showcase-section" className="relative h-screen bg-[#020202] border-b border-white/[0.06]">
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    <Canvas
                        camera={{
                            position: [0, 1.1, window.innerWidth < 1024 ? 5.8 : 3.5],
                            fov: window.innerWidth < 1024 ? 50 : 45
                        }}
                        style={{ touchAction: 'pan-y' }}
                    >
                        <Environment preset="night" />
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 20, 10]} intensity={2.5} />
                        <MercedesCar />
                    </Canvas>

                    {/* Floating Luxury Glassmorphism Product Card (Responsive Placement) */}
                    <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-10 sm:max-w-sm z-20">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-[#0f0f11]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="text-[10px] font-semibold tracking-widest uppercase bg-white text-black px-2.5 py-1 rounded-full">Limited Atelier Edition</span>
                                    <h3 className="text-lg font-light tracking-wide text-white mt-3">Mercedes-Benz SL 63 Model</h3>
                                </div>
                                <span className="text-xl font-extralight text-gray-300">$49.99</span>
                            </div>
                            <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">Hand-assembled 1:18 scale die-cast metallic silhouette featuring authentic matte finishes and precision detailing.</p>
                            <button onClick={() => alert("Added Exclusive Collectible to your cart.")} className="w-full bg-white text-black font-medium py-3 px-5 rounded-2xl hover:bg-gray-200 transition-all shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer">
                                <ShoppingCart className="h-3.5 w-3.5" /> Acquire Piece
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CURATED COLLECTIONS */}
            <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Portfolios</span>
                        <h2 className="text-3xl font-light text-white mt-1">Curated Collections</h2>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gray-400 hover:text-white cursor-pointer flex items-center gap-1 group" onClick={handleExploreRedirect}>
                        Explore All <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                </div>

                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div key={index} variants={itemVariants} className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer border border-white/[0.06]">
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent flex items-end p-8">
                                <div>
                                    <span className="text-[10px] tracking-widest uppercase text-gray-400">Series 0{index + 1}</span>
                                    <h3 className="text-xl font-light text-white mt-1 group-hover:translate-x-1 transition-transform">{category.name}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* FLAGSHIP PRODUCTS */}
            <main className="max-w-7xl mx-auto px-6 sm:px-8 pb-24">
                <div className="flex justify-between items-end mb-12 border-b border-white/[0.06] pb-4">
                    <div>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Selections</span>
                        <h2 className="text-3xl font-light text-white mt-1">The Current Release</h2>
                    </div>
                </div>

                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants} className="group cursor-pointer">
                            <div className="h-80 rounded-3xl overflow-hidden relative bg-[#0a0a0c] border border-white/[0.06] mb-4">
                                {product.id === 1 && <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full z-10 border border-white/10">Flagship</span>}
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-light text-gray-200 group-hover:text-white transition-colors">{product.name}</h3>
                                    <p className="text-xs font-light text-gray-400 mt-1">{product.price}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            {/* MINIMALIST LUXURY FOOTER */}
            <footer className="bg-[#020202] py-16 text-center text-gray-500 text-xs border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <span className="text-lg font-light tracking-[0.4em] text-white mb-4">WYND</span>
                    <p className="font-light tracking-wide text-gray-500 mb-6">Atelier E-Commerce &bull; All Rights Reserved &copy; 2026</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;