"use client"

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PersonStanding, User, UserCheck, Feather, Users, Dot, Bell, ChevronLeftIcon, Compass, Mail, Moon, Sun, MoreHorizontal, Plus, UserCircleIcon, Search, LayoutDashboard, PlusCircle, ChevronDown, Pencil, X } from "lucide-react";
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


export default function MonetizationPage() {
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

                {/* Main Content */}
                <main className="flex-1 flex bg-background mb-[1rem]">
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
                            {/* Exit Button - Positioned absolutely in top left corner */}
                            <button
                                onClick={() => router.back()}
                                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 transition-colors duration-200 shadow-sm"
                                aria-label="Exit page"
                            >
                                <X className="w-5 h-5 text-foreground cursor-pointer" />
                            </button>
                            {/* Left Section - 20% */}
                            <section className=" hidden xl:block w-[18%] bg-background p-4 fixed h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">


                            </section>


                            {/* Middle Section - 50% */}
                            <section className=" rounded-lg m-2 w-full xl:w-[50%] xl:ml-[20%] bg-background p-2 sm:p-6 md:p-8 xl:p-10 overflow-y-auto relative">



                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="text-2xl font-bold mb-2">Make Money On Soma AI</h2>
                                    <p className="text-muted-foreground mb-6 text-center">
                                        The first step to monetization on Soma AI is getting Verified with Soma AI Premium.
                                    </p>
                                </div>

                                {/* Get Paid To Post Card */}
                                <div className="bg-background border rounded-3xl mb-6 p-4 sm:p-6 flex flex-col items-center text-center">
                                    <div className="flex-1 w-full flex flex-col justify-content align-center">
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <h3 className={`font-playfair-display self-center font-bold`}>Get Paid To Post</h3>
                                        </div>

                                        <div className={`z-10 flex justify-center mb-1 items-center rounded-3xl  w-full border border-red-500 h-[200px]`}>


                                        </div>
                                        <p className="text-muted-foreground mb-2 font-playfair-display px-2 w-[80%] self-center">
                                            Earn from sharing high quality content. The more you engage users on Soma AI the more you earn. More reads, More Listens = More Money.
                                        </p>
                                    </div>
                                </div>

                                {/* Make Better Content With AI Tools Available Card */}
                                <div className="bg-background border rounded-3xl mb-6 p-4 sm:p-6 flex flex-col items-center text-center">
                                    <div className="flex-1 w-full flex flex-col justify-content align-center">
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <h3 className={`font-playfair-display self-center font-bold`}>Make Better Content With Built In AI Tools</h3>
                                        </div>

                                        <div className={`z-10 flex justify-center mb-1 items-center rounded-3xl  w-full border border-red-500 h-[200px]`}>


                                        </div>
                                        <p className="text-muted-foreground mb-2 font-playfair-display px-2 w-[80%] self-center">
                                            Unlocks Better Dashboard Analytics And AI Tools To Achieve Better Results.
                                        </p>
                                    </div>
                                </div>

                                {/* Make Better Content With AI Tools Available Card */}
                                <div className="bg-background border rounded-3xl mb-20 p-4 sm:p-6 flex flex-col items-center text-center">
                                    <div className="flex-1 w-full flex flex-col justify-content align-center">
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <h3 className={`font-playfair-display self-center font-bold`}>Build An Audience</h3>
                                        </div>

                                        <div className={`z-10 flex justify-center mb-1 items-center rounded-3xl  w-full border border-red-500 h-[200px]`}>


                                        </div>
                                        <p className="text-muted-foreground mb-2 font-playfair-display px-2 w-[80%] self-center">
                                            Build An Audience Through Readers, Listeners, Consumers With Email Lists.
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t p-4">
                                    <div className="max-w-md mx-auto">
                                        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full py-3 text-lg font-semibold shadow-lg">
                                            Become a Premium Creator
                                        </Button>
                                    </div>
                                </div>

                            </section>


                            {/* Right Section - 30% */}
                            <section className="hidden xl:block w-[26%] bg-background p-4 fixed right-4 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">


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