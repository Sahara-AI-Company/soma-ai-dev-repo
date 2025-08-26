'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Mail, Bell, FileText, Mic2, BookOpen, Mic, Book, ChevronLeftIcon, Search, LayoutDashboard } from 'lucide-react';


import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog2, DialogHeader2, DialogContent2, DialogTitle2 } from '@/components/HomePage/dialog2';
import { useRouter } from 'next/navigation';
import { useAppSelector } from "@/redux/hooks";
import { useAuth } from '@/context/auth-context';



// Search Categories
const searchCategories = [
    "All",
    "Writers",
    "Articles",
    "Magazines",
    "Podcasts",
]

// Notification Categories
const notificationCategories = [
    "All",
    "Writers",
    "Articles",
    "Magazines",
    "Podcasts",
]

export default function AddPage() {
    const [mounted, setMounted] = useState(false);
    const { setTheme } = useTheme();
    const router = useRouter();
    const currentUser = useAppSelector((state) => state.user);
    const [isMobile, setIsMobile] = useState(false);
    const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
    const [width, setWidth] = useState(0);
    const [notificationsModal, setNotificationsModal] = useState(false);
    const [activeNotificationCategory, setActiveNotificationCategory] = useState("All");
    const [searchQueryModal, setSearchQueryModal] = useState(false);
    const [activeSearchCategory, setActiveSearchCategory] = useState("All");
    const searchCategoriesScrollRef = useRef<HTMLDivElement>(null);
    const notificationCategoriesScrollRef = useRef<HTMLDivElement>(null);

    // Get user data from Redux
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setMounted(true);
        const updateWidth = () => {
            setWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 768);
        };
        
        updateWidth();
        window.addEventListener('resize', updateWidth);
        
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    if (!mounted) {
        return null;
    }

    // scroll function
    const scroll = (direction: "left" | "right", ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            const scrollAmount = 200;
            const newScrollLeft =
                ref.current.scrollLeft +
                (direction === "left" ? -scrollAmount : scrollAmount);
            ref.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">


            {/* Header */}
            <header className="border-b bg-white fixed top-0 left-0 right-0 z-50 bg-background">
                <div className="flex items-center justify-between px-6 py-4 bg-background">
                    <div className="flex items-center gap-4">
                        <ChevronLeftIcon className="h-6 w-6 text-primary cursor-pointer" onClick={() => router.back()} />
                        {!isMobile ? (
                            <div className="text-3xl font-semibold text-secondary">Chats</div>
                        ) : (
                                <div>
                                {currentUser.fullName ? (
                                    <div 
                                        onClick={() => setIsUserSidebarOpen(true)} 
                                        className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold cursor-pointer text-xl"
                                    >
                                        {currentUser.fullName.charAt(0).toUpperCase()}
                                    </div>
                                ) : currentUser.profilePicture ? (
                                    <img 
                                        src={currentUser.profilePicture} 
                                        alt="Profile" 
                                        onClick={() => setIsUserSidebarOpen(true)} 
                                        className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                    />
                                ) : (
                                    <div 
                                        onClick={() => setIsUserSidebarOpen(true)} 
                                        className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold cursor-pointer"
                                    >
                                        {currentUser.username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Middle - Search Bar */}
                    {!isMobile ? (
                        <div className="flex-1 max-w-xl mx-2 bg-background">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 w-full placeholder:hidden md:placeholder:block"
                                    onClick={() => isMobile ? router.push("/home/search") : setSearchQueryModal(true)}
                                />
                            </div>
                        </div>
                    ) : (
                        <Link href="/home/search" className="ml-auto mr-2">
                            <Search className="h-4 w-4 text-primary" />
                        </Link>
                    )}

                    {/* Right - Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Dashboard/Login Button */}
                        <Link href="/dashboard">
                            {isMobile ? (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-gray-200 rounded-sm"
                                >
                                    <LayoutDashboard className="h-6 w-6" />
                                </Button>
                            ) : (
                                <Button
                                    className={`bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-sm cursor-pointer`}
                                    size="sm"
                                >
                                    Dashboard
                                </Button>
                            )}
                        </Link>

                        {/* Bell Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-200 rounded-sm cursor-pointer"
                            onClick={() => isMobile ? router.push("/home/notifications") : setNotificationsModal(true)}
                        >
                            <Bell className="h-6 w-6" />
                        </Button>

                        {/* Mail Button */}
                        {isAuthenticated && (
                            <Link href="/home/chat">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-gray-200 rounded-sm cursor-pointer"
                                >
                                    <Mail className="h-6 w-6" />
                                </Button>
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="cursor-pointer">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 mt-20 bg-muted">
                <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3 grid-cols-1">
                    {/* Write An Article Card */}
                    <div className="group relative bg-background hover:shadow-lg transition-shadow rounded-lg border p-6 space-y-4">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Write An Article</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Share your thoughts, ideas, and expertise through a well-crafted article. Perfect for in-depth analysis and storytelling.
                                </p>
                            </div>
                        </div>
                        <Link href="/post">
                            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                Start Writing
                            </Button>
                        </Link>
                    </div>

                    {/* Post A Podcast Card */}
                    <div className="group relative bg-background hover:shadow-lg transition-shadow rounded-lg border p-6 space-y-4">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                                <Mic className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Post A Podcast</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Upload your audio content and reach listeners worldwide. Ideal for discussions, interviews, and audio storytelling.
                                </p>
                            </div>
                        </div>
                        <Link href="/post/podcast">
                            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                Upload Podcast
                            </Button>
                        </Link>
                    </div>

                    {/* Publish A Magazine Card */}
                    <div className="group relative bg-background hover:shadow-lg transition-shadow rounded-lg border p-6 space-y-4">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                                <Book className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Publish A Magazine</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Create a collection of curated content in a magazine format. Great for themed content and periodic publications.
                                </p>
                            </div>
                        </div>
                        <Link href="/post/magazine">
                            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                Create Magazine
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>




            {/* Search Query Modal */}
            <Dialog2
                open={searchQueryModal}
                onOpenChange={(open: boolean) => !open && setSearchQueryModal(false)}
            >
                <DialogContent2 className="sm:max-w-[500px] max-w-[380px] rounded-lg font-playfair-display h-[600px] flex flex-col">

                    {/* Create Content Modal Header */}
                    <DialogHeader2>
                        <DialogTitle2 className="text-2xl font-bold">Search</DialogTitle2>
                    </DialogHeader2>

                    {/* Search Input Section */}
                    <div className="relative mt-1">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>

                    {/* Categories Container */}
                    <div
                        ref={searchCategoriesScrollRef}
                        className="flex items-center justify-start space-x-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {searchCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveSearchCategory(category)}
                                className={`cursor-grab whitespace-nowrap text-sm font-medium transition-colors ${activeSearchCategory === category
                                    ? "text-blue-600 bg-blue-50 px-4 py-2 rounded-sm"
                                    : "text-primary bg-muted hover:text-blue-600 hover:bg-muted px-4 py-2 rounded-sm"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Results Section */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="space-y-4">
                            {/* Sample result items - replace with actual data */}
                            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium">Result Item 1</h4>
                                <p className="text-sm text-gray-600">Description of result item 1</p>
                            </div>
                            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium">Result Item 2</h4>
                                <p className="text-sm text-gray-600">Description of result item 2</p>
                            </div>
                        </div>
                    </div>
                </DialogContent2>
            </Dialog2>


            {/* Notifications Modal */}
            <Dialog2
                open={notificationsModal}
                onOpenChange={(open: boolean) => !open && setNotificationsModal(false)}
            >
                <DialogContent2 className="sm:max-w-[500px] max-w-[380px] rounded-lg font-playfair-display h-[600px] flex flex-col">

                    {/* Create Content Modal Header */}
                    <DialogHeader2>
                        <DialogTitle2 className="text-2xl font-bold">Notifications</DialogTitle2>
                    </DialogHeader2>

                    {/* Categories Container */}
                    <div
                        ref={notificationCategoriesScrollRef}
                        className="flex items-center justify-start space-x-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {notificationCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveNotificationCategory(category)}
                                className={`cursor-grab whitespace-nowrap text-sm font-medium transition-colors ${activeNotificationCategory === category
                                    ? "text-blue-600 bg-blue-50 px-4 py-2 rounded-sm"
                                    : "text-primary bg-muted hover:text-blue-600 hover:bg-muted px-4 py-2 rounded-sm"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Results Section */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="space-y-4">
                            {/* Sample result items - replace with actual data */}
                            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium">Result Item 1</h4>
                                <p className="text-sm text-gray-600">Description of result item 1</p>
                            </div>
                            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium">Result Item 2</h4>
                                <p className="text-sm text-gray-600">Description of result item 2</p>
                            </div>
                        </div>
                    </div>
                </DialogContent2>
            </Dialog2>


        </div>
    );
} 