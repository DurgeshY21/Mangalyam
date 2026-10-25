import type { Metadata } from "next";
import { SignUp } from "./SignUp";

export const metadata: Metadata = { title: "Create Account" };

export default function SignupPage() {
  return <SignUp />;
}
