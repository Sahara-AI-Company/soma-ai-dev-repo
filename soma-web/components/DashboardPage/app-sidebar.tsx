"use client"

import * as React from "react"
import {
    IconCamera, IconChartBar, IconDashboard, IconDatabase, IconFileAi, IconFileDescription, IconFileWord, IconFolder,
    IconHelp, IconInnerShadowTop, IconListDetails, IconReport, IconSearch, IconSettings, IconUsers,
} from "@tabler/icons-react"
import { Book, ChartNoAxesColumnIncreasing, ChartNoAxesCombined, DollarSign, FileText, Mic, UserRoundCheck, UsersRound } from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useAuth } from "@/context/auth-context"



interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

export function AppSidebar({ activeTab, setActiveTab, ...props }: AppSidebarProps) {

    // Get user data from Redux
    const { isAuthenticated } = useAuth();
    const currentUser = useAppSelector((state) => state.user);

    const data = {
        user: {
            name: currentUser.fullName || "User",
            email: currentUser.email || "user@example.com",
            avatar: currentUser.profilePicture || "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Dashboard",
                url: "#",
                icon: ChartNoAxesColumnIncreasing,
            },
            {
                title: "Articles",
                url: "#",
                icon: FileText,
            },
            {
                title: "Magazines",
                url: "#",
                icon: Book,
            },
            {
                title: "Podcasts",
                url: "#",
                icon: Mic,
            },
            {
                title: "Statistics",
                url: "#",
                icon: ChartNoAxesCombined,
            },
            {
                title: "Subscribers",
                url: "#",
                icon: UserRoundCheck,
            },
            {
                title: "Recommendations",
                url: "#",
                icon: UsersRound,
            },
            {
                title: "Payments",
                url: "#",
                icon: IconDatabase,
            },
            {
                title: "Earnings",
                url: "#",
                icon: DollarSign,
            },
        ],
        navClouds: [
            {
                title: "Capture",
                icon: IconCamera,
                isActive: true,
                url: "#",
                items: [
                    {
                        title: "Active Proposals",
                        url: "#",
                    },
                    {
                        title: "Archived",
                        url: "#",
                    },
                ],
            },
            {
                title: "Proposal",
                icon: IconFileDescription,
                url: "#",
                items: [
                    {
                        title: "Active Proposals",
                        url: "#",
                    },
                    {
                        title: "Archived",
                        url: "#",
                    },
                ],
            },
            {
                title: "Prompts",
                icon: IconFileAi,
                url: "#",
                items: [
                    {
                        title: "Active Proposals",
                        url: "#",
                    },
                    {
                        title: "Archived",
                        url: "#",
                    },
                ],
            },
        ],
        navSecondary: [
            {
                title: "Settings",
                url: "/dashboard/settings",
                icon: IconSettings,
            },
            {
                title: "Get Help",
                url: "#",
                icon: IconHelp,
            },
        ],
        // important: [
        //     {
        //         name: "Payments",
        //         url: "#",
        //         icon: IconDatabase,
        //     },
        //     {
        //         name: "Recommendations",
        //         url: "#",
        //         icon: IconReport,
        //     },
        //     {
        //         name: "Branding",
        //         url: "#",
        //         icon: IconFileWord,
        //     },
        // ],
    }


    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <img src="/somapng.png" alt="Logo" className="w-13 h-13" />
                                <span className="text-3xl font-semibold text-secondary">SOMA</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} activeTab={activeTab} setActiveTab={setActiveTab} />
                {/* <NavDocuments items={data.important} /> */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
