import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { XCircle } from "lucide-react"
import { ClipLoader } from "react-spinners"



// Reset Password Form Component
export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    // useState Variables
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // useRouter Hook
    const router = useRouter();
    

    // handleSubmit Function
    const handleSubmit = (e: React.FormEvent) => {
        // Preventing the default behavior of the form
        e.preventDefault()

        // Resetting the message and error
        setMessage("")
        setError("")
        setErrorMessage("")

        // Set loading state to true at the start
        setIsLoading(true)

        // @ Email Validation
        if (!email.includes('@')) {
            setErrorMessage('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Email Length Validation
        if (email.length < 4) {
            setErrorMessage('Email must be at least 4 characters long');
            setIsLoading(false);
            if (email.includes('@')) {
                setIsEmailValid(true);
            } else {
                setIsEmailValid(false);
            }
            return;
        }

        // Empty Email Validation
        if (email === '') {
            setErrorMessage('Fill In Your Email');
            setIsLoading(false);
            return;
        }

        // Fetching the reset password request
        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/reset-password-request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => response.json())
        .then(data => {
            // Checking if the response is ok
            if (data.message) {
                // Setting the message
                setMessage(data.message)
                // Redirecting to the login page
                // router.push('/login')
            } else {
                // Setting the error
                setError(data.error || 'An error occurred')
            }
        })
        .catch(error => {
            // Setting the error
            setError('An error occurred while processing your request')
        })
        .finally(() => {
            // Always set loading to false when done
            setIsLoading(false)
        })
    }

    // Email Validation Effect
    useEffect(() => {
        if (email === '') {
            setIsEmailValid(null);
            return;
        }
        setIsEmailValid(email.includes('@'));
    }, [email]);


    // Returning the Reset Password Form
    return (

        // Reset Password Form Container
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            <Card>

                {/* Reset Password Form Header */}
                <CardHeader className="text-center">

                    {/* Reset Password Form Title */}
                    <CardTitle className="text-3xl font-playfair-display">Reset Password</CardTitle>

                    {/* Reset Password Form Description */}
                    <CardDescription>
                        Enter your email to reset your password (Check your email for reset password link)
                    </CardDescription>
                </CardHeader>

                {/* Reset Password Form Content */}
                <CardContent>

                    {/* Reset Password Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-3">

                                {/* Login Form Email Input */}
                                <Label htmlFor="email" className="flex justify-between items-center w-full">

                                    {/* Reset Password Form Email Label */}
                                        <p className="text-2xl font-bold">Email</p>

                                        {/* Reset Password Form Email Validation */}
                                            {isEmailValid === true ? 
                                            <p className="text-green-500 text-xs">Valid Email Format</p>
                                            : isEmailValid === false ? 
                                            <p className="text-red-500 text-xs">Invalid Email Format</p>
                                            : null}
                                </Label>

                                    {/* Reset Password Form Email Input */}
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

                                        {/* Reset Password Form Email Validation Icon */}
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {isEmailValid === true ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            ) : isEmailValid === false ? (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            ) : null}
                                    </div>
                            </div>

                            {/* Reset Password Form Message */}
                            {message && (
                                <div className="text-sm text-green-500 text-center">
                                    {message}
                                </div>
                            )}

                            {/* Reset Password Form Error */}
                            {error && (
                                <div className="text-sm text-red-500 text-center">
                                    {error}
                                </div>
                            )}

                            {/* Reset Password Form Submit Button */}
                            <Button
                                type="submit"
                                className="hover:bg-secondary/70 w-full text-xl font-bold bg-secondary text-secondary-foreground cursor-pointer"
                                disabled={isLoading}
                                size="lg"
                            >
                                Reset Password
                                {isLoading ? <ClipLoader color="#fff" size={20} /> : ''}
                            </Button>
                        </div>

                            {/* Reset Password Form Back To Login Link */}
                            <div className="text-center text-sm">
                                Remember your password?{" "}
                                <Link href="/authentication" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Reset Password Form Terms and Privacy Link */}
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking Reset Password, you agree to our <Link href="/termsOfService" className="underline underline-offset-4">Terms of Service</Link>{" "}
                and <Link href="/privacyPolicy" className="underline underline-offset-4">Privacy Policy</Link>.
            </div>
        </div>
    )
}
