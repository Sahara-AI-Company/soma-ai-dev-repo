"use client"

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, ChevronLeftIcon, Compass, Mail, Moon, Sun, MoreHorizontal, Plus, UserCircleIcon, Search, LayoutDashboard, PlusIcon, PencilIcon } from "lucide-react";
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
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateUserField } from "@/redux/user-store/userSlice";
import { Publication } from "@/redux/user-store/userPublicationsSlice";
import { useRouter } from "next/navigation";
import useWindowSize from "@/hooks/useWindow";
import { SearchQueryDialog } from "@/components/profile-page/searchQueryDialog";
import { NotificationsDialog } from "@/components/profile-page/notificationsDialog";
import { Toggle } from "@/components/ui/toggle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { IconBook } from "@tabler/icons-react";

// Types are now imported from Redux slice

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
    "Notifications",
    "Messages",
    "Requests",
    "Comments",
    "Likes",
]


export default function SettingsPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [searchQueryModal, setSearchQueryModal] = useState(false);
    const [notificationsModal, setNotificationsModal] = useState(false);
    const [activeSearchCategory, setActiveSearchCategory] = useState("All");
    const [activeNotificationCategory, setActiveNotificationCategory] = useState("All");
    const [activeTab, setActiveTab] = useState("activity");
    const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
    const [isSavingNotifications, setIsSavingNotifications] = useState(false);
    const [isSavingPrivacy, setIsSavingPrivacy] = useState(false);
    const [isSavingContent, setIsSavingContent] = useState(false);


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

    // Add state for Content Preferences
    const [filterExplicitContent, setFilterExplicitContent] = useState(true);
    const [autoPlayVideos, setAutoPlayVideos] = useState(true);
    const [blockedAccounts, setBlockedAccounts] = useState(true);
    const [mutedAccounts, setMutedAccounts] = useState(true);
    const [hiddenPublications, setHiddenPublications] = useState(true);
    const [manageInterests, setManageInterests] = useState(true);


    // Add state for Privacy
    const [showLikesOnProfile, setShowLikesOnProfile] = useState(true);
    const [allowMentions, setAllowMentions] = useState(true);
    const [allowGuestPosts, setAllowGuestPosts] = useState(true);
    const [contactMatching, setContactMatching] = useState(true);

    // useState Magazine Delivery
    const [articleDelivery, setArticleDelivery] = useState<'app' | 'email' | 'number' | 'app&email' | 'all'>("all");
    const [magazineDelivery, setMagazineDelivery] = useState<'app' | 'email' | 'number' | 'app&email' | 'all'>("all");
    const [podcastDelivery, setPodcastDelivery] = useState<'app' | 'email' | 'number' | 'app&email' | 'all'>("all");


    // Engagement options state
    const [engagementLikesApp, setEngagementLikesApp] = useState(true);
    const [engagementLikesEmail, setEngagementLikesEmail] = useState(true);
    const [engagementCommentsApp, setEngagementCommentsApp] = useState(true);
    const [engagementCommentsEmail, setEngagementCommentsEmail] = useState(true);
    const [engagementSharesApp, setEngagementSharesApp] = useState(true);
    const [engagementSharesEmail, setEngagementSharesEmail] = useState(true);
    const [engagementMentionsApp, setEngagementMentionsApp] = useState(true);
    const [engagementMentionsEmail, setEngagementMentionsEmail] = useState(true);

    // Connections options state
    const [connectionsFollowersApp, setConnectionsFollowersApp] = useState(true);
    const [connectionsFollowersEmail, setConnectionsFollowersEmail] = useState(true);
    const [connectionsSubscribersApp, setConnectionsSubscribersApp] = useState(true);
    const [connectionsSubscribersEmail, setConnectionsSubscribersEmail] = useState(true);
    const [connectionsChatsApp, setConnectionsChatsApp] = useState(true);
    const [connectionsChatsEmail, setConnectionsChatsEmail] = useState(true);
    const [connectionsChartsUpdatesApp, setConnectionsChartsUpdatesApp] = useState(true);
    const [connectionsChartsUpdatesEmail, setConnectionsChartsUpdatesEmail] = useState(true);

    // Messaging options state
    const [messagingChatRepliesApp, setMessagingChatRepliesApp] = useState(true);
    const [messagingChatRepliesEmail, setMessagingChatRepliesEmail] = useState(true);
    const [messagingRequestsFrom, setMessagingRequestsFrom] = useState<'Everyone' | 'Paid Subscribers' | 'Free Subscribers' | 'No One'>("Everyone");

    // Publications are now fetched automatically via auth context



    // Function to save notification settings
    const saveNotificationSettings = () => {
        if (!isAuthenticated) {
            console.error("User not authenticated");
            return;
        }

        setIsSavingNotifications(true);

        // Get JWT token from localStorage
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            console.error("No JWT token found");
            setIsSavingNotifications(false);
            return;
        }

        // Prepare notification settings data
        const notificationData = {
            // magazine useState Values
            magazine_delivery: magazineDelivery,

            // engagement useState Values
            engagement_likes_app: engagementLikesApp,
            engagement_likes_email: engagementLikesEmail,
            engagement_comments_app: engagementCommentsApp,
            engagement_comments_email: engagementCommentsEmail,
            engagement_shares_app: engagementSharesApp,
            engagement_shares_email: engagementSharesEmail,
            engagement_mentions_app: engagementMentionsApp,
            engagement_mentions_email: engagementMentionsEmail,

            // connections useState Values
            connections_followers_app: connectionsFollowersApp,
            connections_followers_email: connectionsFollowersEmail,
            connections_subscribers_app: connectionsSubscribersApp,
            connections_subscribers_email: connectionsSubscribersEmail,
            connections_chats_app: connectionsChatsApp,
            connections_chats_email: connectionsChatsEmail,
            connections_charts_updates_app: connectionsChartsUpdatesApp,
            connections_charts_updates_email: connectionsChartsUpdatesEmail,

            // massaging useState Values
            messaging_chat_replies_app: messagingChatRepliesApp,
            messaging_chat_replies_email: messagingChatRepliesEmail,
            messaging_requests_from: messagingRequestsFrom,
        };

        // Make API call to save to database
        fetch(`http://localhost:8000/somaapp/update-notification-settings/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(notificationData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(errorData => {
                        throw errorData;
                    });
                }
            })
            .then(result => {
                // Update Redux store with new settings using updateUserField
                dispatch(updateUserField({ field: 'articleDelivery', value: articleDelivery }));
                dispatch(updateUserField({ field: 'magazineDelivery', value: magazineDelivery }));
                dispatch(updateUserField({ field: 'podcastDelivery', value: podcastDelivery }));
                dispatch(updateUserField({ field: 'engagementLikesApp', value: engagementLikesApp }));
                dispatch(updateUserField({ field: 'engagementLikesEmail', value: engagementLikesEmail }));
                dispatch(updateUserField({ field: 'engagementCommentsApp', value: engagementCommentsApp }));
                dispatch(updateUserField({ field: 'engagementCommentsEmail', value: engagementCommentsEmail }));
                dispatch(updateUserField({ field: 'engagementSharesApp', value: engagementSharesApp }));
                dispatch(updateUserField({ field: 'engagementSharesEmail', value: engagementSharesEmail }));
                dispatch(updateUserField({ field: 'engagementMentionsApp', value: engagementMentionsApp }));
                dispatch(updateUserField({ field: 'engagementMentionsEmail', value: engagementMentionsEmail }));
                dispatch(updateUserField({ field: 'connectionsFollowersApp', value: connectionsFollowersApp }));
                dispatch(updateUserField({ field: 'connectionsFollowersEmail', value: connectionsFollowersEmail }));
                dispatch(updateUserField({ field: 'connectionsSubscribersApp', value: connectionsSubscribersApp }));
                dispatch(updateUserField({ field: 'connectionsSubscribersEmail', value: connectionsSubscribersEmail }));
                dispatch(updateUserField({ field: 'connectionsChatsApp', value: connectionsChatsApp }));
                dispatch(updateUserField({ field: 'connectionsChatsEmail', value: connectionsChatsEmail }));
                dispatch(updateUserField({ field: 'connectionsChartsUpdatesApp', value: connectionsChartsUpdatesApp }));
                dispatch(updateUserField({ field: 'connectionsChartsUpdatesEmail', value: connectionsChartsUpdatesEmail }));
                dispatch(updateUserField({ field: 'messagingChatRepliesApp', value: messagingChatRepliesApp }));
                dispatch(updateUserField({ field: 'messagingChatRepliesEmail', value: messagingChatRepliesEmail }));
                dispatch(updateUserField({ field: 'messagingRequestsFrom', value: messagingRequestsFrom }));

                console.log("Notification settings saved successfully:", result);
                // You can add a toast notification here
            })
            .catch(error => {
                console.error("Failed to save notification settings:", error);
                // You can add error toast notification here
            })
            .finally(() => {
                setIsSavingNotifications(false);
            });
    };

    // Function to save content preferences
    const saveContentPreferences = () => {
        if (!isAuthenticated) {
            console.error("User not authenticated");
            return;
        }

        setIsSavingContent(true);

        // Get JWT token from localStorage
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            console.error("No JWT token found");
            setIsSavingContent(false);
            return;
        }

        // Prepare content preferences data
        const contentData = {
            filter_explicit_content: filterExplicitContent,
            auto_play_videos: autoPlayVideos,
            blocked_accounts: blockedAccounts,
            muted_accounts: mutedAccounts,
            hidden_publications: hiddenPublications,
            manage_interests: manageInterests,
        };

        // Make API call to save to database
        fetch(`http://localhost:8000/somaapp/update-content-preferences/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(contentData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(errorData => {
                        throw errorData;
                    });
                }
            })
            .then(result => {
                // Update Redux store with new settings using updateUserField
                dispatch(updateUserField({ field: 'filterExplicitContent', value: filterExplicitContent }));
                dispatch(updateUserField({ field: 'autoPlayVideos', value: autoPlayVideos }));
                dispatch(updateUserField({ field: 'blockedAccounts', value: blockedAccounts }));
                dispatch(updateUserField({ field: 'mutedAccounts', value: mutedAccounts }));
                dispatch(updateUserField({ field: 'hiddenPublications', value: hiddenPublications }));
                dispatch(updateUserField({ field: 'manageInterests', value: manageInterests }));

                console.log("Content preferences saved successfully:", result);
                // You can add a toast notification here
            })
            .catch(error => {
                console.error("Failed to save content preferences:", error);
                // You can add error toast notification here
            })
            .finally(() => {
                setIsSavingContent(false);
            });
    };

    // Function to save privacy settings
    const savePrivacySettings = () => {
        if (!isAuthenticated) {
            console.error("User not authenticated");
            return;
        }

        setIsSavingPrivacy(true);

        // Get JWT token from localStorage
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            console.error("No JWT token found");
            setIsSavingPrivacy(false);
            return;
        }

        // Prepare privacy settings data
        const privacyData = {
            show_likes_on_profile: showLikesOnProfile,
            allow_mentions: allowMentions,
            allow_guest_posts: allowGuestPosts,
            contact_matching: contactMatching,
        };

        // Make API call to save to database
        fetch(`http://localhost:8000/somaapp/update-privacy-settings/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(privacyData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(errorData => {
                        throw errorData;
                    });
                }
            })
            .then(result => {
                // Update Redux store with new settings using updateUserField
                dispatch(updateUserField({ field: 'showLikesOnProfile', value: showLikesOnProfile }));
                dispatch(updateUserField({ field: 'allowMentions', value: allowMentions }));
                dispatch(updateUserField({ field: 'allowGuestPosts', value: allowGuestPosts }));
                dispatch(updateUserField({ field: 'contactMatching', value: contactMatching }));

                console.log("Privacy settings saved successfully:", result);
                // You can add a toast notification here
            })
            .catch(error => {
                console.error("Failed to save privacy settings:", error);
                // You can add error toast notification here
            })
            .finally(() => {
                setIsSavingPrivacy(false);
            });
    };

    // setMounted useEffect()
    useEffect(() => {
        setMounted(true);
    }, []);

    // Load notification settings from Redux on component mount
    useEffect(() => {
        if (currentUser) {
            setArticleDelivery((currentUser.articleDelivery as 'app' | 'email' | 'number' | 'app&email' | 'all') || "all");
            setMagazineDelivery((currentUser.magazineDelivery as 'app' | 'email' | 'number' | 'app&email' | 'all') || "all");
            setPodcastDelivery((currentUser.podcastDelivery as 'app' | 'email' | 'number' | 'app&email' | 'all') || "all");
            setEngagementLikesApp(currentUser.engagementLikesApp || false);
            setEngagementLikesEmail(currentUser.engagementLikesEmail || false);
            setEngagementCommentsApp(currentUser.engagementCommentsApp || false);
            setEngagementCommentsEmail(currentUser.engagementCommentsEmail || false);
            setEngagementSharesApp(currentUser.engagementSharesApp || false);
            setEngagementSharesEmail(currentUser.engagementSharesEmail || false);
            setEngagementMentionsApp(currentUser.engagementMentionsApp || false);
            setEngagementMentionsEmail(currentUser.engagementMentionsEmail || false);
            setConnectionsFollowersApp(currentUser.connectionsFollowersApp || false);
            setConnectionsFollowersEmail(currentUser.connectionsFollowersEmail || false);
            setConnectionsSubscribersApp(currentUser.connectionsSubscribersApp || false);
            setConnectionsSubscribersEmail(currentUser.connectionsSubscribersEmail || false);
            setConnectionsChatsApp(currentUser.connectionsChatsApp || false);
            setConnectionsChatsEmail(currentUser.connectionsChatsEmail || false);
            setConnectionsChartsUpdatesApp(currentUser.connectionsChartsUpdatesApp || false);
            setConnectionsChartsUpdatesEmail(currentUser.connectionsChartsUpdatesEmail || false);
            setMessagingChatRepliesApp(currentUser.messagingChatRepliesApp || false);
            setMessagingChatRepliesEmail(currentUser.messagingChatRepliesEmail || false);
            setMessagingRequestsFrom((currentUser.messagingRequestsFrom as 'Everyone' | 'Paid Subscribers' | 'Free Subscribers' | 'No One') || "Everyone");

            // Load content preferences from Redux
            setFilterExplicitContent(currentUser.filterExplicitContent || false);
            setAutoPlayVideos(currentUser.autoPlayVideos || false);
            setBlockedAccounts(currentUser.blockedAccounts || false);
            setMutedAccounts(currentUser.mutedAccounts || false);
            setHiddenPublications(currentUser.hiddenPublications || false);
            setManageInterests(currentUser.manageInterests || false);

            // Load privacy settings from Redux
            setShowLikesOnProfile(currentUser.showLikesOnProfile || false);
            setAllowMentions(currentUser.allowMentions || false);
            setAllowGuestPosts(currentUser.allowGuestPosts || false);
            setContactMatching(currentUser.contactMatching || false);
        }
    }, [currentUser]);

    // Publications are automatically fetched via auth context - no manual fetching needed



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
                                <div className="text-3xl font-semibold text-secondary">Settings</div>
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
                <main className="flex-1 flex bg-muted mt-[4.5rem]">


                    {!isAuthenticated ? (
                        <div className="w-full flex flex-col items-center justify-center p-8 text-center font-playfair-display">
                            <h2 className="text-2xl font-bold mb-4 ">Authentication Required</h2>
                            <p className="text-gray-600 mb-6">Please log in to view this settings page.</p>
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
                            <section className="rounded-lg m-2 w-full xl:w-[50%] xl:ml-[20%] bg-background p-2 sm:p-6 md:p-8 xl:p-10 overflow-y-auto space-y-10">

                                {/* Account Section */}
                                <div className="space-y-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <h2 className="text-2xl font-bold text-primary mb-2">Account</h2>
                                    </div>
                                    <div className="flex flex-col items-center justify-between rounded-3xl p-4 border ">
                                        <div className="flex flex-row items-start justify-start gap-4 w-full">
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-blue-500">
                                                {currentUser.profilePicture ? (
                                                    <Image src={currentUser.profilePicture} alt="Profile" fill className="object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center w-full h-full text-blue-500 text-3xl font-bold">
                                                        {currentUser.username?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-lg font-semibold truncate">{currentUser.fullName || currentUser.username}</div>
                                                <div className="text-gray-500 text-sm truncate">{currentUser.email}</div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            rel="noopener noreferrer"
                                            className="hover:bg-muted transition-opacity rounded-full text-lg mt-2 w-full cursor-pointer font-playfair-display"
                                            onClick={() => router.push("/home/profile/edit-profile")}
                                        >
                                            <PencilIcon className="h-4 w-4 " />Edit
                                        </Button>
                                    </div>
                                </div>

                                {/* Publications Section */}
                                <div className="space-y-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <h2 className="text-2xl font-bold text-primary mb-2">Publications</h2>
                                    </div>

                                    <div className="border p-2 rounded-3xl">
                                        {/* Publications Display */}
                                        {userPublications.loading ? (
                                            <div className="bg-muted rounded-lg p-4 text-gray-500 text-center">
                                                Loading publications...
                                            </div>
                                        ) : userPublications.error ? (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-center">
                                                Error: {userPublications.error}
                                                <Button
                                                    onClick={() => window.location.reload()}
                                                    variant="outline"
                                                    size="sm"
                                                    className="ml-2"
                                                >
                                                    Retry
                                                </Button>
                                            </div>
                                        ) : userPublications.publications.length === 0 ? (
                                            <div className="bg-muted rounded-lg p-4 text-gray-500 text-center">
                                                No publications yet.
                                            </div>
                                        ) : (
                                            <div className="space-y-3 p-2">
                                                {userPublications.publications.map((publication: Publication) => (
                                                    <div key={publication.id} className="bg-background cursor-pointer hover:bg-muted rounded-3xl p-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent">
                                                                {publication.publication_picture ? (
                                                                    <Image
                                                                        src={publication.publication_picture}
                                                                        alt={publication.publication_name || publication.publication_username}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex items-center justify-center w-full h-full text-blue-500 text-lg font-bold">
                                                                        {(publication.publication_name || publication.publication_username)?.charAt(0).toUpperCase()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="text-lg font-semibold">
                                                                    {publication.publication_name || publication.publication_username}
                                                                </div>
                                                                <div className="text-gray-500 text-sm">
                                                                    @{publication.publication_username}
                                                                </div>
                                                                {publication.publication_domain_url && (
                                                                    <div className="text-blue-500 text-sm">
                                                                        {publication.publication_domain_url}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <ChevronRightIcon className="h-5 w-5" />
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button
                                                    variant="outline"
                                                    rel="noopener noreferrer"
                                                    className="hover:bg-muted transition-opacity rounded-full text-lg mt-2 w-full cursor-pointer font-playfair-display"
                                                    onClick={() => router.push("/create-publication")}
                                                >
                                                    <PlusIcon className="h-4 w-4 " />Create Publication
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Subscriptions Section */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-primary mb-2">Subscriptions</h2>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Input type="text" placeholder="Search subscriptions..." className="max-w-full" />
                                    </div>
                                    <div className="bg-background border rounded-lg p-4 text-gray-500 text-center">No subscriptions found.</div>
                                </div>

                                {/* Notifications Section */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-primary mb-2">Notifications</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        {/* Articles Delivery Dropdown */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="py-6.5 bg-background cursor-pointer hover:bg-muted" asChild>
                                                <Button variant="outline" className="w-full flex justify-between items-center">
                                                    Article Delivery
                                                    <ChevronRightIcon className="h-4 w-4 ml-2" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="font-playfair-display bg-muted">
                                                <RadioGroup value={articleDelivery} onValueChange={(value) => setArticleDelivery(value as 'app' | 'email' | 'number' | 'app&email' | 'all')}>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer App <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="app" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer E-mail <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="email" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer Number <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="number" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer App And Email <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="app&email" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer All <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="all" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                </RadioGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>


                                        {/* Magazine Delivery Dropdown */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="py-6.5 cursor-pointer hover:bg-muted" asChild>
                                                <Button variant="outline" className="w-full flex justify-between items-center">
                                                    Magazine Delivery
                                                    <ChevronRightIcon className="h-4 w-4 ml-2" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="font-playfair-display bg-muted">
                                                <RadioGroup value={magazineDelivery} onValueChange={(value) => setMagazineDelivery(value as 'app' | 'email' | 'number' | 'app&email' | 'all')}>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer App <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="app" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer E-mail <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="email" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer Number <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="number" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer App And Email <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="app&email" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer All <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="all" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                </RadioGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* Podcasts Delivery Dropdown */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="py-6.5 cursor-pointer hover:bg-muted" asChild>
                                                <Button variant="outline" className="w-full flex justify-between items-center">
                                                    Podcast Delivery
                                                    <ChevronRightIcon className="h-4 w-4 ml-2" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="font-playfair-display bg-muted">
                                                <RadioGroup value={podcastDelivery} onValueChange={(value) => setPodcastDelivery(value as 'app' | 'email' | 'number' | 'app&email' | 'all')}>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer App <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="app" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer E-mail <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="email" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer Number <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="number" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer App And Email <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="app&email" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex flex-row items-center justify-center gap-2" asChild>
                                                        <label className="flex items-center gap-2 w-full cursor-pointer">
                                                            <span className="text-[14px] font-bold w-full text-left">Prefer All <span className="font-normal">(Delivery Preference)</span></span>
                                                            <RadioGroupItem value="all" className="accent-primary w-4 h-4 border border-primary" />
                                                        </label>
                                                    </DropdownMenuItem>
                                                </RadioGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>


                                        {/* Engagement Options */}
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1" className="border bg-background hover:bg-muted rounded-lg px-3">
                                                <AccordionTrigger className="cursor-pointer">Engagement</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="space-y-4">

                                                        {/* Likes Option  */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">Likes</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={engagementLikesApp} onCheckedChange={(checked) => setEngagementLikesApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={engagementLikesEmail} onCheckedChange={(checked) => setEngagementLikesEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Comments Option  */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">Comments</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={engagementCommentsApp} onCheckedChange={(checked) => setEngagementCommentsApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={engagementCommentsEmail} onCheckedChange={(checked) => setEngagementCommentsEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Shares Options */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">Shares</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={engagementSharesApp} onCheckedChange={(checked) => setEngagementSharesApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={engagementSharesEmail} onCheckedChange={(checked) => setEngagementSharesEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Mentions */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">Mentions</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={engagementMentionsApp} onCheckedChange={(checked) => setEngagementMentionsApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={engagementMentionsEmail} onCheckedChange={(checked) => setEngagementMentionsEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>


                                        {/* Messaging Options */}
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1" className="border bg-background hover:bg-muted rounded-lg px-3 cursor-pointer">
                                                <AccordionTrigger>Messaging</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="space-y-4">

                                                        {/* Chat Replies Option  */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">Chat Replies</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={messagingChatRepliesApp} onCheckedChange={(checked) => setMessagingChatRepliesApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={messagingChatRepliesEmail} onCheckedChange={(checked) => setMessagingChatRepliesEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Allow Message Requests From */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">Allow Message Requests From</span>
                                                            <div className="flex gap-4">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="outline" className="w-full text-sm flex justify-between items-center cursor-pointer">
                                                                            {messagingRequestsFrom}
                                                                            <ChevronRightIcon className="h-4 w-4 ml-2" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="start" className="font-playfair-display">
                                                                        <RadioGroup value={messagingRequestsFrom} onValueChange={(value) => setMessagingRequestsFrom(value as "Everyone" | "Paid Subscribers" | "Free Subscribers" | "No One")} className="p-2">
                                                                            <DropdownMenuItem asChild>
                                                                                <label className="flex items-center gap-2 w-full cursor-pointer">
                                                                                    <RadioGroupItem value="Everyone" className="accent-primary w-4 h-4 border border-primary" />
                                                                                    <span>Everyone</span>
                                                                                </label>
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem asChild>
                                                                                <label className="flex items-center gap-2 w-full cursor-pointer">
                                                                                    <RadioGroupItem value="Paid Subscribers" className="accent-primary w-4 h-4 border border-primary" />
                                                                                    <span>Paid Subscribers</span>
                                                                                </label>
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem asChild>
                                                                                <label className="flex items-center gap-2 w-full cursor-pointer">
                                                                                    <RadioGroupItem value="Free Subscribers" className="accent-primary w-4 h-4 border border-primary" />
                                                                                    <span>Free Subscribers</span>
                                                                                </label>
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem asChild>
                                                                                <label className="flex items-center gap-2 w-full cursor-pointer">
                                                                                    <RadioGroupItem value="No One" className="accent-primary w-4 h-4 border border-primary" />
                                                                                    <span>No One</span>
                                                                                </label>
                                                                            </DropdownMenuItem>
                                                                        </RadioGroup>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        {/* Connections Options */}
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1" className="border bg-background hover:bg-muted rounded-lg px-3 cursor-pointer">
                                                <AccordionTrigger>Connections</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="space-y-4">

                                                        {/* New Followers Option  */}
                                                        <div className="flex items-center justify-between py-2 cursor-pointer">
                                                            <span className="text-sm">New Followers</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={connectionsFollowersApp} onCheckedChange={(checked) => setConnectionsFollowersApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={connectionsFollowersEmail} onCheckedChange={(checked) => setConnectionsFollowersEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* New Subscribers Option  */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">New Subscribers</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={connectionsSubscribersApp} onCheckedChange={(checked) => setConnectionsSubscribersApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={connectionsSubscribersEmail} onCheckedChange={(checked) => setConnectionsSubscribersEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* New Chats Option */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">New Chats</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={connectionsChatsApp} onCheckedChange={(checked) => setConnectionsChatsApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={connectionsChatsEmail} onCheckedChange={(checked) => setConnectionsChatsEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Charts Updates Option */}
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-sm">Charts Updates</span>
                                                            <div className="flex gap-4">
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox className="cursor-pointer" checked={connectionsChartsUpdatesApp} onCheckedChange={(checked) => setConnectionsChartsUpdatesApp(checked === true)} />
                                                                    <span>App</span>
                                                                </label>
                                                                <label className="flex items-center gap-1 cursor-pointer">
                                                                    <Checkbox checked={connectionsChartsUpdatesEmail} onCheckedChange={(checked) => setConnectionsChartsUpdatesEmail(checked === true)} />
                                                                    <span>Email</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                    <div className="w-full h-full">
                                        <Button
                                            variant="outline"
                                            rel="noopener noreferrer"
                                            className="hover:bg-muted transition-opacity rounded-full text-lg w-full cursor-pointer font-playfair-display"
                                            onClick={saveNotificationSettings}
                                            disabled={isSavingNotifications}
                                        >
                                            {isSavingNotifications ? "Saving..." : "Save Notifications Settings"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Content Preferences Section */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-primary mb-2">Content Preferences</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Filter explicit Content</span>
                                            <Switch checked={filterExplicitContent} onCheckedChange={setFilterExplicitContent} />
                                        </div>
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Auto-Play Videos</span>
                                            <Switch checked={autoPlayVideos} onCheckedChange={setAutoPlayVideos} />
                                        </div>
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Blocked Accounts</span>
                                            <Switch checked={blockedAccounts} onCheckedChange={setBlockedAccounts} />
                                        </div>
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Muted Accounts</span>
                                            <Switch checked={mutedAccounts} onCheckedChange={setMutedAccounts} />
                                        </div>
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Hidden Publications</span>
                                            <Switch checked={hiddenPublications} onCheckedChange={setHiddenPublications} />
                                        </div>
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Manage Interests</span>
                                            <Switch checked={manageInterests} onCheckedChange={setManageInterests} />
                                        </div>
                                    </div>
                                    <div className="w-full h-full">
                                        <Button
                                            variant="outline"
                                            rel="noopener noreferrer"
                                            className="hover:bg-muted transition-opacity rounded-full text-lg w-full cursor-pointer font-playfair-display"
                                            onClick={saveContentPreferences}
                                            disabled={isSavingContent}
                                        >
                                            {isSavingContent ? "Saving..." : "Save Content Preferences"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Privacy Section */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-primary mb-2">Privacy</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Show Likes On Profile</span>
                                            <Switch checked={showLikesOnProfile} onCheckedChange={setShowLikesOnProfile} />
                                        </div>
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Allow Mentions</span>
                                            <Switch checked={allowMentions} onCheckedChange={setAllowMentions} />
                                        </div>
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Allow Guest Posts</span>
                                            <Switch checked={allowGuestPosts} onCheckedChange={setAllowGuestPosts} />
                                        </div>
                                        <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                            <span>Contact Matching</span>
                                            <Switch checked={contactMatching} onCheckedChange={setContactMatching} />
                                        </div>
                                    </div>
                                    <div className="w-full h-full">
                                        <Button
                                            variant="outline"
                                            rel="noopener noreferrer"
                                            className="hover:bg-muted transition-opacity rounded-full text-lg w-full cursor-pointer font-playfair-display"
                                            onClick={savePrivacySettings}
                                            disabled={isSavingPrivacy}
                                        >
                                            {isSavingPrivacy ? "Saving..." : "Save Privacy Settings"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Delete Account Section */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-red-600 mb-2">Danger Zone</h2>
                                    <div className={`bg-destructive-10 shadow-destructive-10 border border-destructive rounded-3xl p-4 flex ${width < 500 ? "flex-col" : "flex-row"} items-center justify-between`}>
                                        <span className="text-primary text-center">Permanently delete your account and all associated data.</span>
                                        <Button variant="destructive" className="rounded-full cursor-pointer">Delete Account</Button>
                                    </div>
                                    <div className={`bg-destructive-10 shadow-destructive-10 border border-destructive rounded-3xl p-4 flex ${width < 500 ? "flex-col" : "flex-row"} items-center justify-between`}>
                                        <span className="text-primary text-center">Sign Out, All Your Data Will Be Kept</span>
                                        <Button variant="destructive" className="cursor-pointer rounded-full">Sign Out</Button>
                                    </div>
                                </div>
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
        </div>
    )
}