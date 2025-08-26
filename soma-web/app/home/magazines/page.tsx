'use client';

import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Mail, Compass, UserCircleIcon, Search, LayoutDashboard } from 'lucide-react';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog6, DialogContent6, DialogHeader6, DialogTitle6, DialogDescription6 } from "@/components/MagazinePage/dialog6";
import { NotificationsDialog } from "@/components/MagazinePage/notificationsDialog";
import { SearchQueryDialog } from "@/components/MagazinePage/searchQueryDialog";

import Image from "next/image";
import React from "react";
import { Dialog2 } from '@/components/HomePage/dialog2';
import { DialogContent2 } from '@/components/HomePage/dialog2';
import { DialogHeader2 } from '@/components/HomePage/dialog2';
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import useWindowSize from '@/hooks/useWindow';
import { UserSidebar } from '@/components/HomePage/userSidebar';
import { motion } from 'motion/react';
import { useAppSelector } from "@/redux/hooks";

const categories = [
    'All',
    'Technology',
    'Business',
    'Science',
    'Health',
    'Arts',
    'Sports',
    'Politics',
    'Education',
    'Entertainment',
    'Food',
    'Travel',
    'Fashion',
    'Finance',
    'Lifestyle',
    'World News',
    'Culture',
    'Innovation',
    'Career'
];

const searchCategories = [
    "All",
    "Writers",
    "Articles",
    "Magazines",
    "Podcasts",
]

const notificationCategories = [
    "All",
    "Notifications",
    "Messages",
    "Requests",
    "Comments",
    "Likes",
]

const topWriters = [
    { name: 'Sarah Johnson', publication: 'Tech Daily', followers: '12.5K' },
    { name: 'Michael Chen', publication: 'Business Insights', followers: '8.2K' },
    { name: 'Dr. Emily Rodriguez', publication: 'Science Weekly', followers: '15.3K' },
    { name: 'Dr. James Wilson', publication: 'Health Today', followers: '9.8K' },
    { name: 'Lisa Martinez', publication: 'Arts & Culture', followers: '7.6K' },
    { name: 'David Thompson', publication: 'World News', followers: '11.2K' },
    { name: 'Rachel Kim', publication: 'Innovation Daily', followers: '6.9K' },
    { name: 'Marcus Brown', publication: 'Finance Focus', followers: '10.4K' },
    { name: 'Sophie Anderson', publication: 'Environment Now', followers: '5.7K' },
    { name: 'Alex Rivera', publication: 'Career Guide', followers: '4.8K' }
];

