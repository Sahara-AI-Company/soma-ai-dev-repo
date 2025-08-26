import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ClipLoader } from "react-spinners"
import { EyeOff, Eye } from "lucide-react"



// Change Password Form Component
export function ChangePasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    // useState Variables
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // useRouter Hook
    const router = useRouter();

    // useSearchParams Hook
    const searchParams = useSearchParams();

    // handleSubmit Function
    const handleSubmit = (e: React.FormEvent) => {
        // Preventing the default behavior of the form
        e.preventDefault()

        // Resetting the message and error
        setMessage("")
        setError("")

        // Set loading state to true at the start
        setIsLoading(true)

        // Checking if the passwords match
        if (password !== confirmPassword) {
            // Setting the error
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        // Getting the reset token from URL
        const token = searchParams.get('token')
        if (!token) {
            // Setting the error
            setError("Reset token not found")
            setIsLoading(false)
            return
        }

        // Fetching the reset password confirmation
        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/somaapp/authentication/reset-password-confirm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                new_password: password
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    // Setting the message
                    setMessage(data.message)

                    // Redirecting to the login page after a short delay
                    setTimeout(() => {
                        router.push('/authentication')
                    }, 2000)
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


    // useEffect Hook
    useEffect(() => {

        // Checking if we have a reset token in URL
        const token = searchParams.get('token')
        if (!token) {

            // Redirecting to the reset password page
            router.push('/authentication/resetpassword')
        }
    }, [router, searchParams])



    // Returning the Change Password Form
    return (
        // Change Password Form Container
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            {/* Change Password Form Card */}
            <Card>

                {/* Change Password Form Card Header */}
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-playfair-display">Change Password</CardTitle>
                    <CardDescription>
                        Enter your new password
                    </CardDescription>
                </CardHeader>

                {/* Change Password Form Card Content */}
                <CardContent>

                    {/* Change Password Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">

                            {/* Change Password Form New Password Label And Input */}
                            <div className="grid gap-3 relative">
                                <Label htmlFor="password" className="text-2xl font-bold">New Password</Label>
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
                                    className="absolute right-3 top-7/10 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {/* Change Password Form Confirm Password Label And Input */}
                            <div className="grid gap-3 relative">
                                <Label htmlFor="confirmPassword" className="text-2xl font-bold">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="text"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
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
                                    className="absolute right-3 top-7/10 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {/* Change Password Form Message */}
                            {message && (
                                <div className="text-sm text-green-500 text-center">
                                    {message}
                                </div>
                            )}

                            {/* Change Password Form Error */}
                            {error && (
                                <div className="text-sm text-red-500 text-center">
                                    {error}
                                </div>
                            )}

                            {/* Change Password Form Submit Button */}
                            <Button
                                type="submit"
                                className="hover:bg-secondary/70 w-full text-xl font-bold bg-secondary text-secondary-foreground cursor-pointer"
                                disabled={isLoading}
                                size="lg"
                            >
                                Change Password
                                {isLoading ? <ClipLoader color="#fff" size={20} /> : ''}
                            </Button>

                            {/* Change Password Form Signup Link */}
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/login/signup" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>

                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Change Password Form Terms and Privacy Link */}
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking Change Password, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}