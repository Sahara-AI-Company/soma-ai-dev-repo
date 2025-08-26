'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    UserCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { GalleryVerticalEnd, House, Inbox, Mic, Plus, Book, FileText, Mic2, BookOpen, Settings, HelpCircle, LogOut, Library, Users, Gift, LinkIcon, Copy, DollarSign, Sparkles, Feather, ChartNoAxesColumnIncreasing } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetHeader,
} from "@/components/profile-page/sheet";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/auth-context';
import { useAppSelector } from '@/redux/hooks';
import { IconDashboard } from '@tabler/icons-react';

const navigation = [
    { name: 'Home', href: '/home', icon: House },
    { name: 'Inbox', href: '/home/inbox', icon: Inbox },
    { name: 'Post', href: '/home/add', icon: Plus },
    { name: 'Magazines', href: '/home/magazines', icon: Book },
    { name: 'Podcasts', href: '/home/podcasts', icon: Mic },
];

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

    // selectedWriter useState()
    const [profileSheetOpen, setProfileSheetOpen] = useState(false);
    const postMenuRef = useRef<HTMLDivElement>(null);

    // Auth Context
    const { logout } = useAuth();

    // Current User Redux State
    const currentUser = useAppSelector((state) => state.user);

    // User Auth
    const { isAuthenticated } = useAuth();

    // Handle Click Outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (postMenuRef.current && !postMenuRef.current.contains(event.target as Node)) {
                setIsPostMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const postOptions = [
        { name: 'Article', href: '/post', icon: FileText },
        { name: 'Magazine', href: '/post/magazine', icon: Book },
        { name: 'Podcast', href: '/post/podcast', icon: Mic },
    ];





    return (
        <div className="flex h-screen bg-background font-playfair-display">
            {/* Sidebar - Hidden on medium and small screens */}

            {/* Desktop Sidebar */}
            {typeof window !== 'undefined' && window.innerWidth > 639 ? (
                <div className="w-20 bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.30)] flex flex-col h-full">

                    {/* Navigation */}
                    <nav className="flex-1 flex flex-col justify-center py-4 bg-background border-r">
                        <div className="space-y-2 p-3">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                const isPost = item.name === 'Post';

                                return (
                                    <div key={item.name} className="relative">
                                        <Link
                                            href={isPost ? '#' : item.href}
                                            onClick={(e) => {
                                                if (isPost) {
                                                    e.preventDefault();
                                                    setIsPostMenuOpen(!isPostMenuOpen);
                                                }
                                            }}
                                            className={`group relative flex items-center justify-center py-2 text-primary rounded-lg ${isPost
                                                ? 'bg-[rgb(59,130,246)] hover:bg-[rgb(37,99,235)]'
                                                : 'hover:bg-muted'
                                                }`}
                                        >
                                            <div className="p-1.5 rounded-lg">
                                                <item.icon className={`h-6 w-6 ${isActive ? 'text-blue-500' : ''} ${isPost ? 'text-white' : ''}`} />
                                            </div>
                                            {/* Tooltip */}
                                            <div className="border border-secondary absolute left-full ml-2 px-2 py-1 bg-background text-[rgb(59,130,246)] text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] rounded-sm pointer-events-none">
                                                {item.name}
                                            </div>
                                        </Link>

                                        {/* Post Options Menu */}
                                        {isPost && isPostMenuOpen && (
                                            <div
                                                ref={postMenuRef}
                                                className="absolute left-full ml-5 top-[-81] space-y-6 animate-in fade-in slide-in-from-left-2 duration-200 z-[100]"
                                            >
                                                {postOptions.map((option) => (
                                                    <Link
                                                        key={option.name}
                                                        href={option.href}
                                                        className="group relative flex items-center gap-2 bg-[rgb(59,130,246)] hover:bg-[rgb(37,99,235)] text-white px-5 py-4 rounded-lg whitespace-nowrap transition-colors"
                                                    >
                                                        <div className="group relative flex items-center gap-2">
                                                            <option.icon className="h-6 w-6 text-white" />
                                                            {/* Tooltip */}
                                                            <div className="border border-secondary absolute left-full ml-6 px-2 py-1 bg-background text-[rgb(59,130,246)] text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] rounded-sm pointer-events-none">
                                                                Create {option.name}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Profile Section */}
                    <div className="p-4 border-t mt-auto border-r">

                        {/* User Profile Picture */}
                        <div>
                            {currentUser.profilePicture === null ? (
                                <div
                                    onClick={() => setProfileSheetOpen(true)}
                                    className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold cursor-pointer text-xl"
                                >
                                    {currentUser.username.charAt(0).toUpperCase()}
                                </div>
                            ) : (
                                <img
                                    src={currentUser.profilePicture}
                                    alt="Profile"
                                    onClick={() => setProfileSheetOpen(true)}
                                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                />
                            )}
                        </div>

                        {/* Profile Option Sheet */}
                        <Sheet
                            open={profileSheetOpen}
                            onOpenChange={setProfileSheetOpen}
                        >
                            <SheetContent side="bottom" className="w-200px sm:w-[350px] rounded-lg fixed bottom-5 left-25 h-[640px] font-playfair-display">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Profile Menu</SheetTitle>
                                </SheetHeader>
                                {profileSheetOpen && (
                                    <>
                                        {!isAuthenticated ? (
                                            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
                                                <h3 className="text-xl font-semibold text-center">Please Login to View Profile</h3>
                                                <p className="text-sm text-gray-600 text-center">
                                                    Create an account or login to access your profile and settings.
                                                </p>
                                                <Link href="/login" className="w-full flex justify-center">
                                                    <Button
                                                        className="w-[160px] bg-secondary text-white hover:bg-secondary/90 cursor-pointer"
                                                        onClick={() => setProfileSheetOpen(false)}
                                                    >
                                                        Login to Continue
                                                    </Button>
                                                </Link>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Header */}
                                                <div className="flex items-center justify-between p-2 border-b w-full">
                                                    <Link href="/home/profile" className="flex items-center w-full gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                        {currentUser.profilePicture === null ? (
                                                            <div
                                                                onClick={() => setProfileSheetOpen(true)}
                                                                className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold cursor-pointer text-xl"
                                                            >
                                                                {currentUser.username.charAt(0).toUpperCase()}
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={currentUser.profilePicture}
                                                                alt="Profile"
                                                                onClick={() => setProfileSheetOpen(true)}
                                                                className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                                            />
                                                        )}
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold">@{currentUser.username}</span>
                                                            <span className="text-xs text-gray-500">{currentUser.email}</span>
                                                        </div>
                                                    </Link>
                                                    {/* <button onClick={() => setProfileSheetOpen(false)} className="p-1 hover:bg-muted rounded-full cursor-pointer">
                                                        <XMarkIcon className="h-6 w-6" />
                                                    </button> */}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 overflow-y-hidden">
                                                    <div className="">
                                                        {/* Profile Section */}
                                                        <div className="p-2 border-b">
                                                        <Link href="/premium" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                                <Feather className="h-5 w-5 text-primary" />
                                                                <span>Premium</span>
                                                            </Link>
                                                            <Link href="/home/mylibrary" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                                <Library className="h-5 w-5 text-primary" />
                                                                <span>Library</span>
                                                            </Link>
                                                            <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                                <ChartNoAxesColumnIncreasing className="h-5 w-5 text-primary" />
                                                                <span>Dashboard</span>
                                                            </Link>
                                                        </div>

                                                        {/* Account Management Section */}
                                                        <div className="p-2 border-b">
                                                            <Link href="/my-publication" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                                <GalleryVerticalEnd className="h-5 w-5 text-primary" />
                                                                <span>Manage Publications</span>
                                                            </Link>
                                                            <Link href="/home/settings" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md ">
                                                                <Settings className="h-5 w-5 text-primary" />
                                                                <span>Settings</span>
                                                            </Link>
                                                            <Link href="/home/help" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                                <HelpCircle className="h-5 w-5 text-primary" />
                                                                <span>Help</span>
                                                            </Link>
                                                        </div>

                                                        {/* Membership Section */}
                                                        <div className="p-2">
                                                            <Link href="/monetization" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                                <DollarSign className="h-5 w-5 text-primary" />
                                                                <span>Monetization</span>
                                                            </Link>
                                                            <Link href="/home/giftamembership" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                                <Gift className="h-5 w-5 text-primary" />
                                                                <span>Gift A Membership</span>
                                                            </Link>
                                                            <div className="flex items-center justify-between gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                                                                <div className="flex items-center gap-2">
                                                                    <LinkIcon className="h-5 w-5 text-primary" />
                                                                    <span>Referral Link</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Copy className="h-5 w-5 text-primary" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Sign Out Section - Fixed at bottom */}
                                                <div className="p-4 border-t mt-auto">
                                                    <button
                                                        onClick={async () => {
                                                            await logout();
                                                            window.location.href = '/authentication';
                                                        }}
                                                        className="flex items-center gap-3 p-2 hover:bg-muted rounded-md w-full text-left text-red-600 cursor-pointer"
                                                    >
                                                        <LogOut className="h-5 w-5" />
                                                        <span>Sign Out</span>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            ) : null}

            {/* Main Content */}
            <div className="flex-1 overflow-auto pb-16 md:pb-0">
                {children}
            </div>

            {/* Bottom Navigation - Visible only on small screens */}
            {typeof window !== 'undefined' && window.innerWidth <= 639 ? (
                <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-[0_2px_5px_-2px_rgba(0,0,0,0.30)]">
                    <nav className="flex items-center justify-around py-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            const isPost = item.name === 'Post';

                            return (
                                <div key={item.name} className="relative">
                                    <Link
                                        href={isPost ? '/home/add' : item.href}
                                        className={`flex flex-col items-center justify-center p-2 rounded-lg w-15 h-15 ${isPost
                                            ? 'text-white bg-[rgb(59,130,246)] hover:bg-[rgb(37,99,235)]'
                                            : isActive
                                                ? 'text-blue-500'
                                                : 'text-gray-500'
                                            }`}
                                    >
                                        <item.icon className="h-6 w-6" />
                                    </Link>
                                </div>
                            );
                        })}
                    </nav>
                </div>
            ) : null}
        </div>
    );
}