const topPublications = [
    { name: 'Tech Daily', author: 'Sarah Johnson', followers: '45.2K', icon: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop', category: 'Technology' },
    { name: 'Business Insights', author: 'Michael Chen', followers: '38.7K', icon: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop', category: 'Business' },
    { name: 'Science Weekly', author: 'Dr. Emily Rodriguez', followers: '52.1K', icon: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop', category: 'Science' },
    { name: 'Health Today', author: 'Dr. James Wilson', followers: '42.8K', icon: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop', category: 'Health' },
    { name: 'Arts & Culture', author: 'Lisa Martinez', followers: '35.6K', icon: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=100&h=100&fit=crop', category: 'Arts' },
    { name: 'World News', author: 'David Thompson', followers: '48.9K', icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop', category: 'World News' },
    { name: 'Innovation Daily', author: 'Rachel Kim', followers: '31.4K', icon: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop', category: 'Innovation' },
    { name: 'Finance Focus', author: 'Marcus Brown', followers: '39.5K', icon: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=100&h=100&fit=crop', category: 'Finance' },
    { name: 'Environment Now', author: 'Sophie Anderson', followers: '28.7K', icon: 'https://images.unsplash.com/photo-1515405295579-ba7e45403062?w=100&h=100&fit=crop', category: 'Environment' },
    { name: 'Career Guide', author: 'Alex Rivera', followers: '25.3K', icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop', category: 'Career' }
];

const articles = [
    {
        publisher: {
            name: 'Tech Daily',
            icon: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop'
        },
        title: 'The Future of Artificial Intelligence in Healthcare And Its Dangerous Side Effects',
        subtitle: 'How AI is revolutionizing medical diagnosis and treatment and its dangerous side effects. This article will explore the potential benefits and risks of AI in healthcare. Every day, we are witnessing the rapid advancement of artificial intelligence (AI) in various industries, including healthcare. While AI has the potential to transform the way we diagnose and treat diseases, it also poses significant risks that could impact patient safety and outcomes.',
        readTime: '5 min read',
        author: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop',
        category: 'Technology',
        date: 'March 15, 2024'
    },
    {
        publisher: {
            name: 'Business Insights',
            icon: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop'
        },
        title: 'Sustainable Business Practices in 2024',
        subtitle: 'Companies leading the way in environmental responsibility',
        readTime: '4 min read',
        author: 'Michael Chen',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop',
        category: 'Business',
        date: 'March 14, 2024'
    },
    {
        publisher: {
            name: 'Science Weekly',
            icon: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop'
        },
        title: 'Breakthrough in Quantum Computing',
        subtitle: 'New research shows promising results in quantum supremacy',
        readTime: '6 min read',
        author: 'Dr. Emily Rodriguez',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop',
        category: 'Science',
        date: 'March 13, 2024'
    },
    {
        publisher: {
            name: 'Health Today',
            icon: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop'
        },
        title: 'The Impact of Sleep on Mental Health',
        subtitle: 'New studies reveal the connection between sleep patterns and mental well-being',
        readTime: '3 min read',
        author: 'Dr. James Wilson',
        image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=400&h=400&fit=crop',
        category: 'Health',
        date: 'March 12, 2024'
    },
    {
        publisher: {
            name: 'Arts & Culture',
            icon: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=100&h=100&fit=crop'
        },
        title: 'The Renaissance of Digital Art',
        subtitle: 'How technology is transforming the art world',
        readTime: '4 min read',
        author: 'Lisa Martinez',
        image: 'https://images.unsplash.com/photo-1515405295579-ba7e45403062?w=400&h=400&fit=crop',
        category: 'Arts',
        date: 'March 11, 2024'
    }
];


const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of Apple club is that you boast about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <Image
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Artificial Intelligence",
        title: "You can do more with AI.",
        src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Product",
        title: "Launching the new Apple Vision Pro.",
        src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },

    {
        category: "Product",
        title: "Maps for your iPhone 15 Pro Max.",
        src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "iOS",
        title: "Photography just got better.",
        src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Hiring",
        title: "Hiring for a Staff Software Engineer",
        src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
];



export default function MagazinesPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const categoriesScrollRef = useRef<HTMLDivElement>(null);
    const articlesScrollRefAll1 = useRef<HTMLDivElement>(null);
    const articlesScrollRefAll2 = useRef<HTMLDivElement>(null);
    const articlesScrollRefSubscribed1 = useRef<HTMLDivElement>(null);
    const articlesScrollRefSubscribed2 = useRef<HTMLDivElement>(null);
    const articlesScrollRefPaid1 = useRef<HTMLDivElement>(null);
    const articlesScrollRefPaid2 = useRef<HTMLDivElement>(null);
    const articlesScrollRefSaved1 = useRef<HTMLDivElement>(null);
    const articlesScrollRefSaved2 = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("all");
    const [mounted, setMounted] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Search Query useState()
    const [searchQueryModal, setSearchQueryModal] = useState(false);
    const [activeSearchCategory, setActiveSearchCategory] = useState("All");

    // Notifications useState()
    const [notificationsModal, setNotificationsModal] = useState(false);
    const [activeNotificationCategory, setActiveNotificationCategory] = useState("All");

    const searchCategoriesScrollRef = useRef<HTMLDivElement>(null);
    const notificationCategoriesScrollRef = useRef<HTMLDivElement>(null);

    // Router
    const router = useRouter();

    // Get user data from Redux
    const { isAuthenticated } = useAuth();

    // useWindowSize
    const { width } = useWindowSize();

    // isUserSidebarOpen useState()
    const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

    // showCreateModal useState()
    const [showCreateModal, setShowCreateModal] = useState(false);

    const currentUser = useAppSelector((state) => state.user);

    const currentUserCategories = ['All', ...currentUser.userInterests];


    // setTheme useTheme()
    const { setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const scrollCategories = (direction: 'left' | 'right') => {
        if (categoriesScrollRef.current) {
            const scrollAmount = 200;
            const newScrollLeft = categoriesScrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            categoriesScrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const scrollArticles = (direction: 'left' | 'right') => {
        if (articlesScrollRefAll1.current) {
            const scrollAmount = 200;
            const newScrollLeft = articlesScrollRefAll1.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            articlesScrollRefAll1.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const handleMouseDown = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            setIsScrolling(true);
            setStartX(e.pageX - ref.current.offsetLeft);
            setScrollLeft(ref.current.scrollLeft);
        }
    };

    const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
        if (!isScrolling) return;
        if (ref.current) {
            e.preventDefault();
            const x = e.pageX - ref.current.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            ref.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsScrolling(false);
    };

    const handleMouseLeave = () => {
        setIsScrolling(false);
    };

    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    const DummyContent = () => {
        return (
            <>
                {[...new Array(3).fill(1)].map((_, index) => {
                    return (
                        <div
                            key={"dummy-content" + index}
                            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                        >
                            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                    The first rule of Apple club is that you boast about Apple club.
                                </span>{" "}
                                Keep a journal, quickly jot down a grocery list, and take amazing
                                class notes. Want to convert those notes to text? No problem.
                                Langotiya jeetu ka mara hua yaar is ready to capture every
                                thought.
                            </p>
                            <Image
                                src="https://assets.aceternity.com/macbook.png"
                                alt="Macbook mockup from Aceternity UI"
                                height="500"
                                width="500"
                                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                            />
                        </div>
                    );
                })}
            </>
        );
    };


    return (
        <div className="flex flex-col min-h-screen font-playfair-display">


            {/* Header */}
            <header className="border-b bg-white fixed top-0 left-0 right-0 z-50 bg-background">
                <div className="flex items-center justify-between px-6 py-4 bg-background">

                    {/* Left - SOMA (Company Logo) */}
                    {typeof window !== 'undefined' && window.innerWidth > 639 ?
                        <div className=" text-3xl font-semibold text-secondary">Podcasts</div>
                        :
                        <UserCircleIcon
                            className="h-6 w-6 text-primary cursor-pointer"
                            onClick={() => setIsUserSidebarOpen(true)}
                        />
                    }

                    {/* Middle - Search Bar */}
                    {typeof window !== 'undefined' && window.innerWidth >= 500 ? (
                        <div className="flex-1 max-w-xl mx-2 bg-background">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 w-full placeholder:hidden md:placeholder:block"
                                    onClick={() => { typeof window !== 'undefined' && window.innerWidth < 600 ? router.push("/home/search") : setSearchQueryModal(true) }}
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
                        {isAuthenticated ? (
                            <Link href="/dashboard">
                                {typeof window !== 'undefined' && width < 600 ? (
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
                        ) : (
                            <Link href="/login">
                                <Button
                                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-sm cursor-pointer"
                                    size="sm"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}

                        {/* Bell Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-200 rounded-sm cursor-pointer"
                            onClick={() => typeof window !== 'undefined' && window.innerWidth >= 768 ? setNotificationsModal(true) : router.push("/home/notifications")}
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
                        {mounted && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="cursor-pointer">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer" />
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
                        )}
                    </div>
                </div>
            </header>

            {/* Categories Bar */}
            <div className="border-b fixed top-[4rem] left-0 right-0 z-40 bg-background">
                <div className="w-full relative bg-background">

                    {/* Left Arrow And Explore Button */}
                    <div className="absolute bg-background left-0 top-0 h-full w-10 md:w-20 z-10 hover:from-background hover:via-background flex items-center justify-around gap-2 cursor-pointer">
                        <button
                            onClick={() => scroll("left", categoriesScrollRef)}
                            className="flex items-center justify-center cursor-pointer hidden md:block"
                        >
                            <ChevronLeftIcon className="h-6 w-6 text-primary" />
                        </button>

                        {/* Discovery Button */}
                        <Link href="/home/discovery">
                            <button
                                className="flex items-center justify-center p-1.5 cursor-pointer hover:bg-muted rounded-sm"
                            >
                                <Compass className="h-6 w-6 text-primary" />
                            </button>
                        </Link>
                    </div>

                    {/* Categories Container */}
                    <div
                        ref={categoriesScrollRef}
                        className="md:ml-10 flex items-center justify-start space-x-2 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-12"
                    >
                        {currentUserCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`cursor-grab whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === category
                                        ? "text-blue-600 bg-blue-50 px-4 py-2 rounded-sm"
                                        : "text-primary bg-muted hover:text-blue-600 hover:bg-muted px-4 py-2 rounded-sm"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll("right", categoriesScrollRef)}
                        className="cursor-pointer hidden md:block absolute right-0 top-0 h-full w-12 z-10 bg-gradient-to-l from-background via-background to-transparent hover:from-background hover:via-background flex items-center justify-center"
                    >
                        <ChevronRightIcon className="h-6 w-6 text-primary" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 mt-[8rem] bg-background">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="fixed sm:bottom-5 bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%] h-10 justify-start mb-2 border rounded-lg bg-background shadow-lg z-50">
                        <TabsTrigger value="all" className="p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50">All</TabsTrigger>
                        <TabsTrigger value="subscribed" className="p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50">Subscribed</TabsTrigger>
                        <TabsTrigger value="paid" className="p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50">Paid</TabsTrigger>
                        <TabsTrigger value="saved" className="p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50">Saved</TabsTrigger>
                    </TabsList>

                    {/* All Tab */}
                    <TabsContent value="all">
                        <div className="flex gap-6">
                            {/* Left Section - 72% */}
                            <div className="w-full xl:w-[72%]">
                                {/* 'What's On Your Mind?' Container */}
                                <motion.div
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`bg-background rounded-lg p-4 shadow-sm mb-6 border cursor-pointer ${ width <= 1024 ? "w-[100%]" : "w-[90%]" }`}
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                                                alt="User profile"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-gray-600">
                                            Create a New Magazine
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            

                            {/* Right Section - 28% */}
                            <section className="hidden xl:block w-[28%] p-5 bg-muted fixed right-0 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {/* Featured Heading */}
                                <h2 className="text-lg font-semibold mb-4">All</h2>
                                <div className="space-y-3">
                                    {data.map((item, index) => (
                                        <motion.div
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.95 }}
                                            key={index}
                                            className="bg-background rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        >
                                            {/* Featured Item Container */}
                                            <div className="flex flex-col h-full">
                                                {/* Featured Item Image */}
                                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={item.src}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Featured Item Title & Category */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-primary font-semibold line-clamp-2">{item.title}</h3>
                                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full mt-2 inline-block">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </TabsContent>

                    {/* Subscribed Tab */}
                    <TabsContent value="subscribed">
                        <div className="flex gap-6">
                            {/* Left Section - 72% */}
                            <div className="w-full xl:w-[72%]">
                                {/* 'What's On Your Mind?' Container */}
                                <motion.div
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`bg-background rounded-lg p-4 shadow-sm mb-6 border cursor-pointer ${ width <= 1024 ? "w-[100%]" : "w-[90%]" }`}
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                                                alt="User profile"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-gray-600">
                                            Create a New Magazine
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefSubscribed1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefSubscribed1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefSubscribed1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Right Section - 28% */}
                            <section className="hidden xl:block w-[28%] p-5 bg-muted fixed right-0 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {/* Featured Heading */}
                                <h2 className="text-lg font-semibold mb-4">Subscribed</h2>
                                <div className="space-y-3">
                                    {data.map((item, index) => (
                                        <motion.div
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.95 }}
                                            key={index}
                                            className="bg-background rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        >
                                            {/* Featured Item Container */}
                                            <div className="flex flex-col h-full">
                                                {/* Featured Item Image */}
                                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={item.src}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Featured Item Title & Category */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-primary font-semibold line-clamp-2">{item.title}</h3>
                                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full mt-2 inline-block">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </TabsContent>

                    {/* Paid Tab */}
                    <TabsContent value="paid">
                        <div className="flex gap-6">

                            {/* Left Section - 72% */}
                            <div className="w-full xl:w-[72%]">


                                {/* 'What's On Your Mind?' Container */}
                                <motion.div
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`bg-background rounded-lg p-4 shadow-sm mb-6 border cursor-pointer ${ width <= 1024 ? "w-[100%]" : "w-[90%]" }`}
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                                                alt="User profile"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-gray-600">
                                            Create a New Magazine
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefPaid1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefPaid1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefPaid1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - 28% */}
                            <section className="hidden xl:block w-[28%] p-5 bg-muted fixed right-0 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {/* Featured Heading */}
                                <h2 className="text-lg font-semibold mb-4">Paid</h2>
                                <div className="space-y-3">
                                    {data.map((item, index) => (
                                        <motion.div
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.95 }}
                                            key={index}
                                            className="bg-background rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        >
                                            {/* Featured Item Container */}
                                            <div className="flex flex-col h-full">
                                                {/* Featured Item Image */}
                                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={item.src}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Featured Item Title & Category */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-primary font-semibold line-clamp-2">{item.title}</h3>
                                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full mt-2 inline-block">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </TabsContent>

                    {/* Saved Tab */}
                    <TabsContent value="saved">
                        <div className="flex gap-6">
                            {/* Left Section - 72% */}
                            <div className="w-full xl:w-[72%]">
                                {/* 'What's On Your Mind?' Container */}
                                <motion.div
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`bg-background rounded-lg p-4 shadow-sm mb-6 border cursor-pointer ${ width <= 1024 ? "w-[100%]" : "w-[90%]" }`}
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                                                alt="User profile"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-gray-600">
                                            Create a New Magazine
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Saved</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefSaved1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefSaved1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefSaved1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Header Section */}
                                <div className="space-y-2 flex justify-start align-center pl-2 gap-2">
                                    <h1 className="text-3xl font-bold text-primary h-full mr-3">Featured</h1>
                                    <div className="flex items-center justify-center">
                                        <span className="text-lg">See All</span>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {/* Magazine Carousel Section */}
                                <div className="relative">
                                    {/* Magazine Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {articles.map((article, index) => (
                                            <div key={index} className={`group cursor-pointer flex-shrink-0 w-[170px] sm:w-[170px] md:w-[180px] lg:w-[200px] xl:w-[200px] 2xl:w-[270px] 3xl:w-[290px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                <div className="relative w-full h-57 sm:h-72 md:h-66 lg:h-76 xl:h-[18rem] 2xl:h-[24rem] 3xl:h-[26rem] overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/100 to-transparent" />
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                                                            {article.subtitle}
                                                        </p>
                                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                                            <span>{article.category}</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - 28% */}
                            <section className="hidden xl:block w-[28%] p-5 bg-muted fixed right-0 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {/* Featured Heading */}
                                <h2 className="text-lg font-semibold mb-4">Featured</h2>
                                <div className="space-y-3">
                                    {data.map((item, index) => (
                                        <motion.div
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.95 }}
                                            key={index}
                                            className="bg-background rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        >
                                            {/* Featured Item Container */}
                                            <div className="flex flex-col h-full">
                                                {/* Featured Item Image */}
                                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={item.src}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Featured Item Title & Category */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-primary font-semibold line-clamp-2">{item.title}</h3>
                                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full mt-2 inline-block">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Modals and Sidebar */}
                <SearchQueryDialog 
                    searchQueryModal={searchQueryModal}
                    setSearchQueryModal={setSearchQueryModal}
                    searchCategories={searchCategories}
                    activeSearchCategory={activeSearchCategory}
                    setActiveSearchCategory={setActiveSearchCategory}
                />

                <NotificationsDialog 
                    notificationsModal={notificationsModal}
                    setNotificationsModal={setNotificationsModal}
                    notificationCategories={notificationCategories}
                    activeNotificationCategory={activeNotificationCategory}
                    setActiveNotificationCategory={setActiveNotificationCategory}
                />

                <UserSidebar
                    isOpen={isUserSidebarOpen}
                    onClose={() => setIsUserSidebarOpen(false)}
                />
            </main>
        </div>
    );
} 
