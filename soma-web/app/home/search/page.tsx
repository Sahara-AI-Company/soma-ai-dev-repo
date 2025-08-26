'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, Compass, Mic } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindow";



const searchCategories = ["All", "Writers", "Articles", "Magazines", "Podcasts"];


export default function SearchPage() {

    const { isAuthenticated } = useAuth();

    const router = useRouter();

    const [activeSearchCategory, setActiveSearchCategory] = useState("All");

    const { width } = useWindowSize();





    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="max-w-4xl mx-auto">

                {isAuthenticated ? (
                    <div className="space-y-6">
                        {/* Search Input Section */}

                        <div className=" flex flex-row justify-between align-center w-full">

                            <div className="flex justify-center items-center pr-2">
                                <ChevronLeftIcon className="h-8 w-8 text-primary" onClick={() => router.back()} />
                            </div>
                            
                            <div className="relative flex flex-row justify-center align-center w-full">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-base"
                                />
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            </div>

                            <div className="flex justify-center items-center pl-2">
                                <Mic className="h-8 w-8 text-primary" onClick={() => router.back()} />
                            </div>
                            
                        </div>

                        {/* Categories Container */}
                        <div className="flex items-center justify-start space-x-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <Link href="/home/discovery">
                                <button className="flex flex-row gap-2 items-center justify-center cursor-grab whitespace-nowrap text-sm font-medium transition-colors text-primary bg-muted hover:text-blue-600 hover:bg-muted px-3 py-1.5 rounded-sm">
                                    <Compass className="h-6 w-6 text-primary" />
                                    {typeof window !== 'undefined' && window.innerWidth < 600 ? "" : "Discover Topics"}
                                </button>
                            </Link>
                            {searchCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveSearchCategory(category)}
                                    className={`cursor-grab whitespace-nowrap text-sm font-medium transition-colors ${
                                        activeSearchCategory === category
                                            ? "text-blue-600 bg-blue-50 px-4 py-2 rounded-sm"
                                            : "text-primary bg-muted hover:text-blue-600 hover:bg-muted px-4 py-2 rounded-sm"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Results Section */}
                        <div className="space-y-4">
                            {/* Sample result items - replace with actual data */}
                            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium text-lg">Result Item 1</h4>
                                <p className="text-sm text-gray-600 mt-1">Description of result item 1</p>
                            </div>
                            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium text-lg">Result Item 2</h4>
                                <p className="text-sm text-gray-600 mt-1">Description of result item 2</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-muted/50 rounded-lg">
                        <h3 className="text-xl md:text-2xl font-semibold text-center">Please Login to Search</h3>
                        <p className="text-sm md:text-base text-gray-600 text-center max-w-md">
                            Create an account or login for a more personalized experience.
                        </p>
                        <Link href="/login" className="w-full flex justify-center">
                            <Button 
                                className="w-[160px] bg-secondary text-white hover:bg-secondary/90 cursor-pointer"
                            >
                                Login to Continue
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
