"use client"

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Star, X, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createPublication } from "@/redux/create-publication-store/createPublicationSlice";

export default function PremiumPage() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [selectedBillingCycle, setSelectedBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const publicationDetails = useAppSelector((state) => state.createPublication);
    const currentUser = useAppSelector((state) => state.user);

    const monthlyPlans = [
        {
            id: "monthly-premium",
            name: "Monthly Premium",
            price: "$9.99",
            period: "per month",
            description: "Perfect for getting started with your publication",
            features: [
                "Custom domain name",
                "Advanced analytics",
                "Monetization",
                "Algorythm Prioritization",
                "Customer Support",
            ],
            discount: "1 months free",
            discountMessage: "1 months Free, which means first payment will last 2 months until another debit",
            popular: false
        },
    ];

    const yearlyPlans = [
        {
            id: "yearly-premium",
            name: "Yearly Premium",
            price: "$90.00",
            period: "per year",
            description: "Better Value For Money",
            features: [
                "Custom domain name",
                "Advanced analytics",
                "Monetization",
                "Algorythm Prioritization",
                "Customer Support",
            ],
            discount: "3 months free",
            discountMessage: "3 months Free, which means first payment will last 1 year and 3 months until another debit",
            discountPercentage: "10%",
            popular: true,
        },
    ];

    const handlePlanSelection = (planId: string) => {
        setSelectedPlan(planId);
    };

    const handleBillingCycleChange = (value: string) => {
        setSelectedBillingCycle(value as "monthly" | "yearly");
        setSelectedPlan(null); // Reset selected plan when switching tabs
    };

    // Function to submit publication domain and user id
    const handleSubmitDomain = async () => {
        setLoading(true);
        setError("");

        try {
            // Store publication name in Redux
            dispatch(createPublication({ field: 'selectedPublicationName', value: selectedPlan }));

            // Route to appropriate payment page based on plan
            if (selectedPlan?.includes("monthly")) {
                router.push("./purchase-domain/pay-for-basic");
            } else if (selectedPlan?.includes("yearly")) {
                router.push("./purchase-domain/pay-for-pro");
            } else {
                // Fallback to basic if no plan is selected
                // router.push("./purchase-domain/pay-for-basic");
                return;
            }
        } catch (err) {
            setError("Publication Username Already Exists. Try Another Username");
        } finally {
            setLoading(false);
        }
    };

    console.log("------------------domain :", publicationDetails);

    console.log("Selected Plan: ", selectedPlan);

    const getCurrentPlans = () => {
        return selectedBillingCycle === "monthly" ? monthlyPlans : yearlyPlans;
    };

    const getSelectedPlanName = () => {
        if (!selectedPlan) return "Plan";
        const currentPlans = getCurrentPlans();
        const plan = currentPlans.find(p => p.id === selectedPlan);
        return plan ? plan.name : "Plan";
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-playfair-display">

            {/* Exit Button - Positioned absolutely in top left corner */}
            <button
                onClick={() => router.back()}
                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 transition-colors duration-200 shadow-sm"
                aria-label="Exit page"
            >
                <X className="w-5 h-5 text-foreground cursor-pointer" />
            </button>

            {/* Main Content - Scrollable */}
            <main className="flex-1 overflow-y-auto px-4 pb-10">
                <div className="bg-background rounded-lg p-6 w-full max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Choose Your Subscription Plan</h2>
                    </div>

                    {/* Billing Cycle Tabs */}
                    <div className="flex justify-center mb-8">
                        <Tabs value={selectedBillingCycle} onValueChange={handleBillingCycleChange} className="w-full max-w-md">
                            <TabsList className="w-full rounded-full h-10 justify-start mb-2 border bg-background shadow-lg">
                                <TabsTrigger
                                    value="monthly"
                                    className="cursor-pointer rounded-full p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50"
                                >
                                    Monthly
                                </TabsTrigger>
                                <TabsTrigger
                                    value="yearly"
                                    className="cursor-pointer rounded-full p-4 py-2 flex-1 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-50"
                                >
                                    Yearly
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Monthly Plans Tab */}
                    <Tabs value={selectedBillingCycle} onValueChange={handleBillingCycleChange}>
                        <TabsContent value="monthly" className="mt-0">
                            <div className="w-full flex justify-center mb-24">
                                {monthlyPlans.map((plan) => (
                                    <Card
                                        key={plan.id}
                                        className={cn(
                                            "relative cursor-pointer transition-all duration-200 hover:shadow-lg w-full max-w-md",
                                            selectedPlan === plan.id && "ring-2 ring-secondary",
                                            plan.popular && "border-secondary"
                                        )}
                                        onClick={() => handlePlanSelection(plan.id)}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                <div className="bg-secondary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                    Most Popular
                                                </div>
                                            </div>
                                        )}

                                        {selectedPlan === plan.id ? (
                                            <CircleCheck className="h-5 w-5 absolute text-secondary top-4 right-4" />
                                        ) : (
                                            ""
                                        )}

                                        <CardHeader className="text-center pb-3">
                                            <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-2xl font-bold">{plan.price}</span>
                                                <span className="text-sm text-muted-foreground">{plan.period}</span>
                                            </div>
                                            <CardDescription className="text-sm">{plan.description}</CardDescription>
                                            {plan.discount && (
                                                <div className="mt-2">
                                                    <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                                                        {plan.discount}
                                                    </div>
                                                </div>
                                            )}

                                        </CardHeader>

                                        <CardContent className="flex-1">
                                            <ul className="space-y-2">
                                                {plan.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {plan.discountMessage && (
                                                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                    <p className="text-xs text-blue-700 dark:text-blue-400 text-center">
                                                        {plan.discountMessage}
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Yearly Plans Tab */}
                        <TabsContent value="yearly" className="mt-0">
                            <div className="w-full flex justify-center mb-24">
                                {yearlyPlans.map((plan) => (
                                    <Card
                                        key={plan.id}
                                        className={cn(
                                            "relative cursor-pointer transition-all duration-200 hover:shadow-lg w-full max-w-md",
                                            selectedPlan === plan.id && "ring-2 ring-secondary",
                                        )}
                                        onClick={() => handlePlanSelection(plan.id)}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                <div className="bg-secondary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                    Most Popular
                                                </div>
                                            </div>
                                        )}

                                        {selectedPlan === plan.id ? (
                                            <CircleCheck className="h-5 w-5 text-secondary absolute top-4 right-4" />
                                        ) : (
                                            ""
                                        )}

                                        <CardHeader className="text-center pb-3">
                                            <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-2xl font-bold">{plan.price}</span>
                                                <span className="text-sm text-muted-foreground">{plan.period}</span>
                                            </div>
                                            <CardDescription className="text-sm">{plan.description}</CardDescription>
                                            {plan.discount && (
                                                <div className="mt-2">
                                                    <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                                                        {plan.discount}
                                                    </div>
                                                </div>
                                            )}
                                            {plan.discountPercentage && (
                                                <div className="mt-1">
                                                    <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                                                        Save {plan.discountPercentage}
                                                    </div>
                                                </div>
                                            )}
                                        </CardHeader>

                                        <CardContent className="flex-1">
                                            <ul className="space-y-2">
                                                {plan.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {plan.discountMessage && (
                                                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                    <p className="text-xs text-blue-700 dark:text-blue-400 text-center">
                                                        {plan.discountMessage}
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            {/* Fixed Continue Button at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-20">
                <div className="max-w-4xl mx-auto    flex flex-col justify-center items-center">
                    <Button
                        onClick={handleSubmitDomain}
                        className="w-full max-w-md mx-auto rounded-full bg-secondary text-xl text-secondary-foreground hover:bg-secondary/90 cursor-pointer"
                        disabled={!selectedPlan}
                    >
                        Continue with {getSelectedPlanName()}
                    </Button>

                    <p className="text-muted-foreground mt-4 text-sm text-center">
                        By subscribing, you agree to our Purchaser Terms of Service. Subscriptions auto-renew until canceled.
                        Cancel anytime.
                    </p>
                </div>
            </div>
        </div>
    );
}
