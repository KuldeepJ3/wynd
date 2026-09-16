import { createContext, useState } from 'react';

export const LoadingContext = createContext();

export default function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-70 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        {/* Tailwind Animated Spinner */}
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white mt-4 font-semibold text-lg">Loading...</p>
                    </div>
                </div>
            )}
        </LoadingContext.Provider>
    );
}