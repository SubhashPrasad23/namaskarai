export default function SignupPage() {


    
    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl glass-video-card p-5! bg-white/30 shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900">
                    Create an Account
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Create your account to get started.
                </p>

                <form className="mt-8 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-black hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </main>
    );
}