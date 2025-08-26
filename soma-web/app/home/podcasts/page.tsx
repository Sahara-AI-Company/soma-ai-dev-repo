'use client';

import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Settings, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Mail } from 'lucide-react';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Compass, UserCircleIcon, Search, LayoutDashboard } from 'lucide-react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Dialog7, DialogContent7, DialogHeader7, DialogTitle7, DialogDescription7 } from '@/components/PodcastsPage/dialog7';
import { NotificationsDialog } from "@/components/PodcastsPage/notificationsDialog";
import { SearchQueryDialog } from "@/components/PodcastsPage/searchQueryDialog";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import useWindowSize from '@/hooks/useWindow';
import { UserSidebar } from '@/components/HomePage/userSidebar';
import PublicationDetailsSheet from '@/components/PodcastsPage/PublicationDetailsSheet';
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

const podcasts = [
    {
        title: "Tech Talk Today",
        author: "Sarah Johnson",
        season: 1,
        cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "The Future of AI",
                date: "March 15, 2024",
                hours: "1:30",
                description: "In this episode, we explore the latest developments in artificial intelligence and what it means for the future of technology.",
                preview: "Join us as we discuss groundbreaking AI innovations...",
                cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
                video: "https://example.com/videos/tech-talk-ai.mp4"
            },
        ]
    },
    {
        title: "Business Insights",
        author: "Michael Chen",
        season: 2,
        cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "Startup Success Stories",
                date: "March 10, 2024",
                hours: "1:45",
                description: "Learn from successful entrepreneurs about their journey and the lessons they've learned.",
                preview: "Hear inspiring stories from founders who turned their ideas into thriving businesses...",
                cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
                video: "https://example.com/videos/business-startups.mp4"
            },
        ]
    },
    {
        title: "Science Weekly",
        author: "Dr. Emily Rodriguez",
        season: 1,
        cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "Climate Change Solutions",
                date: "March 12, 2024",
                hours: "1:50",
                description: "Exploring innovative solutions to combat climate change and their potential impact.",
                preview: "Join leading scientists as they discuss groundbreaking climate solutions...",
                cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
                video: "https://example.com/videos/science-climate.mp4"
            },
        ]
    },
    {
        title: "Health & Wellness",
        author: "Dr. James Wilson",
        season: 1,
        cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "Mental Health in the Digital Age",
                date: "March 14, 2024",
                hours: "1:25",
                description: "Exploring the impact of technology on mental health and strategies for digital wellness.",
                preview: "Learn how to maintain mental health in our increasingly digital world...",
                cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
                video: "https://example.com/videos/health-mental.mp4"
            },
        ]
    },
    {
        title: "Creative Minds",
        author: "Lisa Martinez",
        season: 1,
        cover: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "The Art of Storytelling",
                date: "March 16, 2024",
                hours: "1:30",
                description: "Master storytellers share their techniques and insights into crafting compelling narratives.",
                preview: "Learn the secrets of effective storytelling from industry experts...",
                cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop",
                video: "https://example.com/videos/creative-storytelling.mp4"
            },
        ]
    },
    {
        title: "Sports Analysis",
        author: "David Thompson",
        season: 1,
        cover: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "The Science of Peak Performance",
                date: "March 13, 2024",
                hours: "1:45",
                description: "Experts discuss the latest research in sports science and athletic performance.",
                preview: "Learn about cutting-edge techniques for achieving peak athletic performance...",
                cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
                video: "https://example.com/videos/sports-performance.mp4"
            },
        ]
    },
    {
        title: "Finance Forward",
        author: "Marcus Brown",
        season: 1,
        cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "Cryptocurrency Explained",
                date: "March 18, 2024",
                hours: "1:35",
                description: "A comprehensive guide to understanding cryptocurrencies and blockchain technology.",
                preview: "Demystify the world of digital currencies and blockchain...",
                cover: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop",
                video: "https://example.com/videos/finance-crypto.mp4"
            },
        ]
    },
    {
        title: "Education Evolution",
        author: "Alex Rivera",
        season: 1,
        cover: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "The Future of Learning",
                date: "March 11, 2024",
                hours: "1:20",
                description: "Exploring innovative approaches to education and learning in the digital age.",
                preview: "Discover how technology is transforming the way we learn...",
                cover: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop",
                video: "https://example.com/videos/education-future.mp4"
            },
        ]
    },
    {
        title: "Environmental Impact",
        author: "Sophie Anderson",
        season: 1,
        cover: "https://images.unsplash.com/photo-1515405295579-ba7e45403062?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "Sustainable Living",
                date: "March 16, 2024",
                hours: "1:25",
                description: "Practical tips and strategies for living a more sustainable lifestyle.",
                preview: "Learn how to reduce your environmental footprint...",
                cover: "https://images.unsplash.com/photo-1515405295579-ba7e45403062?w=400&h=400&fit=crop",
                video: "https://example.com/videos/environment-sustainable.mp4"
            },
        ]
    },
    {
        title: "Cultural Conversations",
        author: "Rachel Kim",
        season: 1,
        cover: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&h=400&fit=crop",
        episodes: [
            {
                episode: 1,
                title: "Global Traditions",
                date: "March 17, 2024",
                hours: "1:30",
                description: "Exploring unique cultural traditions from around the world.",
                preview: "Take a journey through diverse cultural practices...",
                cover: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&h=400&fit=crop",
                video: "https://example.com/videos/culture-traditions.mp4"
            },
        ]
    }
];





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



