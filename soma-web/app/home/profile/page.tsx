"use client"

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PersonStanding, User, UserCheck, Feather, Users, Dot, Bell, ChevronLeftIcon, Compass, Mail, Moon, Sun, MoreHorizontal, Plus, UserCircleIcon, Search, LayoutDashboard, PlusCircle, ChevronDown, Pencil } from "lucide-react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBrandThreads, IconBrandYoutube, IconBrandLinkedin, IconBrandTiktok, IconWorld, IconBook, IconBookmark, IconZodiacAries, IconZodiacTaurus, IconZodiacGemini, IconZodiacCancer, IconZodiacLeo, IconZodiacVirgo, IconZodiacLibra, IconZodiacScorpio, IconZodiacSagittarius, IconZodiacCapricorn, IconZodiacAquarius, IconZodiacPisces, IconCross, IconMoon, IconOm, IconStar, IconQuestionMark, IconHeart } from "@tabler/icons-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog2, DialogContent2, DialogHeader2, DialogTitle2 } from "@/components/HomePage/dialog2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import useWindowSize from "@/hooks/useWindow";
import { SearchQueryDialog } from "@/components/profile-page/searchQueryDialog";
import { NotificationsDialog } from "@/components/profile-page/notificationsDialog";
import ProfilePictureDialog from "@/components/profile-page/profilePictureDialog";
import { CreateContentDialog } from "@/components/profile-page/createContentDialog";
import { FullscreenImageModal } from "@/components/ui/fullscreen-image-modal";
import { Publication } from "@/redux/user-store/userPublicationsSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { PublicationButton, PublicationsButton } from "@/components/ui/publication-button";



// Categories
const categories = [
    "All",
    "Technology",
    "Business",
    "Science",
    "Health",
    "Arts",
    "Sports",
    "Politics",
    "Education",
    "Entertainment",
    "Environment",
    "Food",
    "Travel",
    "Fashion",
    "Finance",
    "Lifestyle",
    "World News",
    "Culture",
    "Innovation",
    "Career",
];

// Search Categories
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


