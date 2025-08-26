"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/DashboardPage/app-sidebar"
import { DashboardChartArea } from "@/components/DashboardPage/dashboard-chart-area"
import { DashboardDataTable } from "@/components/DashboardPage/dashboard-data-table"
import { DashboardSectionCards } from "@/components/DashboardPage/dashboard-section-cards"
import { SiteHeader } from "@/components/DashboardPage/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import data from "./data.json"
import { StatisticsTabs } from "@/components/DashboardPage/statistics-tabs"
import { Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DollarSign, Network, Share, Users } from "lucide-react"
import { StatisticsBarChart } from "@/components/DashboardPage/statistics-bar-chart"
import { StatisticsDataTable } from "@/components/DashboardPage/statistics-data-table"
import { Publication } from "@/redux/user-store/userPublicationsSlice"
import { StatisticsWorldMap } from "@/components/DashboardPage/statistics-world-map"
import { Button } from "@/components/ui/button"
import { SubscribersPaymentsTable } from "@/components/DashboardPage/subscribers-payments-table"
import { Switch } from "@/components/ui/switch"


export default function Page() {
    // State for managing active tab with Dashboard as default
    const [activeTab, setActiveTab] = useState("Dashboard");

    // State for managing selected publication
    const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)

    const currentUserPublications = useAppSelector((state) => state.userPublications);

    // Set the first publication as default when publications are loaded
    // useEffect(() => {
    //     if (currentUserPublications.publications.length > 0 && !selectedPublication) {
    //         setSelectedPublication(currentUserPublications.publications[0]);
    //     }
    //     console.log("----------------Dashboard Publications:", currentUserPublications.publications)
    // }, [currentUserPublications.publications, selectedPublication]);


    return (
        <SidebarProvider
            className="font-playfair-display"
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarInset>

                {/* Site Header */}
                <SiteHeader
                    publications={currentUserPublications.publications}
                    selectedPublication={selectedPublication}
                    setSelectedPublication={setSelectedPublication}
                />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">

                        {/* Dashboard Tab */}
                        {activeTab === "Dashboard" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <DashboardSectionCards
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                                <div className="px-4 lg:px-6">
                                    <DashboardChartArea
                                        selectedPublication={selectedPublication}
                                        setSelectedPublication={setSelectedPublication}
                                    />
                                </div>
                                <DashboardDataTable
                                    data={data}
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                            </div>
                        )}

                        {/* Articles Tab */}
                        {activeTab === "Articles" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <DashboardSectionCards
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                                <div className="px-4 lg:px-6">
                                    <DashboardChartArea
                                        selectedPublication={selectedPublication}
                                        setSelectedPublication={setSelectedPublication}
                                    />
                                </div>
                                <DashboardDataTable
                                    data={data}
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                            </div>
                        )}

                        {/* Magazines Tab */}
                        {activeTab === "Magazines" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <DashboardSectionCards
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                                <div className="px-4 lg:px-6">
                                    <DashboardChartArea
                                        selectedPublication={selectedPublication}
                                        setSelectedPublication={setSelectedPublication}
                                    />
                                </div>
                                <DashboardDataTable
                                    data={data}
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                            </div>
                        )}

                        {/* Podcasts Tab */}
                        {activeTab === "Podcasts" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <DashboardSectionCards
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                                <div className="px-4 lg:px-6">
                                    <DashboardChartArea
                                        selectedPublication={selectedPublication}
                                        setSelectedPublication={setSelectedPublication}
                                    />
                                </div>
                                <DashboardDataTable
                                    data={data}
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                            </div>
                        )}

                        {/* Statistics Tab */}
                        {activeTab === "Statistics" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="px-4 lg:px-6">
                                    <StatisticsTabs
                                        selectedPublication={selectedPublication}
                                        setSelectedPublication={setSelectedPublication}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === "Subscribers" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <h3 className="text-lg font-semibold mb-4">Subscribers</h3>
                                <p className="text-muted-foreground mb-4">Detailed insights about your subscribers.</p>
                                <div className="flex flex-row gap-4 border rounded-4xl p-4">
                                    <StatisticsWorldMap />
                                </div>
                                <div className="mt-4 border p-4 rounded-4xl">
                                    <SubscribersPaymentsTable />
                                </div>
                                <div className="mt-4 border py-6 rounded-4xl">
                                    <StatisticsDataTable data={data} />
                                </div>
                            </div>
                        )}

                        {/* Recommendations Tab */}
                        {activeTab === "Recommendations" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 h-full align-center justify-center">
                                <div className="space-y-6 w-[60%] bg-background rounded-4xl mx-auto">
                                    {/* Top Card */}
                                    <div className="bg-background rounded-4xl border shadow-lg p-8 flex flex-col items-center text-center mb-4">
                                        <h2 className="text-xl font-bold mb-2">Recommend other Substacks</h2>
                                        <p className="text-sm text-muted-foreground mb-6 max-w-md">Help your subscribers find other great Substacks by recommending your favorites. <a href="#" className="underline">Learn more</a></p>
                                        <Button className="w-full max-w-xs  bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 px-4 rounded-full text-base">Add recommendation</Button>
                                    </div>
                                    {/* Suggested List */}
                                    <div className="bg-background rounded-4xl border shadow p-6 ">
                                        <div className="text-xs text-muted-foreground font-semibold mb-4 tracking-widest">Suggested</div>
                                        <div className="space-y-4">
                                            {/* Example suggestions, replace with dynamic data if available */}
                                            <div className="flex items-center justify-between p-2 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <img src="https://substackcdn.com/image/fetch/w_48,c_fill,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff6e2e2e2-1b2a-4e2e-8e2e-2e2e2e2e2e2e_48x48.png" alt="Racket News" className="h-10 w-10 rounded-full object-cover" />
                                                    <div>
                                                        <div className="font-semibold text-sm">Racket News</div>
                                                        <div className="text-xs text-muted-foreground">By Matt Taibbi</div>
                                                    </div>
                                                </div>
                                                <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-4 py-1.5 rounded-full text-sm">Recommend</Button>
                                            </div>
                                            <div className="flex items-center justify-between p-2 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <img src="https://substackcdn.com/image/fetch/w_48,c_fill,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff7e2e2e2-1b2a-4e2e-8e2e-2e2e2e2e2e2e_48x48.png" alt="First 1000" className="h-10 w-10 rounded-full object-cover" />
                                                    <div>
                                                        <div className="font-semibold text-sm">First 1000</div>
                                                        <div className="text-xs text-muted-foreground">By Ali A.</div>
                                                    </div>
                                                </div>
                                                <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-4 py-1.5 rounded-full text-sm">Recommend</Button>
                                            </div>
                                            <div className="flex items-center justify-between p-2 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <img src="https://substackcdn.com/image/fetch/w_48,c_fill,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff8e2e2e2-1b2a-4e2e-8e2e-2e2e2e2e2e2e_48x48.png" alt="Huddle Up" className="h-10 w-10 rounded-full object-cover" />
                                                    <div>
                                                        <div className="font-semibold text-sm">Huddle Up</div>
                                                        <div className="text-xs text-muted-foreground">By Joe Pompliano</div>
                                                    </div>
                                                </div>
                                                <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-4 py-1.5 rounded-full text-sm">Recommend</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payments Tab */}
                        {activeTab === "Payments" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="max-w-2xl border mx-auto bg-background rounded-xl shadow-lg p-8 text-primary space-y-8">
                                    {/* Payments Section */}
                                    <div className="border-b border-gray-700 pb-8 mb-8">
                                        <h2 className="text-2xl font-bold mb-4">Payments</h2>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div>
                                                <div className="font-semibold mb-1">Connect Stripe</div>
                                                <div className="text-sm text-muted-foreground mb-1">Takes about 5 minutes. This is how money from subscribers gets to your bank account. Stripe may display your business phone number and address on subscriber invoices unless hidden. <a href="#" className="underline">Learn more</a></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pledges Section */}
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Pledges</h2>
                                        {/* Allow readers to pledge subscriptions */}
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <div className="font-semibold">Allow readers to pledge subscriptions</div>
                                                <div className="text-sm text-muted-foreground max-w-lg">When turned on, readers of Amahle's Substack will be able to pledge to pay for a future paid subscription to Amahle's Substack</div>
                                            </div>
                                            <Switch />
                                        </div>

                                        {/* Monthly pledge amount */}
                                        <div className="mt-6">
                                            <div className="font-semibold">Monthly pledge amount</div>
                                            <div className="text-sm text-muted-foreground mb-2">The amount pledged subscribers are asked to pay per month.</div>
                                            <div className="flex gap-2 max-w-xs">
                                                <input type="number" defaultValue="8.00" step="0.01" className="w-24 rounded-md border border-gray-700 bg-background text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <select className="rounded-md border border-gray-700 bg-background text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>USD</option>
                                                    <option>EUR</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Annual pledge amount */}
                                        <div className="mt-6">
                                            <div className="font-semibold">Annual pledge amount</div>
                                            <div className="text-sm text-muted-foreground mb-2">The amount pledged subscribers are asked to pay per year.</div>
                                            <div className="flex gap-2 max-w-xs">
                                                <input type="number" defaultValue="80.00" step="0.01" className="w-24 rounded-md border border-gray-700 bg-background text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <select className="rounded-md border border-gray-700 bg-background text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>USD</option>
                                                    <option>EUR</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Founding pledge amount */}
                                        <div className="mt-6">
                                            <div className="font-semibold">Founding pledge amount</div>
                                            <div className="text-sm text-muted-foreground mb-2">The amount pledged founding members are asked to pay per year.</div>
                                            <div className="flex gap-2 max-w-xs">
                                                <input type="number" defaultValue="150.00" step="0.01" className="w-24 rounded-md border border-gray-700 bg-background text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <select className="rounded-md border border-gray-700 bg-background text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>USD</option>
                                                    <option>EUR</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Earnings Tab */}
                        {activeTab === "Earnings" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <DashboardSectionCards
                                selectedPublication={selectedPublication}
                                setSelectedPublication={setSelectedPublication}
                            />
                            <div className="px-4 lg:px-6">
                                <DashboardChartArea
                                    selectedPublication={selectedPublication}
                                    setSelectedPublication={setSelectedPublication}
                                />
                            </div>
                            <DashboardDataTable
                                data={data}
                                selectedPublication={selectedPublication}
                                setSelectedPublication={setSelectedPublication}
                            />
                        </div>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
