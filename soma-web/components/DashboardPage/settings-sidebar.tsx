import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail } from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

// Navigation data with tab identifiers
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Basics",
          url: "#",
          id: "basics",
        },
        {
          title: "Payments",
          url: "#",
          id: "payments",
        },
      ],
    },
    {
      title: "Appearance",
      url: "#",
      items: [
        {
          title: "Website",
          url: "#",
          id: "website",
        },
        {
          title: "Welcome Page",
          url: "#",
          id: "welcome-page",
        },
        {
          title: "Branding",
          url: "#",
          id: "branding",
        },
      ],
    },
    {
      title: "Content",
      url: "#",
      items: [
        {
          title: "Email",
          url: "#",
          id: "email",
        },
        {
          title: "Community",
          url: "#",
          id: "community",
        },
        {
          title: "Chat",
          url: "#",
          id: "chat",
        },
        {
          title: "Sections",
          url: "#",
          id: "sections",
        },
      ],
    },
    {
      title: "Administration",
      url: "#",
      items: [
        {
          title: "Team",
          url: "#",
          id: "team",
        },
        {
          title: "Privacy",
          url: "#",
          id: "privacy",
        },
        {
          title: "Notifications",
          url: "#",
          id: "notifications",
        },
        {
          title: "Connections",
          url: "#",
          id: "connections",
        },
      ],
    },
    {
      title: "Advanced",
      url: "#",
      items: [
        {
          title: "Domain",
          url: "#",
          id: "domain",
        },
        {
          title: "Analytics",
          url: "#",
          id: "analytics",
        },
        {
          title: "Details",
          url: "#",
          id: "details",
        },
        {
          title: "Import / Export",
          url: "#",
          id: "import-export",
        },
        {
          title: "Danger Zone",
          url: "#",
          id: "danger-zone",
        },
      ],
    },
  ],
}

export function AppSidebar({ activeTab = "basics", onTabChange, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className=" flex aspect-square items-center justify-center rounded-lg">
                  <img src="/somapng.png" alt="Logo" className="w-13 h-13" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-secondary text-2xl font-playfair-display">SOMA</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                          asChild 
                          isActive={activeTab === subItem.id}
                        >
                          <button 
                            onClick={() => onTabChange?.(subItem.id)}
                            className="w-full text-left"
                          >
                            {subItem.title}
                          </button>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
