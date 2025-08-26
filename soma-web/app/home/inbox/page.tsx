'use client';

import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Settings, Info, Plus, Pen, Mic, Book, Compass } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dialog5, DialogContent5, DialogHeader5, DialogTitle5 } from "@/components/InboxPage/dialog5";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bell, Mail, UserCircleIcon, Search, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import useWindowSize from '@/hooks/useWindow';
import { UserSidebar } from '@/components/HomePage/userSidebar';
import WriterDetailsSheet from "@/components/InboxPage/WriterDetailsSheet"
import PublicationDetailsSheet from "@/components/InboxPage/PublicationDetailsSheet"
import CreateContentDialog from "@/components/InboxPage/CreateContentDialog"
import { SearchQueryDialog } from "@/components/InboxPage/searchQueryDialog"
import { NotificationsDialog } from "@/components/InboxPage/notificationsDialog"
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
    'Environment',
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
    "Likes"
]


const topWriters = [
    {
        name: 'Sarah Johnson',
        publication: 'Tech Daily',
        followers: '12.5K',
        description: 'Award-winning technology journalist with over 10 years of experience covering AI, cybersecurity, and digital transformation. Sarah has been recognized for her in-depth analysis and ability to explain complex tech concepts to a broad audience.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    {
        name: 'Michael Chen',
        publication: 'Business Insights',
        followers: '8.2K',
        description: 'Business strategist and financial analyst specializing in market trends and corporate innovation. Michael provides expert insights on global markets, startup ecosystems, and emerging business models.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
    },
    {
        name: 'Dr. Emily Rodriguez',
        publication: 'Science Weekly',
        followers: '15.3K',
        description: 'PhD in Astrophysics with a passion for making complex scientific concepts accessible. Dr. Rodriguez has published numerous papers on space exploration and quantum mechanics.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    },
    {
        name: 'Dr. James Wilson',
        publication: 'Health Today',
        followers: '9.8K',
        description: 'Board-certified physician and health policy expert. Dr. Wilson combines clinical experience with public health expertise to provide comprehensive health coverage.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    {
        name: 'Lisa Martinez',
        publication: 'Arts & Culture',
        followers: '7.6K',
        description: 'Cultural critic and art historian exploring the intersection of traditional and contemporary art. Lisa brings a fresh perspective to cultural commentary and artistic expression.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
    }
];

const topPublications = [
    {
        name: 'Tech Daily',
        author: 'Sarah Johnson',
        Subscribers: '45.2K',
        icon: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop',
        category: 'Technology',
        description: 'Your daily dose of technology news, analysis, and insights. Covering everything from AI breakthroughs to cybersecurity trends, Tech Daily brings you the latest developments in the tech world.'
    },
    {
        name: 'Business Insights',
        author: 'Michael Chen',
        Subscribers: '38.7K',
        icon: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
        category: 'Business',
        description: 'Expert analysis of global markets, corporate strategies, and economic trends. Business Insights provides deep dives into the world of business and finance.'
    },
    {
        name: 'Science Weekly',
        author: 'Dr. Emily Rodriguez',
        Subscribers: '52.1K',
        icon: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop',
        category: 'Science',
        description: 'Breaking down complex scientific discoveries into engaging stories. Science Weekly covers the latest research across physics, biology, chemistry, and more.'
    },
    {
        name: 'Health Today',
        author: 'Dr. James Wilson',
        Subscribers: '42.8K',
        icon: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop',
        category: 'Health',
        description: 'Your trusted source for health and wellness information. Health Today combines medical expertise with practical advice for better living.'
    },
    {
        name: 'Arts & Culture',
        author: 'Lisa Martinez',
        Subscribers: '35.6K',
        icon: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=100&h=100&fit=crop',
        category: 'Arts',
        description: 'Exploring the intersection of art, culture, and society. Arts & Culture brings you thoughtful commentary on the creative world.'
    }
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


// Inbox Page
export default function InboxPage() {
    // activeCategory
    const [activeCategory, setActiveCategory] = useState('All');
    // scrollContainerRef
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // mounted
    const [mounted, setMounted] = useState(false);
    // selectedWriter
    const [selectedWriter, setSelectedWriter] = useState<typeof topWriters[0] | null>(null);
    // selectedPublication
    const [selectedPublication, setSelectedPublication] = useState<typeof topPublications[0] | null>(null);
    // setTheme
    const { setTheme } = useTheme();
    // Add new state for create modal
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Search Query useState()
    const [searchQueryModal, setSearchQueryModal] = useState(false);

    // Notifications useState()
    const [notificationsModal, setNotificationsModal] = useState(false);

    // isUserSidebarOpen useState()
    const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

    // activeSearchCategory useState()
    const [activeSearchCategory, setActiveSearchCategory] = useState("All");

    // activeNotificationCategory useState()
    const [activeNotificationCategory, setActiveNotificationCategory] = useState("All");

    // Router
    const router = useRouter();

    // Get user data from Redux
    const { isAuthenticated } = useAuth();

    // useWindowSize
    const { width } = useWindowSize();

    const currentUser = useAppSelector((state) => state.user);

    const currentUserCategories = ['All', ...currentUser.userInterests];

    // useEffect
    useEffect(() => {
        setMounted(true);
    }, []);

    // scroll
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-muted font-playfair-display">

            {/* Header */}
            <header className="border-b bg-white fixed top-0 left-0 right-0 z-50 bg-background">
                <div className="flex items-center justify-between px-6 py-4 bg-background">

                    {/* Left - SOMA (Company Logo) */}
                    {typeof window !== 'undefined' && window.innerWidth > 639 ?
                    <div className=" text-3xl font-semibold text-secondary">Inbox</div>
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
                                onClick={() => {typeof window !== 'undefined' && window.innerWidth < 600 ? router.push("/home/search") : setSearchQueryModal(true)}}
                            />
                        </div>
                    </div>
                    ) : (
                        <Link href="/home/search" className="ml-auto mr-2">
                            <Search className="h-4 w-4 text-primary"/>
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
            <div className="border-b bg-white fixed top-[4rem] left-0 right-0 z-40 bg-background">
                <div className="w-full relative bg-background">

                    {/* Left Arrow And Explore Button */}
                    <div className="absolute bg-background left-0 top-0 h-full w-10 md:w-20 z-10 hover:from-background hover:via-background flex items-center justify-around gap-2 cursor-pointer">
                        <button
                            onClick={() => scroll("left")}
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
                        ref={scrollContainerRef}
                        className="md:ml-10 flex items-center justify-start space-x-2 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-12"
                    >
                        {currentUserCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === category
                                        ? 'text-blue-600 bg-blue-50 px-4 py-2 rounded-sm'
                                        : 'text-primary bg-muted hover:text-blue-600 hover:bg-muted px-4 py-2 rounded-sm'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:block absolute right-0 top-0 h-full w-12 z-10 bg-gradient-to-l from-background via-background to-transparent hover:from-background hover:via-background flex items-center justify-center"
                    >
                        <ChevronRightIcon className="h-6 w-6 text-primary" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex bg-muted mt-[8rem]">

                {/* Left Section - 20% */}
                <section className="hidden xl:block w-[20%] border-r bg-muted p-4 fixed h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* Favourite Writers Heading */}
                    <h2 className="text-lg font-semibold mb-4">Favourite Writers</h2>
                    <div className="space-y-3">

                        {/* Favourite Writers Mapping */}
                        {topWriters.map((writer, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-background rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setSelectedWriter(writer)}
                            >

                                {/* Favourite Writers Container */}
                                <div className="flex flex-col">

                                    {/* Favourite Writers Title & Follow Button */}
                                    <div className="flex justify-between items-start">
                                        <span className="text-base font-semibold text-primary truncate max-w-[18ch]">{writer.name}</span>
                                        <Button variant="outline" size="sm" className="h-7 px-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center gap-1">
                                            Follow
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    {/* Favourite Writers Publication & Followers */}
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-sm text-muted-foreground truncate max-w-[25ch]">{writer.publication}</span>
                                        <span className="text-xs text-muted-foreground">{writer.followers} followers</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Middle Section - 50% */}
                <section className="w-full xl:w-[50%] xl:ml-[20%] border-r bg-muted p-4 sm:p-6 md:p-8 xl:p-10 overflow-y-auto">

                    {/* Tabs Container */}
                    <Tabs defaultValue="all" className="w-full relative">

                        {/* Tabs List */}
                        <TabsList className="fixed sm:bottom-5 bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%] h-10 justify-start mb-2 border rounded-lg bg-background shadow-lg z-50">

                            {/* Tabs Trigger */}
                            <TabsTrigger value="all" className="p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50 cursor-pointer">Subscribed</TabsTrigger>
                            <TabsTrigger value="paid" className="p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50 cursor-pointer">Paid</TabsTrigger>
                            <TabsTrigger value="media" className="p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50 cursor-pointer">Media</TabsTrigger>
                            <TabsTrigger value="saved" className="p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50 cursor-pointer">Saved</TabsTrigger>
                        </TabsList>

                        {/* All Tab */}
                        <TabsContent value="all">

                            {/* All Tab Container */}
                            <div className="space-y-6">

                                {/* All Tab 'What's On Your Mind?' Input Field */}
                                <motion.div
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowCreateModal(true)}
                                    className="bg-background rounded-lg p-4 shadow-sm mb-6 border cursor-pointer">
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
                                        <p className="text-gray-600">What's On Your Mind?</p>
                                    </div>
                                </motion.div>

                                {/* All Tab Mapping */}
                                {articles.map((article, index) => (
                                    <motion.article
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={index}
                                        className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex justify-between gap-4">

                                            {/* Left Content */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>

                                                    {/* Publisher Info */}
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-6 h-6 rounded-full bg-muted overflow-hidden">
                                                            <Image
                                                                src={article.publisher.icon}
                                                                alt={article.publisher.name}
                                                                width={24}
                                                                height={24}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-primary">{article.publisher.name}</span>
                                                    </div>

                                                    {/* Article Title & Subtitle */}
                                                    <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                                        {article.subtitle}
                                                    </p>
                                                </div>

                                                {/* Author & Read Time */}
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="truncate max-w-[7ch] sm:max-w-[20ch]">{article.author}</span>
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon className="h-4 w-4" />
                                                        <span>{article.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Content - Image & Category */}
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-xs text-muted-foreground">{article.date}</span>
                                                <div className="w-32 h-32 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        width={128}
                                                        height={128}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="truncate max-w-[10ch] sm:max-w-[20ch] text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Paid Tab */}
                        <TabsContent value="paid">

                            {/* Paid Tab 'What's On Your Mind?' Input Field */}
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowCreateModal(true)}
                                className="bg-background rounded-lg p-4 shadow-sm mb-6 cursor-pointer">
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
                                    <p className="text-gray-600">What's On Your Mind?</p>
                                </div>
                            </motion.div>

                            {/* Paid Tab Mapping */}
                            <div className="space-y-6">
                                {articles.slice(0, 2).map((article, index) => (
                                    <motion.article
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={index}
                                        className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex justify-between gap-4">
                                            {/* Left Content */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    {/* Publisher Info */}
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-6 h-6 rounded-full bg-muted overflow-hidden">
                                                            <Image
                                                                src={article.publisher.icon}
                                                                alt={article.publisher.name}
                                                                width={24}
                                                                height={24}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-primary">{article.publisher.name}</span>
                                                    </div>

                                                    {/* Article Title & Subtitle */}
                                                    <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                                        {article.subtitle}
                                                    </p>
                                                </div>

                                                {/* Author & Read Time */}
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="truncate max-w-[7ch] sm:max-w-[20ch]">{article.author}</span>
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon className="h-4 w-4" />
                                                        <span>{article.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Content - Image & Category */}
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-xs text-muted-foreground">{article.date}</span>
                                                <div className="w-32 h-32 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        width={128}
                                                        height={128}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="truncate max-w-[10ch] sm:max-w-[20ch] text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Media */}
                        <TabsContent value="media">

                            {/* Media Tab 'What's On Your Mind?' Input Field */}
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowCreateModal(true)}
                                className="bg-background rounded-lg p-4 shadow-sm mb-6 border cursor-pointer">
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
                                    <p className="text-gray-600">What's On Your Mind?</p>
                                </div>
                            </motion.div>

                            {/* Media Tab Mapping */}
                            <div className="space-y-6">
                                {articles.slice(2, 4).map((article, index) => (
                                    <motion.article
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={index}
                                        className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex justify-between gap-4">
                                            {/* Left Content */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    {/* Publisher Info */}
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-6 h-6 rounded-full bg-muted overflow-hidden">
                                                            <Image
                                                                src={article.publisher.icon}
                                                                alt={article.publisher.name}
                                                                width={24}
                                                                height={24}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-primary">{article.publisher.name}</span>
                                                    </div>

                                                    {/* Article Title & Subtitle */}
                                                    <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                                        {article.subtitle}
                                                    </p>
                                                </div>

                                                {/* Author & Read Time */}
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="truncate max-w-[7ch] sm:max-w-[20ch]">{article.author}</span>
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon className="h-4 w-4" />
                                                        <span>{article.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Content - Image & Category */}
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-xs text-muted-foreground">{article.date}</span>
                                                <div className="w-32 h-32 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        width={128}
                                                        height={128}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="truncate max-w-[10ch] sm:max-w-[20ch] text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Saved */}
                        <TabsContent value="saved">

                            {/* Saved Tab 'What's On Your Mind?' Input Field */}
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowCreateModal(true)}
                                className="bg-background rounded-lg p-4 shadow-sm mb-6 border cursor-pointer">
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
                                    <p className="text-gray-600">What's On Your Mind?</p>
                                </div>
                            </motion.div>

                            {/* Saved Tab Mapping */}
                            <div className="space-y-6">
                                {articles.slice(4).map((article, index) => (
                                    <motion.article
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={index}
                                        className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex justify-between gap-4">
                                            {/* Left Content */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    {/* Publisher Info */}
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-6 h-6 rounded-full bg-muted overflow-hidden">
                                                            <Image
                                                                src={article.publisher.icon}
                                                                alt={article.publisher.name}
                                                                width={24}
                                                                height={24}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-primary">{article.publisher.name}</span>
                                                    </div>

                                                    {/* Article Title & Subtitle */}
                                                    <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                                        {article.subtitle}
                                                    </p>
                                                </div>

                                                {/* Author & Read Time */}
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="truncate max-w-[7ch] sm:max-w-[20ch]">{article.author}</span>
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon className="h-4 w-4" />
                                                        <span>{article.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Content - Image & Category */}
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-xs text-muted-foreground">{article.date}</span>
                                                <div className="w-32 h-32 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        width={128}
                                                        height={128}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="truncate max-w-[10ch] sm:max-w-[20ch] text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>

                {/* Right Section - 30% */}
                <section className="hidden xl:block w-[28%] bg-muted p-4 fixed right-4 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* Favourite Publications Heading */}
                    <h2 className="text-lg font-semibold mb-4">Favourite Publications</h2>
                    <div className="space-y-3">

                        {/* Favourite Publications Mapping */}
                        {topPublications.map((publication, index) => (
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                key={index}
                                className="bg-background rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setSelectedPublication(publication)}
                            >

                                {/* Favourite Publications Container */}
                                <div className="flex flex-col h-full">

                                    {/* Favourite Publications Title & Author */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                                                <Image
                                                    src={publication.icon}
                                                    alt={publication.name}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <span className="text-primary font-semibold truncate max-w-[20ch]">{publication.name}</span>
                                                <div>
                                                    <span className="text-sm text-muted-foreground truncate max-w-[25ch]">{publication.author}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Favourite Publications Subscribe Button */}
                                        <Button variant="outline" size="sm" className="h-7 px-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center gap-1">
                                            Subscribe
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    {/* Favourite Publications Subscribers & Category */}
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-xs text-primary">{publication.Subscribers} Subscribers</span>
                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full truncate max-w-[25ch]">
                                            {publication.category || 'Technology'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>


            {/* Writer Details Sheet */}
            <WriterDetailsSheet 
                selectedWriter={selectedWriter}
                setSelectedWriter={setSelectedWriter}
                articles={articles}
            />

            {/* Publication Details Sheet */}
            <PublicationDetailsSheet 
                selectedPublication={selectedPublication}
                setSelectedPublication={setSelectedPublication}
                articles={articles}
            />

            {/* 'What's On Your Mind?' Input Field Pop-Up Modal */}
            <CreateContentDialog 
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
            />

            {/* Search Query Modal */}
            <SearchQueryDialog 
                searchQueryModal={searchQueryModal}
                setSearchQueryModal={setSearchQueryModal}
                searchCategories={searchCategories}
                activeSearchCategory={activeSearchCategory}
                setActiveSearchCategory={setActiveSearchCategory}
            />

            {/* Notifications Modal */}
            <NotificationsDialog 
                notificationsModal={notificationsModal}
                setNotificationsModal={setNotificationsModal}
                notificationCategories={notificationCategories}
                activeNotificationCategory={activeNotificationCategory}
                setActiveNotificationCategory={setActiveNotificationCategory}
            />

            {/* User Sidebar */}
            <UserSidebar 
                isOpen={isUserSidebarOpen} 
                onClose={() => setIsUserSidebarOpen(false)} 
            />

        </div>
    );
} 