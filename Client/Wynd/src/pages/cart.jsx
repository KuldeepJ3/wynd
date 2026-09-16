import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('Token');
                const response = await axios.get('http://localhost:8000/add-to-cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.Success && response.data.cart) {
                    setCartItems(response.data.cart || []);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };
        fetchCart();
    }, []);

    // 1. Helper function to load the Razorpay script dynamically
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // 2. Your Payment Handler Triggered by the Button
    const handlePayment = async () => {
        const isScriptLoaded = await loadRazorpayScript();

        if (!isScriptLoaded) {
            alert("Razorpay SDK failed to load. Are you connected to the internet?");
            return;
        }

        try {
            const token = localStorage.getItem('Token');
            
            // Calls your backend route we created earlier
            const response = await axios.post('http://localhost:8000/create-order', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.data.success) {
                alert("Failed to initialize payment.");
                return;
            }

            const { order, keyId } = response.data;

            const options = {
                key: keyId, 
                amount: order.amount,
                currency: order.currency,
                name: "Wynd Luxury Showcase",
                description: "Purchase Transaction",
                order_id: order.id,
                handler: async function (paymentResponse) {
                    alert(`Payment Successful! Payment ID: ${paymentResponse.razorpay_payment_id}`);
                },
                theme: {
                    color: "#f59e0b",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Payment initialization error:", error);
            alert("Something went wrong with the payment setup.");
        }
    };

    const handleDeleteItem = async (productId) => {
        try {
            const token = localStorage.getItem('Token');
            const response = await axios.delete(`http://localhost:8000/cart/remove/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setCartItems(response.data.cart || []);
            }
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => {
            const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
            return acc + (priceNum);
        }, 0).toLocaleString();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-amber-500/30 selection:text-amber-200">

            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-amber-600/5 blur-[140px] pointer-events-none rounded-full"></div>

            <div className="max-w-4xl mx-auto space-y-8 relative z-10">

                {/* Navigation Back Button */}
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium tracking-wider uppercase rounded-2xl border border-zinc-800/80 hover:border-zinc-700 transition shadow-lg cursor-pointer active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* Cart Container Card */}
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
                    <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-8">Your Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-20 space-y-4">
                            <div className="w-16 h-16 bg-zinc-950/60 rounded-2xl border border-zinc-800 flex items-center justify-center mx-auto text-amber-400 text-xl font-light">
                                🛍️
                            </div>
                            <p className="text-zinc-400 text-sm font-light">No items in cart because nothing added right now.</p>
                            <div>
                                <button
                                    onClick={() => navigate('/explore')}
                                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold tracking-wider uppercase rounded-xl transition cursor-pointer shadow-lg active:scale-95"
                                >
                                    Explore Showcase
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="divide-y divide-zinc-800/60">
                                {cartItems.map((item) => {
                                    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                                    const subtotal = priceNum;
                                    return (
                                        <div key={item.productId || item._id} className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="space-y-1">
                                                <h3 className="text-white font-medium text-base tracking-wide">{item.name}</h3>
                                                <p className="text-amber-400 text-sm font-semibold">{item.price}</p>
                                            </div>

                                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="text-sm font-medium text-white">
                                                    Subtotal: <span className="text-amber-400">${subtotal.toLocaleString()}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteItem(item.productId || item.id)}
                                                    className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium uppercase tracking-wider rounded-lg border border-red-500/20 transition cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="text-xl font-light text-white">
                                    Total Amount: <span className="text-amber-400 font-semibold">${calculateTotal()}</span>
                                </div>
                                <button
                                    onClick={handlePayment}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold tracking-widest uppercase rounded-2xl transition shadow-lg cursor-pointer active:scale-95"
                                >
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Cart;