export default function PodcastsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const categoriesScrollRef = useRef<HTMLDivElement>(null);
    const articlesScrollRefAll1 = useRef<HTMLDivElement>(null);
    const articlesScrollRefAll2 = useRef<HTMLDivElement>(null);
    const articlesScrollRefSubscribe1 = useRef<HTMLDivElement>(null);
    const articlesScrollRefSubscribe2 = useRef<HTMLDivElement>(null);
    const articlesScrollRefMedia1 = useRef<HTMLDivElement>(null);
    const articlesScrollRefMedia2 = useRef<HTMLDivElement>(null);
    const articlesScrollRefSaved1 = useRef<HTMLDivElement>(null);
    const articlesScrollRefSaved2 = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("all");
    const [mounted, setMounted] = useState(false);
    const { setTheme } = useTheme();
    const [selectedWriter, setSelectedWriter] = useState<typeof topWriters[0] | null>(null);
    const [selectedPublication, setSelectedPublication] = useState<typeof topPublications[0] | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    // Search Query useState()
    const [searchQueryModal, setSearchQueryModal] = useState(false);
    const [activeSearchCategory, setActiveSearchCategory] = useState("All");

    // Notifications useState()
    const [notificationsModal, setNotificationsModal] = useState(false);
    const [activeNotificationCategory, setActiveNotificationCategory] = useState("All");

    // isUserSidebarOpen useState()
    const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

    // Router
    const router = useRouter();

    // Get user data from Redux
    const { isAuthenticated } = useAuth();

    // useWindowSize
    const { width } = useWindowSize();

    const searchCategoriesScrollRef = useRef<HTMLDivElement>(null);
    const notificationCategoriesScrollRef = useRef<HTMLDivElement>(null);

    const currentUser = useAppSelector((state) => state.user);

    const currentUserCategories = ['All', ...currentUser.userInterests];


    useEffect(() => {
        setMounted(true);
    }, []);

    // scroll function
    const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement | null> = scrollContainerRef) => {
        if (ref.current) {
            const scrollAmount = 200;
            const newScrollLeft = ref.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            ref.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
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
        e.preventDefault();
        setIsScrolling(true);
        if (ref.current) {
            ref.current.style.cursor = 'grabbing';
        }
    };

    const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current && isScrolling) {
            const movement = e.movementX * 2;
            ref.current.scrollLeft -= movement;
        }
    };

    const handleMouseUp = () => {
        setIsScrolling(false);
        if (articlesScrollRefAll1.current) {
            articlesScrollRefAll1.current.style.cursor = 'grab';
        }
    };

    const handleMouseLeave = () => {
        setIsScrolling(false);
        if (articlesScrollRefAll1.current) {
            articlesScrollRefAll1.current.style.cursor = 'grab';
        }
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
                                
                                {/* 'Create a New Podcast' Container */}
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
                                            Create a New Podcast
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Featured Heading */}
                                <h2 className="text-3xl font-bold text-primary">Featured</h2>

                                {/* Episodes Section */}
                                <div className="relative">
                                    {/* Episodes Container */}
                                    <div
                                        ref={articlesScrollRefAll1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefAll1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefAll1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {podcasts.flatMap(podcast =>
                                            podcast.episodes.map((episode, index) => (
                                                <div key={`${podcast.title}-${index}`} className={`group cursor-pointer flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] xl:w-[320px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                    <div className="flex flex-col space-y-3 p-3 rounded-lg bg-background hover:bg-background/80 transition-colors">
                                                        {/* First Row: Podcast Info */}
                                                        <div className="flex items-center space-x-3">
                                                            <div className="relative w-12 h-12 flex-shrink-0">
                                                                <Image
                                                                    src={podcast.cover}
                                                                    alt={podcast.title}
                                                                    fill
                                                                    className="rounded-lg object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-sm text-primary">{episode.title}</h3>
                                                                <p className="text-xs text-muted-foreground">{podcast.title}</p>
                                                            </div>
                                                        </div>

                                                        {/* Second Row: Episode Cover */}
                                                        <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center mx-auto">
                                                            <Image
                                                                src={episode.cover}
                                                                alt={episode.title}
                                                                fill
                                                                className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        </div>

                                                        {/* Third Row: Episode Details */}
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                                <span>{episode.date}</span>
                                                                <span>{episode.hours}</span>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                                {episode.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - 28% */}
                            <section className="hidden xl:block w-[28%] p-5 bg-muted fixed right-0 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                                            {/* Publication Container */}
                                            <div className="flex flex-col h-full">
                                                {/* Publication Image */}
                                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={publication.icon}
                                                        alt={publication.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Publication Title & Category */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-primary font-semibold line-clamp-2">{publication.name}</h3>
                                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full mt-2 inline-block">
                                                            {publication.category}
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

                                {/* 'Create a New Podcast' Container */}
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
                                            Create a New Podcast
                                        </p>
                                    </div>
                                </motion.div>


                                {/* Featured Heading */}
                                <h2 className="text-3xl font-bold text-primary">Featured</h2>

                                {/* Episodes Section */}
                                <div className="relative">
                                    {/* Episodes Container */}
                                    <div
                                        ref={articlesScrollRefSubscribe1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefSubscribe1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefSubscribe1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {podcasts.flatMap(podcast =>
                                            podcast.episodes.map((episode, index) => (
                                                <div key={`${podcast.title}-${index}`} className={`group cursor-pointer flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] xl:w-[320px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                    <div className="flex flex-col space-y-3 p-3 rounded-lg bg-background hover:bg-background/80 transition-colors">
                                                        {/* First Row: Podcast Info */}
                                                        <div className="flex items-center space-x-3">
                                                            <div className="relative w-12 h-12 flex-shrink-0">
                                                                <Image
                                                                    src={podcast.cover}
                                                                    alt={podcast.title}
                                                                    fill
                                                                    className="rounded-lg object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-sm text-primary">{episode.title}</h3>
                                                                <p className="text-xs text-muted-foreground">{podcast.title}</p>
                                                            </div>
                                                        </div>

                                                        {/* Second Row: Episode Cover */}
                                                        <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center mx-auto">
                                                            <Image
                                                                src={episode.cover}
                                                                alt={episode.title}
                                                                fill
                                                                className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        </div>

                                                        {/* Third Row: Episode Details */}
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                                <span>{episode.date}</span>
                                                                <span>{episode.hours}</span>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                                {episode.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - 28% */}
                            <section className="hidden xl:block w-[28%] p-5 bg-muted fixed right-0 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                                            {/* Publication Container */}
                                            <div className="flex flex-col h-full">
                                                {/* Publication Image */}
                                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={publication.icon}
                                                        alt={publication.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Publication Title & Category */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-primary font-semibold line-clamp-2">{publication.name}</h3>
                                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full mt-2 inline-block">
                                                            {publication.category}
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

                                {/* 'Create a New Podcast' Container */}
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
                                            Create a New Podcast
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Featured Heading */}
                                <h2 className="text-3xl font-bold text-primary">Featured</h2>

                                {/* Episodes Section */}
                                <div className="relative">
                                    {/* Episodes Container */}
                                    <div
                                        ref={articlesScrollRefMedia1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefMedia1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefMedia1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {podcasts.flatMap(podcast =>
                                            podcast.episodes.map((episode, index) => (
                                                <div key={`${podcast.title}-${index}`} className={`group cursor-pointer flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] xl:w-[320px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                    <div className="flex flex-col space-y-3 p-3 rounded-lg bg-background hover:bg-background/80 transition-colors">
                                                        {/* First Row: Podcast Info */}
                                                        <div className="flex items-center space-x-3">
                                                            <div className="relative w-12 h-12 flex-shrink-0">
                                                                <Image
                                                                    src={podcast.cover}
                                                                    alt={podcast.title}
                                                                    fill
                                                                    className="rounded-lg object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-sm text-primary">{episode.title}</h3>
                                                                <p className="text-xs text-muted-foreground">{podcast.title}</p>
                                                            </div>
                                                        </div>

                                                        {/* Second Row: Episode Cover */}
                                                        <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center mx-auto">
                                                            <Image
                                                                src={episode.cover}
                                                                alt={episode.title}
                                                                fill
                                                                className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        </div>

                                                        {/* Third Row: Episode Details */}
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                                <span>{episode.date}</span>
                                                                <span>{episode.hours}</span>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                                {episode.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - 28% */}
                            <section className="hidden xl:block w-[28%] p-5 bg-muted fixed right-0 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                                            {/* Publication Container */}
                                            <div className="flex flex-col h-full">
                                                {/* Publication Image */}
                                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={publication.icon}
                                                        alt={publication.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Publication Title & Category */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-primary font-semibold line-clamp-2">{publication.name}</h3>
                                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full mt-2 inline-block">
                                                            {publication.category}
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

                                {/* 'Create a New Podcast' Container */}
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
                                            Create a New Podcast
                                        </p>
                                    </div>
                                </motion.div>


                                {/* Featured Heading */}
                                <h2 className="text-3xl font-bold text-primary">Featured</h2>

                                {/* Episodes Section */}
                                <div className="relative">
                                    {/* Episodes Container */}
                                    <div
                                        ref={articlesScrollRefSaved1}
                                        className="flex space-x-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => handleMouseDown(e, articlesScrollRefSaved1)}
                                        onMouseMove={(e) => handleMouseMove(e, articlesScrollRefSaved1)}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {podcasts.flatMap(podcast =>
                                            podcast.episodes.map((episode, index) => (
                                                <div key={`${podcast.title}-${index}`} className={`group cursor-pointer flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] xl:w-[320px] ${isScrolling ? 'pointer-events-none' : ''}`}>
                                                    <div className="flex flex-col space-y-3 p-3 rounded-lg bg-background hover:bg-background/80 transition-colors">
                                                        {/* First Row: Podcast Info */}
                                                        <div className="flex items-center space-x-3">
                                                            <div className="relative w-12 h-12 flex-shrink-0">
                                                                <Image
                                                                    src={podcast.cover}
                                                                    alt={podcast.title}
                                                                    fill
                                                                    className="rounded-lg object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-sm text-primary">{episode.title}</h3>
                                                                <p className="text-xs text-muted-foreground">{podcast.title}</p>
                                                            </div>
                                                        </div>

                                                        {/* Second Row: Episode Cover */}
                                                        <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center mx-auto">
                                                            <Image
                                                                src={episode.cover}
                                                                alt={episode.title}
                                                                fill
                                                                className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        </div>

                                                        {/* Third Row: Episode Details */}
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                                <span>{episode.date}</span>
                                                                <span>{episode.hours}</span>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                                {episode.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - 28% */}
                            <section className="hidden xl:block w-[28%] p-5 bg-muted fixed right-0 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                                            {/* Publication Container */}
                                            <div className="flex flex-col h-full">
                                                {/* Publication Image */}
                                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={publication.icon}
                                                        alt={publication.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Publication Title & Category */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-primary font-semibold line-clamp-2">{publication.name}</h3>
                                                        <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-muted hover:bg-muted/90 px-2 py-1 rounded-full mt-2 inline-block">
                                                            {publication.category}
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
    )
}