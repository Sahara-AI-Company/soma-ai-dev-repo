import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SyntheticEvent, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ClipLoader } from 'react-spinners';
import { CheckCircle2, XCircle, AtSign, Eye, EyeOff } from 'lucide-react';
import { useAuth } from "@/context/auth-context";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
// import AppleLogin from 'react-apple-login';



// Sign-Up Form
export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    // State Variables
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [hasUsernameSpaces, setHasUsernameSpaces] = useState(false);
    const [hasSpecialChars, setHasSpecialChars] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Router and Auth Context
    const router = useRouter();

    // Auth Context
    const { signup, googleAuth, checkExistingUserData, facebookAuth } = useAuth();

    // Username validation regex
    const usernameRegex = /^[a-z0-9_]+$/;

    // Username Availability Checker
    const checkUsernameAvailability = useCallback(async (username: string) => {
        // Convert username to lowercase
        const lowercaseUsername = username.toLowerCase();

        // Check for spaces in username
        if (lowercaseUsername.includes(' ')) {
            setHasUsernameSpaces(true);
            setHasSpecialChars(false);
            setIsUsernameAvailable(null);
            setIsCheckingUsername(false);
            return;
        } else {
            setHasUsernameSpaces(false);
        }

        // Check for special characters
        if (!usernameRegex.test(lowercaseUsername)) {
            setHasSpecialChars(true);
            setIsUsernameAvailable(null);
            setIsCheckingUsername(false);
            return;
        } else {
            setHasSpecialChars(false);
        }

        // Username Empty Validation
        if (lowercaseUsername === '') {
            setIsUsernameAvailable(null);
            setIsCheckingUsername(false);
            setHasUsernameSpaces(false);
            setHasSpecialChars(false);
            return;
        }

        // Set the checking username to true
        setIsCheckingUsername(true);

        // Check Username Availability
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/check-username/`, {
                // POST Request
                method: 'POST',
                // JSON Request Type
                headers: { 'Content-Type': 'application/json' },
                // JSON Body
                body: JSON.stringify({ username: lowercaseUsername }),
            });

            // JSON Response
            const data = await response.json();

            // Set the username availability
            setIsUsernameAvailable(data.available);
        } catch (error) {
            // Set the error message
            console.error('Error checking username:', error);
            // Set the username availability to null
            setIsUsernameAvailable(null);
        } finally {
            // Set the checking username to false
            setIsCheckingUsername(false);
        }
    }, []);


    // Sign-Up Form Submit Handler
    const handleSignUpSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        // Set the loading to true
        setIsLoading(true);
        // Set the error message to empty
        setErrorMessage("");

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const lowercaseUsername = trimmedUsername.toLowerCase();

        // Username Space Validation
        if (lowercaseUsername.includes(' ')) {
            setErrorMessage('Username cannot contain spaces');
            setIsLoading(false);
            return;
        }

        // Username Special Characters Validation
        if (!usernameRegex.test(lowercaseUsername)) {
            setErrorMessage('Username can only contain lowercase letters, numbers, and underscores');
            setIsLoading(false);
            return;
        }

        // Username Length Validation
        if (lowercaseUsername.length < 2) {
            setErrorMessage('Username must be at least 2 characters long');
            setIsLoading(false);
            return;
        }

        // Username Empty Validation
        if (lowercaseUsername === '') {
            setErrorMessage('Fill In Your Username');
            setIsLoading(false);
            return;
        }

        // @ Email Validation
        if (!trimmedEmail.includes('@')) {
            setErrorMessage('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Email Length Validation
        if (trimmedEmail.length < 4) {
            setErrorMessage('Email must be at least 4 characters long');
            setIsLoading(true);
            if (trimmedEmail.includes('@')) {
                setIsEmailValid(true);
                setIsLoading(false);
            } else {
                setIsEmailValid(false);
                setIsLoading(false);
            }
            return;
        }

        // Empty Email Validation
        if (trimmedEmail === '') {
            setErrorMessage('Fill In Your Email');
            setIsLoading(false);
            return;
        }

        // Password length validation
        if (trimmedPassword.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        // Empty Password Validation
        if (trimmedPassword === '') {
            setErrorMessage('Fill In Your Password');
            setIsLoading(false);
            return;
        }

        // Check for existing user data first
        checkExistingUserData(lowercaseUsername, trimmedEmail)
            .then(checkResult => {
                if (!checkResult.success) {
                    setErrorMessage(checkResult.message);
                    setIsLoading(false);
                    return;
                }
                
                // If no existing data found, proceed with signup
                return signup(lowercaseUsername, trimmedEmail, trimmedPassword);
            })
            .then(result => {
                if (result && result.success) {
                    router.push('/authentication/important-details');
                } else if (result) {
                    setErrorMessage(result.message);
                }
            })
            .catch(error => {
                // Set the error message
                setErrorMessage('An error occurred during sign up');
            })
            .finally(() => {
                // Set the loading to false
                setIsLoading(false);
            });
    };

    // Google Authentication Handler
    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        setIsLoading(true);
        setErrorMessage("");

        if (!credentialResponse.credential) {
            setErrorMessage('No credential received from Google');
            setIsLoading(false);
            return;
        }

        try {
            const result = await googleAuth(credentialResponse.credential);
            // Use is_new_user from backend
            if (result.success) {
                if (result.is_new_user) {
                    router.push('/authentication/important-details');
                } else {
                    router.push('/home');
                }
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred during Google authentication');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleError = () => {
        setErrorMessage('Google authentication failed. Please try again.');
    };

     // Debounce effect for username checking
     useEffect(() => {
        const timer = setTimeout(() => {
            const lowercaseUsername = username.toLowerCase();

            if (lowercaseUsername.trim() === '') {
                setIsUsernameAvailable(null);
                setIsCheckingUsername(false);
                setHasUsernameSpaces(false);
                setHasSpecialChars(false);
                return;
            }

            if (lowercaseUsername.includes(' ')) {
                setHasUsernameSpaces(true);
                setHasSpecialChars(false);
                setIsUsernameAvailable(null);
                setIsCheckingUsername(false);
                return;
            }

            if (!usernameRegex.test(lowercaseUsername)) {
                setHasSpecialChars(true);
                setHasUsernameSpaces(false);
                setIsUsernameAvailable(null);
                setIsCheckingUsername(false);
                return;
            }

            if (lowercaseUsername && isUsernameFocused) {
                checkUsernameAvailability(lowercaseUsername);
            } else if (!isUsernameFocused && lowercaseUsername.trim() !== '') {
                setIsCheckingUsername(false);
            }
        }, 100); // 100ms debounce

        // Cleanup
        return () => clearTimeout(timer);
    }, [username, checkUsernameAvailability, isUsernameFocused]);

    // Email Validation Effect
    useEffect(() => {
        if (email === '') {
            setIsEmailValid(null);
            return;
        }
        setIsEmailValid(email.includes('@'));
    }, [email]);

    // Facebook Authentication Handler
    const handleFacebookSuccess = async (response: any) => {
        setIsLoading(true);
        setErrorMessage("");
        console.log("---------------Handle Success In Action")
        if (!response.accessToken) {
            console.log("---------------Handle Success Token In Does Not Exist")
            setErrorMessage('No access token received from Facebook');
            setIsLoading(false);
            return;
        }
        try {
            console.log("---------------Handling Authentication")
            const result = await facebookAuth(response.accessToken);
            console.log("----------------API Result: ", result);
            if (result.success) {
                console.log("---------------Facebook Auth Successful")
                if (result.is_new_user) {
                    console.log("---------------Facebook Auth New User")
                    router.push('/authentication/important-details');
                } else {
                    console.log("---------------Facebook Auth User Exists")
                    router.push('/home');
                }
            } else {
                console.log("---------------Facebook Auth Not Successful")
                setErrorMessage(result.message);
            }
        } catch (error) {
            console.log("---------------Facebook Auth Try Catch Function Not Successful")
            setErrorMessage('An error occurred during Facebook authentication');
        } finally {
            setIsLoading(false);
        }
    };
    const handleFacebookError = () => {
        console.log("---------------Facebook Auth Handle Error")
        setErrorMessage('Facebook authentication failed. Please try again.');
    };


    // Apple Authentication Handler
    // const handleAppleSuccess = async (response: any) => {
    //     setIsLoading(true);
    //     setErrorMessage("");
    //     const id_token = response.id_token || response.authorization?.id_token;
    //     if (!id_token) {
    //         setErrorMessage('No ID token received from Apple');
    //         setIsLoading(false);
    //         return;
    //     }
    //     try {
    //         const result = await appleAuth(id_token);
    //         if (result.success) {
    //             if (result.is_new_user) {
    //                 router.push('/authentication/important-details');
    //             } else {
    //                 router.push('/home');
    //             }
    //         } else {
    //             setErrorMessage(result.message);
    //         }
    //     } catch (error) {
    //         setErrorMessage('An error occurred during Apple authentication');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    // const handleAppleError = (error: any) => {
    //     setErrorMessage('Apple authentication failed. Please try again.');
    // };

    // Sign-Up Form
    return (

        // Sign-Up Form Container
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            {/* Sign-Up Form Card */}
            <Card>

                {/* Sign-Up Form Header */}
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold font-playfair-display">Create An Account</CardTitle>
                    <CardDescription>
                        Sign Up With Google, Facebook, Apple
                    </CardDescription>
                </CardHeader>


                {/* Sign-Up Form Content */}
                <CardContent>
                    <form onSubmit={handleSignUpSubmit}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                {/* Sign-Up Form Google Button */}
                                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        useOneTap
                                        theme="outline"
                                        size="large"
                                        text="signup_with"
                                        shape="pill"
                                        logo_alignment="center"
                                    />  
                                </GoogleOAuthProvider>


                                {/* Sign-Up Form Facebook Button */}
                                <FacebookLogin
                                    appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!}
                                    onSuccess={handleFacebookSuccess}
                                    onFail={handleFacebookError}
                                >
                                    <Button
                                        className="w-full cursor-pointer bg-white border border-gray-200 hover:bg-blue-50 hover:border-1 hover:border-blue-50 text-primary flex items-center justify-center gap-2"
                                        disabled={isLoading}
                                        type="button"
                                        size="lg"
                                    >
                                        <svg width="20" height="20" fill="blue" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.35c0-.734-.593-1.326-1.326-1.326z"/></svg>
                                        <span style={{ fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 500 }} className="text-gray-800">Sign up with Facebook</span>
                                    </Button>
                                </FacebookLogin>


                                {/* Sign-Up Form Apple Button */}
                                {/* <AppleLogin
                                    clientId={process.env.NEXT_PUBLIC_APPLE_CLIENT_ID!}
                                    redirectURI={process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI!}
                                    responseType={"code id_token"}
                                    responseMode={"fragment"}
                                    usePopup={true}
                                    callback={handleAppleSuccess}
                                    onFailure={handleAppleError}
                                    render={renderProps => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            className="w-full bg-black hover:bg-gray-900 text-white flex items-center justify-center gap-2"
                                            disabled={isLoading}
                                            type="button"
                                        >
                                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-.03 0-.06 0-.09-.01-.02-.03-.03-.07-.03-.11 0-1.13.93-2.06 2.07-2.06.03 0 .06 0 .09.01.02.03.03.07.03.1zm4.47 16.13c-.13-.27-.25-.53-.39-.78-.36-.62-.73-1.23-1.13-1.81-.41-.59-.85-1.16-1.41-1.64-.41-.36-.85-.67-1.34-.87-.36-.15-.74-.23-1.13-.23-.36 0-.72.07-1.07.21-.36.14-.7.34-1.01.59-.23.19-.45.4-.66.62-.13.13-.25.27-.37.41-.02.02-.04.04-.07.04-.02 0-.04-.02-.06-.04-.13-.14-.25-.28-.38-.41-.21-.22-.43-.43-.66-.62-.31-.25-.65-.45-1.01-.59-.35-.14-.71-.21-1.07-.21-.39 0-.77.08-1.13.23-.49.2-.93.51-1.34.87-.56.48-1 .99-1.41 1.64-.4.58-.77 1.19-1.13 1.81-.14.25-.26.51-.39.78-.13.27-.25.54-.36.82-.11.28-.21.56-.3.85-.09.29-.17.59-.23.89-.06.3-.1.61-.13.92-.03.31-.05.62-.05.93 0 .31.02.62.05.93.03.31.07.62.13.92.06.3.14.6.23.89.09.29.19.57.3.85.11.28.23.55.36.82.13.27.25.53.39.78.36.62.73 1.23 1.13 1.81.41.59.85 1.16 1.41 1.64.41.36.85.67 1.34.87.36.15.74.23 1.13.23.36 0 .72-.07 1.07-.21.36-.14.7-.34 1.01-.59.23-.19.45-.4.66-.62.13-.13.25-.27.37-.41.02-.02.04-.04.07-.04.02 0 .04.02.06.04.13.14.25.28.38.41.21.22.43.43.66.62.31.25.65.45 1.01.59.35.14.71.21 1.07.21.39 0 .77-.08 1.13-.23.49-.2.93-.51 1.34-.87.56-.48 1-.99 1.41-1.64.4-.58.77-1.19 1.13-1.81.14-.25.26-.51.39-.78.13-.27.25-.54.36-.82.11-.28.21-.56.3-.85.09-.29.17-.59.23-.89.06-.3.1-.61.13-.92.03-.31.05-.62.05-.93 0-.31-.02-.62-.05-.93-.03-.31-.07-.62-.13-.92-.06-.3-.14-.6-.23-.89-.09-.29-.19-.57-.3-.85-.11-.28-.23-.55-.36-.82z"/></svg>
                                            Sign Up with Apple
                                        </Button>
                                    )}
                                /> */}
                            </div>

                            {/* Sign-Up Form  'Or' Divider */}
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>

                            {/* Sign-Up Form Inputs */}
                            <div className="grid gap-2">


                                {/* Sign-Up Form Username Input */}
                                <div className="grid gap-3">

                                    <Label htmlFor="username" className="flex justify-between items-center w-full">
                                        <p className="text-2xl font-bold">Username</p>
                                        {hasUsernameSpaces ?
                                            <p className="text-red-500 text-xs">No spaces allowed</p>
                                            : hasSpecialChars ?
                                                <p className="text-red-500 text-xs">Only letters, numbers, and underscores allowed</p>
                                                : isUsernameAvailable === true ?
                                                    <p className="text-green-500 text-xs">Username Is Available</p>
                                                    : isUsernameAvailable === false ?
                                                        <p className="text-red-500 text-xs">Username Already Exists</p>
                                                        : null}
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 border-r-2 border-border pr-2">
                                            <AtSign className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="Choose Your Unique Handle"
                                            required
                                            value={username.toLowerCase()}
                                            onChange={(e) => setUsername(e.target.value.toLowerCase())}
                                            onFocus={() => setIsUsernameFocused(true)}
                                            onBlur={() => setIsUsernameFocused(false)}
                                            className={cn(
                                                (hasUsernameSpaces || hasSpecialChars) && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 focus-visible:ring-[3px]",
                                                isUsernameAvailable === true && !hasUsernameSpaces && !hasSpecialChars && "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500 focus-visible:ring-[3px]",
                                                isUsernameAvailable === false && !hasUsernameSpaces && !hasSpecialChars && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 focus-visible:ring-[3px]"
                                            )}
                                            style={{ paddingLeft: '3rem' }}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {isCheckingUsername ? (
                                                <ClipLoader color="rgb(37, 99, 235)" size={15} />
                                            ) : (hasUsernameSpaces || hasSpecialChars) ? (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            ) : isUsernameAvailable === true ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            ) : isUsernameAvailable === false ? (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>


                                {/* Sign-Up Form Email Input */}
                                <div className="grid gap-3">
                                    <Label htmlFor="email" className="flex justify-between items-center w-full">
                                        <p className="text-2xl font-bold">Email</p>
                                        {isEmailValid === true ?
                                            <p className="text-green-500 text-xs">Valid Email Format</p>
                                            : isEmailValid === false ?
                                                <p className="text-red-500 text-xs">Invalid Email Format</p>
                                                : null}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={cn(
                                                isEmailValid === true && "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500 focus-visible:ring-[3px]",
                                                isEmailValid === false && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 focus-visible:ring-[3px]"
                                            )}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {isEmailValid === true ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            ) : isEmailValid === false ? (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>


                                {/* Sign-Up Form Password Input */}
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="text-2xl font-bold">Password</Label>
                                        <Link
                                            href="/authentication/resetpassword"
                                            className="ml-auto text-sm font-bold underline underline-offset-4"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="text"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="off"
                                            autoCorrect="off"
                                            autoCapitalize="off"
                                            spellCheck="false"
                                            className="pr-10 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-credentials-auto-fill-button]:appearance-none"
                                            style={{
                                                WebkitTextSecurity: showPassword ? 'none' : 'disc',
                                                msTextSecurity: showPassword ? 'none' : 'disc'
                                            } as React.CSSProperties}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Sign-Up Error Message */}
                                <div className="text-red-500 text-sm text-center">
                                    {errorMessage}
                                </div>


                                {/* Sign-Up Form Submit Button */}
                                <Button type="submit"
                                    className="w-full bg-secondary text-xl font-bold hover:bg-secondary/70 text-secondary-foreground cursor-pointer"
                                    disabled={isLoading}
                                    size="lg"
                                >
                                    Sign-Up
                                    {isLoading ? <ClipLoader color="#fff" size={20} /> : ''}
                                </Button>
                            </div>


                            {/* Sign-Up Form Login Link */}
                            <div className="text-center text-sm">
                                Do you have an account?{" "}
                                <Link href="/authentication" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>

                        </div>
                    </form>
                </CardContent>
            </Card>


            {/* Sign-Up Form Terms and Privacy Link */}
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking Sign-Up, you agree to our <Link href="/termsOfService" className="underline underline-offset-4">Terms of Service</Link>{" "}
                and <Link href="/privacyPolicy" className="underline underline-offset-4">Privacy Policy</Link>.
            </div>
        </div>
    )
}