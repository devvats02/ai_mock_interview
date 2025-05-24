"use client";

import { logoutAction } from "@/lib/actions/logout.action";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" className="btn ml-5">
        Logout
      </Button>
    </form>
  );
}
