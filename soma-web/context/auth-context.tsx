'use client';

// Imports
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/user-store/userSlice';
import { setPublications, setLoading as setPublicationsLoading, setError as setPublicationsError, clearPublications } from '../redux/user-store/userPublicationsSlice';


// Auth Context Type Variables
interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
    checkExistingUserData: (username: string, email: string) => Promise<{ success: boolean; message: string; errors?: string[] }>;
    googleAuth: (idToken: string) => Promise<{ success: boolean; message: string; is_new_user: boolean }>;
    facebookAuth: (accessToken: string) => Promise<{ success: boolean; message: string; is_new_user: boolean }>;
    // appleAuth: (idToken: string) => Promise<{ success: boolean; message: string; is_new_user: boolean }>;
}


// Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Auth Provider
export function AuthProvider({ children }: { children: ReactNode }) {

    // State Variables
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // dispatch
    const dispatch = useAppDispatch();

    // user data from redux
    const userData = useAppSelector((state) => state.user);

    // Function to fetch user publications
    const fetchUserPublications = (jwtToken: string) => {
        dispatch(setPublicationsLoading(true));
        
        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/user-publications/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user publications');
            }
            console.log("----------------------User Publications Response: ", response)
            return response.json();
        })
        .then(data => {
            console.log("----------------------User Publications Data: ", data)
            dispatch(setPublications(data.publications || []));
            console.log(`-----------------------Fetched ${data.count || 0} publications for user`);
        })
        .catch(error => {
            console.error('Error fetching user publications:', error);
            dispatch(setPublicationsError(error instanceof Error ? error.message : 'Failed to fetch publications'));
        });
    };

    // Check Authentication Status
    const checkAuthStatus = () => {

        // set loading
        setLoading(true);

        // Get JWT token from localStorage as fallback
        const jwtToken = localStorage.getItem('jwt_token');

        // Fetching Current User
        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/user/`, {
            credentials: 'include',
            headers: jwtToken ? {
                'Authorization': `Bearer ${jwtToken}`
            } : {}
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Authentication failed');
            })
            .then(content => {
                setIsAuthenticated(true);
                setUsername(content.username);

                console.log("---------User Content: ", content)

                // Update Redux store with all user details
                const userData = {
                    uid: content.id || null,
                    username: content.username || null,
                    email: content.email || null,
                    fullName: content.full_name || null,
                    gender: content.gender || null,
                    dateOfBirth: content.date_of_birth || null,
                    userInterests: content.user_interest || [],
                    profilePicture: content.profile_picture || null,
                    bannerPicture: content.banner_picture || null,
                    bio: content.bio || null,
                    relationshipStatus: content.relationship_status || null,
                    education: content.education || null,
                    workHistory: content.work_history || null,
                    contactEmail: content.contact_email || null,
                    contactPhone: content.contact_phone || null,
                    phoneNumber: content.phone_number || null,
                    religion: content.religion || null,
                    starSign: content.star_sign || null,
                    personalityType: content.personality_type || null,
                    privacySettings: content.privacy_settings || 'Public',
                    userFacebook: content.user_facebook || null,
                    userInstagram: content.user_instagram || null,
                    userXTwitter: content.user_x_twitter || null,
                    userThreads: content.user_threads || null,
                    userYouTube: content.user_youtube || null,
                    userLinkedIn: content.user_linkedin || null,
                    userTikTok: content.user_tiktok || null,
                    userBookName: content.user_book_name || null,
                    userBookWebsite: content.user_book_website || null,
                    userBookImage: content.user_book_image || null,
                    userBookDescription: content.user_book_description || null,
                    userWebsite: content.user_website || null,
                    // Notification Settings Default Values
                    articleDelivery: content.article_delivery || 'all',
                    magazineDelivery: content.magazine_delivery || 'all',
                    podcastDelivery: content.podcast_delivery || 'all',
                    engagementLikesApp: Boolean(content.engagement_likes_app),
                    engagementLikesEmail: Boolean(content.engagement_likes_email),
                    engagementCommentsApp: Boolean(content.engagement_comments_app),
                    engagementCommentsEmail: Boolean(content.engagement_comments_email),
                    engagementSharesApp: Boolean(content.engagement_shares_app),
                    engagementSharesEmail: Boolean(content.engagement_shares_email),
                    engagementMentionsApp: Boolean(content.engagement_mentions_app),
                    engagementMentionsEmail: Boolean(content.engagement_mentions_email),
                    connectionsFollowersApp: Boolean(content.connections_followers_app),
                    connectionsFollowersEmail: Boolean(content.connections_followers_email),
                    connectionsSubscribersApp: Boolean(content.connections_subscribers_app),
                    connectionsSubscribersEmail: Boolean(content.connections_subscribers_email),
                    connectionsChatsApp: Boolean(content.connections_chats_app),
                    connectionsChatsEmail: Boolean(content.connections_chats_email),
                    connectionsChartsUpdatesApp: Boolean(content.connections_charts_updates_app),
                    connectionsChartsUpdatesEmail: Boolean(content.connections_charts_updates_email),
                    messagingChatRepliesApp: Boolean(content.messaging_chat_replies_app),
                    messagingChatRepliesEmail: Boolean(content.messaging_chat_replies_email),
                    messagingRequestsFrom: content.messaging_requests_from || 'Everyone',
                    // Content Preferences Default Values
                    filterExplicitContent: Boolean(content.filter_explicit_content),
                    autoPlayVideos: Boolean(content.auto_play_videos),
                    blockedAccounts: Boolean(content.blocked_accounts),
                    mutedAccounts: Boolean(content.muted_accounts),
                    hiddenPublications: Boolean(content.hidden_publications),
                    manageInterests: Boolean(content.manage_interests),
                    // Privacy Settings Default Values
                    showLikesOnProfile: Boolean(content.show_likes_on_profile),
                    allowMentions: Boolean(content.allow_mentions),
                    allowGuestPosts: Boolean(content.allow_guest_posts),
                    contactMatching: Boolean(content.contact_matching),
                };

                dispatch(setUser(userData));
                console.log("-----------User Data: ", userData)

                // Fetch user publications after successful authentication
                if (jwtToken) {
                    fetchUserPublications(jwtToken);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                setUsername(null);
                dispatch(setUser({})); // Clear user data in Redux
                dispatch(clearPublications()); // Clear publications data in Redux
                localStorage.removeItem('jwt_token'); // Clear stored token
            })
            .finally(() => {
                setLoading(false);
            });
    };


    // Login Function
    const login = (email: string, password: string) => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const content = await response.json();
                if (content.username) {
                    // Store JWT token in localStorage as fallback
                    if (content.jwt) {
                        localStorage.setItem('jwt_token', content.jwt);
                    }

                    // Skip verification for now
                    setIsAuthenticated(true);
                    setUsername(content.username);
                    await checkAuthStatus();
                    
                    // Fetch publications after successful login
                    if (content.jwt) {
                        fetchUserPublications(content.jwt);
                    }
                    
                    return { success: true, message: content.message || 'Login successful' };
                } else {
                    return {
                        success: false,
                        message: content.error || 'Login failed. Please check your credentials.'
                    };
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                return {
                    success: false,
                    message: 'Network error occurred. Please check your connection and try again.'
                };
            });
    };


    // Check Existing User Data Function
    const checkExistingUserData = (username: string, email: string) => {
        return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/check-existing-user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email }),
        })
            .then(async response => {
                if (!response.ok) {
                    try {
                        const errorData = await response.json();
                        return {
                            success: false,
                            message: errorData.errors ? errorData.errors.join(', ') : 'Username or email already exists',
                            errors: errorData.errors || []
                        };
                    } catch (parseError) {
                        return {
                            success: false,
                            message: 'Error checking user data',
                            errors: []
                        };
                    }
                }
                return response.json();
            })
            .then(content => {
                return {
                    success: true,
                    message: content.message || 'Username and email are available'
                };
            })
            .catch(error => {
                return {
                    success: false,
                    message: 'Network error occurred. Please check your connection and try again.',
                    errors: []
                };
            });
    };

    // Signup Function  
    const signup = (username: string, email: string, password: string) => {
        return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then(async response => {
                if (!response.ok) {
                    // Try to get the error message from the response
                    try {
                        const errorData = await response.json();
                        return {
                            success: false,
                            message: errorData.error || 'Signup failed. Please try again.'
                        };
                    } catch (parseError) {
                        return {
                            success: false,
                            message: 'Signup failed. Please try again.'
                        };
                    }
                }
                return response.json();
            })
            .then(content => {
                if (!content.username) {
                    return {
                        success: false,
                        message: content.error || 'Signup failed. Please try again.'
                    };
                }

                // Verify the signup
                return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/verify-signup/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                })
                    .then(verifyResponse => {
                        if (!verifyResponse.ok) {
                            // If verification fails, attempt to clean up the partial registration
                            return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/cleanup-signup/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email }),
                            })
                                .then(() => {
                                    throw new Error('Database registration verification failed');
                                });
                        }
                        return content;
                    });
            })
            .then(() => {
                // Try to login after successful signup
                return login(email, password)
                    .then(loginResult => {
                        if (!loginResult.success) {
                            // If login fails, clean up the registration
                            return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/cleanup-signup/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email }),
                            })
                                .then(() => {
                                    return {
                                        success: false,
                                        message: 'Username Or E-mail Already Exists'
                                    };
                                });
                        }
                        return loginResult;
                    })
                    .catch(() => {
                        // If login throws an error, clean up the registration
                        return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/cleanup-signup/`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email }),
                        })
                            .then(() => {
                                throw new Error('Login failed after signup');
                            });
                    });
            })
            .catch(error => {
                return {
                    success: false,
                    message: error.message === 'Database registration verification failed'
                        ? 'Unable to verify signup status. Please try again.'
                        : error.message === 'Login failed after signup'
                            ? 'Signup successful but automatic login failed. Please try logging in manually.'
                            : 'Network error occurred. Please check your connection and try again.'
                };
            });
    };


    // Google Authentication Function
    const googleAuth = (idToken: string) => {
        return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/google-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id_token: idToken }),
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const content = await response.json();
                if (content.username) {
                    // Store JWT token in localStorage as fallback
                    if (content.jwt) {
                        localStorage.setItem('jwt_token', content.jwt);
                    }

                    setIsAuthenticated(true);
                    setUsername(content.username);
                    await checkAuthStatus();
                    
                    // Fetch publications after successful Google auth
                    if (content.jwt) {
                        fetchUserPublications(content.jwt);
                    }
                    
                    return { 
                        success: true, 
                        message: content.message || 'Google authentication successful',
                        is_new_user: Boolean(content.is_new_user)
                    };
                } else {
                    return {
                        success: false,
                        message: content.error || 'Google authentication failed.',
                        is_new_user: false
                    };
                }
            })
            .catch((error) => {
                console.error('Google auth error:', error);
                return {
                    success: false,
                    message: 'Network error occurred. Please check your connection and try again.',
                    is_new_user: false
                };
            });
    };

    // Facebook Authentication Function
    const facebookAuth = (accessToken: string) => {
        return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/facebook-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ access_token: accessToken }),
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const content = await response.json();
                if (content.username) {
                    if (content.jwt) {
                        localStorage.setItem('jwt_token', content.jwt);
                    }
                    setIsAuthenticated(true);
                    setUsername(content.username);
                    await checkAuthStatus();
                    
                    // Fetch publications after successful Facebook auth
                    if (content.jwt) {
                        fetchUserPublications(content.jwt);
                    }
                    
                    return {
                        success: true,
                        message: content.message || 'Facebook authentication successful',
                        is_new_user: Boolean(content.is_new_user)
                    };
                } else {
                    return {
                        success: false,
                        message: content.error || 'Facebook authentication failed.',
                        is_new_user: false
                    };
                }
            })
            .catch((error) => {
                console.error('Facebook auth error:', error);
                return {
                    success: false,
                    message: 'Network error occurred. Please check your connection and try again.',
                    is_new_user: false
                };
            });
    };

    // Apple Authentication Function
    // const appleAuth = (idToken: string) => {
    //     return fetch(`${process.env.NEXT_PUBLIC_APPLE_AUTH}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify({ id_token: idToken }),
    //     })
    //         .then(async response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const content = await response.json();
    //             if (content.username) {
    //                 if (content.jwt) {
    //                     localStorage.setItem('jwt_token', content.jwt);
    //                 }
    //                 setIsAuthenticated(true);
    //                 setUsername(content.username);
    //                 await checkAuthStatus();
    //                 return {
    //                     success: true,
    //                     message: content.message || 'Apple authentication successful',
    //                     is_new_user: Boolean(content.is_new_user)
    //                 };
    //             } else {
    //                 return {
    //                     success: false,
    //                     message: content.error || 'Apple authentication failed.',
    //                     is_new_user: false
    //                 };
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Apple auth error:', error);
    //             return {
    //                 success: false,
    //                 message: 'Network error occurred. Please check your connection and try again.',
    //                 is_new_user: false
    //             };
    //         });
    // };

    // Logout Function
    const logout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/logout/`, {
                method: 'POST',
                credentials: 'include',
            });
            
            // Clear local state regardless of server response
            setIsAuthenticated(false);
            setUsername(null);
            dispatch(setUser({})); // Clear user data in Redux
            dispatch(clearPublications()); // Clear publications data in Redux
            localStorage.removeItem('jwt_token'); // Clear stored token
            
            if (!response.ok) {
                console.error('Logout failed on server');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            // Still clear local state even if request fails
            setIsAuthenticated(false);
            setUsername(null);
            dispatch(setUser({}));
            dispatch(clearPublications());
            localStorage.removeItem('jwt_token');
        }
    };

    // Check Authentication Status on Mount
    useEffect(() => {
        // Check authentication status on mount
        checkAuthStatus();
        fetchUserPublications(localStorage.getItem('jwt_token') || '');

    }, []);


    // Return Auth Provider
    return (
        <AuthContext.Provider value={{ isAuthenticated, username, loading, login, logout, signup, checkExistingUserData, googleAuth, facebookAuth }}>
            {children}
        </AuthContext.Provider>
    );
}


// Use Auth Context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 