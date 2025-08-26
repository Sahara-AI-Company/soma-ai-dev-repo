"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Instagram, Facebook, AtSign, Bell, CheckCircle2, ChevronLeftIcon, LayoutDashboard, Mail, Moon, MoreHorizontal, Plus, Search, Sun, XCircle } from "lucide-react"
import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBrandThreads, IconBrandYoutube, IconBrandLinkedin, IconBrandTiktok, IconWorld, IconBook, IconBookmark } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import useWindowSize from "@/hooks/useWindow";
import { useTheme } from "next-themes";
import { useState, useEffect, useCallback } from 'react';
import { SearchQueryDialog } from "@/components/profile-page/searchQueryDialog";
import { NotificationsDialog } from "@/components/profile-page/notificationsDialog";
import ProfilePictureDialog from "@/components/profile-page/profilePictureDialog";
import BookImageDialog from "@/components/profile-page/bookImageDialog";
import BannerImageDialog from "@/components/profile-page/bannerImageDialog";
import { useAppSelector } from "@/redux/hooks";
import { useAppDispatch } from "@/redux/hooks";
import { updateUserField } from "@/redux/user-store/userSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ClipLoader } from "react-spinners"
import { cn } from "@/lib/utils";



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




export default function EditProfile() {
    const [username, setUsername] = useState("");
    const [mounted, setMounted] = useState(false);
    const [searchQueryModal, setSearchQueryModal] = useState(false);
    const [notificationsModal, setNotificationsModal] = useState(false);
    const [activeSearchCategory, setActiveSearchCategory] = useState("All");
    const [profilePictureModal, setProfilePictureModal] = useState(false);
    const [bannerImageModal, setBannerImageModal] = useState(false);
    const [isBookImageDialogOpen, setIsBookImageDialogOpen] = useState(false);
    const [fullscreenImageModal, setFullscreenImageModal] = useState(false);
    const [activeNotificationCategory, setActiveNotificationCategory] = useState("All");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [hasUsernameSpaces, setHasUsernameSpaces] = useState(false);
    const [hasSpecialChars, setHasSpecialChars] = useState(false);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [hasUsernameChanged, setHasUsernameChanged] = useState(false);

    // Form state for all user fields
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        gender: '',
        date_of_birth: '',
        user_interest: '',
        bio: '',
        social_media_links: '',
        relationship_status: 'None',
        education: '',
        work_history: '',
        contact_email: '',
        contact_phone: '',
        religion: 'None',
        star_sign: 'None',
        personality_type: 'None',
        privacy_settings: 'Public',
        user_facebook: '',
        user_instagram: '',
        user_x_twitter: '',
        user_threads: '',
        user_youtube: '',
        user_linkedin: '',
        user_tiktok: '',
        user_book_name: '',
        user_book_website: '',
        user_book_description: '',
        user_website: ''
    });

    // Get user data from Redux
    const { isAuthenticated } = useAuth();
    const currentUser = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    // useWindowSize
    const { width } = useWindowSize();

    // setTheme useTheme()
    const { setTheme } = useTheme();

    const router = useRouter();

    // Username validation regex
    const usernameRegex = /^[a-z0-9_]+$/;

    // Username Availability Checker
    const checkUsernameAvailability = useCallback(async (username: string) => {
        // Convert username to lowercase
        const lowercaseUsername = username.toLowerCase();

        // Check for spaces in username
        if (lowercaseUsername.includes(' ')) {
            setHasUsernameSpaces(true);
            setHasSpecialChars(false);
            setIsUsernameAvailable(null);
            setIsCheckingUsername(false);
            return;
        } else {
            setHasUsernameSpaces(false);
        }

        // Check for special characters
        if (!usernameRegex.test(lowercaseUsername)) {
            setHasSpecialChars(true);
            setIsUsernameAvailable(null);
            setIsCheckingUsername(false);
            return;
        } else {
            setHasSpecialChars(false);
        }

        // Username Empty Validation
        if (lowercaseUsername === '') {
            setIsUsernameAvailable(null);
            setIsCheckingUsername(false);
            setHasUsernameSpaces(false);
            setHasSpecialChars(false);
            return;
        }

        // Set the checking username to true
        setIsCheckingUsername(true);

        // Check Username Availability
        fetch(`${process.env.NEXT_PUBLIC_CHECK_USERNAME_AVAILABILITY}`, {
            // POST Request
            method: 'POST',
            // JSON Request Type
            headers: { 'Content-Type': 'application/json' },
            // JSON Body
            body: JSON.stringify({ username: lowercaseUsername }),
        })
            .then(response => response.json())
            .then(data => {
                // Set the username availability
                setIsUsernameAvailable(data.available);
            })
            .catch(error => {
                // Set the username availability to null
                setIsUsernameAvailable(null);
            })
            .finally(() => {
                // Set the checking username to false
                setIsCheckingUsername(false);
            });
    }, []);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if username has changed and is not available
        if (hasUsernameChanged && isUsernameAvailable === false) {
            setMessage({ type: 'error', text: 'Please choose a different username. The current username is not available.' });
            return;
        }

        // Check for other username validation errors
        if (hasUsernameSpaces || hasSpecialChars) {
            setMessage({ type: 'error', text: 'Please fix the username validation errors before submitting.' });
            return;
        }

        setIsSubmitting(true);

        // Get JWT token from localStorage
        const jwtToken = localStorage.getItem('jwt_token');

        if (!jwtToken) {
            setIsSubmitting(false);
            return;
        }

        // Prepare the data to send (exclude email as it cannot be changed)
        const { email, ...dataToSend } = formData;
        dataToSend.username = username; // Use the username state instead of formData.username

        // Send request to backend
        fetch(`${process.env.NEXT_PUBLIC_UPDATE_PROFILE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            credentials: 'include',
            body: JSON.stringify(dataToSend),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error || 'Failed to update profile');
                    });
                }
                return response.json();
            })
            .then(result => {

                // Update Redux store with the updated user data
                if (result.user) {
                    dispatch(updateUserField({ field: 'username', value: result.user.username }));
                    dispatch(updateUserField({ field: 'fullName', value: result.user.full_name }));
                    dispatch(updateUserField({ field: 'gender', value: result.user.gender }));
                    dispatch(updateUserField({ field: 'dateOfBirth', value: result.user.date_of_birth }));
                    dispatch(updateUserField({ field: 'bio', value: result.user.bio }));
                    dispatch(updateUserField({ field: 'relationshipStatus', value: result.user.relationship_status }));
                    dispatch(updateUserField({ field: 'education', value: result.user.education }));
                    dispatch(updateUserField({ field: 'workHistory', value: result.user.work_history }));
                    dispatch(updateUserField({ field: 'contactEmail', value: result.user.contact_email }));
                    dispatch(updateUserField({ field: 'contactPhone', value: result.user.contact_phone }));
                    dispatch(updateUserField({ field: 'religion', value: result.user.religion }));
                    dispatch(updateUserField({ field: 'starSign', value: result.user.star_sign }));
                    dispatch(updateUserField({ field: 'personalityType', value: result.user.personality_type }));
                    dispatch(updateUserField({ field: 'privacySettings', value: result.user.privacy_settings }));
                    dispatch(updateUserField({ field: 'userFacebook', value: result.user.user_facebook }));
                    dispatch(updateUserField({ field: 'userInstagram', value: result.user.user_instagram }));
                    dispatch(updateUserField({ field: 'userXTwitter', value: result.user.user_x_twitter }));
                    dispatch(updateUserField({ field: 'userThreads', value: result.user.user_threads }));
                    dispatch(updateUserField({ field: 'userYouTube', value: result.user.user_youtube }));
                    dispatch(updateUserField({ field: 'userLinkedIn', value: result.user.user_linkedin }));
                    dispatch(updateUserField({ field: 'userTikTok', value: result.user.user_tiktok }));
                    dispatch(updateUserField({ field: 'userBookName', value: result.user.user_book_name }));
                    dispatch(updateUserField({ field: 'userBookWebsite', value: result.user.user_book_website }));
                    dispatch(updateUserField({ field: 'userWebsite', value: result.user.user_website }));
                }

                // You can add a success notification here
                setMessage({ type: 'success', text: 'Profile updated successfully!' });

                // Clear message and redirect after 2 seconds using promise chain
                const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

                delay(2000)
                    .then(() => {
                        setMessage(null);
                        router.push('/home/profile');
                    })
                    .catch(error => {
                        console.error('Error in redirect:', error);
                        router.push('/home/profile');
                    });
            })
            .catch(error => {
                setMessage({ type: 'error', text: `Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}` });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    // Load user data into form when component mounts
    useEffect(() => {
        if (currentUser) {
            setFormData({
                username: currentUser.username || '',
                full_name: currentUser.fullName || '',
                email: currentUser.email || '',
                gender: currentUser.gender || '',
                date_of_birth: currentUser.dateOfBirth || '',
                user_interest: Array.isArray(currentUser.userInterests) ? currentUser.userInterests.join(', ') : currentUser.userInterests || '',
                bio: currentUser.bio || '',
                social_media_links: Array.isArray(currentUser.socialMediaLinks) ? currentUser.socialMediaLinks.join(', ') : currentUser.socialMediaLinks || '',
                relationship_status: currentUser.relationshipStatus || '',
                education: currentUser.education || '',
                work_history: currentUser.workHistory || '',
                contact_email: currentUser.contactEmail || '',
                contact_phone: currentUser.contactPhone || '',
                religion: currentUser.religion || '',
                star_sign: currentUser.starSign || '',
                personality_type: currentUser.personalityType || '',
                privacy_settings: currentUser.privacySettings || 'Public',
                user_facebook: currentUser.userFacebook || '',
                user_instagram: currentUser.userInstagram || '',
                user_x_twitter: currentUser.userXTwitter || '',
                user_threads: currentUser.userThreads || '',
                user_youtube: currentUser.userYouTube || '',
                user_linkedin: currentUser.userLinkedIn || '',
                user_tiktok: currentUser.userTikTok || '',
                user_book_name: currentUser.userBookName || '',
                user_book_website: currentUser.userBookWebsite || '',
                user_book_description: currentUser.userBookDescription || '',
                user_website: currentUser.userWebsite || ''
            });
            // Also set the username state for the input field
            setUsername(currentUser.username || '');
            // Reset the username changed flag when loading initial data
            setHasUsernameChanged(false);
        }
    }, [currentUser]);

    // Debounce effect for username checking
    useEffect(() => {
        const timer = setTimeout(() => {
            const lowercaseUsername = username.toLowerCase();

            if (lowercaseUsername.trim() === '') {
                setIsUsernameAvailable(null);
                setIsCheckingUsername(false);
                setHasUsernameSpaces(false);
                setHasSpecialChars(false);
                return;
            }

            if (lowercaseUsername.includes(' ')) {
                setHasUsernameSpaces(true);
                setHasSpecialChars(false);
                setIsUsernameAvailable(null);
                setIsCheckingUsername(false);
                return;
            }

            if (!usernameRegex.test(lowercaseUsername)) {
                setHasSpecialChars(true);
                setHasUsernameSpaces(false);
                setIsUsernameAvailable(null);
                setIsCheckingUsername(false);
                return;
            }

            if (lowercaseUsername && isUsernameFocused) {
                checkUsernameAvailability(lowercaseUsername);
            } else if (!isUsernameFocused && lowercaseUsername.trim() !== '') {
                setIsCheckingUsername(false);
            }
        }, 100); // 100ms debounce

        // Cleanup
        return () => clearTimeout(timer);
    }, [username, checkUsernameAvailability, isUsernameFocused]);

    // setMounted useEffect()
    useEffect(() => {
        setMounted(true);
    }, []);

    // Clear message after 5 seconds
    useEffect(() => {
        if (message) {
            // Create a promise wrapper for setTimeout
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            delay(5000)
                .then(() => {
                    setMessage(null);
                })
                .catch(error => {
                    console.error('Error clearing message:', error);
                });
        }
    }, [message]);

    return (
        <>
            <style jsx global>{`
                html, body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    overflow: hidden;
                }
            `}</style>
            <div className="flex flex-col h-screen overflow-hidden">
                <div className="flex flex-col h-screen bg-muted font-playfair-display overflow-hidden">

                    {/* Header */}
                    <header className="border-b bg-white fixed top-0 left-0 right-0 z-50 bg-background">
                        <div className="flex items-center justify-between px-6 py-4 bg-background">

                            <div className="flex items-center gap-4">
                                {/* Left - Back Button */}
                                <ChevronLeftIcon className="h-6 w-6 text-primary cursor-pointer" onClick={() => router.back()} />

                                {/* Left - SOMA (Company Logo) */}
                                {typeof window !== 'undefined' && window.innerWidth >= 768 ?
                                    <div className="text-3xl font-semibold text-secondary">Edit Profile</div>
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
                    <main className="h-[calc(100vh-3rem)] flex bg-muted mt-[4.5rem] mb-[1rem] overflow-hidden">
                        {!isAuthenticated ? (
                            <div className="w-full h-[calc(100vh-6rem)] flex flex-col items-center justify-center p-8 text-center">
                                <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                                <p className="text-gray-600 mb-6">Please log in to edit profile page.</p>
                                <Link href="/authentication">
                                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                        Login To Continue
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Left Section - 20% */}
                                <section className="hidden xl:block w-[18%] bg-muted p-4 h-[calc(100vh-6rem)]">


                                </section>

                                {/* Middle Section - 50% */}
                                <section className="rounded-lg m-2 w-full xl:w-[50%] bg-background p-2 sm:p-6 md:p-8 xl:p-10 overflow-y-auto h-[calc(100vh-6rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {/* Profile Header */}
                                    <div className="flex justify-between items-start mb-6">

                                        {/* Banner Image */}
                                        <div className="relative w-full h-30 sm:h-46 rounded-t-lg">

                                            {/* Banner Image */}
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
                                                <Button onClick={() => setBannerImageModal(true)} className="absolute top-[50%] right-[50%] bg-secondary rounded-full shadow-md hover:bg-secondary cursor-pointer">
                                                    <Plus className="h-4 w-4 text-white" />
                                                </Button>
                                            </div>

                                            {/* Profile Picture */}
                                            <div className="absolute -bottom-10 right-4">
                                                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-background shadow-md cursor-pointer hover:opacity-95 transition-opacity">
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
                                                <Button onClick={() => setProfilePictureModal(true)} className="absolute -top-1 -right-0 bg-secondary rounded-full shadow-md hover:bg-secondary cursor-pointer">
                                                    <Plus className="h-5 w-5 text-white" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Fields */}
                                    <form onSubmit={handleSubmit} className="space-y-2">
                                        {/* Basic Information */}
                                        <div className="space-y-2">
                                            <h1 className="text-2xl font-semibold text-primary">Personal Details</h1>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-5 rounded-3xl">

                                                {/* Username Input */}
                                                <div>
                                                    <Label htmlFor="username" className="flex justify-between items-center w-full">
                                                        <p className="text-sm">Username</p>
                                                        {hasUsernameSpaces ?
                                                            <p className="text-red-500 text-xs">No spaces allowed</p>
                                                            : hasSpecialChars ?
                                                                <p className="text-red-500 text-xs">Only letters, numbers, and underscores allowed</p>
                                                                : isUsernameAvailable === true ?
                                                                    <p className="text-green-500 text-xs">Username Is Available</p>
                                                                    : isUsernameAvailable === false ?
                                                                        <p className="text-red-500 text-xs">Username Already Exists</p>
                                                                        : null}
                                                    </Label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 border-r-2 border-border pr-2">
                                                            <AtSign className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                        <Input
                                                            id="username"
                                                            type="text"
                                                            placeholder="Choose Your Unique Handle"
                                                            required
                                                            value={username}
                                                            onChange={(e) => {
                                                                const value = e.target.value.toLowerCase();
                                                                setUsername(value);
                                                                handleInputChange('username', value);
                                                                // Check if username has changed from the original formData.username
                                                                setHasUsernameChanged(value !== formData.username);
                                                            }}
                                                            onFocus={() => setIsUsernameFocused(true)}
                                                            onBlur={() => setIsUsernameFocused(false)}
                                                            className={cn(
                                                                (hasUsernameSpaces || hasSpecialChars) && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 focus-visible:ring-[3px]",
                                                                isUsernameAvailable === true && !hasUsernameSpaces && !hasSpecialChars && "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500 focus-visible:ring-[3px]",
                                                                isUsernameAvailable === false && !hasUsernameSpaces && !hasSpecialChars && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 focus-visible:ring-[3px]"
                                                            )}
                                                            style={{ paddingLeft: '3rem' }}
                                                        />
                                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                            {isCheckingUsername ? (
                                                                <ClipLoader color="rgb(37, 99, 235)" size={15} />
                                                            ) : (hasUsernameSpaces || hasSpecialChars) ? (
                                                                <XCircle className="h-5 w-5 text-red-500" />
                                                            ) : isUsernameAvailable === true ? (
                                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                            ) : isUsernameAvailable === false ? (
                                                                <XCircle className="h-5 w-5 text-red-500" />
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">You can submit the same username</span>
                                                </div>


                                                {/* Full Name Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="full_name">Full Name</Label>
                                                    <Input
                                                        id="full_name"
                                                        type="text"
                                                        value={formData.full_name}
                                                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                                                        placeholder="Enter full name"
                                                    />
                                                </div>

                                                {/* Email Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                                        placeholder="Enter email"
                                                        disabled
                                                        className="bg-gray-50"
                                                    />
                                                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                                                </div>

                                                {/* Gender Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="gender">Gender</Label>
                                                    <Select
                                                        key={formData.gender || 'empty'}
                                                        value={formData.gender || ''}
                                                        onValueChange={(value) => handleInputChange('gender', value)}
                                                    >
                                                        <SelectTrigger>
                                                            {formData.gender || "Select gender"}
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Male">Male</SelectItem>
                                                            <SelectItem value="Female">Female</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Date Of Birth Update */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                                                    <Input
                                                        className="flex flex-row align-center justify-center"
                                                        id="date_of_birth"
                                                        type="date"
                                                        value={formData.date_of_birth}
                                                        onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                                                    />
                                                </div>

                                                {/* Relationship Status */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="relationship_status">Relationship Status</Label>
                                                    <Select
                                                        key={formData.relationship_status || 'empty'}
                                                        value={formData.relationship_status}
                                                        onValueChange={(value) => handleInputChange('relationship_status', value)}
                                                    >
                                                        <SelectTrigger>
                                                            {formData.relationship_status || "Select Relationship Status"}
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="None">None</SelectItem>
                                                            <SelectItem value="Single">Single</SelectItem>
                                                            <SelectItem value="Relationship">Relationship</SelectItem>
                                                            <SelectItem value="Married">Married</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <h1 className="text-2xl font-semibold text-primary">More Details</h1>

                                        {/* Personal Details */}
                                        <div className="space-y-2 border p-5 rounded-3xl">

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="bio">Bio</Label>
                                                    <textarea
                                                        id="bio"
                                                        value={formData.bio}
                                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                                        placeholder="Tell us about yourself..."
                                                        maxLength={100}
                                                        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="religion">Religion</Label>
                                                        <Select
                                                            key={formData.religion || 'empty'}
                                                            value={formData.religion}
                                                            onValueChange={(value) => handleInputChange('religion', value)}
                                                        >
                                                            <SelectTrigger>
                                                                {formData.religion || "Select Religion"}
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="None">None</SelectItem>
                                                                <SelectItem value="Christian">Christian</SelectItem>
                                                                <SelectItem value="Muslim">Muslim</SelectItem>
                                                                <SelectItem value="Hindu">Hindu</SelectItem>
                                                                <SelectItem value="Buddhist">Buddhist</SelectItem>
                                                                <SelectItem value="Jew">Jew</SelectItem>
                                                                <SelectItem value="Atheist">Atheist</SelectItem>
                                                                <SelectItem value="Other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="star_sign">Star Sign</Label>
                                                        <Select
                                                            key={formData.star_sign || 'empty'}
                                                            value={formData.star_sign}
                                                            onValueChange={(value) => handleInputChange('star_sign', value)}>
                                                            <SelectTrigger>
                                                                {formData.star_sign || "Select Religion"}
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="None">None</SelectItem>
                                                                <SelectItem value="Aries">Aries</SelectItem>
                                                                <SelectItem value="Taurus">Taurus</SelectItem>
                                                                <SelectItem value="Gemini">Gemini</SelectItem>
                                                                <SelectItem value="Cancer">Cancer</SelectItem>
                                                                <SelectItem value="Leo">Leo</SelectItem>
                                                                <SelectItem value="Virgo">Virgo</SelectItem>
                                                                <SelectItem value="Libra">Libra</SelectItem>
                                                                <SelectItem value="Scorpio">Scorpio</SelectItem>
                                                                <SelectItem value="Sagittarius">Sagittarius</SelectItem>
                                                                <SelectItem value="Capricorn">Capricorn</SelectItem>
                                                                <SelectItem value="Aquarius">Aquarius</SelectItem>
                                                                <SelectItem value="Pisces">Pisces</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="personality_type">Personality Type (MBTI)</Label>
                                                        <Select
                                                            key={formData.personality_type || 'empty'}
                                                            value={formData.personality_type}
                                                            onValueChange={(value) => handleInputChange('personality_type', value)}>
                                                            <SelectTrigger>
                                                                {formData.personality_type || "Select Religion"}
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="None">None</SelectItem>
                                                                <SelectItem value="INTJ">INTJ</SelectItem>
                                                                <SelectItem value="INTP">INTP</SelectItem>
                                                                <SelectItem value="ENTJ">ENTJ</SelectItem>
                                                                <SelectItem value="ENTP">ENTP</SelectItem>
                                                                <SelectItem value="INFJ">INFJ</SelectItem>
                                                                <SelectItem value="INFP">INFP</SelectItem>
                                                                <SelectItem value="ENFJ">ENFJ</SelectItem>
                                                                <SelectItem value="ENFP">ENFP</SelectItem>
                                                                <SelectItem value="ISTJ">ISTJ</SelectItem>
                                                                <SelectItem value="ISFJ">ISFJ</SelectItem>
                                                                <SelectItem value="ESTJ">ESTJ</SelectItem>
                                                                <SelectItem value="ESFJ">ESFJ</SelectItem>
                                                                <SelectItem value="ISTP">ISTP</SelectItem>
                                                                <SelectItem value="ISFP">ISFP</SelectItem>
                                                                <SelectItem value="ESTP">ESTP</SelectItem>
                                                                <SelectItem value="ESFP">ESFP</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="privacy_settings">Privacy Settings</Label>
                                                        <Select value={formData.privacy_settings} onValueChange={(value) => handleInputChange('privacy_settings', value)}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select privacy setting" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Public">Public</SelectItem>
                                                                <SelectItem value="Private">Private</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Professional Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-semibold text-primary">Professional Information</h3>

                                            <div className="space-y-4 border p-5 rounded-3xl">
                                                <div className="space-y-2">
                                                    <Label htmlFor="education">Education</Label>
                                                    <textarea
                                                        id="education"
                                                        value={formData.education}
                                                        maxLength={100}
                                                        onChange={(e) => handleInputChange('education', e.target.value)}
                                                        placeholder="Enter your educational background..."
                                                        className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="work_history">Work History</Label>
                                                    <textarea
                                                        id="work_history"
                                                        value={formData.work_history}
                                                        maxLength={100}
                                                        onChange={(e) => handleInputChange('work_history', e.target.value)}
                                                        placeholder="Enter your work experience..."
                                                        className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-semibold text-primary">Contact Information</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-5 rounded-3xl">
                                                <div className="space-y-2">
                                                    <Label htmlFor="contact_email">Contact Email</Label>
                                                    <Input
                                                        id="contact_email"
                                                        type="email"
                                                        value={formData.contact_email}
                                                        onChange={(e) => handleInputChange('contact_email', e.target.value)}
                                                        placeholder="Enter contact email"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="contact_phone">Contact Phone</Label>
                                                    <Input
                                                        id="contact_phone"
                                                        type="tel"
                                                        value={formData.contact_phone}
                                                        onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                                                        placeholder="Enter contact phone"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Social Media */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-2xl font-semibold text-primary">Social Media Links</h3>
                                                <span className="text-xs text-gray-400">Connect your other accounts to let people know where to find you.</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-5 rounded-3xl">
                                                <div className="space-y-2">
                                                    <Label htmlFor="user_facebook" className="flex items-center gap-2">
                                                        <IconBrandFacebook className="h-4 w-4" />
                                                        Facebook
                                                    </Label>
                                                    <Input
                                                        id="user_facebook"
                                                        type="url"
                                                        value={formData.user_facebook}
                                                        onChange={(e) => handleInputChange('user_facebook', e.target.value)}
                                                        placeholder="https://facebook.com/yourprofile"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_instagram" className="flex items-center gap-2">
                                                        <IconBrandInstagram className="h-4 w-4" />
                                                        Instagram
                                                    </Label>
                                                    <Input
                                                        id="user_instagram"
                                                        type="text"
                                                        value={formData.user_instagram}
                                                        onChange={(e) => handleInputChange('user_instagram', e.target.value)}
                                                        placeholder="@yourusername"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_x_twitter" className="flex items-center gap-2">
                                                        <IconBrandX className="h-4 w-4" />
                                                        X (Twitter)
                                                    </Label>
                                                    <Input
                                                        id="user_x_twitter"
                                                        type="text"
                                                        value={formData.user_x_twitter}
                                                        onChange={(e) => handleInputChange('user_x_twitter', e.target.value)}
                                                        placeholder="@yourusername"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_threads" className="flex items-center gap-2">
                                                        <IconBrandThreads className="h-4 w-4" />
                                                        Threads
                                                    </Label>
                                                    <Input
                                                        id="user_threads"
                                                        type="text"
                                                        value={formData.user_threads}
                                                        onChange={(e) => handleInputChange('user_threads', e.target.value)}
                                                        placeholder="@yourusername"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_youtube" className="flex items-center gap-2">
                                                        <IconBrandYoutube className="h-4 w-4" />
                                                        YouTube
                                                    </Label>
                                                    <Input
                                                        id="user_youtube"
                                                        type="url"
                                                        value={formData.user_youtube}
                                                        onChange={(e) => handleInputChange('user_youtube', e.target.value)}
                                                        placeholder="https://youtube.com/@yourchannel"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_linkedin" className="flex items-center gap-2">
                                                        <IconBrandLinkedin className="h-4 w-4" />
                                                        LinkedIn
                                                    </Label>
                                                    <Input
                                                        id="user_linkedin"
                                                        type="url"
                                                        value={formData.user_linkedin}
                                                        onChange={(e) => handleInputChange('user_linkedin', e.target.value)}
                                                        placeholder="https://linkedin.com/in/yourprofile"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_tiktok" className="flex items-center gap-2">
                                                        <IconBrandTiktok className="h-4 w-4" />
                                                        TikTok
                                                    </Label>
                                                    <Input
                                                        id="user_tiktok"
                                                        type="text"
                                                        value={formData.user_tiktok}
                                                        onChange={(e) => handleInputChange('user_tiktok', e.target.value)}
                                                        placeholder="@yourusername"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_website" className="flex items-center gap-2">
                                                        <IconWorld className="h-4 w-4" />
                                                        Personal Website
                                                    </Label>
                                                    <Input
                                                        id="user_website"
                                                        type="url"
                                                        value={formData.user_website}
                                                        onChange={(e) => handleInputChange('user_website', e.target.value)}
                                                        placeholder="https://yourwebsite.com"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_book_name" className="flex items-center gap-2">
                                                        <IconBook className="h-4 w-4" />
                                                        Book Name
                                                    </Label>
                                                    <Input
                                                        id="user_book_name"
                                                        type="text"
                                                        value={formData.user_book_name}
                                                        onChange={(e) => handleInputChange('user_book_name', e.target.value)}
                                                        placeholder="Enter your book name"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_book_website" className="flex items-center gap-2">
                                                        <IconBookmark className="h-4 w-4" />
                                                        Book Website
                                                    </Label>
                                                    <Input
                                                        id="user_book_website"
                                                        type="url"
                                                        value={formData.user_book_website}
                                                        onChange={(e) => handleInputChange('user_book_website', e.target.value)}
                                                        placeholder="https://yourbookwebsite.com"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="flex items-center gap-2">
                                                        <IconBook className="h-4 w-4" />
                                                        Book Image
                                                    </Label>
                                                    <div className="flex items-center gap-4">
                                                        <div className="border border-gray-300 h-50 w-34 rounded-md overflow-hidden flex items-center justify-center bg-gray-100 relative">
                                                            {currentUser?.userBookImage ? (
                                                                <img
                                                                    src={currentUser.userBookImage}
                                                                    alt="Book cover"
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            ) : (
                                                                <div className="text-gray-400 text-xs text-center">
                                                                    No image
                                                                </div>
                                                            )}
                                                            <Button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setIsBookImageDialogOpen(true);
                                                                }}
                                                                className="absolute top-1 right-1 bg-secondary rounded-full shadow-md hover:bg-secondary cursor-pointer p-1 h-8 w-8"
                                                            >
                                                                <Plus className="h-4 w-4 text-white" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="user_book_description" className="flex items-center gap-2">
                                                        <IconBook className="h-4 w-4" />
                                                        Book Description
                                                    </Label>
                                                    <Input
                                                        id="user_book_description"
                                                        type="text"
                                                        value={formData.user_book_description}
                                                        onChange={(e) => handleInputChange('user_book_description', e.target.value)}
                                                        placeholder="Enter a brief description of your book (max 200 characters)"
                                                        maxLength={200}
                                                    />

                                                </div>

                                            </div>
                                        </div>

                                        {/* Error Or Success Message */}
                                        <div className="space-y-2">
                                            {message && (
                                                <div className={`p-1 rounded-md border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            {message.type === 'success' ? (
                                                                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                                                            ) : (
                                                                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                                                            )}
                                                            <span className="font-medium text-sm">{message.text}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => setMessage(null)}
                                                            className={`ml-4 p-1 rounded-full hover:bg-opacity-20 ${message.type === 'success' ? 'hover:bg-green-600' : 'hover:bg-red-600'}`}
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Submit Button */}
                                            <div className="flex justify-end pb-10">
                                                <Button
                                                    type="submit"
                                                    variant="outline"
                                                    rel="noopener noreferrer"
                                                    className="hover:bg-muted transition-opacity rounded-full text-lg mt-2 w-full cursor-pointer font-playfair-display"
                                                    disabled={isSubmitting || (hasUsernameChanged && isUsernameAvailable === false) || hasUsernameSpaces || hasSpecialChars}
                                                    onClick={() => router.push("/home/profile/edit-profile")}
                                                >
                                                    {isSubmitting ? "Saving..." : 'Save'}
                                                </Button>
                                                {/* <Button
                                                    type="submit"
                                                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                                    disabled={isSubmitting || (hasUsernameChanged && isUsernameAvailable === false) || hasUsernameSpaces || hasSpecialChars}
                                                >
                                                    {isSubmitting ? <ClipLoader color="rgb(255, 255, 255)" size={20} /> : 'Save'}
                                                </Button> */}
                                            </div>
                                        </div>
                                    </form>
                                </section>


                                {/* Right Section - 30% */}
                                <section className="hidden xl:block w-[26%] bg-muted p-4 h-[calc(100vh-6rem)]">


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

                {/* Profile Picture Modal */}
                <ProfilePictureDialog
                    open={profilePictureModal}
                    onOpenChange={setProfilePictureModal}
                    setImagePreview={setImagePreview}
                />

                {/* Book Image Modal */}
                <BookImageDialog
                    open={isBookImageDialogOpen}
                    onOpenChange={setIsBookImageDialogOpen}
                />

                {/* Banner Image Modal */}
                <BannerImageDialog
                    open={bannerImageModal}
                    onOpenChange={setBannerImageModal}
                />

            </div>

        </>

    )

};
