"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Plus } from 'lucide-react';
import { CreateContentDialog } from "./HomePage/createContentDialog";
import { useState } from "react";

interface NavMainProps {
    items: { title: string; url: string; icon?: any }[];
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

export function NavMain({ items, activeTab, setActiveTab }: NavMainProps) {

    // Add new state for create modal()
    const [showCreateModal, setShowCreateModal] = useState(false);

    
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="Create"
                            onClick={() => setShowCreateModal(true)}
                            className="bg-secondary flex-row align-items justify-between text-primary-foreground hover:bg-secondary/90 hover:text-primary-foreground active:bg-secondary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                        >
                            <span className="text-lg">Create</span>
                            <Plus className="h-6 w-6" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton 
                                tooltip={item.title}
                                onClick={() => setActiveTab?.(item.title)}
                                className={activeTab === item.title ? "bg-accent text-accent-foreground" : ""}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>

            {/* Create Content Modal */}
            <CreateContentDialog
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
            />
        </SidebarGroup>
    )
}
