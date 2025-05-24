import { getCurrentUser } from "@/lib/actions/auth.action";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function AuthButtons() {
  const user = await getCurrentUser();

  return user ? <LogoutButton /> : <Link href="/sign-in">Login</Link>;
}
