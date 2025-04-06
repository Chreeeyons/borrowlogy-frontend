'use client';

import Image from 'next/image';
import Link from 'next/link';
import './globals.css';
import { signIn } from "next-auth/react";
// import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const handleLogin = async () => {
    try {
      // Redirects the user to Google authentication and then to /equipment
      await signIn("google", { callbackUrl: "/equipment" });

    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const clearCookies = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    console.log("All cookies cleared!");
  };

  // const handleLogout = () => {
  //   clearCookies(); // Clear all cookies
  //   signOut({ callbackUrl: "/" }); // Redirect to homepage after logout
  // };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Top and Bottom Borders */}
      <div className="top-border fixed top-0 left-0 w-full h-5 bg-[#5E0708] z-10"></div>
      <div className="bottom-border fixed bottom-0 left-0 w-full h-5 bg-[#5E0708] z-10"></div>

      {/* Main Content */}
      <div className="container font-sans w-[700px] absolute top-1/2 left-[50px] transform -translate-y-1/2 text-left z-50">
        <h1 className="text-[45px] text-[#5E0708] mb-4 tracking-widest drop-shadow-lg">
          Borrowing your Biology Lab Materials made easier!
        </h1>
        <p className="text-[18px] font-light text-[#5E0708] leading-6 mb-8 mr-12">
          Borrowlogy is a platform for university biology students to easily
          borrow lab materials. With Borrowlogy, students can quickly access the
          tools they need for their experiments and stay organized with a
          comprehensive history log to track all their borrowing activities.
          Simplifying material access, so you can focus on learning!
        </p>

        {/* Button Container */}
        <div className="button-container flex gap-4">
          {/* Login Button */}
          <button
            className="btn bg-[#5E0708] text-white px-6 py-3 text-[16px] rounded-md transition-all hover:bg-[#8A0A0B]"
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}