export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [searchQueryModal, setSearchQueryModal] = useState(false);
    const [notificationsModal, setNotificationsModal] = useState(false);
    const [profilePictureModal, setProfilePictureModal] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fullscreenImageModal, setFullscreenImageModal] = useState(false);
    const [activeSearchCategory, setActiveSearchCategory] = useState("All");
    const [activeNotificationCategory, setActiveNotificationCategory] = useState("All");
    const [activeTab, setActiveTab] = useState("activity");
    const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isProductsExpanded, setIsProductsExpanded] = useState(false);

    // router
    const router = useRouter();

    // Get user data from Redux
    const { isAuthenticated } = useAuth();
    const currentUser = useAppSelector((state) => state.user);
    const userPublications = useAppSelector((state) => state.userPublications);
    const dispatch = useAppDispatch();

    // scrollContainerRef useRef()
    const categoriesScrollRef = useRef<HTMLDivElement>(null);
    const searchCategoriesScrollRef = useRef<HTMLDivElement>(null);
    const notificationCategoriesScrollRef = useRef<HTMLDivElement>(null);

    // setTheme useTheme()
    const { setTheme } = useTheme();

    // useWindowSize
    const { width } = useWindowSize();

    // setMounted useEffect()
    useEffect(() => {
        setMounted(true);
    }, []);


    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col min-h-screen bg-muted font-playfair-display">

                {/* Header */}
                <header className="border-b bg-white fixed top-0 left-0 right-0 z-50 bg-background">
                    <div className="flex items-center justify-between px-6 py-4 bg-background">

                        <div className="flex items-center gap-4">
                            {/* Left - Back Button */}
                            <ChevronLeftIcon className="h-6 w-6 text-primary cursor-pointer" onClick={() => router.back()} />

                            {/* Left - SOMA (Company Logo) */}
                            {typeof window !== 'undefined' && window.innerWidth >= 768 ?
                                <div className="text-3xl font-semibold text-secondary">Profile</div>
                                :
                                ""
                            }
                        </div>

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

                {/* Main Content */}
                <main className="flex-1 flex bg-muted mt-[4.5rem] mb-[1rem]">
                    {!isAuthenticated ? (
                        <div className="w-full flex flex-col items-center justify-center p-8 text-center">
                            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                            <p className="text-gray-600 mb-6">Please log in to view your profile page.</p>
                            <Link href="/authentication">
                                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                    Login To Continue
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Left Section - 20% */}
                            <section className=" hidden xl:block w-[18%] bg-muted p-4 fixed h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">


                            </section>


                            {/* Middle Section - 50% */}
                            <section className="rounded-lg m-2 w-full xl:w-[50%] xl:ml-[20%] bg-background p-2 sm:p-6 md:p-8 xl:p-10 overflow-y-auto">

                                {/* Profile Header */}
                                <div className="flex justify-between items-start rounded-t-lg">
                                    <div className="flex flex-col w-full h-full rounded-t-lg">
                                        <div className="w-full rounded-t-lg">
                                            {/* Banner Image */}
                                            <div className="relative w-full h-30 sm:h-46 rounded-t-lg">
                                                <div className="w-full h-full overflow-hidden rounded-t-lg ">
                                                    {currentUser.bannerPicture ? (
                                                        <Image
                                                            src={currentUser.bannerPicture}
                                                            alt={`${currentUser.fullName}'s banner`}
                                                            fill
                                                            className="object-cover rounded-t-lg"
                                                            sizes="100vw"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-accent border border-secondary/20 flex items-center justify-center">
                                                            <Image src="/somasvg.svg" alt="Soma" width={84} height={84} />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Profile Avatar overlapping bottom-right of banner */}
                                                <div className="absolute -bottom-10 right-4">
                                                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-background shadow-md cursor-pointer hover:opacity-95 transition-opacity bg-background">
                                                        {currentUser.profilePicture === null ? (
                                                            <div className="flex text-blue-500 items-center justify-center text-5xl font-bold h-full">
                                                                {currentUser.username.charAt(0).toUpperCase()}
                                                            </div>
                                                        ) : (
                                                            <Image
                                                                src={currentUser.profilePicture}
                                                                alt={`${currentUser.fullName}'s Profile picture`}
                                                                fill
                                                                className="object-cover bg-background"
                                                                onClick={() => setFullscreenImageModal(true)}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Name + Username under banner */}
                                            <div className="flex flex-col mt-4">
                                                <h1 className={`text-xl font-bold truncate-4 `}>
                                                    {width < 376 ? currentUser.fullName?.slice(0, 20) : currentUser.fullName}
                                                </h1>
                                                <p className={`text-gray-500 text-md truncate `}>@{width < 376 ? currentUser.username?.slice(0, 20) : currentUser.username}</p>
                                            </div>
                                        </div>

                                        {/* Bio, Education, Work History Section */}
                                        <div className="flex w-full h-full pr-2 py-2">
                                            <p className="text-gray-500 text-sm">{`${currentUser.bio ?? ' '} ${currentUser.education ?? ' '} ${currentUser.workHistory ?? ' '}`}</p>
                                        </div>

                                        {/* Personal Website Section */}
                                        <div className="flex w-full h-full pr-2 py-1 ">
                                            {currentUser.userWebsite && (

                                                <div className="text-gray-500 text-sm flex flex-row items-center justify-center">
                                                    <IconWorld className="h-4 w-4 mr-2" />
                                                    <a
                                                        href={currentUser.userWebsite}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 underline mb-1"
                                                    >
                                                        {currentUser.userWebsite.substring(8)}
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        {/* The 'Relationship Status', 'Starsign', 'Personality Type', 'Religion' Section */}
                                        <div className="flex flex-row align-center justify-start w-full h-full pr-2 py-2">

                                            {currentUser.relationshipStatus && currentUser.relationshipStatus !== 'None' && (
                                                <div className="flex items-center gap-1">
                                                    {currentUser.relationshipStatus === "Single" && <User className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.relationshipStatus === "Relationship" && <UserCheck className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.relationshipStatus === "Married" && <Users className="h-4 w-4 text-gray-500" />}
                                                    <p className="text-gray-500 text-sm">{currentUser.relationshipStatus}</p>
                                                    <Dot className="h-4 w-4 text-gray-500" />
                                                </div>
                                            )}

                                            {currentUser.starSign && currentUser.starSign !== 'None' && (
                                                <div className="flex items-center gap-1">
                                                    {currentUser.starSign === "Aries" && <IconZodiacAries className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Taurus" && <IconZodiacTaurus className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Gemini" && <IconZodiacGemini className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Cancer" && <IconZodiacCancer className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Leo" && <IconZodiacLeo className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Virgo" && <IconZodiacVirgo className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Libra" && <IconZodiacLibra className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Scorpio" && <IconZodiacScorpio className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Sagittarius" && <IconZodiacSagittarius className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Capricorn" && <IconZodiacCapricorn className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Aquarius" && <IconZodiacAquarius className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.starSign === "Pisces" && <IconZodiacPisces className="h-4 w-4 text-gray-500" />}
                                                    <p className="text-gray-500 text-sm">{currentUser.starSign}</p>
                                                    <Dot className="h-4 w-4 text-gray-500" />
                                                </div>
                                            )}

                                            {currentUser.personalityType && currentUser.personalityType !== 'None' && (
                                                <div className="flex items-center gap-1">
                                                    <PersonStanding className="h-4 w-4 text-gray-500" />
                                                    <p className="text-gray-500 text-sm">{`${currentUser.personalityType}`}</p>
                                                    <Dot className="h-4 w-4 text-gray-500" />
                                                </div>
                                            )}


                                            {currentUser.religion && currentUser.religion !== 'None' && (
                                                <div className="flex items-center gap-1">
                                                    {currentUser.religion === "Christian" && <IconCross className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.religion === "Muslim" && <IconMoon className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.religion === "Hindu" && <IconOm className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.religion === "Buddhist" && <IconStar className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.religion === "Jew" && <IconStar className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.religion === "Atheist" && <IconQuestionMark className="h-4 w-4 text-gray-500" />}
                                                    {currentUser.religion === "Other" && <IconHeart className="h-4 w-4 text-gray-500" />}
                                                    <p className="text-gray-500 text-sm">{currentUser.religion}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Social Media Links */}
                                        <div className="flex flex-row align-center justify-start w-full h-full pr-2 mb-3 gap-2">
                                            {currentUser.userFacebook && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-blue-50 cursor-pointer"
                                                    onClick={() => currentUser.userFacebook && window.open(currentUser.userFacebook, '_blank')}
                                                >
                                                    <IconBrandFacebook className="h-4 w-4 text-black" />
                                                </Button>
                                            )}
                                            {currentUser.userInstagram && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-pink-50 cursor-pointer"
                                                    onClick={() => currentUser.userInstagram && window.open(`https://instagram.com/${currentUser.userInstagram}`, '_blank')}
                                                >
                                                    <IconBrandInstagram className="h-4 w-4 text-black" />
                                                </Button>
                                            )}
                                            {currentUser.userXTwitter && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-black/5 cursor-pointer"
                                                    onClick={() => currentUser.userXTwitter && window.open(`https://x.com/${currentUser.userXTwitter}`, '_blank')}
                                                >
                                                    <IconBrandX className="h-4 w-4 text-black" />
                                                </Button>
                                            )}
                                            {currentUser.userThreads && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-black/5 cursor-pointer"
                                                    onClick={() => currentUser.userThreads && window.open(`https://threads.net/@${currentUser.userThreads}`, '_blank')}
                                                >
                                                    <IconBrandThreads className="h-4 w-4 text-black" />
                                                </Button>
                                            )}
                                            {currentUser.userYouTube && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-red-50 cursor-pointer"
                                                    onClick={() => currentUser.userYouTube && window.open(currentUser.userYouTube, '_blank')}
                                                >
                                                    <IconBrandYoutube className="h-4 w-4 text-black" />
                                                </Button>
                                            )}
                                            {currentUser.userLinkedIn && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-blue-50 cursor-pointer"
                                                    onClick={() => currentUser.userLinkedIn && window.open(currentUser.userLinkedIn, '_blank')}
                                                >
                                                    <IconBrandLinkedin className="h-4 w-4 text-black" />
                                                </Button>
                                            )}
                                            {currentUser.userTikTok && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-black/5 cursor-pointer "
                                                    onClick={() => currentUser.userTikTok && window.open(`https://tiktok.com/@${currentUser.userTikTok}`, '_blank')}
                                                >
                                                    <IconBrandTiktok className="h-4 w-4 text-black" />
                                                </Button>
                                            )}
                                        </div>

                                        {/* Publications Section */}
                                        <div className="flex flex-col mb-2 h-full w-full">
                                            <div className="flex flex-row items-center justify-start h-full pr-2 mb-1 gap-2">
                                                <h5 className="text-primary text-lg font-bold">Publications</h5>
                                            </div>
                                            <div className="flex-1 flex-row items-center justify-start w-full h-full pr-2 gap-2">
                                                {userPublications.loading ? (
                                                    <div className="text-gray-500 text-center py-2">Loading publications...</div>
                                                ) : userPublications.error ? (
                                                    <div className="text-red-500 text-center py-2">Error loading publications</div>
                                                ) : userPublications.publications.length === 0 ? (
                                                    <div className="text-gray-500 text-center py-2"></div>
                                                ) : (
                                                    <div className="flex flex-row gap-2 w-full">

                                                        {width < 500 ? (
                                                            userPublications.publications.slice(0, 2).map((publication) => (
                                                                <div key={publication.id}>
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() => router.push(`/my-publication`)}
                                                                        className="cursor-pointer bg-accent hover:bg-accent/80 border-secondary/20 rounded-3xl p-2 flex flex-row items-center py-2 px-2 max-w-50 min-w-0"
                                                                    >
                                                                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-accent flex-shrink-0 ">
                                                                            {publication.publication_picture ? (
                                                                                <Image
                                                                                    src={publication.publication_picture}
                                                                                    alt={publication.publication_name || publication.publication_username}
                                                                                    fill
                                                                                    className="object-cover"
                                                                                />
                                                                            ) : (
                                                                                <div className="flex items-center border border-secondary/20 rounded-full justify-center w-full h-full text-blue-500 font-bold">
                                                                                    {(publication.publication_name || publication.publication_username)?.charAt(0).toUpperCase()}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <span className="font-medium text-secondary truncate pr-2 min-w-0 flex-1">
                                                                            {publication.publication_name || publication.publication_username}
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            userPublications.publications.slice(0, 3).map((publication) => (
                                                                <div key={publication.id}>
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() => router.push(`/my-publication`)}
                                                                        className="cursor-pointer max-w-50 min-w-0 bg-accent hover:bg-accent/80 border-secondary/20 rounded-3xl p-2 flex flex-row items-center py-2 px-2"
                                                                    >
                                                                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-accent flex-shrink-0 ">
                                                                            {publication.publication_picture ? (
                                                                                <Image
                                                                                    src={publication.publication_picture}
                                                                                    alt={publication.publication_name || publication.publication_username}
                                                                                    fill
                                                                                    className="object-cover"
                                                                                />
                                                                            ) : (
                                                                                <div className="flex items-center border border-secondary/20 rounded-full justify-center w-full h-full text-blue-500 font-bold">
                                                                                    {(publication.publication_name || publication.publication_username)?.charAt(0).toUpperCase()}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <span className="font-medium text-secondary truncate pr-2 min-w-0 flex-1">
                                                                            {publication.publication_name || publication.publication_username}
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        )}

                                                        {width < 500 && userPublications.publications.length > 2 && (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="outline" size="icon" className="cursor-pointer text-secondary bg-accent hover:bg-accent/80 border-secondary/20 rounded-3xl py-2 px-3">
                                                                        +{userPublications.publications.length - 2}
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="bg-accent text-popover-foreground">
                                                                    {userPublications.publications.slice(2).map((publication) => (
                                                                        <DropdownMenuItem className="text-secondary">
                                                                            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-accent flex-shrink-0 ">
                                                                                {publication.publication_picture ? (
                                                                                    <Image
                                                                                        src={publication.publication_picture}
                                                                                        alt={publication.publication_name || publication.publication_username}
                                                                                        fill
                                                                                        className="object-cover"
                                                                                    />
                                                                                ) : (
                                                                                    <div className="flex items-center border border-secondary/20 rounded-full justify-center w-full h-full text-blue-500 font-bold">
                                                                                        {(publication.publication_name || publication.publication_username)?.charAt(0).toUpperCase()}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            {publication.publication_name || publication.publication_username}
                                                                        </DropdownMenuItem>
                                                                    ))}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}

                                                        {width > 500 && userPublications.publications.length > 3 && (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="outline" size="icon" className="cursor-pointer text-secondary bg-accent hover:bg-accent/80 border-secondary/20 rounded-3xl py-2 px-3">
                                                                        +{userPublications.publications.length - 3}
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="bg-accent text-popover-foreground">
                                                                    {userPublications.publications.slice(3).map((publication) => (
                                                                        <DropdownMenuItem className="text-secondary">
                                                                            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-accent flex-shrink-0 ">
                                                                                {publication.publication_picture ? (
                                                                                    <Image
                                                                                        src={publication.publication_picture}
                                                                                        alt={publication.publication_name || publication.publication_username}
                                                                                        fill
                                                                                        className="object-cover"
                                                                                    />
                                                                                ) : (
                                                                                    <div className="flex font-fairplay-display items-center border border-secondary/20 rounded-full justify-center w-full h-full text-blue-500 font-bold">
                                                                                        {(publication.publication_name || publication.publication_username)?.charAt(0).toUpperCase()}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            {publication.publication_name || publication.publication_username}
                                                                        </DropdownMenuItem>
                                                                    ))}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>


                                        {/* ---------------------------- Books Section ---------------------------- */}
                                        <div
                                            className="flex flex-row items-center w-[24%] justify-start h-full pr-2 mb-1 gap-2 cursor-pointer p-1 rounded-lg transition-colors"
                                            onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                                        >
                                            <h5 className="text-primary text-lg font-bold">Books</h5>
                                            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProductsExpanded ? 'rotate-180' : ''}`} />
                                        </div>

                                        {isProductsExpanded && (
                                            <div className="flex flex-col items-start justify-start border border-gray-200 rounded-xl p-4 w-full mb-1 gap-4">
                                                {currentUser.userBookName ? (
                                                    <div className="flex flex-col items-start justify-start w-full gap-4">

                                                        {/* Book Card */}
                                                        <div className="flex items-start gap-4 w-full h-full">
                                                            {/* Book Cover Image */}
                                                            <div className="flex-shrink-0 ">
                                                                {currentUser.userBookImage ? (
                                                                    <div className="relative w-30 h-44 rounded-lg overflow-hidden shadow-md">
                                                                        <Image
                                                                            src={currentUser.userBookImage}
                                                                            alt={currentUser.userBookName}
                                                                            fill
                                                                            className="object-cover"
                                                                            sizes="96px"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-24 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-md">
                                                                        <IconBook className="h-8 w-8 text-gray-400" />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Book Details */}
                                                            <div className="flex flex-col items-start justify-between h-full gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <h6 className="text-primary font-semibold text-lg">{currentUser.userBookName}</h6>
                                                                </div>

                                                                {currentUser.userBookDescription ? (
                                                                    <p className="text-gray-700 text-sm">
                                                                        {currentUser.userBookDescription}
                                                                    </p>
                                                                ) : (
                                                                    <p className="text-gray-600 text-sm">
                                                                        {currentUser.fullName}'s published work
                                                                    </p>
                                                                )}

                                                                {currentUser.userBookWebsite && (
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        asChild
                                                                        className="mt-2"
                                                                    >
                                                                        <a
                                                                            href={currentUser.userBookWebsite}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-2 hover:bg-muted"
                                                                        >
                                                                            View Book
                                                                        </a>
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center w-full py-8 text-gray-500">
                                                        <div className="w-24 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                                                            <IconBook className="h-8 w-8 text-gray-400" />
                                                        </div>
                                                        <p className="text-sm text-center">No books published yet</p>
                                                        <p className="text-xs text-gray-400 text-center mt-1">Start sharing your published works</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mb-6">
                                    <Button
                                        onClick={() => setShowCreateModal(true)}
                                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full cursor-pointer">
                                        <Feather className="w-4 h-4" />
                                        New Post
                                    </Button>
                                    <Link href="/home/profile/edit-profile">
                                        <Button variant="outline" className="cursor-pointer bg-background hover:bg-muted rounded-full">
                                            <Pencil className="w-4 h-4" />
                                            Edit Profile
                                        </Button>
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="cursor-pointer hover:bg-muted">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Share Profile</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Tabs Section */}
                                <Tabs defaultValue="activity" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4 bg-muted">
                                        <TabsTrigger value="activity" className="data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50">Activity</TabsTrigger>
                                        <TabsTrigger value="posts" className="data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50">Articles</TabsTrigger>
                                        <TabsTrigger value="likes" className="data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50">Magazines</TabsTrigger>
                                        <TabsTrigger value="reads" className="data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50">Podcasts</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="activity" className="mt-4">
                                        <div className="space-y-4">
                                            <p>Recent activity will be displayed here</p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="posts" className="mt-4">
                                        <div className="space-y-4">
                                            <p>User posts will be displayed here</p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="likes" className="mt-4">
                                        <div className="space-y-4">
                                            <p>Liked content will be displayed here</p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="reads" className="mt-4">
                                        <div className="space-y-4">
                                            <p>Read articles will be displayed here</p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </section>


                            {/* Right Section - 30% */}
                            <section className="hidden xl:block w-[26%] bg-muted p-4 fixed right-4 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">


                            </section>
                        </>
                    )}
                </main>
            </div>


            {/* Search Query Modal */}
            <SearchQueryDialog
                searchQueryModal={searchQueryModal}
                setSearchQueryModal={setSearchQueryModal}
                activeSearchCategory={activeSearchCategory}
                setActiveSearchCategory={setActiveSearchCategory}
                searchCategories={searchCategories}
            />

            {/* Notifications Modal */}
            <NotificationsDialog
                notificationsModal={notificationsModal}
                setNotificationsModal={setNotificationsModal}
                activeNotificationCategory={activeNotificationCategory}
                setActiveNotificationCategory={setActiveNotificationCategory}
                notificationCategories={notificationCategories}
            />

            {/* Create Content Modal */}
            <CreateContentDialog
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
            />

            {/* Profile Picture Modal */}
            {/* <ProfilePictureDialog
                open={profilePictureModal}
                onOpenChange={setProfilePictureModal}
                setImagePreview={setImagePreview}
            /> */}

            {/* Fullscreen Image Modal */}
            {currentUser.profilePicture && (
                <FullscreenImageModal
                    isOpen={fullscreenImageModal}
                    onClose={() => setFullscreenImageModal(false)}
                    imageSrc={currentUser.profilePicture}
                    imageAlt={`${currentUser.fullName}'s Profile picture`}
                />
            )}
        </div>
    )
}