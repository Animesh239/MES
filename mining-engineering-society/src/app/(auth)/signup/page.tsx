"use client";

import { createUserAction } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [state, action, isPending] = useActionState(createUserAction, null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    collegeName: "",
    branch: "",
    graduationYear: "",
    degree: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentStepFields = getFieldsForStep(step);
    const isValid = currentStepFields.every(
      (field) => formData[field as keyof typeof formData]
    );

    if (isValid) {
      setStep(step + 1);
    } else {
      // Simple alert for now, or could use a toast
      alert("Please fill in all fields");
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const getFieldsForStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return ["username", "email", "password"];
      case 2:
        return ["name", "phoneNumber"];
      case 3:
        return ["collegeName", "branch", "graduationYear", "degree"];
      default:
        return [];
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-black p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-gray-400">Step {step} of 3</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 h-1.5 mt-4 rounded-full overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form action={action} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Step 1: Account Details */}
            <div className={step === 1 ? "space-y-4" : "hidden"}>
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                  placeholder="johndoe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Step 2: Personal Details */}
            <div className={step === 2 ? "space-y-4" : "hidden"}>
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber" className="text-white">
                  Mobile Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            {/* Step 3: Education Details */}
            <div className={step === 3 ? "space-y-4" : "hidden"}>
              <div className="grid gap-2">
                <Label htmlFor="collegeName" className="text-white">
                  College Name
                </Label>
                <Input
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  required
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                  placeholder="NIT Rourkela"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="branch" className="text-white">
                    Branch
                  </Label>
                  <Input
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                    className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                    placeholder="Mining"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="graduationYear" className="text-white">
                    Passout Year
                  </Label>
                  <Input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    required
                    className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                    placeholder="2026"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="degree" className="text-white">
                  Degree
                </Label>
                <Select
                  name="degree"
                  value={formData.degree}
                  onValueChange={(value) =>
                    setFormData({ ...formData, degree: value })
                  }
                  required
                >
                  <SelectTrigger className="border-gray-700 bg-gray-900 text-white">
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B.Tech">B.Tech</SelectItem>
                    <SelectItem value="M.Tech">M.Tech</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                    <SelectItem value="BSc">B.Sc</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {/* Hidden input for degree to ensure it's submitted with FormData */}
                <input type="hidden" name="degree" value={formData.degree} />
              </div>
            </div>
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white"
              >
                Back
              </Button>
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            )}
          </div>
        </form>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
