"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { updateUserField } from '@/redux/user-store/userSlice';

const preferences = [
	"Family", "Health", "Relationships", "Sexuality", "Home", "Food", "Pets", "Mental Health",
	"Productivity", "Mindfulness", "Business", "Marketing", "Leadership", "Work",
	"Artificial Intelligence", "Blockchain", "Data Science", "Gadgets", "Makers",
	"Security", "Technology", "Design", "Project Management", "Programming",
	"Dev Ops", "Operating Systems", "Writing", "Art", "Gaming", "Humor",
	"Movies", "Music", "News", "Photography", "Podcasts", "Television",
	"Economics", "Education", "Equality", "Finance", "Law", "Transportation",
	"Politics", "Race", "Science", "Mathematics", "Drugs", "Philosophy",
	"Religion", "Spirituality", "Cultural Studies", "Fashion", "Beauty",
	"Language", "Sports", "Cities", "Nature", "Travel"
];

const PreferencesPage = () => {
	const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	// Handle Preference Change
	const handlePreferenceChange = (preference: string) => {
		setSelectedPreferences(prev => {
			if (prev.includes(preference)) {
				return prev.filter(p => p !== preference);
			} else {
				return [...prev, preference];
			}
		});
	};

	// Handle Submit
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (selectedPreferences.length < 5) {
			setError('Please select at least 5 preferences.');
			return;
		}
		
		setError('');
		setIsLoading(true);
		
		// Make API call to update interests
		const jwtToken = localStorage.getItem('jwt_token');
		fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/interests/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {})
			},
			credentials: 'include', // This is important for sending cookies
			body: JSON.stringify({
				interests: selectedPreferences
			})
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to update interests');
			}
			return response;
		})
		.then(() => {
			// Update Redux state with selected preferences
			dispatch(updateUserField({ field: 'userInterests', value: selectedPreferences }));
			
			router.push('/home');
		})
		.catch(error => {
			setError('Failed to save preferences. Please try again.');
		})
		.finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<main className="min-h-screen w-full p-4 md:p-6 bg-muted">

			{/* Card for Selecting Preferences */}
			<Card className="h-[calc(100vh-2rem)] flex flex-col">

				{/* Card Header */}
				<CardHeader className="flex flex-col justify-center items-center">
					<CardTitle className="text-center font-playfair-display font-bold text-2xl md:text-3xl">Select Your Interests</CardTitle>
					<CardDescription className="text-center font-playfair-display text-sm md:text-base">
						Choose 5 or more topics that interest you (Scroll down to see more)
					</CardDescription>
				</CardHeader>

				{/* Card Content */}
				<CardContent className="flex-1 overflow-y-auto ">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
						{preferences.map((preference) => (
							<div
								key={preference}
								onClick={() => handlePreferenceChange(preference)}
								className={`flex items-center justify-center p-3 rounded-full cursor-pointer transition-colors text-center ${
									selectedPreferences.includes(preference)
										? 'bg-secondary text-secondary-foreground'
										: 'hover:bg-muted'
								}`}
							>
								<span className="text-lg font-bold font-playfair-display">
									{preference}
								</span>
							</div>
						))}
					</div>
				</CardContent>

				{/* Card Footer */}
				<CardFooter className="flex flex-col justify-between border-t">

					<div className="flex flex-col items-center justify-center w-full h-full">
						{/* Error Message */}
						{error && <p className="text-red-500 mt-4">{error}</p>}
					</div>

					<div className="flex flex-row items-center justify-between w-full">
						{/* Back Button */}
						<Button
							variant="outline"
							onClick={() => router.back()}
							className="font-playfair-display cursor-pointer text-xl font-bold p-5 rounded-full"
						>
							Back
						</Button>

						{/* Submit Button */}
						<Button
							className="bg-secondary font-bold text-xl p-5 text-white hover:bg-secondary/90 min-w-[150px] rounded-full font-playfair-display cursor-pointer"
							onClick={handleSubmit}
							disabled={isLoading || selectedPreferences.length < 5}
						>
							Submit
							{isLoading ? (
								<ClipLoader
									color="#ffffff"
									size={20}
									className="my-1"
								/>
							) : (
								''
							)}
						</Button>
					</div>
				</CardFooter>
			</Card>
		</main>
	);
};

export default PreferencesPage;
