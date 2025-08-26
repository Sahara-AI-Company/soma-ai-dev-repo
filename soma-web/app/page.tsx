"use client"

// Imports
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";

// Landing Page
export default function LandingPage() {

    // Auth Context Variables
    const { isAuthenticated, loading } = useAuth();

    // Redux State Variables
    const userData = useAppSelector((state) => state.user);

    // Router
    const router = useRouter();


    // useEffect For Redirecting Logic To Home Page Or Login Page
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (!loading) {
            timeout = setTimeout(() => {
                if (isAuthenticated) {
                    
                    // Check if user has completed important details
                    if (!userData.dateOfBirth || !userData.gender) {
                        router.replace('./authentication/importantdetails');
                    }
                    // Check if user has set their interests
                    else if (!userData.userInterests || userData.userInterests.length === 0) {
                        router.replace('./authentication/interests');
                    }
                    // If all conditions are met, go to home
                    else {
                        router.replace('/home');
                    }
                } else {
                    router.replace('/welcome-to-soma');
                }
            }, 3000); // 3 seconds delay
        }
        return () => clearTimeout(timeout);
    }, [isAuthenticated, loading, router, userData]);


    // The Loading Page
    return (
        <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-[rgb(2,8,23)]">

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src="/somapng.png" alt="Logo" className="w-50 h-50" />
            </motion.div>
        </div>
    )
}