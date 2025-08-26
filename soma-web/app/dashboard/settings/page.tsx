"use client"

import { AppSidebar } from "@/components/DashboardPage/settings-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import PublicationCategories from "@/components/DashboardPage/publication-categories"
import PublicationSubcategories from "@/components/DashboardPage/publication-subcategories"

export default function Page() {
    const [activeTab, setActiveTab] = useState("basics");

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [subcategorySearch, setSubcategorySearch] = useState("");
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
    const [categorySearch, setCategorySearch] = useState("");
    const [categoryInputFocused, setCategoryInputFocused] = useState(false);
    const [subcategoryInputFocused, setSubcategoryInputFocused] = useState(false);



    const [allCategories, setAllCategories] = useState([
        "Family", "Health", "Relationships", "Sexuality", "Home", "Food", "Pets", "Mental Health", "Productivity", "Mindfulness", "Business", "Marketing", "Leadership", "Work", "Artificial Intelligence",
        "Blockchain", "Data Science", "Gadgets", "Makers", "Security", "Technology", "Design", "Project Management", "Programming", "Dev Ops", "Operating Systems", "Writing", "Art", "Gaming", "Humor",
        "Movies", "Music", "News", "Photography", "Podcasts", "Television", "Economics", "Education", "Equality", "Finance", "Law", "Transportation", "Politics", "Race", "Science", "Mathematics", "Drugs",
        "Philosophy", "Religion", "Spirituality", "Cultural Studies", "Fashion", "Beauty", "Language", "Sports", "Cities", "Nature", "Travel"
    ]);

    // Sample mapping of categories to subcategories (customize as needed)
    const categoryToSubcategories: Record<string, string[]> = {
        "Family": ["Adoption", "Children", "Elder Care", "Fatherhood", "Motherhood", "Parenting", "Pregnancy", "Seniors"],
        "Health": ["Aging", "Coronavirus", "Covid-19", "Death And Dying", "Disease", "Fitness", "Healthcare", "Mental Health", "Nutrition", "Sleep", "Trans Healthcare", "Vaccines", "Weight Loss", "Womens Health"],
        "Relationships": ["Dating", "Divorce", "Friendship", "Love", "Marriage", "Polymary"],
        "Sexuality": ["BDSM", "Erotica", "Kink", "Sex", "Sexual Health"],
        "Home": ["Architecture", "Home Improvement", "Homeownership", "Interior Design", "Rental Property", "Vacation Rental"],
        "Food": ["Cooking", "Desserts", "Drinks", "Gluten-Free", "Healthy", "Meat", "Pasta", "Pizza", "Salad", "Sandwiches", "Seafood", "Sides", "Soups", "Vegan", "Vegetarian"],
        "Pets": ["Cats", "Dogs", "Fish", "Horses", "Other Pets", "Reptiles", "Small Pets", "Wildlife"],
        "Mental Health": ["Anxiety", "Couseling", "Grief", "Life Lessons", "Self-Awareness", "Bipolar", "Depression", "Eating Disorders", "Grief", "LGBTQ+", "Mental Health", "PTSD", "Self-Help", "Stress", "Suicide", "Trauma"],
        "Productivity": ["Career Advice", "Coaching", "Goal Setting", "Morning Routines", "Pomodoro Technique", "Time Management", "To-Do Lists", "Workflow", "Time Management", "Work Life Balance"],
        "Mindfulness": ["Mediation", "Journaling", "Mediation", "Transcendental Mediation", "Yoga"],
        "Business": ["Business", "Freelancing", "Small Business", "Startups", "Venture Capital"],
        "Marketing": ["Advertising", "Branding", "Content Marketing", "Content Strategy", "Digital Marketing", "SEO", "Social Media", "Storytelling For Business"],
        "Leadership": ["Employee Engagement", "Leadership Development", "Management", "Meetings", "Org Charts", "Thought Leadership"],
        "Work": ["Company Retreats", "Digital Nomads", "Distributed Teams", "Future Of Work", "Work From Home", "Remote Work"],
        "Artificial Intelligence": ["ChatGPT", "Conversational AI", "Deep Learning", "Large Language Models", "Machine Learning", "NLP", "Voice Assistants"],
        "Blockchain": ["Bitcoin", "Decentralized Finance", "Cryptocurrency", "Ethereum", "NFTs", "Smart Contracts", "Web3"],
        "Data Science": ["Data Analysis", "Data Visualization", "Data Engineering", "Data Mining", "Data Modeling", "Database Design", "Tools", "Libraries", "Frameworks", "Projects", "Tutorials", "SQL"],
        "Gadgets": ["eBook", "Internet Of Things", "Tablets", "Smart Home", "Smartphones", "Wearables", "Laptops", "Computers", "VR Glasses", "AR Glasses", "TVs"],
        "Makers": ["3D Printing", "Arduino", "DIY", "Raspberry Pi", "Robotics"],
        "Security": ["Cybersecurity", "Data Security", "Encryption", "Infosec", "Passwords", "Privacy"],
        "Technology": ["Amazon", "Apple", "Google", "Mastodon", "Medium", "Meta", "Microsoft", "Tiktok", "Twitter"],
        "Design": ["Accessibility", "Designs Systems", "Design Thinking", "Graphic Design", "Icon Design", "Inclusive Design", "Product Design", "Typography", "UX Design", "UI Design"],
        "Project Management": ["Agile", "Kanban", "Scrum", "Waterfall", "Innovation", "Kanban", "Lean Startup", "MVP", "Product", "Strategy", "Project Planning", "Project Execution", "Project Monitoring", "Project Evaluation", "Project Closure"],
        "Programming": ["Android Development", "Coding", "Flutter", "Frontend Engineering", "iOS Development", "Mobile Development", "Software Engineering", "Web Development", "Angular", "CSS", "HTML", "JavaScript", "Python", "React", "React Native", "Ruby", "Rust", "Swift", "TypeScript", "Vue", "Webpack", "WordPress", "Xamarin", "Yarn", "Zapier"],
        "Dev Ops": ["AWS", "Databricks", "Docker", "Kubernetes", "Terraform"],
        "Operating Systems": ["Android", "iOS", "Linux", "MacOS", "Windows"],
        "Writing": ["30 Day Challenge", "Book Reviews", "Books", "Creative Nonfiction", "Diary", "Fiction", "Haiku", "Hello World", "Memior", "Nonfiction", "Personal Essay", "Poetry", "Screenwriting", "Short Stories", "This Happened", "Writing Prompts", "Writing Tips"],
        "Art": ["Comics", "Contemporary Art", "Drawing", "Fine Art", "Graphic Design", "Illustration", "Painting", "Photography", "Sculpture", "Typography", "Generative Art", "Illustration", "Painting", "Portraits", "Street Art"],
        "Game Design": ["Game Design", "Game Development", "Indie Game", "Metaverse", "Nintendo", "Playstation", "Videogames", "Virtual Reality", "Xbox"],
        "Philosophy": ["Atheism", "Epistemology", "Ethics", "Existentialism", "Feminism", "Freud", "Gandhi", "Hegel", "Hume", "Kant", "Marx", "Nietzsche", "Plato", "Postmodernism", "Psychoanalysis", "Religion", "Socrates", "Stoicism", "Wittgenstein"],
        "Religion": ["Buddhism", "Christianity", "Hinduism", "Islam", "Judaism", "Latter-Day Saints", "Mormonism", "Orthodox Christianity", "Protestantism", "Sikhism", "Spirituality", "Zoroastrianism"],
        "Spirituality": ["Astrology", "Energy Healing", "Horoscopes", "Mysticism", "New Age", "Occult", "Parapsychology", "Psychology", "Reiki", "Tarot", "Voodoo"],
        "Cultural Studies": ["Ancient History", "Anthropology", "Cultural Heritage", "Digital Life", "History", "Museums", "Sociology", "Tradition"],
        "Fashion": ["Accessories", "Clothing", "Design", "Jewelry", "Shoes", "Style", "Trends", "Luxury Fashion"],
        "Language": ["Chinese", "English", "French", "German", "Italian", "Japanese", "Korean", "Portuguese", "Russian", "Spanish", "Turkish", "Vietnamese", "Arabic", "Hebrew", "Hindi", "Indonesian", "Malay", "Thai", "Turkish", "Urdu", "Dutch", "Polish", "Portuguese", "Romanian", "Serbian", "Slovak", "Slovenian", "Swedish", "Thai", "Turkish", "Ukrainian", "Vietnamese", "Arabic", "Hebrew", "Hindi", "Indonesian", "Malay", "Thai", "Turkish", "Urdu", "Dutch", "Polish", "Portuguese", "Romanian", "Serbian", "Slovak", "Slovenian", "Swedish", "Thai", "Turkish", "Ukrainian", "Vietnamese", "Arabic", "Hebrew", "Hindi", "Indonesian", "Malay", "Thai", "Turkish", "Urdu", "Dutch"],
        "Sports": ["Football(soccer)", "Gridiron Football", "Hockey", "Rugby", "Tennis", "Basketball", "Baseball", "Cricket", "Golf", "Soccer", "Volleyball", "Water Polo", "Wrestling", "Boxing", "MMA", "Mixed Martial Arts", "Wrestling", "Boxing", "MMA"],
        "Cities": ["Amsterdam", "Athens", "Berlin", "Buenos Aires", "Cairo", "Cape Town", "Dubai", "Edinburgh", "Florence", "Geneva", "Hong Kong", "Istanbul", "Jerusalem", "Kuala Lumpur", "Lisbon", "London", "Los Angeles", "Madrid", "Melbourne", "Mexico City", "Milan", "Montreal", "Moscow", "Munich", "New York", "Oslo", "Paris", "Prague", "Rome", "San Francisco", "Sao Paulo", "Seoul", "Shanghai", "Singapore", "Stockholm", "Sydney", "Tokyo", "Toronto", "Vienna", "Warsaw", "Wellington", "Zurich"],
        "Beauty": ["Beauty", "Tips", "Products", "News", "Reviews", "Tutorials", "How-To", "Tips", "Products", "Trends", "News", "Reviews", "Tutorials", "How-To"],
        "Nature": ["Birding", "Camping", "Climate Change", "Conservation", "Ecology", "Environment", "Extinction", "Global Warming", "Green Living", "Pollution", "Recycling", "Sustainability", "Wildlife", "Hiking"],
        "Travel": ["Tourism", "Travel Tips", "Travel Writing", "Vacation", "Vanlife"]
    };

    // Compute available subcategories based on selected categories
    const availableSubcategories = selectedCategories
        .flatMap((cat) => categoryToSubcategories[cat] || [])
        .filter((sub, idx, arr) => arr.indexOf(sub) === idx); // unique

    const filteredSubcategories = availableSubcategories.filter(
        (sub) =>
            sub.toLowerCase().includes(subcategorySearch.toLowerCase()) &&
            !selectedSubcategories.includes(sub)
    );

    // Filtered Categories
    const filteredCategories = allCategories.filter(
        (cat) =>
            cat.toLowerCase().includes(categorySearch.toLowerCase()) &&
            !selectedCategories.includes(cat)
    );

    // Form state for Basics tab
    const [publicationName, setPublicationName] = useState("Amahle's Substack");
    const [publicationDescription, setPublicationDescription] = useState("My personal Substack");
    const [publicationImage, setPublicationImage] = useState<File | null>(null);
    const [language, setLanguage] = useState("English");
    const [primaryCategory, setPrimaryCategory] = useState("");
    const [secondaryCategory, setSecondaryCategory] = useState("");
    const [tertiaryCategory, setTertiaryCategory] = useState("");
    const [isSavingBasic, setIsSavingBasic] = useState(false);


    // Form state for Payments tab
    const [bankConnected, setBankConnected] = useState(false);
    const [allowSubscriptions, setAllowSubscriptions] = useState(false);
    const [monthlyAmount, setMonthlyAmount] = useState("5");
    const [annualAmount, setAnnualAmount] = useState("50");
    const [foundingAmount, setFoundingAmount] = useState("100");

    // Form state for Website tab
    const [publicationTheme, setPublicationTheme] = useState("Custom theme");
    const [enableNavigationButtons, setEnableNavigationButtons] = useState(false);
    const [archiveVisible, setArchiveVisible] = useState(true);
    const [aboutVisible, setAboutVisible] = useState(true);
    const [enableNotesTab, setEnableNotesTab] = useState(false);

    // Form state for Welcome page tab
    const [welcomePagePhoto, setWelcomePagePhoto] = useState<File | null>(null);
    const [skipButtonText, setSkipButtonText] = useState("No thanks");

    // Form state for Branding tab
    const [showBylines, setShowBylines] = useState(true);
    const [showBylinePhotos, setShowBylinePhotos] = useState(true);
    const [thumbnailCropping, setThumbnailCropping] = useState("Center");

    // Form state for Email tab
    const [emailSenderName, setEmailSenderName] = useState("Amahle from Amahle's Substack");
    const [requireEmailConfirmation, setRequireEmailConfirmation] = useState(false);

    // Form state for Community tab
    const [enableCommentsLikesRestacks, setEnableCommentsLikesRestacks] = useState(true);
    const [enableReporting, setEnableReporting] = useState(true);
    const [defaultCommentOrder, setDefaultCommentOrder] = useState("Top first");
    const [showRestacksBelowPosts, setShowRestacksBelowPosts] = useState(true);
    const [whoCanReplyToEmails, setWhoCanReplyToEmails] = useState("Subscribers");

    // Form state for Chat tab
    const [enableSubscriberChat, setEnableSubscriberChat] = useState(false);

    // Form state for Privacy tab
    const [privateMode, setPrivateMode] = useState(true);
    const [allowCrossPosting, setAllowCrossPosting] = useState(true);
    const [allowListingOnSubstack, setAllowListingOnSubstack] = useState(true);
    const [blockAITraining, setBlockAITraining] = useState(true);
    const [showApproximateSubscriberCount, setShowApproximateSubscriberCount] = useState(true);

    // Form state for Notifications tab
    const [shareableAssetsNotifications, setShareableAssetsNotifications] = useState(true);
    const [postStatsDigests, setPostStatsDigests] = useState(true);
    const [substackStatsDigests, setSubstackStatsDigests] = useState(true);
    const [newMilestones, setNewMilestones] = useState(true);
    const [unfinishedDraftReminders, setUnfinishedDraftReminders] = useState(true);
    const [gettingStartedTips, setGettingStartedTips] = useState(true);
    const [userReports, setUserReports] = useState(true);
    const [newPledgedSubscription, setNewPledgedSubscription] = useState(true);
    const [newFreeSubscriber, setNewFreeSubscriber] = useState(true);
    const [canceledFreeSubscription, setCanceledFreeSubscription] = useState(false);
    const [likesOnPosts, setLikesOnPosts] = useState(true);
    const [commentsOnPosts, setCommentsOnPosts] = useState(true);
    const [linksToPosts, setLinksToPosts] = useState(true);
    const [crossPostsOfPosts, setCrossPostsOfPosts] = useState(true);

    // Form state for Domain tab
    const [blueskyDomainValue, setBlueskyDomainValue] = useState("e.g. did:plc:q4jtwininidwadoaiekaweb4");

    // Form state for Details tab
    const [copyrightOwner, setCopyrightOwner] = useState("Amahle");
    const [mailingAddress, setMailingAddress] = useState("548 Market Street PMB 72296\nSan Francisco, CA 94104");
    const [rssEmailAddress, setRssEmailAddress] = useState("amahlebana@substack.com");

    return (
        <SidebarProvider>
            <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Settings
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">

                        {/* Basics Tab */}
                        {activeTab === "basics" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Basics</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-6">
                                        {/* Publication Name */}
                                        <div className="space-y-2">
                                            <Label htmlFor="publication-name" className="text-primary">Publication name</Label>
                                            <Input
                                                id="publication-name"
                                                value={publicationName}
                                                onChange={(e) => setPublicationName(e.target.value)}
                                                placeholder="Enter your publication name"
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Publication Short Description */}
                                        <div className="space-y-2">
                                            <Label htmlFor="publication-description" className="text-primary">Publication short description</Label>
                                            <p className="text-sm text-muted-foreground">Add a single sentence that succinctly explains what your publication is about.</p>
                                            <Textarea
                                                id="publication-description"
                                                value={publicationDescription}
                                                onChange={(e) => setPublicationDescription(e.target.value)}
                                                placeholder="Enter a short description of your publication"
                                                className="w-full min-h-[80px] px-3 py-2 text-sm border border-input rounded-xl bg-transparent resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                rows={3}
                                            />
                                        </div>

                                        {/* Publication Logo */}
                                        <div className="space-y-2">
                                            <Label htmlFor="publication-image" className="text-primary">Publication logo</Label>
                                            <p className="text-sm text-muted-foreground">Square image at least 256x256 pixels</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                                                        <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                                                    </div>
                                                </div>
                                                <Input
                                                    id="publication-image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setPublicationImage(e.target.files?.[0] || null)}
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>

                                        {/* Language */}
                                        <div className="space-y-2">
                                            <Label className="text-primary">Language</Label>
                                            <p className="text-sm text-muted-foreground">Select a default language for your posts, website, and emails.</p>
                                            <Select value={language} onValueChange={setLanguage}>
                                                <SelectTrigger className="w-full rounded-full">
                                                    <SelectValue placeholder="Select a language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="English">English</SelectItem>
                                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                                    <SelectItem value="French">French</SelectItem>
                                                    <SelectItem value="German">German</SelectItem>
                                                    <SelectItem value="Italian">Italian</SelectItem>
                                                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                                                    <SelectItem value="Chinese">Chinese</SelectItem>
                                                    <SelectItem value="Japanese">Japanese</SelectItem>
                                                    <SelectItem value="Korean">Korean</SelectItem>
                                                    <SelectItem value="Arabic">Arabic</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Categories */}
                                        <div className="space-y-4">
                                            {/* Article Category Input */}
                                            <PublicationCategories
                                                selectedCategories={selectedCategories}
                                                setSelectedCategories={setSelectedCategories}
                                                categorySearch={categorySearch}
                                                setCategorySearch={setCategorySearch}
                                                categoryInputFocused={categoryInputFocused}
                                                setCategoryInputFocused={setCategoryInputFocused}
                                                filteredCategories={filteredCategories}
                                                allCategories={allCategories}
                                            />

                                            {/* Subcategories Input */}
                                            <PublicationSubcategories
                                                selectedSubcategories={selectedSubcategories}
                                                setSelectedSubcategories={setSelectedSubcategories}
                                                subcategorySearch={subcategorySearch}
                                                setSubcategorySearch={setSubcategorySearch}
                                                subcategoryInputFocused={subcategoryInputFocused}
                                                setSubcategoryInputFocused={setSubcategoryInputFocused}
                                                filteredSubcategories={filteredSubcategories}
                                                selectedCategories={selectedCategories}
                                            />
                                        </div>

                                        <div className="w-full h-full">
                                            <Button
                                                variant="outline"
                                                rel="noopener noreferrer"
                                                className="hover:bg-muted transition-opacity rounded-full text-lg w-full cursor-pointer font-playfair-display"
                                                // onClick={saveBasicSettings}
                                                disabled={isSavingBasic}
                                            >
                                                {isSavingBasic ? "Saving..." : "Save Basic Settings"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payments Tab */}
                        {activeTab === "payments" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Payments</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-6">
                                        {/* Connect Bank */}
                                        <div className="space-y-3">
                                            <Label className="text-primary">Connect Bank</Label>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1">
                                                    <p className="text-sm text-muted-foreground">
                                                        {bankConnected
                                                            ? "Your bank account is connected and ready to receive payments."
                                                            : "Connect your bank account to receive subscription payments directly."
                                                        }
                                                    </p>
                                                </div>
                                                <Button
                                                    variant={bankConnected ? "outline" : "default"}
                                                    onClick={() => setBankConnected(!bankConnected)}
                                                    className="shrink-0"
                                                >
                                                    {bankConnected ? "Disconnect Bank" : "Connect Bank"}
                                                </Button>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Allow readers to pledge subscriptions */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <Label className="text-primary">Allow readers to pledge subscriptions</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Enable paid subscriptions for your publication.
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={allowSubscriptions}
                                                    onCheckedChange={setAllowSubscriptions}
                                                />
                                            </div>
                                        </div>

                                        {/* Subscription Amounts - Only show when subscriptions are enabled */}
                                        {allowSubscriptions && (
                                            <>
                                                <Separator />

                                                <div className="space-y-6">
                                                    <div>
                                                        <Label className="text-primary">Subscription Pricing</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Set your subscription pricing tiers. All amounts are in USD.
                                                        </p>
                                                    </div>

                                                    {/* Monthly pledge amount */}
                                                    <div className="space-y-2">
                                                        <Label htmlFor="monthly-amount" className="text-primary">Monthly pledge amount</Label>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                                            <Input
                                                                id="monthly-amount"
                                                                type="number"
                                                                value={monthlyAmount}
                                                                onChange={(e) => setMonthlyAmount(e.target.value)}
                                                                placeholder="5"
                                                                min="0"
                                                                step="0.01"
                                                                className="pl-8"
                                                            />
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">USD per month</p>
                                                    </div>

                                                    {/* Annual pledge amount */}
                                                    <div className="space-y-2">
                                                        <Label htmlFor="annual-amount" className="text-primary">Annual pledge amount</Label>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                                            <Input
                                                                id="annual-amount"
                                                                type="number"
                                                                value={annualAmount}
                                                                onChange={(e) => setAnnualAmount(e.target.value)}
                                                                placeholder="50"
                                                                min="0"
                                                                step="0.01"
                                                                className="pl-8"
                                                            />
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">USD per year</p>
                                                    </div>

                                                    {/* Founding pledge amount */}
                                                    <div className="space-y-2">
                                                        <Label htmlFor="founding-amount" className="text-primary">Founding pledge amount</Label>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                                            <Input
                                                                id="founding-amount"
                                                                type="number"
                                                                value={foundingAmount}
                                                                onChange={(e) => setFoundingAmount(e.target.value)}
                                                                placeholder="100"
                                                                min="0"
                                                                step="0.01"
                                                                className="pl-8"
                                                            />
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">USD one-time founding member payment</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Website Tab */}
                        {activeTab === "website" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-primary">Website</h2>
                                        <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-lg">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm text-muted-foreground">amahlebana.substack.com</span>
                                        </div>
                                    </div>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">

                                        {/* Pages and Navigation */}
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-primary">Pages and navigation</h3>

                                            {/* About Page */}
                                            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                                                <div>
                                                    <h4 className="font-medium text-lg text-primary">About page</h4>
                                                    <p className="text-sm text-muted-foreground">This page should describe the benefits of subscribing to your publication.</p>
                                                </div>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </div>

                                            {/* Homepage Links */}
                                            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                                                <div>
                                                    <h4 className="font-medium text-lg text-primary">Homepage links</h4>
                                                    <p className="text-sm text-muted-foreground">Add, edit, or remove links to your Substack homepage. Use them for a blogroll, community resources, or other related references.</p>
                                                </div>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </div>

                                            {/* Navigation Bar Links */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-primary">Navigation bar links</h4>
                                                        <p className="text-sm text-muted-foreground">Add or remove items from the navigation bar at the top of your website.</p>
                                                    </div>
                                                    <Button variant="outline" size="sm">Add</Button>
                                                </div>

                                                {/* Navigation Table */}
                                                <div className="border rounded-lg overflow-hidden">
                                                    <table className="w-full">
                                                        <thead className="bg-muted/50">
                                                            <tr>
                                                                <th className="text-left p-4 font-medium text-primary">Tab</th>
                                                                <th className="text-left p-4 font-medium text-primary">URL</th>
                                                                <th className="text-left p-4 font-medium text-primary">Visible</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="border-t">
                                                                <td className="p-4 font-medium">Home</td>
                                                                <td className="p-4 text-muted-foreground">/</td>
                                                                <td className="p-4">
                                                                    <div className="w-6 h-6 bg-muted rounded-full"></div>
                                                                </td>
                                                            </tr>
                                                            <tr className="border-t">
                                                                <td className="p-4 font-medium">Archive</td>
                                                                <td className="p-4 text-muted-foreground">/archive</td>
                                                                <td className="p-4">
                                                                    <Switch
                                                                        checked={archiveVisible}
                                                                        onCheckedChange={setArchiveVisible}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr className="border-t">
                                                                <td className="p-4 font-medium">About</td>
                                                                <td className="p-4 text-muted-foreground">/about</td>
                                                                <td className="p-4">
                                                                    <Switch
                                                                        checked={aboutVisible}
                                                                        onCheckedChange={setAboutVisible}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Welcome Page Tab */}
                        {activeTab === "welcome-page" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Welcome page</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* Welcome page photo */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-2">Welcome page photo</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Image at least 600x600 pixels that is shown on your{" "}
                                                    <span className="underline cursor-pointer">welcome page</span>.
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between p-6 border-2 border-dashed border-muted rounded-lg">
                                                <div className="text-center flex-1">
                                                    {welcomePagePhoto ? (
                                                        <div className="space-y-2">
                                                            <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center">
                                                                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">{welcomePagePhoto.name}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center">
                                                                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">No image selected</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="ml-6">
                                                    <label htmlFor="welcome-photo-upload">
                                                        <Button variant="outline" className="cursor-pointer" asChild>
                                                            <span className="flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                Add image
                                                            </span>
                                                        </Button>
                                                    </label>
                                                    <input
                                                        id="welcome-photo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setWelcomePagePhoto(e.target.files?.[0] || null)}
                                                        className="hidden"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Custom "Skip" button on welcome page */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-2">Custom "Skip" button on welcome page</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    The button that allows visitors to continue without subscribing on your welcome page.
                                                </p>
                                            </div>

                                            <div className="max-w-md">
                                                <Input
                                                    value={skipButtonText}
                                                    onChange={(e) => setSkipButtonText(e.target.value)}
                                                    placeholder="No thanks"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Branding Tab */}
                        {activeTab === "branding" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Branding</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* QR Code */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-primary mb-2">QR Code</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Use this QR code to share your publication.
                                                </p>
                                            </div>

                                            <div className="ml-6">
                                                <div className="w-24 h-24 bg-white rounded-lg p-2 border">
                                                    {/* QR Code Pattern */}
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded relative overflow-hidden">
                                                        {/* QR Code Pattern Simulation */}
                                                        <div className="absolute inset-0" style={{
                                                            backgroundImage: ` radial-gradient(circle at 2px 2px, white 1px, transparent 1px),
                                                                                radial-gradient(circle at 6px 6px, white 1px, transparent 1px),
                                                                                radial-gradient(circle at 10px 10px, white 1px, transparent 1px),
                                                                                radial-gradient(circle at 14px 14px, white 1px, transparent 1px)
                                                                                `,
                                                            backgroundSize: '8px 8px, 12px 12px, 16px 16px, 20px 20px'
                                                        }}>
                                                        </div>
                                                        {/* Center logo */}
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Email Tab */}
                        {activeTab === "email" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Emails</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* Email sender name */}
                                        <div className="space-y-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-2">Email sender name</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    The name that appears in the "from" field of your emails.
                                                </p>
                                            </div>

                                            <Input
                                                value={emailSenderName}
                                                onChange={(e) => setEmailSenderName(e.target.value)}
                                                className="w-full max-w-md"
                                                placeholder="Enter sender name"
                                            />
                                        </div>

                                        <Separator />

                                        {/* Email header & footer */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Email header & footer</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Add content to the top and bottom of every emailed post.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>

                                        <Separator />

                                        {/* Email opt-out page */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Email opt-out page</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    The page people see after they opt out of receiving emails.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>

                                        <Separator />

                                        {/* Welcome emails section header */}
                                        <div>
                                            <h2 className="text-xl font-semibold text-primary">Welcome emails</h2>
                                        </div>

                                        {/* Welcome email to new subscribers */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Welcome email to new subscribers</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Email sent to readers immediately after they subscribe.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>

                                        <Separator />

                                        {/* Welcome email to imported subscribers */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Welcome email to imported subscribers</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Email sent to readers immediately after they are imported to your publication.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Community Tab */}
                        {activeTab === "community" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Community</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* Enable comments, likes, and restacks */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Enable comments, likes, and restacks</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Give readers the ability to like, comment on, and restack your posts.
                                                </p>
                                            </div>
                                            <Switch
                                                checked={enableCommentsLikesRestacks}
                                                onCheckedChange={setEnableCommentsLikesRestacks}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Chat Tab */}
                        {activeTab === "chat" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Chat</h2>

                                    <div className="bg-background border rounded-lg p-6">
                                        {/* Enable subscriber chat */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Enable subscriber chat</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Create a space for you and your subscribers to hang out.
                                                </p>
                                            </div>
                                            <Switch
                                                checked={enableSubscriberChat}
                                                onCheckedChange={setEnableSubscriberChat}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sections Tab */}
                        {activeTab === "sections" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Sections</h2>

                                    <div className="bg-background border rounded-lg p-6">
                                        {/* Add a section */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Add a section</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Create an additional newsletter within your Substack people can subscribe to individually.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Add section</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Team Tab */}
                        {activeTab === "team" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Team</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-6">
                                        {/* Publication team */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Publication team</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Add others to help manage your publication.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Invite</Button>
                                        </div>

                                        {/* Team members table */}
                                        <div className="border rounded-lg overflow-hidden">
                                            <table className="w-full">
                                                <thead className="bg-muted/50">
                                                    <tr>
                                                        <th className="text-left p-4 font-medium text-primary">Name</th>
                                                        <th className="text-left p-4 font-medium text-primary">Visibility</th>
                                                        <th className="text-left p-4 font-medium text-primary">Role</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-t">
                                                        <td className="p-4 font-medium">Amahle</td>
                                                        <td className="p-4">
                                                            <span className="bg-muted px-2 py-1 rounded text-sm">Public</span>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className="bg-muted px-2 py-1 rounded text-sm">Owner</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Definitions */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-primary">Definitions</h3>

                                            <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                                                {/* Role definitions */}
                                                <div className="space-y-3">
                                                    <div>
                                                        <span className="font-medium text-primary">Admin:</span>
                                                        <span className="text-muted-foreground ml-1">Full publication access, including all settings</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-primary">Contributor:</span>
                                                        <span className="text-muted-foreground ml-1">Can publish and edit posts, but can not access settings</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-primary">Byline:</span>
                                                        <span className="text-muted-foreground ml-1">Can be listed as the author of posts, but can not publish or access settings</span>
                                                    </div>
                                                </div>

                                                <Separator className="bg-border/50" />

                                                {/* Visibility definitions */}
                                                <div className="space-y-3">
                                                    <div>
                                                        <span className="font-medium text-primary">Public:</span>
                                                        <span className="text-muted-foreground ml-1">Publicly listed as a team member</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-primary">Private:</span>
                                                        <span className="text-muted-foreground ml-1">Not publicly listed as a team member</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === "privacy" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Privacy</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* Private mode */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Private mode</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    In private mode, only people you approve can subscribe and view your posts. Existing subscribers will not be affected.
                                                </p>
                                            </div>
                                            <Switch
                                                checked={privateMode}
                                                onCheckedChange={setPrivateMode}
                                            />
                                        </div>

                                        <Separator />

                                        {/* Custom terms of service */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Custom terms of service</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Add your own terms of service to your publication.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Customize</Button>
                                        </div>

                                        <Separator />

                                        {/* Custom privacy policy */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Custom privacy policy</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Add your own privacy policy to your publication.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Customize</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === "notifications" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Notifications</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* Shareable assets for your posts */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Enable Notifications</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Enable notifications for your posts.
                                                </p>
                                            </div>
                                            <Switch
                                                checked={shareableAssetsNotifications}
                                                onCheckedChange={setShareableAssetsNotifications}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Connections Tab */}
                        {activeTab === "connections" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold">Connections</h2>
                                    <div className="bg-background p-6 rounded-lg border">
                                        <h3 className="text-lg font-semibold mb-4">Connection Settings</h3>
                                        <p className="text-muted-foreground">Configure how you connect with other users.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Domain Tab */}
                        {activeTab === "domain" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Domain</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* Add a custom domain */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Add a custom domain</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Set up your Substack to live on a domain you already own.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Add</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Analytics Tab */}
                        {activeTab === "analytics" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold">Analytics</h2>
                                    <div className="bg-background p-6 rounded-lg border">
                                        <h3 className="text-lg font-semibold mb-4">Analytics Configuration</h3>
                                        <p className="text-muted-foreground">Configure analytics tracking and reporting.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Details Tab */}
                        {activeTab === "details" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Details</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* Copyright owner */}
                                        <div className="space-y-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-2">Copyright owner</h3>
                                            </div>

                                            <Input
                                                value={copyrightOwner}
                                                onChange={(e) => setCopyrightOwner(e.target.value)}
                                                className="w-full"
                                                placeholder="Enter copyright owner name"
                                            />
                                            <p className="text-sm text-muted-foreground">Name for copyright notices</p>
                                        </div>

                                        <Separator />

                                        {/* Mailing address */}
                                        <div className="space-y-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-2">Mailing address</h3>
                                            </div>

                                            <textarea
                                                value={mailingAddress}
                                                onChange={(e) => setMailingAddress(e.target.value)}
                                                className="w-full min-h-[100px] px-3 py-2 text-sm border border-input rounded-xl bg-transparent resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Enter mailing address"
                                                rows={4}
                                            />
                                            <p className="text-sm text-muted-foreground">Business address to show at the bottom of all emails. Can be a PO Box</p>
                                        </div>

                                        <Separator />

                                        {/* Publication introduction */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Publication introduction</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Add 2-3 sentences to introduce your publication to new readers on discovery surfaces.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Import Export Tab */}
                        {activeTab === "import-export" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Import / Export</h2>

                                    <div className="bg-background border rounded-lg p-6 space-y-8">
                                        {/* Import email addresses */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Import email addresses</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Bring over your existing subscribers by copy pasting their addresses or uploading a CSV file.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Import emails</Button>
                                        </div>

                                        <Separator />

                                        {/* Export your data */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Export your data</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Export your posts, subscriber list, and related data. We'll send you an email when your export is ready to download.
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">New export</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Danger Zone Tab */}
                        {activeTab === "danger-zone" && (
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="space-y-6 px-4 lg:px-6">
                                    <h2 className="text-2xl font-bold text-primary">Danger Zone</h2>

                                    <div className="bg-background border-2 border-red-500 rounded-lg p-6 space-y-8">
                                        {/* Delete post archive */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Delete post archive</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Permanently delete all posts on this publication.
                                                </p>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                Delete archive
                                            </Button>
                                        </div>

                                        <Separator />

                                        {/* Change publication subdomain */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Change publication subdomain</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Permanently change your URL (amahlebana.substack.com).
                                                </p>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                Change subdomain
                                            </Button>
                                        </div>

                                        <Separator />

                                        {/* Delete publication */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary mb-1">Delete publication</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Permanently delete your publication, posts, subscriber list, and all other content. Once you do this, there is no going back.
                                                </p>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                Delete publication
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
