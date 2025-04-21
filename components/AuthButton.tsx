// components/AuthButton.tsx
"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase/client";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AuthButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    router.push("/sign-in");
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/sign-in");
  };

  return (
    <Button
      onClick={user ? handleLogout : handleLogin}
      className="bg-primary text-white px-4 py-2 rounded"
    >
      {user ? "Logout" : "Login"}
    </Button>
  );
};

export default AuthButton;
