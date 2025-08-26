"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAppDispatch } from '@/redux/hooks';
import { updateUserField } from '@/redux/user-store/userSlice';

interface BannerImageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setImagePreview?: (preview: string | null) => void;
}

const BannerImageDialog = ({ open, onOpenChange, setImagePreview }: BannerImageDialogProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Redux dispatch
    const dispatch = useAppDispatch();

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError('');
            
            // Create preview URL for the selected file
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle file upload
    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsLoading(true);
        setError('');

        try {
            // Convert file to base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Data = reader.result as string;
                
                try {
                    // Send to backend API
                    const jwtToken = localStorage.getItem('jwt_token');
                    const response = await fetch('http://localhost:8000/somaapp/update-banner-picture/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {})
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            banner_picture: base64Data
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to update banner picture');
                    }

                    const data = await response.json();
                    
                    // Update Redux state
                    dispatch(updateUserField({ field: 'bannerPicture', value: base64Data }));
                    
                    // Update local state if callback provided
                    if (setImagePreview) {
                        setImagePreview(base64Data);
                    }
                    
                    onOpenChange(false);
                    
                } catch (apiError) {
                    setError((apiError as Error).message);
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsDataURL(selectedFile);
        } catch (e) {
            setError((e as Error).message);
            setIsLoading(false);
        }
    };

    const handleClear = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSelectedFile(null);
        setPreviewUrl(null);
        onOpenChange(false);
    };

    // Reset state when dialog opens
    React.useEffect(() => {
        if (open) {
            setError('');
            setSelectedFile(null);
            setPreviewUrl(null);
            setIsLoading(false);
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-center justify-center font-playfair-display w-[500px] rounded-lg text-center">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-center">Upload Banner Image</DialogTitle>
                </DialogHeader>
                
                {/* Banner Image Preview */}
                <div className="border border-gray-300 h-40 w-full mx-auto mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                    {previewUrl ? (
                        <img 
                            src={previewUrl} 
                            alt="Banner preview" 
                            className="h-full w-full object-cover object-center"
                        />
                    ) : (
                        <div className="text-gray-400 text-sm text-center">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span>No banner image selected</span>
                                <span className="text-xs text-gray-300">Recommended: 1200x300px</span>
                            </div>
                        </div>
                    )}
                </div>
                
                <form onSubmit={handleFileUpload} className="w-full">
                    <div className="grid gap-4 py-4">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="cursor-pointer"
                            disabled={isLoading}
                        />
                        {selectedFile && (
                            <p className="text-sm text-gray-500 text-center">
                                Selected: {selectedFile.name}
                            </p>
                        )}
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                    </div>
                    <DialogFooter className="flex justify-center gap-2">
                        <Button type="button" variant="outline" onClick={handleClear} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!selectedFile || isLoading} className="bg-secondary text-white hover:bg-secondary/80">
                            {isLoading ? 'Uploading...' : 'Upload Banner'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BannerImageDialog;
