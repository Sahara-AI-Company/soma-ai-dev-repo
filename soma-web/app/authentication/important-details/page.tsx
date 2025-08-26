"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/important-details/DatePicker';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateUserField } from '@/redux/user-store/userSlice';
import { ClipLoader } from 'react-spinners';

const ImportantDetailsPage = () => {
	const [gender, setGender] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [fullName, setFullName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedFullName = fullName.trim();
		
		if (!gender || !birthdate || !trimmedFullName || !phoneNumber.trim()) {
			setError('Please fill in all fields.');
			return;
		}

		if (trimmedFullName.length < 2) {
			setError('Full name must be at least 2 characters long.');
			return;
		}
		
		setError('');
		setIsLoading(true);

		// Update in database
		const jwtToken = localStorage.getItem('jwt_token');
		fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/important-details/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {})
			},
			credentials: 'include',
			body: JSON.stringify({
				gender,
				dateOfBirth: birthdate,
				fullName: trimmedFullName,
				phoneNumber: phoneNumber.trim(),
			}),
		})
		.then(response => {
			if (!response.ok) {
				return response.json().then(errorData => {
					throw new Error(errorData.error || 'Failed to update details');
				});
			}
			return response.json();
		})
		.then(data => {

			// Update Redux state
			dispatch(updateUserField({ field: 'gender', value: gender }));
			dispatch(updateUserField({ field: 'dateOfBirth', value: birthdate }));
			dispatch(updateUserField({ field: 'fullName', value: trimmedFullName }));
			dispatch(updateUserField({ field: 'phoneNumber', value: phoneNumber.trim() }));

			// Navigate to next page
			router.push('/authentication/interests');
		})
		.catch(error => {
			setError('Failed to update details. Please try again.');
		})
		.finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<div className="flex flex-col min-h-screen justify-center items-center bg-muted">
			<Card className="w-full max-w-[370px]">

				{/* Card Title and Description */}
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-playfair-display font-bold">Tell us about yourself</CardTitle>
					<CardDescription className="font-playfair-display">
						Enter Full Name And Select Gender & Birthdate.
					</CardDescription>
				</CardHeader>

				{/* Card Content */}
				<CardContent>
					<form onSubmit={handleSubmit} className="grid">

						<div className="grid gap-3 mb-4">
							<div className="flex flex-col gap-2 justify-center items-center">
								<Label className="text-lg font-playfair-display font-bold text-2xl">Full Name</Label>
								<Input
									type="text"
									placeholder="Enter your full name"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									className="w-[90%] font-playfair-display"
								/>
							</div>

							<div className="flex flex-col gap-2 justify-center items-center">
								<Label className="text-lg font-playfair-display font-bold text-2xl">Phone Number</Label>
								<Input
									type="text"
									placeholder="Enter your phone number"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									className="w-[90%] font-playfair-display"
								/>
							</div>
						</div>
						
						<div className="grid flex flex-col justify-center items-center">

							{/* Gender Label and Input */}
							<div className="flex flex-col justify-center items-center">
								<Label className="text-lg font-playfair-display font-bold text-2xl">Gender</Label>
							</div>

							{/* Gender Radio Buttons */}
							<div className="flex gap-4 flex-row justify-center items-center">

								{/* Male Radio Button */}
								<label className="flex items-center gap-2 cursor-pointer px-2">
									<input
										type="radio"
										name="gender"
										value="male"
										checked={gender === 'Male'}
										onChange={() => setGender('Male')}
										className="peer hidden"
									/>
									<span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 peer-checked:bg-secondary peer-checked:border-secondary transition-colors">
										<span className="w-3 h-3 rounded-full bg-white peer-checked:bg-white" />
									</span>
									<span className="px-3 py-1 rounded transition-colors font-playfair-display">Male</span>
								</label>

								{/* Female Radio Button */}
								<label className="flex items-center gap-2 cursor-pointer px-2">
									<input
										type="radio"
										name="gender"
										value="female"
										checked={gender === 'Female'}
										onChange={() => setGender('Female')}
										className="peer hidden"
									/>
									<span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 peer-checked:bg-secondary peer-checked:border-secondary transition-colors">
										<span className="w-3 h-3 rounded-full bg-white peer-checked:bg-white" />
									</span>
									<span className="px-3 py-1 rounded transition-colors font-playfair-display">Female</span>
								</label>
							</div>
						</div>

						{/* Birthdate Label and Input */}
						<div className="grid gap-3">
							<div className="flex items-center justify-between w-full">
								<DatePicker value={birthdate} onChange={setBirthdate} />
							</div>
						</div>

						{/* Error Message */}
						{error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}

						{/* Submit Button */}
						<Button
							type="submit"
							className="w-full text-xl font-bold font-playfair-display bg-secondary hover:bg-secondary/70 text-secondary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={!gender || !birthdate || !fullName || !phoneNumber || isLoading}
						>
							Submit
							{isLoading ? <ClipLoader color="#fff" size={20} /> : ''}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ImportantDetailsPage;
