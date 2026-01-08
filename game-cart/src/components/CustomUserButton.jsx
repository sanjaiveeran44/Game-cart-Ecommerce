"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { FiShoppingBag } from "react-icons/fi";

export default function CustomUserButton() {
  const { user } = useUser();
  const { isSeller } = useAppContext();
  const router = useRouter();

  const handleSellerClick = () => {
    console.log('Seller button clicked, navigating to /seller');
    router.push("/seller");
  };

  console.log('CustomUserButton - isSeller:', isSeller);
  console.log('CustomUserButton - user:', user?.primaryEmailAddress?.emailAddress);

  return (
    <div className="flex items-center gap-2">
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
            userButtonPopoverCard: "shadow-lg rounded-xl",
          },
        }}
      />
      
      {isSeller && (
        <button
          onClick={handleSellerClick}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          title="Seller Dashboard"
        >
          <FiShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Seller</span>
        </button>
      )}
    </div>
  );
}
