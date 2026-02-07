"use client";

import { useState } from "react";
import { loginAction } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    try {
      const result = await loginAction(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "digest" in error &&
        typeof (error as { digest: unknown }).digest === "string" &&
        (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
      ) {
        return;
      }

      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-900/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md p-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-red-900/30 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Admin Portal
            </h1>
          </div>
          <p className="text-gray-400">Restricted Access</p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-gray-300 font-medium">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500 backdrop-blur-sm"
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300 font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500 backdrop-blur-sm"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm text-center p-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0 shadow-lg py-3 text-lg font-medium"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Login</span>
              </div>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">Mining Engineering Society</p>
        </div>
      </div>
    </div>
  );
}
