"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatisticsDropdown } from "./statistics-dropdown"
import useWindowSize from "@/hooks/useWindow"
import { StatisticsBarChart } from "./statistics-bar-chart"
import { ChartConfig } from "@/components/ui/chart"
import { StatisticsChartArea } from "./statistics-chart-area"
import { Publication } from "@/redux/user-store/userPublicationsSlice"
import { StatisticsWorldMap } from "./statistics-world-map"
import { StatisticsDataTable } from "@/components/DashboardPage/statistics-data-table"
import data from "@/app/dashboard/data.json"
import { StatisticsPaymentTable } from "./statistics-payment-table"


interface StatisticsTabsProps {
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
} satisfies ChartConfig

export function StatisticsTabs({ selectedPublication, setSelectedPublication }: StatisticsTabsProps) {
    const { width } = useWindowSize();
    const tabs = ["Network", "Audience", "Pledges", "Sharing", "Traffic", "Email", "Surveys"];

    // Show dropdown for screens smaller than 500px
    if (width < 500) {
        return <StatisticsDropdown
            selectedPublication={selectedPublication}
            setSelectedPublication={setSelectedPublication}
        />
    }

    // Function to render content based on selected tab
    const renderTabContent = (tab: string) => {
        const publicationName = selectedPublication ? (selectedPublication.publication_name || selectedPublication.publication_username) : "All Publications";

        return (
            <>
                {/* Network Statistics Tab */}
                {tab === "Network" && (
                    <div className="rounded-lg border p-6">
                        <StatisticsChartArea
                            selectedPublication={selectedPublication}
                            setSelectedPublication={setSelectedPublication}
                        />
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsDataTable data={data} />
                        </div>
                    </div>
                )}

                {/* Audience Statistics Tab */}
                {tab === "Audience" && (
                    <div className="rounded-lg border p-6">
                        <h3 className="text-lg font-semibold mb-4">{publicationName} - Audience Analytics</h3>
                        <p className="text-muted-foreground mb-4">Detailed insights about your audience demographics and behavior.</p>
                        <div className="flex flex-row gap-4 border rounded-4xl p-4">
                            <StatisticsWorldMap />
                        </div>
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsBarChart data={chartData} config={chartConfig} />
                        </div>
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsDataTable data={data} />
                        </div>
                    </div>
                )}

                {/* Pledges Statistics Tab */}
                {tab === "Pledges" && (
                    <div className="rounded-lg border p-6">
                        <h3 className="text-lg font-semibold mb-4">{publicationName} - Pledge Metrics</h3>
                        <p className="text-muted-foreground mb-4">Track pledge fulfillment and supporter engagement.</p>
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsPaymentTable />
                        </div>
                    </div>
                )}

                {tab === "Sharing" && (
                    <div className="rounded-lg border p-6">
                        <h3 className="text-lg font-semibold mb-4">{publicationName} - Sharing Analytics</h3>
                        <p className="text-muted-foreground mb-4">Monitor content sharing and social media engagement.</p>
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsDataTable data={data} />
                        </div>
                    </div>
                )}

                {tab === "Traffic" && (
                    <div className="rounded-lg border p-6">
                        <h3 className="text-lg font-semibold mb-4">{publicationName} - Traffic Overview</h3>
                        <p className="text-muted-foreground mb-4">Website and app traffic patterns and sources.</p>
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsBarChart data={chartData} config={chartConfig} />
                        </div>
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsDataTable data={data} />
                        </div>
                    </div>
                )}

                {tab === "Email" && (
                    <div className="rounded-lg border p-6">
                        <h3 className="text-lg font-semibold mb-4">{publicationName} - Email Campaigns</h3>
                        <p className="text-muted-foreground mb-4">Email marketing performance and subscriber engagement.</p>
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsDataTable data={data} />
                        </div>
                    </div>
                )}

                {tab === "Surveys" && (
                    <div className="rounded-lg border p-6">
                        <h3 className="text-lg font-semibold mb-4">{publicationName} - Survey Results</h3>
                        <p className="text-muted-foreground mb-4">Collect and analyze audience feedback and preferences.</p>
                        <div className="mt-4 border py-6 rounded-4xl">
                            <StatisticsDataTable data={data} />
                        </div>
                    </div>
                )}
            </>
        );
    };

    // Show tabs for screens 500px and above
    return (
        <Tabs defaultValue="Network" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
                {tabs.map((tab) => (
                    <TabsTrigger key={tab} value={tab} className="text-xs">
                        {selectedPublication ? `${selectedPublication.publication_name || selectedPublication.publication_username} - ${tab}` : tab}
                    </TabsTrigger>
                ))}
            </TabsList>

            {tabs.map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-6">
                    {renderTabContent(tab)}
                </TabsContent>
            ))}
        </Tabs>
    )
}
