"use server";

import { signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await signOut();         // deletes the cookie
  redirect("/sign-in");    // navigates to sign-in
}
