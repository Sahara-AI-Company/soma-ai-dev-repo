"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Publication } from "@/redux/user-store/userPublicationsSlice"
import { StatisticsBarChart } from "./statistics-bar-chart"
import { StatisticsChartArea } from "./statistics-chart-area"

interface StatisticsDropdownProps {
    selectedPublication: Publication | null;
    setSelectedPublication: (publication: Publication | null) => void;
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} 

export function StatisticsDropdown({ selectedPublication, setSelectedPublication }: StatisticsDropdownProps) {
  const [selectedTab, setSelectedTab] = useState("Network")
  const tabs = ["Network", "Audience", "Pledges", "Sharing", "Traffic", "Email", "Surveys"]

  // Function to render content based on selected tab
  const renderTabContent = (tab: string) => {
    const publicationName = selectedPublication ? (selectedPublication.publication_name || selectedPublication.publication_username) : "All Publications";
    
    return (
      <>
        {tab === "Network" && (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{publicationName} - Network Statistics</h3>
            <p className="text-muted-foreground mb-4">Network performance and connectivity metrics for your publication.</p>
            <StatisticsChartArea 
              selectedPublication={selectedPublication}
              setSelectedPublication={setSelectedPublication}
            />
          </div>
        )}
        
        {tab === "Audience" && (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{publicationName} - Audience Analytics</h3>
            <p className="text-muted-foreground mb-4">Detailed insights about your audience demographics and behavior.</p>
            <StatisticsBarChart data={chartData} config={chartConfig} />
          </div>
        )}
        
        {tab === "Pledges" && (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{publicationName} - Pledge Metrics</h3>
            <p className="text-muted-foreground mb-4">Track pledge fulfillment and supporter engagement.</p>
            <div className="text-center text-muted-foreground">
              <p>Pledge tracking dashboard coming soon...</p>
            </div>
          </div>
        )}
        
        {tab === "Sharing" && (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{publicationName} - Sharing Analytics</h3>
            <p className="text-muted-foreground mb-4">Monitor content sharing and social media engagement.</p>
            <div className="text-center text-muted-foreground">
              <p>Sharing analytics dashboard coming soon...</p>
            </div>
          </div>
        )}
        
        {tab === "Traffic" && (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{publicationName} - Traffic Overview</h3>
            <p className="text-muted-foreground mb-4">Website and app traffic patterns and sources.</p>
            <StatisticsChartArea 
              selectedPublication={selectedPublication}
              setSelectedPublication={setSelectedPublication}
            />
          </div>
        )}
        
        {tab === "Email" && (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{publicationName} - Email Campaigns</h3>
            <p className="text-muted-foreground mb-4">Email marketing performance and subscriber engagement.</p>
            <div className="text-center text-muted-foreground">
              <p>Email analytics dashboard coming soon...</p>
            </div>
          </div>
        )}
        
        {tab === "Surveys" && (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{publicationName} - Survey Results</h3>
            <p className="text-muted-foreground mb-4">Collect and analyze audience feedback and preferences.</p>
            <div className="text-center text-muted-foreground">
              <p>Survey analytics dashboard coming soon...</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-full">
      <Select value={selectedTab} onValueChange={setSelectedTab}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {tabs.map((tab) => (
            <SelectItem key={tab} value={tab}>
              {selectedPublication ? `${selectedPublication.publication_name || selectedPublication.publication_username} - ${tab}` : tab}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="mt-6">
        {renderTabContent(selectedTab)}
      </div>
    </div>
  )
}
