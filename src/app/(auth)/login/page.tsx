"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrorMessage(result.message);
                return;
            }

            router.push("/admin");
            router.refresh();
        } catch {
            setErrorMessage("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center ">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl rounded-xl  shadow glass-video-card p-5!"
            >
                <h1 className="mb-6 text-2xl font-bold">
                    Admin Login
                </h1>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                        required
                    />
                </div>

                {errorMessage && (
                    <p className="mb-4 text-sm text-red-600">
                        {errorMessage}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-red-600 p-3 text-white"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}