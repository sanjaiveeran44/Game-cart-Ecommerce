"use client";

import { useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SellerProtectedRoute({ children }) {
  const { user, isLoaded } = useUser();
  const { isSeller } = useAppContext();
  const router = useRouter();

  // Debug logging
  console.log('SellerProtectedRoute - user loaded:', isLoaded);
  console.log('SellerProtectedRoute - user:', user?.primaryEmailAddress?.emailAddress);
  console.log('SellerProtectedRoute - isSeller:', isSeller);

  useEffect(() => {
    console.log('SellerProtectedRoute useEffect - checking access...');
    if (isLoaded && !user) {
      console.log('No user, redirecting to sign-in');
      router.push("/sign-in");
    } else if (isLoaded && user && !isSeller) {
      console.log('User not admin, redirecting to home');
      router.push("/");
    } else if (isLoaded && user && isSeller) {
      console.log('User is admin, access granted');
    }
  }, [user, isLoaded, isSeller, router]);

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Show access denied if user is logged in but not admin
  if (user && !isSeller) {
    console.log('Showing access denied page');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the seller dashboard. This area is restricted to admin users only.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => router.push("/sign-in")}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Sign In with Different Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading if user is not loaded yet
  if (!user) {
    console.log('User not loaded, showing loading');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render children if user is authenticated and is admin
  console.log('Rendering children - access granted');
  return <>{children}</>;
}
